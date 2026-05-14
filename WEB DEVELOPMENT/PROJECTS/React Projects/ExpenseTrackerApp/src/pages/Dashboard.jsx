import React from 'react'
import Header from '../components/Header'
import Stats from '../cards/Stats'
import SpendingOverview from '../cards/SpendingOverview'
import MonthlyTrend from '../cards/MonthlyTrend'
import RecentExpenses from '../cards/RecentExpenses'
import CategoryCard from '../cards/CategoryCard'
import RecentTransaction from '../cards/RecentTransaction'

const Dashboard = () => {
  return (
    <>
      <div className='w-full h-full flex flex-col'>
        <Header />
        <Stats />
        <div className='flex-1 lg:grid grid-cols-1  xl:grid-cols-[3.15fr_1fr] gap-5 h-full'>
          <div className='flex-1 grid grid-rows-[auto_1fr] gap-5 h-full'>
            <div className='grid  grid-cols-2 gap-5'>
              <SpendingOverview />
              <MonthlyTrend />
            </div >
            <RecentExpenses />
          </div>  

          <div className='w-full grid grid-rows-[1fr_2.5fr] gap-5'>
            <CategoryCard />
            <RecentTransaction />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
