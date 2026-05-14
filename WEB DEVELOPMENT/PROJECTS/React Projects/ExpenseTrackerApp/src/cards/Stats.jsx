import React from 'react'
import { IoWalletOutline } from 'react-icons/io5'
import { CiMenuKebab } from 'react-icons/ci';
const Stats = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 pb-5'>
            <div className='relative py-1 px-4 flex gap-3 items-center rounded-lg border-2 border-gray-700 bg-[#1e2938]'>
                <div className='bg-[#7c3aed] w-15 h-15 rounded-full flex items-center justify-center'><IoWalletOutline className='text-white text-3xl ' /></div>
                <div className='flex flex-col'>
                    <span className='text-1rem text-gray-400'>Total Spending</span>
                    <span className='text-white text-2xl font-bold'>₹14,520</span>
                    <span className='text-green-600'>↑ 12.5% <span className='text-gray-400'>vs Apr</span></span>
                </div>
                <div className='absolute top-2 right-2 text-white text-xl'><CiMenuKebab /></div>
            </div>
            <div className='relative py-1 px-4 flex gap-3 items-center rounded-lg border-2 border-gray-700 bg-[#1e2938]'>
                <div className='bg-[#108981] w-15 h-15 rounded-full flex items-center justify-center'><IoWalletOutline className='text-white text-3xl ' /></div>
                <div className='flex flex-col'>
                    <span className='text-1rem text-gray-400'>This Month</span>
                    <span className='text-white text-2xl font-bold'>₹14,520</span>
                    <span className='text-green-600 '>↑ 12.5% <span className='text-gray-400'>vs Apr</span></span>
                </div>
                <div className='absolute top-2 right-2 text-white text-xl'><CiMenuKebab /></div>
            </div>
            <div className='relative py-1 px-4 flex gap-3 items-center rounded-lg border-2 border-gray-700 bg-[#1e2938]'>
                <div className='bg-[#f59e08] w-15 h-15 rounded-full flex items-center justify-center'><IoWalletOutline className='text-white text-3xl ' /></div>
                <div className='flex flex-col'>
                    <span className='text-1rem text-gray-400'>Total Transactions</span>
                    <span className='text-white text-2xl font-bold'>42</span>
                    <span className='text-green-600'>↑ 8.3% <span className='text-gray-400'>vs Apr</span></span>
                </div>
                <div className='absolute top-2 right-2 text-white text-xl'><CiMenuKebab /></div>
            </div>
            <div className='relative py-1 px-4 flex gap-3 items-center rounded-lg border-2 border-gray-700 bg-[#1e2938]'>
                <div className='bg-[#06b6d4] w-15 h-15 rounded-full flex items-center justify-center'><IoWalletOutline className='text-white text-3xl ' /></div>
                <div className='flex flex-col'>
                    <span className='text-1rem text-gray-400'>Average Daily</span>
                    <span className='text-white text-2xl font-bold'>₹468</span>
                    <span className='text-green-600'>↑ 10.2% <span className='text-gray-400'>vs Apr</span></span>
                </div>
                <div className='absolute top-2 right-2 text-white text-xl'><CiMenuKebab /></div>
            </div>
        </div>
    )
}

export default Stats
