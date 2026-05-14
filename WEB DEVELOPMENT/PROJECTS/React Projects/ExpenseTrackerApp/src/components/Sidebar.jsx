import React from 'react'
import { MdDashboard, MdOutlineReceiptLong, MdAddCircleOutline, MdOutlineLabel, MdSettings, MdOutlineDarkMode } from 'react-icons/md'
import { FiTrendingUp, FiRepeat } from 'react-icons/fi'
import { HiOutlineWallet } from 'react-icons/hi2'
import walletImg from '../assets/wallet.png'
import crownImg from '../assets/crown.png'
const Sidebar = () => {
    return (
        <div className='h-screen flex flex-col overflow-y-auto w-55 bg-[#1e2938] border-r border-gray-500 py-2'>
            <div className='flex items-center py-4 '>
                <img src={walletImg} alt="wallet" className='w-15' />
                <div>
                    <h1 className='text-white text-2xl font-bold'>SpendWise</h1>
                    <p className='text-gray-400 font-semibold text-sm'>Expense Tracker</p>
                </div>
            </div>

            <ul className='text-[#e2e8f0] pt-2 pl-5 flex flex-col gap-5 '>
                <li className='flex items-center gap-3'><MdDashboard className='text-2xl' />Dashboard</li>
                <li className='flex items-center gap-3'><MdOutlineReceiptLong className='text-2xl' />Expenses</li>
                <li className='flex items-center gap-3'><MdAddCircleOutline className='text-2xl' />Add Expense</li>
                <li className='flex items-center gap-3'><MdOutlineLabel className='text-2xl' />Categories</li>
                <li className='flex items-center gap-3'><FiTrendingUp className='text-2xl' />Reports</li>
                <li className='flex items-center gap-3'><HiOutlineWallet className='text-2xl' />Budget</li>
                <li className='flex items-center gap-3'><FiRepeat className='text-2xl' />Recurring</li>
                <li className='flex items-center gap-3'><MdSettings className='text-2xl' />Settings</li>
            </ul>

            <div className='mt-auto flex flex-col gap-2'>

                <div className='flex flex-col items-center bg-[#334155] w-[90%] border border-gray-600 mx-3 px-3 py-4 rounded-xl '>
                    <img src={crownImg} alt="crown" className='w-10' />
                    <h1 className='text-white'>Go Premium</h1>
                    <p className='text-gray-400 mt-1 text-sm'>Unlock advance Insights</p>
                    <p className='text-gray-400 text-sm'>export data and more</p>
                    <button className='bg-[#7c3aed] text-white px-5 py-1 rounded-lg mt-3'>Upgrade now</button>
                </div>

                <div className='py-2 over'>
                    <div className='flex gap-2 w-[90%] py-4 mx-3 px-3 bg-[#1e2938] border border-gray-600 text-center items-center rounded-lg'>
                        <MdOutlineDarkMode className='text-white text-2xl' />
                        <input type="checkbox" name="" id="" />
                        <span className='text-sm text-white'>Dark Mode</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
