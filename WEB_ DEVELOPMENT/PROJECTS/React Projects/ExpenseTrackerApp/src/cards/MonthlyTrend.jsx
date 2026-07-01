import React from 'react'
import LineChartBox from '../charts/LineChartBox'

const MonthlyTrend = ({ expenses, convertAmount, getSymbol }) => {
    return (
        <div className='bg-[#1e2938] border-2 border-gray-700 flex flex-col gap-4 px-4 py-5 rounded-xl h-full'>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-[#ffffff]'>Monthly Trend</h1>
                <h2 className='text-[#e2e8f0] border border-gray-700'>This Month   ▼</h2>
            </div>

            <div className='w-full h-full text-gray-400 flex justify-center items-center'>
                {expenses.length === 0 ?
                    (<div className='text-center'>
                        <p className='text-white'>No transaction history yet.</p>
                        <p>Monthly trends will appear here.</p>
                    </div>

                    )
                    : <LineChartBox expenses={expenses} convertAmount={convertAmount} getSymbol={getSymbol} />}

            </div>
        </div>
    )
}

export default MonthlyTrend
