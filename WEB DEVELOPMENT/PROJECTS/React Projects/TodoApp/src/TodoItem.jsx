import React from 'react'
import { CiMenuKebab } from 'react-icons/ci';
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi"

const TodoItem = (props) => {
    const { t, handleDelete, handleEdit, toggleComplete, activeId, iconShow, isCompleted  } = props;
    console.log(t)
    return (
        <>
            <div className='w-full flex flex-row '>
                <div className="task px-2 h-13 bg-blue-900 mt-5 rounded-3xl flex flex-row justify-evenly items-center shadow-xs  hover:shadow-xs hover:shadow-amber-300 transition duration-300">
                    <div onClick={() => toggleComplete(t.id)} className={`w-6 h-6 rounded-full border-2 ${t.isCompleted ? "bg-green-400" : ""} border-amber-300 cursor-pointer`}></div>
                    <div className={`w-55 h-7 text-lg text-amber-400 ml-1 mb-1 overflow-hidden ${t.isCompleted ? "line-through decoration-black decoration-3" : ""}`}>{t.text}</div>
                    <CiMenuKebab onClick={() => iconShow(t.id)} className=' cursor-pointer text-3xl text-amber-400' />

                </div>
                {activeId === t.id && (
                    <div className='w-15 text-2xl gap-2 flex flex-col mt-4 text-black'>
                        <HiOutlineTrash className='cursor-pointer' onClick={() => handleDelete(t.id)} />
                        <HiOutlinePencilAlt className='cursor-pointer' onClick={() => handleEdit(t.id)} />
                    </div>
                )
                }
            </div>
        </>
    )
}

export default TodoItem
