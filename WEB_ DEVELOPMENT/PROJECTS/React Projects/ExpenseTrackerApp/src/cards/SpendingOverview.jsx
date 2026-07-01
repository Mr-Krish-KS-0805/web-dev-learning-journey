import React from 'react'
import PieChartBox from '../charts/PieChartBox'

const SpendingOverview = ({ expenses, getSymbol, convertAmount }) => {

  const getCategoryData = (expenses) => {
    const overview = {}

    expenses.forEach((item) => {
      if (overview[item.category]) {
        overview[item.category] += Number(convertAmount(item.amount).toFixed(2))
      } else {
        overview[item.category] = Number(convertAmount(item.amount).toFixed(2))
      }
    });

    return Object.keys(overview).map((key) => ({
      name: key,
      value: overview[key]
    }))

  }
  const data = getCategoryData(expenses)


  return (
    <>
      <div className='bg-[#1e2938] border-2 border-gray-700 flex flex-col gap-4 px-4 py-5 rounded-xl text-lg h-full'>
        <div className='flex flex-row justify-between items-center'>
          <h1 className='text-[#ffffff]'>Spending Overview</h1>
          <h2 className='text-[#e2e8f0] border border-gray-700'>This Month ▼</h2>
        </div>
        {expenses.length === 0 ?
          (
            <div className='text-gray-400 flex flex-col justify-center items-center  h-46'>
              <p>No spending data available</p>
              <p>Add expenses to see category insights</p>
            </div>
          )
          :
          <div className='flex justify-between items-center'>
          <div className='w-46  h-46'>
            <PieChartBox data={data} />
          </div>
          <div className='flex flex-col gap-3 text-[#e2e8f0] xl:text-lg'>
            {data.map((item) => (
              <p key={item.name} className='flex items-center gap-1'><span className={`w-3 h-3  rounded-full ${item.name === "Food" ? "bg-[#7c3aed]" : item.name === "Transport" ? "bg-[#2563eb]" : item.name === "Shopping" ? "bg-[#22c55e]" : item.name === "Entertainment" ? "bg-[#f97316]" : item.name === "Bills & Utilities" ? "bg-[#f59e0b]" : ""}`} ></span>{item.name} - {getSymbol()}{item.value}</p>
            ))}
          </div>
        </div>}
        
      </div>
    </>
  )
}

export default SpendingOverview

