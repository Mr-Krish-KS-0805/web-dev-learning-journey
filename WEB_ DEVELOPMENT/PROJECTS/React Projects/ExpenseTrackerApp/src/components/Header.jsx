import React, { useState } from 'react'
import { BiCalendar, BiCamera, BiCrown, BiLeftArrowAlt, BiLogOut } from 'react-icons/bi';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FiBell, FiHelpCircle } from 'react-icons/fi'
import { MdAccountCircle, MdEmail } from 'react-icons/md'
import { GiArcheryTarget } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';
import { BsClock, BsPersonCheck, BsPersonCircle } from 'react-icons/bs';
import { FaCrown } from 'react-icons/fa';

const Header = ({ UserData, formatedate }) => {
    const [OpenProfile, setOpenProfile] = useState(false)
    const [activeTab, setactiveTab] = useState(null)

    const handleLogout = async () => {
        try {
            await signOut(auth)
            toast.success("Logout Successful")
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className='w-full flex justify-between py-5'>
            <div>
                <h1 className='text-white text-2xl font-bold'>Good morning, {UserData?.name}! 🖐️</h1>
                <h2 className='text-gray-400 text-sm'>Here's what's happening with your finances today</h2>
            </div>

            <div className='flex flex-row justify-center items-center gap-5'>

                <div className='relative'><span className='absolute text-[10px] top-0 right-0'>🔴</span><FiBell className='text-3xl text-gray-400' /></div>

                <div>
                    <img onClick={() => { setOpenProfile(!OpenProfile) }} src="profile.jpg" alt="" className='w-10 h-10 rounded-full cursor-pointer' />

                    <div className={`bottom-0 left-0 inset-0 z-50 transition-all duration-400 relative ${OpenProfile ? "opacity-100 visible" : "opacity-0 invisible"} `} >

                        <div className='absolute  w-100 h-90 bg-[#1e2938] p-4 rounded-xl right-2 top-2 border border-gray-400 overflow-hidden '>

                            <div className={`flex flex-col gap-3 transition-all duration-500`}>

                                <div className='flex flex-row gap-4 bg-blue-900 justify-center items-center rounded-xl py-2'>
                                    <img src="profile.jpg" alt="" className='w-12 h-12 rounded-full border border-gray-400 ' />
                                    <div>
                                        <p className='text-white text-lg'>{UserData?.name}</p>
                                        <p className='text-gray-400 text-md'>{UserData?.email}</p>
                                        {/* <p>Premium</p> */}
                                    </div>
                                </div>

                                <div onClick={() => setactiveTab("profile")} className='flex flex-row gap-3 items-center hover:bg-black rounded-full py-2 px-3 transition-all duration-500 cursor-pointer'>
                                    <MdAccountCircle className='text-gray-300 text-4xl' />
                                    <div>
                                        <p className='text-white text-sm'>My Profile</p>
                                        <p className='text-gray-400 text-xs'>View and edit Your profile</p>
                                    </div>
                                </div>

                                <div onClick={() => setactiveTab("budget")} className='flex flex-row gap-3 items-center hover:bg-black rounded-full py-2 px-3 transition-all duration-500 cursor-pointer'>
                                    <FaCrown className='text-gray-300 text-4xl' />
                                    <div>
                                        <p className='text-white text-sm'>Premium</p>
                                        <p className='text-gray-400 text-xs'>Upgrade to premium</p>
                                    </div>
                                </div>

                                <div onClick={() => setactiveTab("support")} className='flex flex-row gap-3 items-center hover:bg-black rounded-full py-2 px-3 transition-all duration-500 cursor-pointer'>
                                    <FiHelpCircle className='text-gray-300 text-4xl' />
                                    <div>
                                        <p className='text-white text-sm'>Help and Support</p>
                                        <p className='text-gray-400 text-xs'>Get help and support</p>
                                    </div>
                                </div>
                                <div onClick={handleLogout} className='flex flex-row gap-4 bg-red-950 hover:bg-black/50 transition-all duration-300 justify-center items-center rounded-xl py-2 cursor-pointer'>
                                    <BiLogOut className='text-red-700 text-3xl' />
                                    <div>
                                        <p className='text-red-500 text-sm'>Logout</p>
                                        <p className='text-gray-400 text-xs'>Sign out from your account</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`absolute bg-[#1e2938]  w-100 h-90 rounded-xl right-0 p-4 top-0 flex flex-col gap- transition-all duration-500 ${activeTab === "profile" ? "translate-x-0 opacity-100" : "translate-x-100 "}`}>

                                <div className='flex flex-row justify-between'>
                                    <BiLeftArrowAlt onClick={() => setactiveTab(null)} className='text-3xl text-white' />
                                    <div>
                                        <div className='flex flex-col items-center relative'>
                                            <img src="profile.jpg" alt="" className='w-10 h-10 rounded-full' />
                                            <div className=' bg-black/60 w-full h-full rounded-full absolute flex justify-center items-center'>
                                                <BiCamera className='text-purple-800 text-xl' />
                                            </div>
                                        </div>
                                    </div>
                                    <CgClose onClick={() => setactiveTab(null)} className='text-2xl  text-white' />
                                </div>


                                <div className='flex flex-col gap-3 p-3'>
                                    <div className='flex flex-row justify-between items-center bg-black p-2 rounded-full border border-gray-600'>
                                        <div className='flex flex-row items-center gap-2'>
                                            <MdAccountCircle className='text-white text-xl' />
                                            <h1 className='text-gray-400'>Full Name</h1>
                                        </div>
                                        <input placeholder={UserData?.name} className='text-white text-center placeholder:text-white outline-0 ' readOnly type="text" />
                                    </div>

                                    <div className='flex flex-row justify-between items-center bg-black p-2 rounded-full border border-gray-600'>
                                        <div className='flex flex-row items-center gap-2'>
                                            <MdEmail className='text-white text-xl' />
                                            <h1 className='text-gray-400'>Email</h1>
                                        </div>
                                        <input placeholder={UserData?.email} className='w-55 text-white text-sm text-center placeholder:text-white outline-0 ' readOnly type="email" />
                                    </div>

                                    <div className='flex flex-row justify-between items-center bg-black p-2 rounded-full border border-gray-600'>
                                        <div className='flex flex-row items-center gap-2'>
                                            <BiCalendar className='text-white text-xl' />
                                            <h1 className='text-gray-400'>Date of Birth</h1>
                                        </div>
                                        <input className='text-white text-center z-50 placeholder:text-white ' type="date" />
                                    </div>

                                    <div className='flex flex-row justify-between items-center bg-black p-2 rounded-full border border-gray-600'>
                                        <div className='flex flex-row items-center gap-2'>
                                            <BsPersonCheck className='text-white text-xl' />
                                            <h1 className='text-gray-400'>Gender</h1>
                                        </div>
                                        <input placeholder="Male" className='text-white text-center placeholder:text-white outline-0 ' type="text" />
                                    </div>

                                    <div className='flex flex-row justify-between items-center bg-red-950 p-2 rounded-full border border-gray-600'>
                                        <div className='flex flex-row items-center gap-2'>
                                            <BsClock className='text-white text-xl' />
                                            <h1 className='text-gray-400'>Joined on</h1>
                                        </div>
                                        <input placeholder={formatedate(UserData?.createdAt?.toDate())} className='text-white text-center placeholder:text-white outline-0 ' readOnly type="text" />
                                    </div>


                                </div>

                            </div>

                            <div className={`absolute bg-[#1e2938]  w-100 h-90 rounded-xl right-0 p-4 top-0 flex flex-col gap-3 transition-all duration-500 ${activeTab === "budget" ? "translate-x-0 opacity-100" : "translate-x-100 "}`}>
                                <div className='flex flex-row justify-between items-center'>
                                    <BiLeftArrowAlt onClick={() => setactiveTab(null)} className='text-3xl text-white' />
                                    <h1 className='text-white text-xl'>Premium</h1>
                                    <CgClose onClick={() => setactiveTab(null)} className='text-2xl  text-white' />
                                </div>
                            </div>

                            <div className={`absolute bg-[#1e2938]  w-100 h-90 rounded-xl right-0 p-4 top-0 flex flex-col gap-3 transition-all duration-500 ${activeTab === "support" ? "translate-x-0 opacity-100" : "translate-x-100 "}`}>
                                <div className='flex flex-row justify-between items-center'>
                                    <BiLeftArrowAlt onClick={() => setactiveTab(null)} className='text-3xl text-white' />
                                    <h1 className='text-white text-xl'>Help and Support</h1>
                                    <CgClose onClick={() => setactiveTab(null)} className='text-2xl  text-white' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
