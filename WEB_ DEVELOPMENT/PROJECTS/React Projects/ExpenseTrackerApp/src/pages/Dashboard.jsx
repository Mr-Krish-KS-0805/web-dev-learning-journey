import React from 'react'
import Stats from '../cards/Stats'
import SpendingOverview from '../cards/SpendingOverview'
import MonthlyTrend from '../cards/MonthlyTrend'
import RecentExpenses from '../cards/RecentExpenses'
import CategoryCard from '../cards/CategoryCard'
import RecentTransaction from '../cards/RecentTransaction'

const Dashboard = ({ expenses, showAmount, setShowAmount, exportCsv, getSymbol, displayAmount, convertAmount, notification }) => {

  return (
    <>
      <div className='w-full h-full'>

        <Stats expenses={expenses} showAmount={showAmount} setShowAmount={setShowAmount} exportCsv={exportCsv} getSymbol={getSymbol} convertAmount={convertAmount} notification={notification} />
        <div className='flex flex-col xl:grid xl:grid-cols-[3.15fr_1fr] gap-5'>
          <div className='flex flex-col gap-5 '>
            <div className='grid grid-cols-2 gap-5'>
              <SpendingOverview expenses={expenses} getSymbol={getSymbol} convertAmount={convertAmount} />
              <MonthlyTrend expenses={expenses} convertAmount={convertAmount} getSymbol={getSymbol} />
            </div >
            <RecentExpenses expenses={expenses} displayAmount={displayAmount} />
          </div>

          <div className='w-full grid grid-cols-[1fr_1fr] lg:flex lg:flex-col gap-5 '>
            <CategoryCard expenses={expenses} convertAmount={convertAmount} getSymbol={getSymbol} />
            <RecentTransaction expenses={expenses} displayAmount={displayAmount} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
