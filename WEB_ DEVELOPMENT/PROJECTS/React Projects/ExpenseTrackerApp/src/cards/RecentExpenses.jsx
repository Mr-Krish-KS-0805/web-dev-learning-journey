import React from 'react'
import { CgShoppingBag } from 'react-icons/cg';
import { FiFilm, FiZap } from 'react-icons/fi';
import { LuCar, LuUtensilsCrossed } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom'

const RecentExpenses = ({ expenses, displayAmount }) => {

  const navigate = useNavigate();

  const formatedate = (date) => {
    return new Date(date).toLocaleDateString("en-Us", {
      month: "short",
      day: 'numeric'
    })
  }

  const Recent = expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)


  return (
    <div className='bg-[#1e2938] border-2 border-gray-700  px-5 py-1 rounded-xl '>
      <div className='flex flex-row justify-between items-center text-lg  '>
        <h1 className='text-white'>Recent Expenses</h1>
        <p className='text-[#7c3aed]'>View all</p>
      </div>
      <div className='flex flex-row justify-between items-center text-xs  text-[#e2e8f0] border-t border-t-gray-600 py-1 pl-15'>
        <p>Title</p>
        <p>Category</p>
        <p>Date</p>
        <p>Amount</p>
      </div>
      <div className='h-[22.3vh] pb-2'>

        {expenses.length === 0 ?
          (
            <div className='flex flex-col justify-center items-center py-5'>
              <p className='text-white'>No recent expenses</p>
              <p className='text-gray-400'>Your latest transaction will appear here.</p>
              <button onClick={() => navigate("/add")} className='px-3 py-1 bg-purple-600 mt-2 rounded-lg text-gray-200 hover:bg-purple-900 cursor-pointer'>Add expenses</button>
            </div>
          ) :
          Recent.map((item) => (
            <div key={item.id} className='grid grid-cols-[1fr_1fr_1fr_0.6fr] gap-x-30  items-center  text-[#e2e8f0] border-t border-t-gray-600 py-2'>
              <div className='flex justify-start items-center gap-2'>
                <div className='bg-[#7c3aed] w-10 h-10 rounded-full flex justify-center items-center'>
                  <div className='text-white text-2xl'>
                    {item.category === "Food" ? (<LuUtensilsCrossed />) : item.category === "Shopping" ? <CgShoppingBag /> : item.category === "Transport" ? <LuCar /> : item.category === "Entertainment" ? <FiFilm /> : item.category === "Bills & Utilities" ? <FiZap /> : null}
                  </div>
                </div>
                <span className='text-md'>{item.title}</span>
              </div>
              <div className='flex justify-center '>
                <span className='bg-[#7c3aed] text-md rounded-full px-3'>{item.category}</span>
              </div>
              <div className='flex justify-center '>
                <span className='text-gray-400 text-md'>{formatedate(item.date)}</span>
              </div>
              <span className='text-red-700 font-bold text-end text-md'>-{displayAmount(item.amount)}</span>
            </div>
          ))
        }


      </div>
    </div>
  )
}

export default RecentExpenses
