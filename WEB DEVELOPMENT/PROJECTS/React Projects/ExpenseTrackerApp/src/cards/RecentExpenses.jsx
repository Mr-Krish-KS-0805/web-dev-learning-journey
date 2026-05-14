import React from 'react'

const RecentExpenses = () => {
  return (
    <div className='bg-[#1e2938] border-2 border-gray-700 h-[91%] overflow-auto px-5 py-3'>
      <div className='h-full xl:overflow-hidden lg:overflow-auto'>

        <div className='flex flex-row justify-between items-center text-lg '>
          <h1 className='text-white'>Recent Expenses</h1>
          <p className='text-[#7c3aed]'>View all</p>
        </div>
        <div className='flex flex-row justify-between items-center text-xs  text-[#e2e8f0] border-t border-t-gray-600 py-1 pl-15'>
          <p>Title</p>
          <p>Category</p>
          <p>Date</p>
          <p>Amount</p>
        </div>
        <div className='flex flex-row justify-between items-center text-[#e2e8f0] border-t border-t-gray-600 py-1'>
          <div className='flex justify-center items-center gap-2'>
          <div className='bg-[#7c3aed] w-8 h-8 rounded-full flex items-center justify-center'></div>
          <span className='text-sm'>Burger King</span>
          </div>
          <span className='bg-[#7c3aed] px-3 rounded-full'>Category</span>
          <span className='text-gray-400'>May 30,2026</span>
          <span className='text-red-700 font-bold'>-₹250</span>
        </div>
        
      </div>
    </div>
  )
}

export default RecentExpenses
