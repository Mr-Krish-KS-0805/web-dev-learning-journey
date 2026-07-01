import React, { useState } from 'react'
import Stats from '../cards/Stats'
import { BsChevronDown } from 'react-icons/bs'
import { BiPencil } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'
import { CgShoppingBag } from 'react-icons/cg';
import { FiFilm, FiZap } from 'react-icons/fi';
import { LuCar, LuUtensilsCrossed } from 'react-icons/lu';

const Expenses = ({ expenses, showAmount, setShowAmount, confirmDelete, exportCsv, displayAmount, getSymbol, convertAmount, notification }) => {

  const [search, setSearch] = useState("")
  const [selectCategory, setselectCategory] = useState("All")
  const [sortType, setsortType] = useState("Latest")
  const navigate = useNavigate()
  const [OpenDropdown, setOpenDropdown] = useState(null)

  const location = useLocation();
  const filter = location.state?.filter;

  const formatedate = (date) => {
    return new Date(date).toLocaleDateString("en-Us", {
      month: "short",
      day: 'numeric',
      year: 'numeric'
    })
  }

  const filterExpense = () => {
    let filtered = [...expenses]

    if (selectCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectCategory)
    }

    if (sortType === "Latest") {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else {
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    if (search.trim()) {
      filtered = filtered.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    }

    if (filter === "month") {
      const now = new Date();
      filtered = filtered.filter(item => {
        const d = new Date(item.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      })
    }
    return filtered
  }

  const List = filterExpense();

  return (
    <div>

      <Stats expenses={expenses} showAmount={showAmount} exportCsv={exportCsv} getSymbol={getSymbol} convertAmount={convertAmount} setShowAmount={setShowAmount} notification={notification} />

      <div className='w-full h-[70vh] border border-gray-700 flex flex-col'>

        <div className='text-gray-400 flex justify-between px-5 py-5'>

          <div>
            <input placeholder='Search by title' value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='text-xl border border-gray-700 outline-0 px-3 py-1 w-[25vw]' />
          </div>

          <div className='flex gap-10'>
            <div className='relative w-[12vw] flex items-center justify-between px-3 py-1 border border-gray-700'>
              <span className='text-xl'>{selectCategory}</span>
              <BsChevronDown onClick={() => setOpenDropdown(OpenDropdown === "category" ? null : "category")} />
              {OpenDropdown === "category" &&
                <div className='absolute bg-[#1e2938] top-10 right-0 transition-all duration-300 text-xl border border-gray-400'>
                  {["All", "Food", "Transport", "Shopping", "Entertainment", "Ride"].map((item) => (
                    <div onClick={() => { setselectCategory(item); setOpenDropdown(null) }} key={item} className='px-4 py-1 hover:bg-[#334155] cursor-pointer'>
                      {item}
                    </div>
                  ))}
                </div>}

            </div>

            <div className='relative w-[8vw] flex items-center justify-between px-3 py-1 border border-gray-700'>
              <span className='text-xl'>{sortType}</span>
              <BsChevronDown onClick={() => setOpenDropdown(OpenDropdown === "sort" ? null : "sort")} />
              {OpenDropdown === "sort" &&
                <div className='absolute w-fit  bg-[#1e2938] top-10 right-0 transition-all duration-300 text-xl border border-gray-400'>
                  {["Latest", "Oldest"].map((item) => (
                    <div key={item} onClick={() => { setsortType(item); setOpenDropdown(null) }} className='px-4 py-1 hover:bg-[#334155] cursor-pointer'>
                      {item}
                    </div>
                  ))}
                </div>}

            </div>
          </div>

        </div>


        <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_0.8fr] text-lg text-white py-1 px-4'>
          <span>#</span>
          <span>Title</span>
          <span className='text-center'>Category</span>
          <span className='text-center'>Amount</span>
          <span className='text-center'>Date</span>
          <span className='text-center'>Actions</span>
        </div>

        <div className='h-[60vh] overflow-y-auto overflow-x-hidden'>
          {expenses.length === 0 ? (
            <div className='flex flex-col items-center mt-20'>
              <h2 className='text-2xl font-semibold text-white'>No Expenses yet</h2>
              <p className='text-2xl font-semibold text-gray-400 mt-2'>Start tracking Your Spending</p>
            </div>
          )
            : (List.map((item, index) => (
              <div key={item.id} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_0.8fr]  text-lg text-white py-3 px-4 border-t border-gray-700'>
                <span>{index + 1}</span>
                <div className='flex justify-start items-center gap-2'>
                  <div className='bg-[#7c3aed] w-10 h-10 rounded-full flex justify-center items-center'>
                    <div className='text-white text-2xl'>
                      {item.category === "Food" ? (<LuUtensilsCrossed />) : item.category === "Shopping" ? <CgShoppingBag /> : item.category === "Transport" ? <LuCar /> : item.category === "Entertainment" ? <FiFilm /> : item.category === "Bills & Utilities" ? <FiZap /> : null}
                    </div>
                  </div>
                  <span className='text-sm text-gray-400'>{item.title}</span>
                </div>


                <div className='flex justify-center items-center'><span className='bg-[#7c3aed] rounded-full px-3 text-center'>{item.category}</span></div>
                <span className='text-red-700 font-bold text-center'>-{displayAmount(item.amount)}</span>
                <span className='text-gray-400 text-center '>{formatedate(item.date)}</span>

                <div className='flex flex-row text-3xl justify-center items-center gap-5'>
                  <BiPencil onClick={() => navigate("/add", { state: item })} />
                  <MdDeleteForever onClick={() => confirmDelete(item.id)} />
                </div>

              </div>
            )))}
        </div>
      </div>
    </div>
  )
}
export default Expenses
