import React from 'react'

const TodoInput = (props) => {
    const { handleChange, addTodo, show, input, handleKeyDown } = props;
    return (

        <>
            {
                show && (
                    <div className='InputArea w-80 flex ml-1 mt-1 flex-row items-center gap-3 h-fit'>
                        <input onChange={handleChange} onKeyDown={handleKeyDown} value={input} placeholder='Your task' className={`transition-all duration-300 bg-blue-900 text-white placeholder-gray-400 focus:ring-1 focus:ring-amber-400 w-60 rounded-3xl shadow-lg px-4 text-xl outline-0 border-2 border-amber-300`}  type="text" />
                        <button onClick={addTodo} className=' cursor-pointer bg-green-500 hover:scale-105 transition text-red-500 rounded-full w-fit px-3 py-1 font-bold active:text-black'>Done</button>
                    </div>
                )
            }
            
        </>
    )
}

export default TodoInput
