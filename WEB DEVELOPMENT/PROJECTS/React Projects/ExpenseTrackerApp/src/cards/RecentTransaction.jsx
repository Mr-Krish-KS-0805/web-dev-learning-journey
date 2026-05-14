import React from 'react'

const RecentTransaction = () => {
  return (
    <div className='bg-[#1e2938] h-[94.5%] flex flex-col gap-4 px-3 border-2 border-gray-700 rounded-xl'>
      <div className='flex justify-between items-center text-white'>
        <h1 className='text-lg'>Recent Transaction</h1>
        <div className='text-sm text-[#7c3aed]'>View all </div>
      </div>

      <div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-row gap-3'>
            <div className='bg-[#7c3aed] w-10 h-10 rounded-full flex items-center justify-center'></div>
            <div className='flex flex-col gap-1'>
              <p className='text-white'>Burger King</p>
              <p className='text-gray-400 text-sm'>Food & Dining</p>
            </div>
          </div>
          <div className='flex flex-col'>
            <p className='text-white text-lg'>-₹250</p>
            <p className='text-gray-400 text-sm'>May 30</p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-row gap-3'>
            <div className='bg-[#7c3aed] w-10 h-10 rounded-full flex items-center justify-center'></div>
            <div className='flex flex-col gap-1'>
              <p className='text-white'>Burger King</p>
              <p className='text-gray-400 text-sm'>Food & Dining</p>
            </div>
          </div>
          <div className='flex flex-col'>
            <p className='text-white text-lg'>-₹250</p>
            <p className='text-gray-400 text-sm'>May 30</p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-row gap-3'>
            <div className='bg-[#7c3aed] w-10 h-10 rounded-full flex items-center justify-center'></div>
            <div className='flex flex-col gap-1'>
              <p className='text-white'>Burger King</p>
              <p className='text-gray-400 text-sm'>Food & Dining</p>
            </div>
          </div>
          <div className='flex flex-col'>
            <p className='text-white text-lg'>-₹250</p>
            <p className='text-gray-400 text-sm'>May 30</p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-row gap-3'>
            <div className='bg-[#7c3aed] w-10 h-10 rounded-full flex items-center justify-center'></div>
            <div className='flex flex-col gap-1'>
              <p className='text-white'>Burger King</p>
              <p className='text-gray-400 text-sm'>Food & Dining</p>
            </div>
          </div>
          <div className='flex flex-col'>
            <p className='text-white text-lg'>-₹250</p>
            <p className='text-gray-400 text-sm'>May 30</p>
          </div>
        </div>
      </div>

      <button className='bg-[#334155] text-[#7c3aed] text-lg py-1 rounded-lg'>View All Transaction</button>

    </div>
  )
}

export default RecentTransaction
