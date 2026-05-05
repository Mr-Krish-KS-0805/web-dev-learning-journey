import { useEffect, useState } from 'react'
import './App.css'
import { HiMenuAlt4 } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiPlusSm } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { CiMenuKebab } from "react-icons/ci";
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import TodoAddButton from './TodoAddButton';


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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])



  const handleChange = (e) => {
    setinput(e.target.value)
  }

  const addTodo = () => {

    const value = input.trim();

    if (!value) {
      alert("Enter something")
      return;
    }
    const exists = todos.some((t) => t.text === value);

    if (exists) {
      alert("Todo already exists")
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
      }
      setTodos([...todos, newTodo])
      setinput("");

      // setshow(false)
    }
  }


  const handleDelete = (id) => {
    const updateTodo = todos.filter((t) => t.id !== id);
    setTodos(updateTodo)
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

  const filterTodos = () => {
    if (filter === "all") {
      return todos
    }

    else if (filter === "Completed") {
      return todos.filter((t) => t.isCompleted)
    }

    else {
      return todos.filter((t) => !t.isCompleted)
    }

  }

  const list = filterTodos();

  const MarkAllcomplete = () => {
    const All = todos.map((t) => ({ ...t, isCompleted: true }))
    setTodos(All)
  }

  const clearCompleted = () => {
    const clear = todos.filter((t) => !t.isCompleted)
    setTodos(clear)
  }

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      addTodo()
      setinput("")
      setshow(true)
    }

    if (e.key === "Escape") {
      seteditID(null)
      setinput("")
      setshow(false)
    }
  }


  const getActiveClass = (btn) => {
    return filter === btn ? "bg-red-500 rounded-full transition-all duration-600 transform scale-105 ring-1 ring-white " : "";
  }

  // const handleDone = () => {

  //   const success = addTodo();

  //   if(!success) return;

  //   setanimate(true)
  //   setTimeout(() => {
  //     setshow(false)
  //     setanimate(false)
  //   }, 700);
  // }





  return (
    <>
      <div className='min-h-screen bg-blue-300 flex flex-col items-center overflow-hidden'>

        <div className='w-93.75 h-dvh bg-[#560591] flex flex-col border-4 items-center rounded-3xl relative'>

          <div className="navbar flex justify-center mt-8">
            <div className='w-82 text-2xl flex justify-between items-center'>
              <HiMenuAlt4 className=' text-gray-300 ' />

              <div className='flex gap-5 items-center '>
                <HiOutlineSearch className=' text-gray-300' />
                <HiOutlineBell className=' text-gray-300' />
              </div>

            </div>
          </div>



          <div className="content flex flex-col mt-8 items-center">
            {show === true ? <TodoInput
              handleChange={handleChange}
              addTodo={addTodo}
              setshow={setshow}
              show={show}
              input={input}
              handleKeyDown={handleKeyDown}
            /> : <h1 className='text-3xl text-center font-semibold text-gray-300'>What's up Krish!</h1>}



            <div className='w-90 flex flex-col mt-5 ml-7 p-2  relative'>
              <h1 className='text-gray-300 font-bold text-xs'>YOUR TASK</h1>
              <div className='flex flex-row justify-between mt-2 z-10 text-xl w-78 font-bold bg-amber-600 rounded-4xl backdrop-blur-sm'>
                <button className={`${getActiveClass("all")} px-1.5 py-1 cursor-pointer`} onClick={() => { setfilter("all") }}>📋</button>
                <button className={`${getActiveClass("Completed")} px-1.5 py-1 cursor-pointer`} onClick={() => { setfilter("Completed") }}>☑️</button>
                <button className={`${getActiveClass("")} px-1.5 py-1 cursor-pointer`} onClick={() => { setfilter("") }}>⌛</button>
                <div className='flex flex-row bg-linear-to-l from-amber-400 to-black px-2 rounded-full gap-2 text-center text-lg'>
                  <button className=' cursor-pointer' onClick={MarkAllcomplete}>🟢</button>
                  <button className=' cursor-pointer' onClick={clearCompleted}>🔴</button>
                </div>
              </div>

              <div className='task-container absolute top-10 pt-7'>

                {list.length === 0 ? (
                  <p className='text-white mt-5'> {filter === "all" ? "No todos" : filter === "Completed" ? "No completed todos" : "No pending todos"}</p>
                ) : (
                  list.map((t, index) =>
                  (
                    <TodoItem key={t.id}
                      t={t}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      toggleComplete={toggleComplete}
                      activeId={activeId}
                      iconShow={iconShow}
                    />
                  )

                  ))}
              </div>

            </div>

          </div>
          <TodoAddButton
            setshow={setshow}
            show={show}
          />


        </div>

      </div>
    </>
  )
}

export default App
