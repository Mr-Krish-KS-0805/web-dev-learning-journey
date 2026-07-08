import React, { useState, useEffect } from 'react'
import { BiCalendar, BiCamera, BiCheckShield, BiCrown, BiEdit, BiLeftArrowAlt, BiLogOut, BiPhone, BiSave } from 'react-icons/bi';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FiBell, FiDelete, FiHelpCircle } from 'react-icons/fi'
import { MdAccountCircle, MdEmail } from 'react-icons/md'
import { CgClose } from 'react-icons/cg';
import { BsClock, BsPersonCheck, BsPersonCircle } from 'react-icons/bs';
import { FaCrown, FaSave } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';
import { Country } from 'country-state-city';
import Select from "react-select";
import { PiUploadSimple } from 'react-icons/pi';
import axios from 'axios';

const Header = ({ UserData, formatedate, name, DOB, email, phone, setName, setDOB, setEmail, setPhone, gender, setGender, location, setLocation }) => {
    const [OpenProfile, setOpenProfile] = useState(false)
    const [activeTab, setactiveTab] = useState(null)
    const [editName, setEditName] = useState(false)
    const [editDOB, setEditDOB] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPhone, setEditphone] = useState(false)
    const [editgender, setEditGender] = useState(false)
    const [editLocation, setEditLocation] = useState(false)
    const [image, setImage] = useState(null)
    const [loadSection, setloadSection] = useState(false)

    useEffect(() => {
        if (UserData?.DOB || UserData?.name || UserData?.email || UserData?.phone || UserData?.gender || UserData?.location) {
            setName(UserData.name)
            setDOB(UserData.DOB)
            setEmail(UserData.email)
            setPhone(UserData.phone)
            setGender(UserData.gender)
            setLocation(UserData.location)
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

    const handleCancel = () => {
        setEditName(false);
        setEditEmail(false);
        setEditDOB(false);
        setEditphone(false)
        setEditGender(false)
        setEditLocation(false)
        setName(UserData.name)
        setEmail(UserData.email)
        setDOB(UserData.DOB)
        setPhone(UserData.phone)
        setGender(UserData.gender)
        setLocation(UserData.location)
        setloadSection(false)
        setImage(null)
    }

    const updateName = async () => {

        if (name.trim() === UserData?.name?.trim()) {
            toast.error("No changes detected")
            setEditName(true)
            return;
        }

        try {
            const userRef = doc(db, "users", UserData.uid);

            await updateDoc(userRef, {
                name: name.trim(),
            })
            toast.success("Name Changed")
        } catch (error) {
            toast.error(error.message)
        }

        setEditName(false);
    }

    const updateEmail = async () => {

        if (email.trim() === UserData?.email?.trim()) {
            toast.error("No changes detected")
            setEditEmail(true)
            return;
        }

        try {
            const userRef = doc(db, "users", UserData.uid);

            await updateDoc(userRef, {
                email: email.trim(),
            })
            toast.success("Email changed")
        } catch (error) {
            toast.error(error.message)
        }

        setEditEmail(false);
    }

    const updateDOB = async () => {

        if (DOB.trim() === UserData?.DOB?.trim()) {
            toast.error("No changes detected")
            setEditDOB(true)
            return;
        }

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

    const updateGender = async () => {

        if (gender.trim() === "") {
            toast.error("Please select gender")
            setEditGender(true)
            return;
        }

        try {
            const userRef = doc(db, "users", UserData.uid);

            await updateDoc(userRef, {
                gender: gender,
            })
            toast.success("gender Changed")
        } catch (error) {
            toast.error(error.message)
        }

        setEditGender(false);
    }

    const updatePhone = async () => {

        if (!/^\d{10}$/.test(phone)) {
            toast.error("Phone number must be exactly 10 digits")
            setEditphone(true)
            return;
        }

        try {
            const userRef = doc(db, "users", UserData.uid);

            await updateDoc(userRef, {
                phone: phone,
            })
            toast.success("Phone Number Changed")
        } catch (error) {
            toast.error(error.message)
        }

        setEditphone(false);
    }


    const updatelocation = async () => {

        if (location === "") {
            toast.error("Please select your country")
            setEditLocation(true)
        }

        try {
            const userRef = doc(db, "users", UserData.uid);

            await updateDoc(userRef, {
                location: location,
            })
            toast.success("location Changed")
        } catch (error) {
            toast.error(error.message)
        }

        setEditLocation(false);
    }

    const countries = Country.getAllCountries().map((country) => ({
        value: country.name,
        lable: country.name,
    }));

    const uploadImage = async () => {
        if (!image) return;

        toast.success("uploading...")

        const formData = new FormData()

        formData.append("file", image)
        formData.append("upload_preset", "expenseTracker")

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/nqb9mf8t/image/upload",
                formData
            )

            const imageUrl = response.data.secure_url

            await updateDoc(
                doc(db, "users", UserData.uid),
                {
                    profileImage: imageUrl
                })
            toast.success("Image uploaded")

        } catch (error) {
            toast.error(error.message)
        }
        
    }

    const deleteProfileImage = async () => {
        try {
            const userRef = doc(db, "users", UserData.uid);

            await updateDoc(userRef, {
                profileImage: "",
            })
            toast.success("Image deleted")
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
                    <img onClick={() => { setOpenProfile(!OpenProfile) }} src={UserData?.profileImage || "https://i.pravatar.cc/150"} alt="" className='w-10 h-10 rounded-full cursor-pointer' />


                    {/* PROFILE */}
                    <div className={`bottom-0 left-0 inset-0 z-50 transition-all duration-400 relative ${OpenProfile ? "opacity-100 visible" : "opacity-0 invisible"} `} >

                        <div className='absolute  w-120 h-150 bg-[#1e2938] p-4 rounded-xl right-2 top-2 border-3 border-purple-700 overflow-hidden '>

                            <div className={`flex flex-col w-full h-full justify-between gap-3 transition-all duration-500`}>

                                <div className='flex flex-col gap-3'>

                                    <div className='flex flex-row gap-4 bg-blue-900 justify-center items-center rounded-xl py-4'>
                                        <img src={UserData?.profileImage || "https://i.pravatar.cc/150"} alt="" className='w-12 h-12 rounded-full border border-gray-400 ' />
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

                            <div className={`absolute bg-[#1e2938] w-120 h-150 rounded-xl border-l border-gray-400 right-0 p-4 top-0 flex flex-col gap- transition-all duration-600 ${activeTab === "profile" ? "translate-x-0 opacity-100" : "translate-x-120 "}`}>

                                <div className='flex flex-row justify-between'>
                                    <BiLeftArrowAlt onClick={() => setactiveTab(null)} className='text-3xl text-white' />

                                    <div className='relative flex flex-row items-center gap-1'>

                                        <div className={` transition-all duration-500 flex flex-col items-center relative z-50`}>
                                            <img src={UserData?.profileImage || "https://i.pravatar.cc/150"} alt="" className='w-12 h-12 rounded-full transition-all duration-500' />
                                            <div className=' bg-black/60 w-full h-full rounded-full absolute flex justify-center items-center'>
                                                <BiCamera onClick={() => setloadSection(true)} className={`text-purple-300 text-xl transition-all duration-500 ${loadSection ? "invisible opacity-0" : "visible opacity-100"}`} />
                                                <PiUploadSimple onClick={() => { setloadSection(false); uploadImage() }} className={`absolute text-purple-300 text-xl transition-all duration-500 ${loadSection ? "visible opacity-100 " : "invisible opacity-0"}`} />
                                            </div>
                                        </div>
                                        <div>
                                            <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} className={` bg-green-700 text-black rounded-lg px-3 transition-all duration-600 ${loadSection ? "visible opacity-100 w-55" : "invisible opacity-0 w-0"}`} />
                                        </div>
                                        <FiDelete onClick={()=> {deleteProfileImage(); setImage(null)}} className={`absolute top-0 right-0 text-2xl text-white transition-all duration-500 ${loadSection ? "invisible opacity-0" : "visible opacity-100"}`} />
                                    </div>

                                    <CgClose onClick={handleCancel} className='text-2xl  text-white' />
                                </div>


                                <div className='flex flex-col justify-between h-full'>

                                    <div className='flex flex-col gap-3 px-3 py-6 border-b border-gray-600'>

                                        <div className='flex flex-row justify-between items-center bg-black p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <MdAccountCircle className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Full Name</h1>
                                            </div>
                                            <div className='flex flex-row gap-1 items-center'>

                                                <div className='relative w-60 flex flex-col justify-center items-center'>
                                                    <input value={name} onChange={(e) => setName(e.target.value)} className={`w-full absolute text-black font-semibold text-center bg-green-700 rounded-lg outline-0 transition-all duration-500 ${editName ? "visible opacity-100" : "invisible opacity-0"} `} type="text" />
                                                    <span className={`w-full text-black font-semibold text-center bg-white rounded-lg  transition-all duration-500 ${editName ? "invisible opacity-0" : "visible opacity-100"}`} >{name}</span>
                                                </div>


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

                                                <div className='relative w-70 flex flex-col justify-center items-center'>
                                                    <input value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full absolute text-black font-semibold text-center bg-green-700 rounded-lg outline-0 transition-all duration-500 ${editEmail ? "visible opacity-100" : "invisible opacity-0"} `} type="email" />
                                                    <span className={`w-full text-black font-semibold text-center bg-white rounded-lg  transition-all duration-500 ${editEmail ? "invisible opacity-0" : "visible opacity-100"}`} >{email}</span>
                                                </div>

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

                                                <div className='relative w-35 flex flex-col justify-center items-center '>
                                                    <input value={DOB} onChange={(e) => setDOB(e.target.value)} className={`w-full px-1 absolute text-black font-semibold text-center bg-green-700 rounded-lg outline-0 transition-all duration-500 ${editDOB || UserData?.DOB === "" ? "visible opacity-100" : "invisible opacity-0"} `} type="date" />
                                                    <span className={`w-full text-black font-semibold text-center bg-white rounded-lg  transition-all duration-500 ${editDOB || UserData?.DOB === "" ? "invisible opacity-0" : "visible opacity-100"}`} >{formatedate(DOB)}</span>
                                                </div>

                                                <div className='relative'>
                                                    <BiEdit onClick={() => setEditDOB(true)} className={`text-gray-300 text-2xl transition-all duration-200  ${editDOB || UserData?.DOB === "" ? "invisible opacity-0" : "visible opacity-100"}`} />
                                                    <BiSave onClick={() => { setEditDOB(false); updateDOB() }} className={`text-gray-300 text-2xl transition-all duration-200 ${editDOB || UserData?.DOB === "" ? "visible opacity-100" : "invisible opacity-0"} absolute top-0`} />
                                                </div>
                                            </div>

                                        </div>

                                        <div className='flex flex-row justify-between items-center bg-black p-3 rounded-xl border border-gray-600'>

                                            <div className='flex flex-row items-center gap-2'>
                                                <BsPersonCheck className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Gender</h1>
                                            </div>

                                            <div className='flex flex-row gap-1 items-center'>

                                                <div className='relative w-40 flex flex-col justify-center items-center '>
                                                    <select value={gender} onChange={(e) => setGender(e.target.value)} className={`w-full absolute text-black text-center font-semibold bg-green-700 rounded-lg px-2 outline-0 transition-all duration-500 ${editgender || UserData?.gender === "" ? "visible opacity-100" : "invisible opacity-0"}`}>
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female"> Female</option>
                                                        <option value="Other">Other</option>
                                                        <option value="Prefer not to say">Prefer not to say</option>
                                                    </select>
                                                    <span className={`w-full text-black font-semibold text-center bg-white rounded-lg  transition-all duration-500 ${editgender || UserData?.gender === "" ? "invisible opacity-0" : "visible opacity-100"}`} >{gender}</span>
                                                </div>

                                                <div className='relative'>
                                                    <BiEdit onClick={() => setEditGender(true)} className={`text-gray-300 text-2xl transition-all duration-200  ${editgender || UserData?.gender === "" ? "invisible opacity-0" : "visible opacity-100"}`} />
                                                    <BiSave onClick={() => { setEditGender(false); updateGender() }} className={`text-gray-300 text-2xl transition-all duration-200 ${editgender || UserData?.gender === "" ? "visible opacity-100" : "invisible opacity-0"} absolute top-0`} />
                                                </div>

                                            </div>

                                        </div>

                                        <div className='flex flex-row justify-between items-center bg-black p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <BiPhone className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Phone Number</h1>
                                            </div>
                                            <div className='flex flex-row gap-1 items-center'>

                                                <div className='relative w-40 flex flex-col justify-center items-center '>
                                                    <input value={phone} placeholder='Enter your number' onChange={(e) => setPhone(e.target.value)} className={`w-full px-1 absolute text-black font-semibold text-center bg-green-700 rounded-lg outline-0 transition-all duration-500 ${editPhone || UserData?.phone === "" ? "visible opacity-100" : "invisible opacity-0"} placeholder:text-black`} type="tel" maxLength={10} />
                                                    <span className={`w-full text-black font-semibold text-center bg-white rounded-lg  transition-all duration-500 ${editPhone || UserData?.phone === "" ? "invisible opacity-0" : "visible opacity-100"}`} >{phone}</span>
                                                </div>

                                                <div className='relative'>
                                                    <BiEdit onClick={() => setEditphone(true)} className={`text-gray-300 text-2xl transition-all duration-200  ${editPhone || UserData?.phone === "" ? "invisible opacity-0" : "visible opacity-100"}`} />
                                                    <BiSave onClick={() => { setEditphone(false); updatePhone() }} className={`text-gray-300 text-2xl transition-all duration-200 ${editPhone || UserData?.phone === "" ? "visible opacity-100" : "invisible opacity-0"} absolute top-0`} />
                                                </div>
                                            </div>

                                        </div>


                                        <div className='flex flex-row justify-between items-center bg-black p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <GoLocation className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Location</h1>
                                            </div>

                                            <div className='relative w-70 flex flex-col justify-center items-center '>
                                                <select value={location} onChange={(e) => setLocation(e.target.value)} className={`w-full px-1 absolute text-black font-semibold text-center bg-green-700 rounded-lg outline-0 transition-all duration-500 ${editLocation || UserData?.location === "" ? "visible opacity-100" : "invisible opacity-0"} placeholder:text-black`}>
                                                    <option value="">Select your country</option>
                                                    {countries.map((country) => (
                                                        <option key={country.value}
                                                            value={country.value}>
                                                            {country.lable}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className={`w-full text-black font-semibold text-center bg-white rounded-lg  transition-all duration-500 ${editLocation || UserData?.location === "" ? "invisible opacity-0" : "visible opacity-100"}`} >{location}</span>
                                            </div>

                                            <div className='relative'>
                                                <BiEdit onClick={() => setEditLocation(true)} className={`text-gray-300 text-2xl transition-all duration-200  ${editLocation || UserData?.location === "" ? "invisible opacity-0" : "visible opacity-100"}`} />
                                                <BiSave onClick={() => { setEditLocation(false); updatelocation() }} className={`text-gray-300 text-2xl transition-all duration-200 ${editLocation || UserData?.location === "" ? "visible opacity-100" : "invisible opacity-0"} absolute top-0`} />
                                            </div>

                                        </div>

                                        <div className='flex flex-row justify-between items-center bg-red-950 p-3 rounded-xl border border-gray-600'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <BsClock className='text-white text-xl' />
                                                <h1 className='text-gray-400'>Joined on</h1>
                                            </div>
                                            <p className='text-black bg-gray-300 font-bold px-3 rounded-lg text-center'>{formatedate(UserData?.createdAt?.toDate())}</p>
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

                                <div>
                                    <img className='border border-purple-500 rounded-lg w-full h-35 object-fill' src="branding.png" alt="" />
                                    <img className='border border-purple-500 rounded-lg w-full h-25 object-fill' src="subscription1.png" alt="" />

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
