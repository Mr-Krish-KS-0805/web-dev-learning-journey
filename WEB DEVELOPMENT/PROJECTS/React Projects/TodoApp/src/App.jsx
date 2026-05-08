import { useEffect, useState } from 'react'
import './App.css'
import MobileLayout from './MobileLayout'
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
  const [DeleteId, setDeleteId] = useState(null)
  const [showModal, setshowModal] = useState(false)
  const [showModal2, setshowModal2] = useState(false)
  const [showModal3, setshowModal3] = useState(false)
  const [TodoExist, setTodoExist] = useState(false)
  const [emptyInput, setemptyInput] = useState(false)
  const [TopToast, setTopToast] = useState("")
  const [NoTask, setNoTask] = useState(false)


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
      <div className="min-h-screen min-w-screen bg-[#0b1220] flex flex-row gap-3 relative overflow-hidden">

        <div className='sidebar min-h-screen w-[20vw] bg-[#1f2937] items-center flex flex-col p-3 gap-6 relative pt-6'>
          <h1 className='w-full text-center text-3xl font-bold text-[#f9fafb]'>Todo App</h1>

          <div className='text-[#f9fafb] text-xl w-[80%]  flex flex-col gap-7'>
            <div onClick={() => setfilter("all")} className={`${getActiveClass("all")} font-semibold rounded-xl py-3 px-2 cursor-pointer`}>📋 All</div>
            <div onClick={() => setfilter("completed")} className={`${getActiveClass("completed")} font-semibold rounded-xl py-3 px-2 cursor-pointer`}>✅ Completed</div>
            <div onClick={() => setfilter("pending")} className={`${getActiveClass("pending")} font-semibold rounded-xl py-3 px-2 cursor-pointer`}>⏰ Pending</div>

          </div>

          <div className='absolute bottom-3'>
            <h1 className=' text-[#f9fafb]'>Krish</h1>
            <h3 className='text-gray-400 text-sm'>Stay Productive 🎉</h3>
          </div>

        </div>

        <div className=" main h-screen w-[80vw] bg-[#1e293b]">

          <div className='flex flex-row w-full justify-between pt-6 px-6 text-[#f9fafb] text-3xl font-bold'>
            <div className='flex flex-col gap-1'>
              <h1>Dashboard 🖐️</h1>
              <p className='text-gray-400 text-sm font-medium'>What's up Krish</p>
            </div>

            <div className='flex flex-row gap-10'>
              <input value={search} onChange={(e) => setsearch(e.target.value)} type="text" className='w-[50vw] h-10 bg-[#273449] py-4 px-5 text-xl rounded-xl outline-0 border border-gray-500 text-[#f9fafb] placeholder:text-gray-400' />
              <div className='w-10 h-10 bg-slate-900 flex items-center justify-center rounded-md'><HiOutlineSearch className='text-xl' /></div>
              <div className='w-10 h-10 bg-slate-900 flex items-center justify-center rounded-md'><HiOutlineBell className='text-xl' /></div>
            </div>

          </div>

          <div className='px-4 py-3 flex flex-row w-full justify-around '>

            <div className='flex flex-row gap-5 items-center w-[25%] p-7 bg-linear-to-br from-[#000000] to-[#530093] rounded-xl hover:scale-105 transition-all duration-500 origin-center will-change-transform '>
              <div className='bg-purple-600 w-15 h-15 flex items-center justify-center rounded-full'><IoLayers className='text-3xl text-white' /></div>
              <div>
                <h1 className='text-[#f9fafb] text-xl font-semibold'>Total Tasks</h1>
                <h2 className='text-[#f9fafb] text-3xl'>{todos.length}</h2>
              </div>
            </div>

            <div className='flex flex-row gap-5 items-center w-[25%]  p-7 bg-linear-to-br from-[#000000] to-[#0e8303]  rounded-xl hover:scale-105 transition-all duration-500 origin-center will-change-transform '>
              <div className='bg-green-500 w-15 h-15 flex items-center justify-center rounded-full'><LuBadgeCheck className='text-3xl text-white' /></div>
              <div>
                <h1 className='text-[#f9fafb] text-xl font-semibold'>Completed</h1>
                <h2 className='text-[#f9fafb] text-3xl'>{completedTodo.length}</h2>
              </div>
            </div>

            <div className='flex flex-row gap-5 items-center w-[25%] p-7 bg-linear-to-br from-[#000000] to-[#cf8e00] rounded-xl hover:scale-105 transition-all duration-500 origin-center will-change-transform '>
              <div className='bg-orange-300 w-15 h-15 flex items-center justify-center rounded-full'><FaRegClock className='text-3xl text-white' /></div>
              <div>
                <h1 className='text-[#f9fafb] text-xl font-semibold'>Pending</h1>
                <h2 className='text-[#f9fafb] text-3xl'>{pendingTodo.length}</h2>
              </div>
            </div>

          </div>

          <div className=' w-full flex py-1 justify-center items-center gap-2 '>
            <input autoFocus onKeyDown={handleKeyDown} onChange={handleChange} value={input} type="text" placeholder='Add a new task...' className='bg-[#273449] w-[80%] py-3 px-5 text-xl rounded-xl outline-0 border border-gray-500 text-[#f9fafb] placeholder:text-gray-400' />
            <button onClick={addTodo} className='w-25 py-4 text-[#f9fafb] font-bold text-xl bg-linear-to-tr from-[#000000] to-[#7415bd] rounded-xl active:text-amber-500 '>Add</button>
          </div>

          <div className='flex flex-row justify-between items-center px-17.5 py-1'>
            <h1 className='py-3 text-[#f9fafb] text-2xl font-semiboldbold'>Your Tasks</h1>
            <div className=' flex flex-row justify-center items-center gap-10 text-2xl '>
              <button onClick={clearCompleted} className='flex flex-row justify-center items-center gap-2 rounded-xl border border-gray-500 bg-[#273449] py-1 px-3 font-semibold text-green-700 '><HiOutlineTrash className='text-green-700 text-2xl' /> Clear completed</button>
              <button onClick={handleDeleteClick2} className='flex flex-row justify-center items-center gap-2  rounded-xl border border-gray-500  bg-[#273449] py-1 px-3 font-semibold text-red-700 '><HiOutlineTrash className='text-red-700 text-2xl' />Clear all</button>
            </div>
          </div>

          <div className='taskContainerDesktop w-[80vw] px-20 flex flex-col gap-3 py- absolute top'>

            {list.length === 0 ? (<p className='text-3xl flex justify-center text-white mt-10 text-center opacity-80'>{filter === "all" ? "No todos ! 😊 Start by adding a new task " : filter === "completed" ? "No completed todos" : "No pending todos"}</p>
            ) : (list.map((t) => (
              <div key={t.id} className='flex flex-row justify-between items-center py-2.5 px-5 bg-[#273449] outline-0 border border-gray-500 rounded-xl hover:transform-3d hover:translate-x-3 transition-all duration-300 origin-center will-change-transform '>

                <div className='flex flex-row items-center gap-5'>
                  <FaCheckCircle onClick={() => toggleComplete(t.id)} className={`${t.isCompleted ? "text-[#40ff00] duration-200 transition-transform scale-110 " : "text-gray-400 transition-all duration-200"} text-4xl`} />
                  <h2 className='text-white mb-1 text-2xl'>{highlightText(t.text)}</h2>
                </div>

                <div className='flex flex-row items-center gap-6 text-4xl '>
                  <HiOutlinePencilAlt onClick={() => handleEdit(t.id)} className='text-[#f9fafb]' />
                  <HiOutlineTrash onClick={() => handleDeleteClick(t.id)} className='text-red-700' />
                </div>

              </div>
            )))}

          </div>
          <div className='text-xl text-white absolute bottom-5  w-[80vw] flex justify-center items-center'><p className={`bg-red-500 text-center flex justify-center items-center w-[20vw] transition-all duration-500 ${TopToast === "empty" ? "z-20" : "z-10"} ${emptyInput ? "transform-3d translate-x-0  visible " : "transform-3d translate-x-200 invisible"} rounded-xl py-2 `}>Please type something!</p></div>
          <div className='text-xl text-white absolute bottom-5  w-[80vw] flex justify-center items-center'><p className={`bg-red-500 text-center flex justify-center items-center w-[20vw] transition-all duration-500 ${TopToast === "exist" ? "z-20" : "z-10"} ${TodoExist ? "transform-3d translate-x-0  visible " : "transform-3d translate-x-200 invisible "} rounded-xl py-2`}>Todo exist!</p></div>
          <div className='text-xl text-white absolute bottom-5  w-[80vw] flex justify-center items-center'><p className={`bg-red-500 text-center flex justify-center items-center w-[20vw] transition-all duration-500 ${TopToast === "Notask" ? "z-20" : "z-10"} ${NoTask ? "transform-3d translate-x-0  visible " : "transform-3d translate-x-200 invisible "} rounded-xl py-2`}>No Completed todo!</p></div>

        </div>


        <div className={`w-full h-full fixed inset-0 backdrop-blur-xs flex justify-center items-center bg-black/70 transition-all duration-300 ${showModal ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className={`w-[30vw] h-70 bg-[#191f27] rounded-xl shadow-2xl border border-gray-400 flex flex-col justify-center items-center gap-3 transition-all duration-300 ${showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
            <div className='bg-[#ff00003e] w-15 h-15 flex items-center justify-center rounded-full border-2 border-red-400 '><HiOutlineTrash className='text-4xl text-red-500' /></div>
            <h1 className='text-4xl text-[#f9fafb] font-bold'>Delete Task?</h1>
            <h2 className='text-xl text-gray-400'>This action cannot be undone.</h2>
            <div className='w-full flex flex-row justify-evenly'>
              <button onClick={cancelDelete} className='text-[#f9fafb] text-2xl px-10 py-1 rounded-lg bg-[#283647] font-semibold'>Cancel</button>
              <button onClick={confirmDelete} className='text-[#f9fafb] text-2xl px-10 py-1 rounded-lg bg-[#ff0000] font-semibold'>Delete</button>
            </div>
          </div>
        </div>

        <div className={`w-full h-full fixed inset-0 backdrop-blur-xs flex justify-center items-center bg-black/70 transition-all duration-300 ${showModal2 ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className={`w-[30vw] h-70 bg-[#191f27] rounded-xl shadow-2xl border border-gray-400 flex flex-col justify-center items-center gap-3 transition-all duration-300 ${showModal2 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
            <div className='bg-[#ff00003e] w-15 h-15 flex items-center justify-center rounded-full border-2 border-red-400 '><HiOutlineTrash className='text-4xl text-red-500' /></div>
            <h1 className='text-4xl text-[#f9fafb] font-bold'>Delete All Task?</h1>
            <h2 className='text-xl text-gray-400'>This action cannot be undone.</h2>
            <div className='w-full flex flex-row justify-evenly'>
              <button onClick={cancelDeleteAll} className='text-[#f9fafb] text-2xl px-10 py-1 rounded-lg bg-[#283647] font-semibold'>Cancel</button>
              <button onClick={confirmDeleteAll} className='text-[#f9fafb] text-2xl px-10 py-1 rounded-lg bg-[#ff0000] font-semibold'>Delete</button>
            </div>
          </div>
        </div>

        <div className={`w-full h-full fixed inset-0 backdrop-blur-xs flex justify-center items-center bg-black/70 transition-all duration-300 ${showModal3 ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className={`w-[30vw] h-70 bg-[#191f27] rounded-xl shadow-2xl border border-gray-400 flex flex-col justify-center items-center gap-3 transition-all duration-300 ${showModal3 ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
            <h1 className='text-4xl text-[#f9fafb] font-bold'>No Task Buddy</h1>
            <h2 className='text-xl text-gray-400'>Start by adding a new task.</h2>
            <button onClick={() => setshowModal3(false)} className='text-[#f9fafb] text-2xl px-6 py-1 rounded-lg bg-[#283647] font-semibold'>OK</button>
          </div>
        </div>




      </div>
    </>
  )
}

export default App
