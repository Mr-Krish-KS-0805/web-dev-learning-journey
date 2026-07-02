import React, { useState, useEffect } from 'react'
import { BiCalendar, BiCamera, BiCheckShield, BiCrown, BiEdit, BiLeftArrowAlt, BiLogOut, BiPhone, BiSave } from 'react-icons/bi';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FiBell, FiHelpCircle } from 'react-icons/fi'
import { MdAccountCircle, MdEmail } from 'react-icons/md'
import { CgClose } from 'react-icons/cg';
import { BsClock, BsPersonCheck, BsPersonCircle } from 'react-icons/bs';
import { FaCrown } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

const Header = ({ UserData, formatedate, name, DOB, email, phone, setName, setDOB, setEmail, setPhone }) => {
    const [OpenProfile, setOpenProfile] = useState(false)
    const [activeTab, setactiveTab] = useState(null)
    const [editName, setEditName] = useState(false)
    const [editDOB, setEditDOB] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPhone, setEditphone] = useState(false)

    useEffect(() => {
        if (UserData?.DOB || UserData?.name || UserData?.email || UserData?.phone) {
            setName(UserData.name)
            setDOB(UserData.DOB)
            setEmail(UserData.email)
            setPhone(UserData.phone)
        }
    }, [UserData])


    const handleLogout = async () => {
        try {
            await signOut(auth)
            toast.success("Logout Successful")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const updateName = async () => {

        try {
            const userRef = doc(db, "users", UserData.uid);

            await updateDoc(userRef, {
                name: name,
            })
            toast.success("Name Changed")
        } catch (error) {
            toast.error(error.message)
        }

        setEditName(false);
    }

    const updateEmail = async () => {

        try {
            const userRef = doc(db, "users", UserData.uid);

            await updateDoc(userRef, {
                email: email,
            })
            toast.success("Email changed")
        } catch (error) {
            toast.error(error.message)
        }

        setEditEmail(false);
    }

    const updateDOB = async () => {

        try {
            const userRef = doc(db, "users", UserData.uid);

            await updateDoc(userRef, {
                DOB: DOB,
            })
            toast.success("Date of Birth Changed")
        } catch (error) {
            toast.error(error.message)
        }

        setEditDOB(false);
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


                    {/* PROFILE */}
                    <div className={`bottom-0 left-0 inset-0 z-50 transition-all duration-400 relative ${OpenProfile ? "opacity-100 visible" : "opacity-0 invisible"} `} >

                        <div className='absolute  w-120 h-150 bg-[#1e2938] p-4 rounded-xl right-2 top-2 border border-gray-400 overflow-hidden '>

                            <div className={`flex flex-col w-full h-full justify-between gap-3 transition-all duration-500`}>

                                <div className='flex flex-col gap-3'>

                                    <div className='flex flex-row gap-4 bg-blue-900 justify-center items-center rounded-xl py-4'>
                                        <img src="profile.jpg" alt="" className='w-12 h-12 rounded-full border border-gray-400 ' />
                                        <div>
                                            <p className='text-white text-lg'>{UserData?.name}</p>
                                            <p className='text-gray-400 text-md'>{UserData?.email}</p>
                                            {/* <p>Premium</p> */}
                                        </div>
                                    </div>

                                    <div onClick={() => setactiveTab("profile")} className='flex flex-row gap-3 items-center hover:bg-black rounded-full p-3 transition-all duration-500 cursor-pointer'>
                                        <MdAccountCircle className='text-gray-300 text-4xl' />
                                        <div>
                                            <p className='text-white text-sm'>My Profile</p>
                                            <p className='text-gray-400 text-xs'>View and edit Your profile</p>
                                        </div>
                                    </div>

                                    <div onClick={() => setactiveTab("budget")} className='flex flex-row gap-3 items-center hover:bg-black rounded-full p-3 transition-all duration-500 cursor-pointer'>
                                        <FaCrown className='text-gray-300 text-4xl' />
                                        <div>
                                            <p className='text-white text-sm'>Premium</p>
                                            <p className='text-gray-400 text-xs'>Upgrade to premium</p>
                                        </div>
                                    </div>

                                    <div onClick={() => setactiveTab("support")} className='flex flex-row gap-3 items-center hover:bg-black rounded-full p-3 transition-all duration-500 cursor-pointer'>
                                        <FiHelpCircle className='text-gray-300 text-4xl' />
                                        <div>
                                            <p className='text-white text-sm'>Help and Support</p>
                                            <p className='text-gray-400 text-xs'>Get help and support</p>
                                        </div>
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

                            <div className={`absolute bg-[#1e2938] w-120 h-150 rounded-xl border-l border-gray-400 right-0 p-4 top-0 flex flex-col gap- transition-all duration-500 ${activeTab === "profile" ? "translate-x-0 opacity-100" : "translate-x-120 "}`}>

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
                                    <CgClose onClick={() => { setEditName(false); setEditEmail(false); setEditDOB(false); setEditphone(false) }} className='text-2xl  text-white' />
                                </div>


                                <div className='flex flex-col justify-between h-full'>

                                    <div className='flex flex-col gap-3 px-3 py-6 border-b border-gray-600'>

                                        <div className='flex flex-row justify-between items-center bg-black p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <MdAccountCircle className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Full Name</h1>
                                            </div>
                                            <div className='flex flex-row gap-1 items-center'>
                                                {editName ? (
                                                    <input Value={name} onChange={(e) => setName(e.target.value)} className='w-60 text-red-800 text-center bg-white rounded-lg outline-0' type="text" />
                                                ) : (
                                                    <span className='w-60 text-black text-center bg-white rounded-lg'>{name}</span>
                                                )}

                                                <div className='relative'>
                                                    <BiEdit onClick={() => setEditName(true)} className={`text-gray-300 text-2xl transition-all duration-200  ${editName ? "invisible opacity-0" : "visible opacity-100"}`} />
                                                    <BiSave onClick={() => { setEditName(false); updateName() }} className={`text-gray-300 text-2xl transition-all duration-200 ${editName ? "visible opacity-100" : "invisible opacity-0"} absolute top-0`} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-row justify-between items-center bg-black p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <MdEmail className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Email</h1>
                                            </div>
                                            <div className='flex flex-row gap-1 items-center'>
                                                {editEmail ? (
                                                    <input value={email} onChange={(e) => setEmail(e.target.value   )} className='w-70 text-red-800 text-center bg-white rounded-lg outline-0' type="email" />
                                                ) : (
                                                    <span className='w-70 text-black text-center bg-white rounded-lg'>{email}</span>
                                                )}
                                                <div className='relative'>
                                                    <BiEdit onClick={() => setEditEmail(true)} className={`text-gray-300 text-2xl    transition-all duration-200  ${editEmail ? "invisible opacity-0" : "visible opacity-100"}`} />
                                                    <BiSave onClick={() => { setEditEmail(false); updateEmail() }} className={`text-gray-300 text-2xl transition-all duration-200 ${editEmail ? "visible opacity-100" : "invisible opacity-0"} absolute top-0`} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-row justify-between items-center bg-black p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <BiCalendar className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Date of Birth</h1>
                                            </div>
                                            <div className='flex flex-row gap-1 items-center'>
                                                {editDOB ? (
                                                    <input value={DOB} onChange={(e) => setDOB(e.target.value)} type='date' className='w-30 px-1 text-red-800 text-center bg-white rounded-lg outline-0' />
                                                ) :
                                                    (
                                                        <span className='w-30 px-1 text-black text-center bg-white rounded-lg outline-0'>{DOB ? formatedate(DOB) : "select Date"}</span>
                                                    )
                                                }
                                                <div className='relative'>
                                                    <BiEdit onClick={() => setEditDOB(true)} className={`text-gray-300 text-2xl transition-all duration-200  ${editDOB ? "invisible opacity-0" : "visible opacity-100"}`} />
                                                    <BiSave onClick={() => { setEditDOB(false); updateDOB() }} className={`text-gray-300 text-2xl transition-all duration-200 ${editDOB ? "visible opacity-100" : "invisible opacity-0"} absolute top-0`} />
                                                </div>
                                            </div>

                                        </div>

                                        <div className='flex flex-row justify-between items-center bg-black p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <BsPersonCheck className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Gender</h1>
                                            </div>
                                            <input className='text-white text-end placeholder:text-white outline-0 ' type="text" />
                                        </div>
                                        <div className='flex flex-row justify-between items-center bg-black p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <BiPhone className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Phone Number</h1>
                                            </div>
                                            <input className='text-white text-end placeholder:text-white outline-0 ' type="text" />
                                        </div>
                                        <div className='flex flex-row justify-between items-center bg-black p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <GoLocation className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Location</h1>
                                            </div>
                                            <input className='text-white text-end placeholder:text-white outline-0 ' type="text" />
                                        </div>

                                        <div className='flex flex-row justify-between items-center bg-red-950 p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <BsClock className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Joined on</h1>
                                            </div>
                                            <input placeholder={formatedate(UserData?.createdAt?.toDate())} className='text-white text-center placeholder:text-white outline-0 ' type="text" />
                                        </div>

                                    </div>

                                    <div className='flex flex-row gap-2 items-center justify-center'>
                                        <BiCheckShield className='text-purple-600 text-lg' />
                                        <p className='text-purple-200/50 text-sm'>Your information is secure with us</p>
                                    </div>

                                </div>

                            </div>

                            <div className={`absolute bg-[#1e2938] w-120 h-150 rounded-xl border-l border-gray-400 right-0 p-4 top-0 flex flex-col gap-3 transition-all duration-500 ${activeTab === "budget" ? "translate-x-0 opacity-100" : "translate-x-120 "}`}>
                                <div className='flex flex-row justify-between items-center'>
                                    <BiLeftArrowAlt onClick={() => setactiveTab(null)} className='text-3xl text-white' />
                                    <h1 className='text-white text-xl'>Premium</h1>
                                    <CgClose onClick={() => setactiveTab(null)} className='text-2xl  text-white' />
                                </div>
                            </div>

                            <div className={`absolute bg-[#1e2938] w-120 h-150 rounded-xl border-l border-gray-400 right-0 p-4 top-0 flex flex-col gap-3 transition-all duration-500 ${activeTab === "support" ? "translate-x-0 opacity-100" : "translate-x-120 "}`}>
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
