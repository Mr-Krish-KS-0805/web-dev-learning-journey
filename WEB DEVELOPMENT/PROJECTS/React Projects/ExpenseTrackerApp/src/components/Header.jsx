import React from 'react'
import { FiBell } from 'react-icons/fi'

const Header = () => {
    return (
        <div className='w-full flex justify-between py-5'>
            <div>
                <h1 className='text-white text-2xl font-bold'>Good morning, Krish! 🖐️</h1>
                <h2 className='text-gray-400 text-sm'>Here's what's happening with your finances today</h2>
            </div>

            <div className='flex flex-row justify-center items-center gap-5'>
                <div className='border text-gray-400 border-gray-500 rounded-lg py-1 px-4 flex gap-2'>
                    <span>🗓️</span>
                    <span>May 1 -</span>
                    <span>May 31</span>
                    <span>▼</span>
                </div>
                <div className='relative'><span className='absolute text-[10px] top-0 right-0'>🔴</span><FiBell className='text-3xl text-gray-400'/></div>
                <div className='w-10 h-10 rounded-full bg-white'></div>
            </div>
        </div>
    )
}

export default Header
