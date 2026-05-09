import { useEffect, useState } from 'react'
import './App.css'
import MobileLayout from './layouts/MobileLayout'
import DesktopLayout from './layouts/DesktopLayout'
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { IoLayers } from "react-icons/io5";
import { LuBadgeCheck } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi"


function App() {
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  })

  const [input, setinput] = useState("")
  const [show, setshow] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [editID, seteditID] = useState(null)
  const [filter, setfilter] = useState("all")
  const [animate, setanimate] = useState(false)
  const [search, setsearch] = useState("")
  const [showSearch, setshowSearch] = useState(false)
  const [DeleteId, setDeleteId] = useState(null)
  const [showModal, setshowModal] = useState(false)
  const [showModal2, setshowModal2] = useState(false)
  const [showModal3, setshowModal3] = useState(false)
  const [TodoExist, setTodoExist] = useState(false)
  const [emptyInput, setemptyInput] = useState(false)
  const [TopToast, setTopToast] = useState("")
  const [NoTask, setNoTask] = useState(false)
  const [priority, setpriority] = useState("")


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])



  const handleChange = (e) => {
    setinput(e.target.value)
  }

  const addTodo = () => {

    const value = input.trim();

    if (!value) {
      setemptyInput(true)
      setTopToast("empty")
      setTimeout(() => {
        setemptyInput(false)
      }, 3 * 1000);
      return;
    }
    const exists = todos.some((t) => t.text === value);

    if (exists) {
      setTodoExist(true)
      setTopToast("exist")
      setTimeout(() => {
        setTodoExist(false)
      }, 3 * 1000);
      return;
    }
    if (editID !== null) {
      const updated = todos.map((t) => t.id === editID ? { ...t, text: value } : t);
      setTodos(updated)
      setinput("")
      setshow(false)
      seteditID(null)
    }
    else {
      const newTodo = {
        id: Date.now(),
        text: value,
        isCompleted: false,
        priority: priority,
      }
      setTodos([...todos, newTodo])
      setinput("");
      setshow(false)
    }
  }



  const handleDeleteClick = (id) => {
    setDeleteId(id)
    setshowModal(true)
  }
  const handleDeleteClick2 = () => {
    if (todos.length == 0) {
      setshowModal3(true)
    } else {
      setshowModal2(true)
    }
  }

  const confirmDelete = () => {
    const updateTodo = todos.filter((t) => t.id !== DeleteId)
    setTodos(updateTodo)
    setDeleteId(null)
    setshowModal(false)
  }

  const cancelDelete = () => {
    setshowModal(false)
    setDeleteId(null)
  }

  const confirmDeleteAll = () => {
    setTodos([])
    setshowModal2(false)
  }

  const cancelDeleteAll = () => {
    setshowModal2(false)
  }



  const handleEdit = (id) => {
    const todoToedit = todos.find((t) => t.id === id);
    setshow(true);
    setinput(todoToedit.text)
    seteditID(id)

  }

  const iconShow = (id) => {
    setActiveId((prev) => prev === id ? null : id);
  }

  const toggleComplete = (id) => {
    const update = todos.map((t) => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t);
    setTodos(update)
  }
  const completedTodo = todos.filter((t) => t.isCompleted)
  const pendingTodo = todos.filter((t) => !t.isCompleted)

  const filterTodos = () => {
    let filtered = todos;

    if (filter === "completed") {
      filtered = filtered.filter((t) => t.isCompleted)
    }

    else if (filter === "pending") {
      filtered = filtered.filter((t) => !t.isCompleted)
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((t) => t.text.toLowerCase().includes(search.toLocaleLowerCase()))

    }
    return filtered

  }

  const list = filterTodos();


  const MarkAllcomplete = () => {
    const All = todos.map((t) => ({ ...t, isCompleted: true }))
    setTodos(All)
  }

  const clearCompleted = () => {
    const clear = todos.filter((t) => !t.isCompleted)
    if (completedTodo.length === 0) {
      setNoTask(true)
      setTopToast("NoTask")
      setTimeout(() => {
        setNoTask(false)
      }, 3 * 1000);

    }
    else {

      setTodos(clear)
    }
  }

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      addTodo()
      setshow(false)
    }

    if (e.key === "Escape") {
      seteditID(null)
      setinput("")
      setshow(false)
    }
  }


  const getActiveClass = (btn) => {
    return filter === btn ?
      btn === "all" ? "bg-linear-to-br from-[#000000] to-[#530093] transition-all scale-105 duration-600" : btn === "completed" ? "bg-linear-to-br from-[#000000] to-[#0e8303] transition-all scale-105 duration-600" : "bg-linear-to-br from-[#000000] to-[#cf8e00] transition-all scale-105 duration-600" : ""
  }

  const highlightText = (text) => {
    if (!search) return text

    const parts = text.split(new RegExp(`(${search})`, "gi"))

    return parts.map((part, index) => part.toLocaleLowerCase() === search.toLocaleLowerCase() ? (
      <span key={index} className='text-yellow-400 font-bold'>{part}</span>
    ) : part);
  }


  return (
    <>
      <div className='hidden md:block'>
        <DesktopLayout
          filter={filter}
          setfilter={setfilter}
          getActiveClass={getActiveClass}
          search={search}
          setsearch={setsearch}
          showSearch={showSearch}
          setshowSearch={setshowSearch}
          todos={todos}
          completedTodo={completedTodo}
          pendingTodo={pendingTodo}
          handleKeyDown={handleKeyDown}
          handleChange={handleChange}
          input={input}
          addTodo={addTodo}
          clearCompleted={clearCompleted}
          handleDeleteClick2={handleDeleteClick2}
          list={list}
          highlightText={highlightText}
          toggleComplete={toggleComplete}
          handleEdit={handleEdit}
          handleDeleteClick={handleDeleteClick}
          TopToast={TopToast}
          emptyInput={emptyInput}
          TodoExist={TodoExist}
          NoTask={NoTask}
          showModal={showModal}
          showModal2={showModal2}
          showModal3={showModal3}
          cancelDelete={cancelDelete}
          confirmDelete={confirmDelete}
          cancelDeleteAll={cancelDeleteAll}
          confirmDeleteAll={confirmDeleteAll}
          setshowModal3={setshowModal3}
          setpriority={setpriority}
          priority={priority}
        />
      </div>

      <div className='block md:hidden'>
        <MobileLayout
        handleChange={handleChange}
        addTodo={addTodo}
        setshow={setshow}
        show={show}
        input={input}
        handleKeyDown={handleKeyDown}
        getActiveClass={getActiveClass}
        setfilter={setfilter}
        filter={filter}
        MarkAllcomplete={MarkAllcomplete}
        clearCompleted={clearCompleted}
        list={list}
        handleEdit={handleEdit}
        confirmDelete={confirmDelete}
        toggleComplete={toggleComplete}
        activeId={activeId} 
        iconShow={iconShow}
        />
      </div>
    </>

  )
}

export default App
