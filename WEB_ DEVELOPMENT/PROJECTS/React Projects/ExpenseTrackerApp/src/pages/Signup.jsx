import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
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
                doc(db, "users",userCredential.user.uid),
                {
                    name: name,
                    email: email,
                    createdAt: new Date().toDate()
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
        <div className='min-h-screen flex items-center justify-center bg-black text-white'>

            <form onSubmit={handleSignup} className='bg-zinc-900 p-8 rounded-xl w-87.5 flex flex-col gap-4'>

                <h1 className='text-3xl font-bold text-center '>Signup</h1>

                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className='rounded-lg p-3 bg-zinc-800 outline-none' />
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-lg p-3 bg-zinc-800 outline-none' />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-lg p-3 bg-zinc-800 outline-none' />
                <div className='w-full flex flex-col items-center'>
                    <button type='submit' disabled={loading} className='bg-pink-500 rounded-lg font-semibold p-1 w-1/2 '>{loading ? "Creating..." : "Create Account"}</button>
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
