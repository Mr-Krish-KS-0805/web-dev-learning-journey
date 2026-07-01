import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { MdOutlineRestaurant } from 'react-icons/md'


const CategoryCard = ({ expenses,getSymbol,convertAmount}) => {

  const map = {}

  expenses.forEach(item => {
    const Category = item.category

    if (map[Category]) {
      map[Category] += Number(convertAmount(item.amount).toFixed(2))
    } else {
      map[Category] = Number(convertAmount(item.amount).toFixed(2))
    }
  });

  var max = Math.max(...Object.values(map))
  var maxCategory = max

  var TopCategory = "";

  if (expenses.length === 0) {
    max = 0
    TopCategory = "No expenses"
  } else {

    Object.entries(map).forEach(([cat, amt]) => {
      if (amt === max) {
        TopCategory = cat
      }
    });
  }

  const TotalExpending = (expenses) => {
    let total = 0;
    var percentage = "0%"
    expenses.forEach(item => {
      total += Number(convertAmount(item.amount))
      percentage = `${Math.floor((max / total) * 100)}%`
    });
    return percentage

  }
  



  return (
    <div className='bg-[#1e2938] h-[25vh] flex flex-col gap-3 px-5 justify-center  border-2 border-gray-700 rounded-xl'>
      <div className='flex justify-between items-center text-white'>
        <h1>Top Category</h1>
        <div className='text-xl'><CiMenuKebab /></div>
      </div>

      <div className='flex relative items-center'>
        <div className='bg-[#7c3aed] w-15 h-15 rounded-full flex items-center justify-center'><MdOutlineRestaurant className='text-white text-3xl ' /></div>
        <div className='pl-3'>
          <h1 className='text-lg text-gray-400'>{TopCategory}</h1>
          <p className='text-xl text-white'>{getSymbol()} {max}</p>
        </div>
        <p className='text-sm text-gray-200 absolute bottom-0 right-2 bg-[#7c3aed] px-2 rounded-full'>{TotalExpending(expenses)}</p>
      </div>
      <p className='text-center text-gray-400 text-sm'>You spent the most on food</p>

    </div>
  )
}

export default CategoryCard
