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
  const [ModalTypes, setModalTypes] = useState("")
  const [TopToast, setTopToast] = useState("")
  const [ToastMessage, setToastMessage] = useState("")
  const [ToastType, setToastType] = useState("")
  const [priority, setpriority] = useState("high")
  const [inputDate, setinputDate] = useState("")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])



  const handleChange = (e) => {
    setinput(e.target.value)
  }

  const addTodo = () => {

    const value = input.trim();

    if (!value) {
      showToastMessage("Input cannot be empty", "error")
      setTopToast("empty")
      setTimeout(() => { 
        setToastType("")
      }, 3 * 1000);
      return;
    }
    const exists = todos.some((t) => t.text === value);

    if (exists) {
      showToastMessage("Todo already exists", "warning")
      setTopToast("exist")
      setTimeout(() => {
        setToastType("")
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
        date: inputDate,
      }
      setTodos([...todos, newTodo])
      setinput("");
      setshow(false)
      setinputDate("")
    }
  }


  const handleDeleteClick = (id) => {
    setDeleteId(id)
    setModalTypes("delete")
  }
  const handleDeleteClick2 = () => {
    if (todos.length == 0) {
      setModalTypes("empty")
    } else {
      setModalTypes("deleteAll")
    }
  }

  const confirmDelete = () => {
    const updateTodo = todos.filter((t) => t.id !== DeleteId)
    setTodos(updateTodo)
    setDeleteId(null)
    setModalTypes("")
  }

  const cancelDelete = () => {
    setModalTypes("")
    setDeleteId(null)
  }

  const confirmDeleteAll = () => {
    setTodos([])
    setModalTypes("")
  }

  const cancelDeleteAll = () => {
    setModalTypes("")
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
      setToastMessage("No completed task", "!completed")
      setToastType("!completed")
      setTimeout(() => {
        setToastType("")
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

  const getpriority = (priority) => {
    return (priority === "high" ? "border-r-4 border-r-red-400" : priority === "medium" ? "border-r-4 border-r-amber-300" : priority === "low" ? "border-r-4 border-r-green-400" : "")
  }

  const highlightText = (text) => {
    if (!search) return text

    const parts = text.split(new RegExp(`(${search})`, "gi"))

    return parts.map((part, index) => part.toLocaleLowerCase() === search.toLocaleLowerCase() ? (
      <span key={index} className='text-yellow-400 font-bold'>{part}</span>
    ) : part);
  }


  const showToastMessage = (message, type) => {
    setToastMessage(message)
    setToastType(type)
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
          ModalTypes={ModalTypes}
          setModalTypes={setModalTypes}
          setToastMessage={setToastMessage}
          ToastType={ToastType}
          ToastMessage={ToastMessage}
          cancelDelete={cancelDelete}
          confirmDelete={confirmDelete}
          cancelDeleteAll={cancelDeleteAll}
          confirmDeleteAll={confirmDeleteAll}
          setpriority={setpriority}
          priority={priority}
          getpriority={getpriority}
          inputDate={inputDate}
          setinputDate={setinputDate}

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
