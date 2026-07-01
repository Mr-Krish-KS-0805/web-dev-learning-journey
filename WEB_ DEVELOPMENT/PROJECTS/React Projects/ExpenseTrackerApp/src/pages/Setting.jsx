import React from 'react'
import {
  FiSettings, FiEye, FiDownload, FiTrash2,
  FiSun, FiMoon, FiCalendar, FiUser,
  FiMail, FiGlobe, FiInfo, FiDatabase, FiSliders
} from "react-icons/fi";
import { FaFileImport, FaCalendarDay, FaBell } from 'react-icons/fa6';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdCurrencyRupee, MdViewCompact } from "react-icons/md";
import { BsChevronDown } from 'react-icons/bs';
import { useState } from "react";
import Budget from './Budget';
import toast from 'react-hot-toast';

const Setting = ({ expenses, setExpenses, setshowAmount, showAmount, setNotification, notification, exportCsv, improtCsv, setCurrency, currency, budget, setBudget, confirmDeleteAll }) => {


  const [selectFWeek, setselectFWeek] = useState("Monday")
  const [selectDayFormat, setselectDayFormat] = useState("DD MM YYYY")
  const [OpenDropDown, setOpenDropDown] = useState(null)

  

  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='grid grid-cols-2 gap-5'>

        {/* GENERAL SETTING */}
        <div className='flex flex-col border gap-6 border-gray-700 p-5 bg-[#1e2938] rounded-lg'>
          <div className='flex items-center gap-3 border border-gray-400 w-fit py-1 px-3 rounded-lg'><FiSettings className='text-3xl text-purple-600' /><p className='text-white text-xl'>General</p></div>

          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FaMoneyBill1Wave className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Currency (select your preffered currency)</p>
            </div>
            <div className='text-gray-400 text-lg grid grid-cols-2 gap-2'>
              <button onClick={() => setCurrency("INR")} className={`px-3 py-1 rounded-full transition-all duration-300  ${currency === "INR" ? "bg-purple-400 text-black" : "text-gray-400 bg-slate-500"}`}>INR</button>
              <button onClick={() => setCurrency("USD")} className={`px-3 py-1 rounded-full transition-all duration-300  ${currency === "USD" ? "bg-purple-400 text-black" : "text-gray-400 bg-slate-500"}`}>USD</button>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FiEye className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Show Amount</p>
            </div>
            <div onClick={() => setshowAmount(!showAmount)} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${showAmount ? "bg-purple-400" : "bg-gray-500"}`} ><div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${showAmount ? "translate-x-6" : "translate-x-0"}`}></div></div>
          </div>

          {/* <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <BiLogOut className='text-white text-2xl' />
              <button onClick={handleLogout} className='text-lg cursor-pointer bg-slate-600 text-purple-600 px-2 border border-gray-400 rounded-md active:bg-slate-700'>Logout</button>
            </div>
          </div> */}
        </div>

        {/* APPEARANCE SETTING */}
        <div className='flex flex-col border gap-5 border-gray-700 p-5 bg-[#1e2938] rounded-lg'>

          <div className='flex items-center gap-3 border border-gray-400 w-fit py-1 px-3 rounded-lg'><FiDatabase className='text-3xl text-purple-600' /><p className='text-white text-xl'>Data & Storage</p></div>

          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FiDownload className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Download Data</p>
            </div>
            <button onClick={() => { setTimeout(() => { exportCsv() }, 2000); }} className='flex justify-center items-center px-2 py-1 gap-2 text-purple-700 active:bg-black  rounded-lg border border-purple-900'><FiDownload /><p>Download</p></button>
          </div>

          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FaFileImport className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Import Data</p>
            </div>
            <input type='file' accept=".csv" onChange={(e) => improtCsv(e.target.files[0])} className=' w-60 flex justify-center items-center px-5 py-1 gap-2 text-purple-700 active:bg-black  rounded-lg border border-purple-900' />
          </div>

          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FiTrash2 className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Clear All Data</p>
            </div>
            <button onClick={() => confirmDeleteAll()} className='flex justify-center items-center px-2 py-1 gap-2 text-red-900 active:bg-black  rounded-lg border border-red-900'><FiTrash2 /><p>Clear Data</p></button>
          </div>

        </div>

      </div>


      {/* Preferences Setting */}
      <div>
        <div className='flex flex-col border gap-5 border-gray-700 p-5 bg-[#1e2938] rounded-lg'>

          <div className='flex items-center gap-3 border border-gray-400 w-fit py-1 px-3 rounded-lg'><FiSliders className='text-3xl text-purple-600' /><p className='text-white text-xl'>Preferences</p></div>

          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FiCalendar className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Date Format</p>
            </div>
            <div className='relative flex justify-between items-center gap-5 px-2 py-1 rounded-lg text-white border border-purple-600'>
              <span>{selectDayFormat}</span>
              <BsChevronDown onClick={() => setOpenDropDown(OpenDropDown === "DayFormat" ? null : "DayFormat")} />
              {OpenDropDown === "DayFormat" &&
                <div className='absolute bg-[#1e2938] top-9 right-0 rounded-lg z-20 transition-all duration-300 text-md border border-gray-400'>
                  {["DD MM YYYY", "MM DD YYYY", "YYYY MM DD"].map((item) => (
                    <div onClick={() => { setselectDayFormat(item); setOpenDropDown(null) }} key={item} className='px-3 py-1 hover:bg-[#566174] cursor-pointer'>
                      {item}
                    </div>
                  ))}
                </div>}

            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FaCalendarDay className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>First day of week</p>
            </div>
            <input type='number' value={budget} placeholder='Set montlhy budget' onChange={(e) => setBudget(Number(e.target.value))} className='w-43 text-center py-1 px-2 rounded-lg text-white border border-purple-600 outline-0' />

          </div>

          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FaBell className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Notification</p>
            </div>
            <div onClick={() => setNotification(!notification)} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${notification ? "bg-purple-400" : "bg-gray-500"}`} ><div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${notification ? "translate-x-6" : "translate-x-0"}`}></div></div>
          </div>

        </div>
      </div>

      <div className='flex flex-col border gap-3 border-gray-700 py-2 px-5 bg-[#1e2938] rounded-lg'>
        <div className='flex gap-3 text-xl text-gray-400 items-center'><FiInfo className='text-purple-600 text-3xl' />  <p>About</p></div>
        <div className='grid grid-cols-4 text-center text-gray-300'>
          <div>
            <p>App version</p>
            <span className='text-gray-500'>v1.0.0</span>
          </div>
          <div>
            <p>Developer</p>
            <span className='text-gray-500'>Krish Kumar Shrivastav</span>
          </div>
          <div>
            <p>Email</p>
            <span className='text-gray-500'>kkshrivastav8252@gmail.com</span>
          </div>
          <div>
            <p>Website</p>
            <span className='text-purple-400'><a href="https://krishflow.vercel.app" target='_blank'>https://todo</a></span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Setting
