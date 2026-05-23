import React from 'react'
import {
  FiSettings, FiEye, FiDownload, FiTrash2,
  FiSun, FiMoon, FiCalendar, FiUser,
  FiMail, FiGlobe, FiInfo, FiSliders
} from "react-icons/fi";
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdCurrencyRupee, MdViewCompact } from "react-icons/md";
import { useState } from "react";

const Setting = ({ expenses, setshowAmount, showAmount, theme, setTheme }) => {

  return (
    <div className='w-full'>
      <div className='grid grid-cols-2 gap-5'>

        {/* GENERAL SETTING */}
        <div className='flex flex-col border gap-5 border-gray-700 p-5'>
          <div className='flex items-center gap-3 border border-gray-400 w-fit py-1 px-3 rounded-lg'><FiSettings className='text-3xl text-purple-600' /><p className='text-white text-xl'>General</p></div>

          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FaMoneyBill1Wave className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Currency (select your preffered currency)</p>
            </div>
            <div className='text-gray-400 text-lg'>
              <button>INR</button>
              <button>USD</button>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FiEye className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Show Amount</p>
            </div>
            <div onClick={() => setshowAmount(!showAmount)} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${showAmount ? "bg-purple-400" : "bg-gray-500"}`} ><div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${showAmount ? "translate-x-6" : "translate-x-0"}`}></div></div>
          </div>

          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <MdViewCompact className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Compact Mode</p>
            </div>
            <div className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition`} ><div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition`}></div></div>
          </div>
        </div>

        {/* APPEARANCE SETTING */}
        <div className='flex flex-col border gap-3 border-gray-700 p-5'>
          <div className='flex items-center gap-3 border border-gray-400 w-fit py-1 px-3 rounded-lg'><IoColorPaletteOutline className='text-3xl text-purple-600' /><p className='text-white text-xl'>Appearance</p></div>

          <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
              <FaMoneyBill1Wave className='text-white text-2xl' />
              <p className='text-lg text-gray-400'>Theme</p>
            </div>
            <div className={` relative w-50 h-10 flex items-center rounded-full p-1 cursor-pointer border border-gray-400`}>
              <div className={`w-25 h-8 bg-purple-500 rounded-full shadow-md transform transition ${theme === "dark" ? "translate-x-23" : "translate-x-0"}`}></div>
              <div className='absolute flex justify-around w-full text-lg text-center'>
                <div onClick={() => setTheme("light")} className='text-white z-20'>light</div>
                <div onClick={() => setTheme("dark")} className='text-white z-20 pr-2'>Dark</div>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Setting
