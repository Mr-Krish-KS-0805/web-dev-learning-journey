import React from 'react'
import LineChartBox from '../charts/LineChartBox'

const MonthlyTrend = ({expenses}) => {
    return (
        <div className='bg-[#1e2938] border-2 border-gray-700 flex flex-col gap-4 px-4 py-5 rounded-xl h-full'>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-[#ffffff]'>Monthly Trend</h1>
                <h2 className='text-[#e2e8f0] border border-gray-700'>This Month   ▼</h2>
            </div>

            <div className='w-full h-full'>
                <LineChartBox expenses={expenses} />
            </div>
        </div>
    )
}

export default MonthlyTrend
