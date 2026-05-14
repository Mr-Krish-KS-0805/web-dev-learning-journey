import React from 'react'
import PieChartBox from '../charts/PieChartBox'

const SpendingOverview = () => {
  return (
    <>
      <div className='bg-[#1e2938] border-2 border-gray-700 flex flex-col gap-4 px-2 py-5 rounded-xl text-lg h-full'>
        <div className='flex flex-row justify-between items-center'>
          <h1 className='text-[#ffffff]'>Spending Overview</h1>
          <h2 className='text-[#e2e8f0] border border-gray-700'>This Month ▼</h2>
        </div>

        <div className='flex justify-between items-center'>
          <div className='w-46  h-46'>
            <PieChartBox />
          </div>
          <div className='flex flex-col gap-3 text-[#e2e8f0] xl:text-lg'>
            <p>🔴 food 40% ₹5,800</p>
            <p>🔴 food 40% ₹5,800</p>
            <p>🔴 food 40% ₹5,800</p>
            <p>🔴 food 40% ₹5,800</p>
            <p>🔴 food 40% ₹5,800</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SpendingOverview

