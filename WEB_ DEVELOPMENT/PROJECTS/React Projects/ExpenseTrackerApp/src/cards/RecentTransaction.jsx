import React from 'react'
import { CgShoppingBag } from 'react-icons/cg';
import { FiFilm, FiZap } from 'react-icons/fi';
import { LuCar, LuUtensilsCrossed } from 'react-icons/lu';

const RecentTransaction = ({ expenses, displayAmount }) => {

  const formatedate = (date) => {
    return new Date(date).toLocaleDateString("en-Us", {
      month: "short",
      day: 'numeric',
    })
  }

  const Recent = expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  return (
    <div className='bg-[#1e2938]  flex flex-col gap-4 px-3 py-5 border-2 border-gray-700 rounded-xl'>
      <div className='flex justify-between items-center text-white'>
        <h1 className='text-lg'>Recent Transaction</h1>
        <div className='text-sm text-[#7c3aed]'>View all </div>
      </div>
      {Recent.map((item) => (

        <div key={item.id}>
          <div className='flex justify-between   items-center'>
            <div className='flex flex-row gap-3 items-center'>
              <div className='bg-[#7c3aed] w-10 h-10 rounded-full flex justify-center items-center'>
                <div className='text-white text-2xl'>
                  {item.category === "Food" ? (<LuUtensilsCrossed />) : item.category === "Shopping" ? <CgShoppingBag /> : item.category === "Transport" ? <LuCar /> : item.category === "Entertainment" ? <FiFilm /> : item.category === "Bills & Utilities" ? <FiZap /> : null}
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-white'>{item.title}</p>
                <p className='text-gray-400 text-sm'>{item.category}</p>
              </div>
            </div>
            <div className='flex flex-col items-end'>
              <p className='text-red-700 text-lg'>-{displayAmount(item.amount)}</p>
              <p className='text-gray-400 text-sm'>{formatedate(item.date)}</p>
            </div>
          </div>
        </div>
      ))}

      <button className='bg-[#334155] text-[#7c3aed] text-lg py-1 rounded-lg'>View All Transaction</button>

    </div>
  )
}

export default RecentTransaction
