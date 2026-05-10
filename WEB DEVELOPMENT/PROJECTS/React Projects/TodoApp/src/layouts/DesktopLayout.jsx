import React from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { IoLayers } from "react-icons/io5";
import { LuBadgeCheck } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlineX } from "react-icons/hi"

const DesktopLayout = ({ filter, setinputDate, inputDate, setfilter, setpriority, priority, getActiveClass, getpriority, search, setsearch, setshowSearch, showSearch, todos, completedTodo, pendingTodo, handleKeyDown, handleChange, input, addTodo, clearCompleted, handleDeleteClick2, list, highlightText, toggleComplete, handleEdit, handleDeleteClick, TopToast, setToastMessage, ToastType, ToastMessage, ModalTypes, setModalTypes, cancelDelete, confirmDelete, cancelDeleteAll, confirmDeleteAll }) => {
    return (
        <>
            <div className="min-h-screen min-w-screen bg-[#0b1220] flex flex-row gap-3 relative overflow-hidden">

                <div className='sidebar min-h-screen w-[20vw] bg-[#1f2937] items-center flex flex-col py-3 px-1 gap-6 relative pt-6'>
                    <h1 className='w-full text-center text-3xl font-bold text-[#f9fafb]'>Todo App</h1>

                    <div className='text-[#f9fafb] text-xl w-[99%] flex flex-col gap-5'>
                        <div onClick={() => setfilter("all")} className={`${getActiveClass("all")} font-semibold rounded-xl py-3 px-2 cursor-pointer flex flex-col justify-center relative`}>📋All <button onClick={handleDeleteClick2} className='flex flex-row justify-center items-center gap-2  rounded-full border border-gray-500  bg-[#273449]  lg:p-1 xl:p-3 sm:hidden lg:block font-semibold text-red-700 absolute xl:right-3 lg:right-0'><HiOutlineTrash className='text-red-700 text-xl' /></button> </div>
                        <div onClick={() => setfilter("completed")} className={`${getActiveClass("completed")} font-semibold rounded-xl py-3 pl-2 cursor-pointer flex flex-col justify-center relative`}>✅Completed <button onClick={clearCompleted} className='flex flex-row justify-center items-center gap-2 rounded-full border border-gray-500 bg-[#273449] xl:p-3 sm:hidden lg:block lg:p-1 font-semibold text-green-700 absolute xl:right-3 lg:right-0 '><HiOutlineTrash className='text-green-700 text-xl' /></button> </div>
                        <div onClick={() => setfilter("pending")} className={`${getActiveClass("pending")} font-semibold rounded-xl py-3 px-2 cursor-pointer`}>⏰Pending</div>

                    </div>

                    <div className='absolute bottom-3'>
                        <h1 className=' text-[#f9fafb]'>Krish</h1>
                        <h3 className='text-gray-400 text-sm'>Stay Productive 🎉</h3>
                    </div>

                </div>

                <div className=" main h-screen w-[80vw] bg-[#1e293b] flex flex-col items-center">

                    <div className='flex flex-row w-full justify-between pt-6 px-6 text-[#f9fafb] text-3xl font-bold'>
                        <div className='flex flex-col gap-1'>
                            <h1>Dashboard 🖐️</h1>
                            <p className='text-gray-400 text-sm font-medium'>What's up Krish</p>
                        </div>

                        <div className='flex flex-row gap-3 relative'>
                            <input value={search} onChange={(e) => setsearch(e.target.value)} type="text" className={`w-0 h-10 bg-[#273449] py-4 px-4 text-xl rounded-md outline-0 border border-gray-500 text-[#f9fafb] placeholder:text-gray-400 transition-all duration-500 ${showSearch ? " w-[30vw] visible" : "translate-x-0 invisible"}}`} />
                            <div onClick={() => setshowSearch(!showSearch)} className='w-10 h-10 z-20 bg-slate-900 flex items-center justify-center rounded-md absolute right-13'><HiOutlineSearch className={`text-xl transition-all  ${showSearch ? "invisible rotate-90 duration-10" : "duration-600 rotate-0 visible"}`} /><HiOutlineX className={`text-xl absolute transition-all  ${showSearch ? "duration-400 rotate-90 visible" : "duration-10 rotate-0 invisible"}`} /></div>
                            <div className='w-10 h-10 bg-slate-900 flex items-center justify-center rounded-md'><HiOutlineBell className='text-xl' /></div>
                        </div>

                    </div>

                    <div className='py-3 flex flex-row w-full justify-between px-5 gap-5'>

                        <div className='flex flex-row justify-evenly items-center w-[35%] py-7 px-3 bg-linear-to-br from-[#000000] to-[#530093] rounded-xl hover:scale-105 transition-all duration-500 origin-center will-change-transform '>
                            <div className='bg-purple-600 w-15 h-15 flex items-center justify-center rounded-full'><IoLayers className='text-3xl text-white' /></div>
                            <div>
                                <h1 className='text-[#f9fafb] text-xl font-semibold'>All Tasks</h1>
                                <h2 className='text-[#f9fafb] text-3xl'>{todos.length}</h2>
                            </div>
                        </div>

                        <div className='flex flex-row justify-evenly items-center w-[35%]  py-7 px-3 bg-linear-to-br from-[#000000] to-[#0e8303]  rounded-xl hover:scale-105 transition-all duration-500 origin-center will-change-transform '>
                            <div className='bg-green-500 w-15 h-15 flex items-center justify-center rounded-full'><LuBadgeCheck className='text-3xl text-white' /></div>
                            <div>
                                <h1 className='text-[#f9fafb] text-xl font-semibold'>Completed</h1>
                                <h2 className='text-[#f9fafb] text-3xl'>{completedTodo.length}</h2>
                            </div>
                        </div>

                        <div className='flex flex-row justify-evenly items-center w-[35%] py-7 px-3 bg-linear-to-br from-[#000000] to-[#cf8e00] rounded-xl hover:scale-105 transition-all duration-500 origin-center will-change-transform '>
                            <div className='bg-orange-300 w-15 h-15 flex items-center justify-center rounded-full'><FaRegClock className='text-3xl text-white' /></div>
                            <div>
                                <h1 className='text-[#f9fafb] text-xl font-semibold'>Pending</h1>
                                <h2 className='text-[#f9fafb] text-3xl'>{pendingTodo.length}</h2>
                            </div>
                        </div>

                    </div>

                    <div className=' w-full px-5 flex justify-between items-center gap-5 '>
                        <select onChange={(e) => setpriority(e.target.value)} className='hidden xl:block text-red-500 bg-gray-900 text-sm '>
                            <option className='text-sm text-red-500' value="high">High</option>
                            <option className='text-sm text-amber-400' value="medium">Medium</option>
                            <option className='text-sm text-green-300' value="low">Low</option>
                        </select>
                        <input autoFocus onKeyDown={handleKeyDown} onChange={handleChange} value={input} type="text" placeholder='Add a new task...' className='bg-[#273449] w-[90%]  py-3 px-5 text-xl rounded-xl outline-0 border border-gray-500 text-[#f9fafb] placeholder:text-gray-400' />
                        <input type="date" className='bg-white px-2 font-bold hidden xl:block' value={inputDate} onChange={(e) => setinputDate(e.target.value)} />
                        <button onClick={addTodo} className='w-25 py-4 text-[#f9fafb] font-bold text-xl bg-linear-to-tr from-[#000000] to-[#7415bd] rounded-xl active:text-amber-500 '>Add</button>
                    </div>
                    <div className='flex flex-row justify-center items-center w-full  py-1'>
                        <h1 className='py-3 text-[#f9fafb] text-3xl font-semiboldbold'>Your Tasks</h1>
                    </div>

                    <div className='taskContainerDesktop w-full px-5 flex flex-col gap-3'>

                        {list.length === 0 ? (<p className='text-3xl flex justify-center text-white mt-10 text-center opacity-80'>{filter === "all" ? "No todos ! 😊 Start by adding a new task " : filter === "completed" ? "No completed todos" : "No pending todos"}</p>
                        ) : (list.map((t) => (
                            <div key={t.id} className={`flex flex-row justify-between items-center py-2.5 px-5 bg-[#273449] outline-0 border border-gray-500 rounded-xl hover:transform-3d hover:translate-x-3 transition-all duration-300 origin-center will-change-transform ${getpriority(t.priority)}`}>

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
                    <div className='text-xl text-white absolute bottom-5 flex justify-center items-center'><p className={`bg-red-500 text-center flex justify-center items-center w-[20vw] transition-all duration-500 ${TopToast === "empty" ? "z-20" : "z-0"} ${ToastType == "error" ? "transform-3d translate-x-0  visible " : ToastType === "warning" ? "transform-3d translate-x-0" : ToastType === "!completed" ? "transform-3d translate-x-0" : "transform-3d translate-x-200 invisible"} rounded-xl py-2 `}>{ToastMessage}</p></div>
                    {/* <div className='text-xl text-white absolute bottom-5 flex justify-center items-center'><p className={`bg-red-500 text-center flex justify-center items-center w-[20vw] transition-all duration-500 ${TopToast === "exist" ? "z-20" : "z-0"} ${TodoExist ? "transform-3d translate-x-0  visible " : "transform-3d translate-x-200 invisible "} rounded-xl py-2`}>Todo exist!</p></div> */}
                    {/* <div className='text-xl text-white absolute bottom-5 flex justify-center items-center'><p className={`bg-red-500 text-center flex justify-center items-center w-[20vw] transition-all duration-500 ${TopToast === "Notask" ? "z-20" : "z-0"} ${NoTask ? "transform-3d translate-x-0  visible " : "transform-3d translate-x-200 invisible "} rounded-xl py-2`}>No Completed todo!</p></div> */}

                </div>


                <div className={`w-full h-full fixed inset-0 backdrop-blur-xs flex justify-center items-center bg-black/70 transition-all duration-300 ${ModalTypes === "delete" ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    <div className={`w-fit px-20 h-80 bg-[#191f27] rounded-xl shadow-2xl border border-gray-400 flex flex-col justify-center items-center gap-3 transition-all duration-300 ${ModalTypes === "delete" ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <div className='bg-[#ff00003e] w-15 h-15 flex items-center justify-center rounded-full border-2 border-red-400 '><HiOutlineTrash className='text-4xl text-red-500' /></div>
                        <h1 className='text-4xl text-[#f9fafb] font-bold'>Delete Task?</h1>
                        <h2 className='text-xl text-gray-400'>This action cannot be undone.</h2>
                        <div className='w-full flex flex-row justify-evenly'>
                            <button onClick={cancelDelete} className='text-[#f9fafb] text-2xl px-5 py-1 rounded-lg bg-[#283647] font-semibold'>Cancel</button>
                            <button onClick={confirmDelete} className='text-[#f9fafb] text-2xl px-5 py-1 rounded-lg bg-[#ff0000] font-semibold'>Delete</button>
                        </div>
                    </div>
                </div>

                <div className={`w-full h-full fixed inset-0 backdrop-blur-xs flex justify-center items-center bg-black/70 transition-all duration-300 ${ModalTypes === "deleteAll" ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    <div className={`w-fit px-20 h-80 bg-[#191f27] rounded-xl shadow-2xl border border-gray-400 flex flex-col justify-center items-center gap-3 transition-all duration-300 ${ModalTypes === "deleteAll" ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <div className='bg-[#ff00003e] w-15 h-15 flex items-center justify-center rounded-full border-2 border-red-400 '><HiOutlineTrash className='text-4xl text-red-500' /></div>
                        <h1 className='text-4xl text-[#f9fafb] font-bold'>Delete All Task?</h1>
                        <h2 className='text-xl text-gray-400'>This action cannot be undone.</h2>
                        <div className='w-full flex flex-row justify-evenly gap-5'>
                            <button onClick={cancelDeleteAll} className='text-[#f9fafb] text-2xl px-5 py-1 rounded-lg bg-[#283647] font-semibold'>Cancel</button>
                            <button onClick={confirmDeleteAll} className='text-[#f9fafb] text-2xl px-5 py-1 rounded-lg bg-[#ff0000] font-semibold'>Delete</button>
                        </div>
                    </div>
                </div>

                <div className={`w-full h-full fixed inset-0 backdrop-blur-xs flex justify-center items-center bg-black/70 transition-all duration-300 ${ModalTypes === "empty" ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    <div className={`w-fit px-20 h-80 bg-[#191f27] rounded-xl shadow-2xl border border-gray-400 flex flex-col justify-center items-center gap-3 transition-all duration-300 ${ModalTypes === "empty" ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <h1 className='text-4xl text-[#f9fafb] font-bold'>No Task Buddy</h1>
                        <h2 className='text-xl text-gray-400'>Start by adding a new task.</h2>
                        <button onClick={() => setModalTypes("")} className='text-[#f9fafb] text-2xl px-6 py-1 rounded-lg bg-[#283647] font-semibold'>OK</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DesktopLayout
