import React from 'react'
import { HiMenuAlt4 } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiPlusSm } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { CiMenuKebab } from "react-icons/ci";
import TodoItem from '../components/TodoItem';
import TodoInput from '../components/TodoInput';
import TodoAddButton from '../components/TodoAddButton';

const MobileLayout = (props) => {
    const { handleChange, addTodo, setshow, show, input, handleKeyDown, getActiveClass, setfilter, filter, MarkAllcomplete, clearCompleted, list, handleEdit, confirmDelete, toggleComplete, activeId, iconShow } = props;
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
                        {show === true ? <TodoInput handleChange={handleChange} addTodo={addTodo} setshow={setshow} show={show} input={input} handleKeyDown={handleKeyDown} /> : <h1 className='text-3xl text-center font-semibold text-gray-300'>What's up Krish!</h1>}

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

                                {list.length === 0 ? (<p className='text-white mt-5'> {filter === "all" ? "No todos" : filter === "Completed" ? "No completed todos" : "No pending todos"}</p>
                                ) : (list.map((t, index) => (
                                    <TodoItem key={t.id} t={t} handleEdit={handleEdit} confirmDelete={confirmDelete} toggleComplete={toggleComplete} activeId={activeId} iconShow={iconShow} />
                                )))}
                            </div>
                        </div>
                    </div>

                    <TodoAddButton setshow={setshow} show={show} />

                </div>
            </div>
        </>
    )
}

export default MobileLayout
