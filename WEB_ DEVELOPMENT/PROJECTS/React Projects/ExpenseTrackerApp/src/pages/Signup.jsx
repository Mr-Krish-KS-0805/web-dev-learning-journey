import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import DatePicker from 'react-datepicker';

const Signup = ({name, DOB, email, phone, setName, setDOB, setEmail, setPhone }) => {

    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(null)

    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(
                doc(db, "users", userCredential.user.uid),
                {
                    name: name,
                    DOB: DOB,
                    email: email,
                    phone: phone,
                    gender: "",
                    location: "",
                    profileImage: "",
                    uid: userCredential.user.uid,
                    createdAt: new Date()
                }
            )
            toast.success("Account created")
            setTimeout(() => {
                navigate("/login")
            }, 500);
        } catch (error) {
            setError(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-blue-900 text-white'>

            <form onSubmit={handleSignup} className='bg-black py-8 px-2 rounded-xl w-150 h-150 border border-amber-200 flex flex-col justify-between gap-4'>

                <div>
                    <div className='w-full flex justify-center items-center'>
                        <h1 className='bg-clip-text text-transparent text-4xl font-bold text-center p-2 bg-linear-to-r from-red-700 to-green-500 mb-5 '>Signup</h1>
                    </div>

                    <div className='w-full px-3 mt-3 grid grid-cols-2 gap-x-3 gap-y-5'>
                        <div className='flex flex-col gap-1'>
                            <p>Full Name</p>
                            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className='w-full rounded-lg p-3 bg-zinc-800 outline-none border border-gray-500' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Date of Birth  <span className='text-gray-400'>(Optional)</span></p>
                            <input type='date' value={DOB} onChange={(e)=> setDOB(e.target.value)} className='w-full rounded-lg p-3 bg-zinc-800 outline-none border border-gray-500' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Email Address</p>
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full rounded-lg p-3 bg-zinc-800 outline-none  border border-gray-500' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>Phone Number <span className='text-gray-400'>(Optional)</span></p>
                            <input type="tel" maxLength={10} placeholder='Phone Number' value={phone} onChange={(e)=> setPhone(e.target.value)} className='w-full rounded-lg p-3 bg-zinc-800 outline-none  border border-gray-500' />
                        </div>

                    </div>

                    <div className='flex flex-col gap-2 px-3 mt-4'>
                        <p>Password</p>
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full rounded-lg p-3 bg-zinc-800 outline-none border border-gray-500' name="" id="" />
                        <input type="password" placeholder='Confirm Password' className='w-full rounded-lg p-3 bg-zinc-800 outline-none border border-gray-500' name="" id="" />
                    </div>

                </div>

                <div className='w-full flex flex-col items-center gap-2'>
                    <button type='submit' disabled={loading} className='bg-linear-to-br from-blue-700 via-stone-900 to-sky-500 rounded-lg font-semibold py-3 px-4  '>{loading ? "Creating..." : "Create Account"}</button>
                    <p>
                        Already have an account?
                        <Link to={"/login"} className='text-blue-400' >Login</Link>
                    </p>
                </div>

            </form>

        </div>
    )
}

export default Signup
