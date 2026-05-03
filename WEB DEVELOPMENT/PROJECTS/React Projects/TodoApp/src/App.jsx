import { useEffect, useState } from 'react'
import './App.css'
import { HiMenuAlt4 } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiPlusSm } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { CiMenuKebab } from "react-icons/ci";

function App() {
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  })

  const [input, setinput] = useState("")
  const [show, setshow] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [editID, seteditID] = useState(null)

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
    if (editID) {
      const updated = todos.map((t) => t.id === editID ? { ...t, text: value } : t);
      setTodos(updated)
      setinput("")
      setshow(true)
      seteditID(null)
    }
    else {
      const newTodo = {
        id: Date.now(),
        text: value,
        isCompleted: false
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



  return (
    <>
      <div className='min-h-screen bg-blue-300 flex flex-col items-center overflow-hidden'>

        <div className='w-93.75 h-dvh bg-[#560591] flex flex-col border-4 items-center rounded-3xl relative'>

          <div className="navbar flex justify-center mt-8">
            <div className='w-80 text-2xl flex justify-between items-center'>
              <HiMenuAlt4 className=' text-gray-300 ' />

              <div className='flex gap-5 items-center '>
                <HiOutlineSearch className=' text-gray-300' />
                <HiOutlineBell className=' text-gray-300' />
              </div>

            </div>
          </div>



          <div className="content flex flex-col mt-8 items-center">
            <h1 className='text-3xl text-center font-semibold text-gray-300'>What's up Krish!</h1>

            <div className='w-80 flex flex-col p-2 m-8 '>
              <h1 className='text-gray-300 font-semibold text-xs '>TODAYS'S TASK</h1>


              {todos.map((t, index) => {
                return (
                  <div key={t.id} className='w-full flex flex-row'>
                    <div className="task px-2 h-13 bg-blue-900 mt-6 rounded-3xl flex flex-row justify-evenly items-center">
                      <div onClick={() => toggleComplete(t.id)} className={`w-6 h-6 rounded-full border-2 ${t.isCompleted ? "bg-green-400" : ""} border-amber-300`}></div>
                      <div className={`w-55 h-7 text-lg text-amber-400 ml-1 mb-1 overflow-hidden ${t.isCompleted ? "line-through decoration-black decoration-3" : ""}`}>{t.text}</div>
                      <CiMenuKebab onClick={() => iconShow(t.id)} className=' cursor-pointer text-3xl text-amber-400' />

                    </div>
                    {activeId === t.id && (
                      <div className='w-15 text-2xl gap-2 flex flex-col mt-5 text-black'>
                        <HiOutlineTrash className='cursor-pointer' onClick={() => handleDelete(t.id)} />
                        <HiOutlinePencilAlt onClick={() => handleEdit(t.id)} />
                      </div>
                    )
                    }
                  </div>
                )

              })}

            </div>

          </div>

          {show && (
            <div className='InputArea absolute bottom-40 w-81 h-20 flex flex-col items-center gap-5'>
              <input onChange={handleChange} value={input} placeholder='Your task' className='text-gray-300 w-80 rounded-full px-4 py-2 text-2xl outline-0 border-4 border-amber-300' type="text" />
              <button onClick={addTodo} className=' cursor-pointer bg-emerald-700 text-white rounded-full w-fit px-3 py-1 font-bold active:text-black'>Done</button>

            </div>
          )}



          <div className="bottomNavbar absolute bottom-7  w-80 flex items-center justify-center">
            <button onClick={() => setshow(!show)}> <div className="cursor-pointer add text-3xl w-15 h-15 rounded-full bg-[#ff0000] flex justify-center items-center active:text-2xl active:border-2 active:border-black "><HiPlusSm /></div></button>
          </div>



        </div>

      </div>
    </>
  )
}

export default App
