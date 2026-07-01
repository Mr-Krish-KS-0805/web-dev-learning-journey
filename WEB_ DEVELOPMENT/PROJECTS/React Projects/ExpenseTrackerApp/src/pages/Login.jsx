import React, { useState } from 'react'
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ImOpt } from 'react-icons/im';
import toast from 'react-hot-toast';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault()

        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setTimeout(() => {
                navigate("/")
                toast.success("Login Successfull")
            }, 500);
        } catch (error) {
            setError(error.message)
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-black text-white'>

            <form onSubmit={handleSignin} className='bg-zinc-900 p-8 rounded-xl w-87.5 flex flex-col gap-4'>

                <h1 className='text-3xl font-bold text-center '>Login</h1>

                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-lg p-3 bg-zinc-800 outline-none' />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-lg p-3 bg-zinc-800 outline-none' />

                <div className='w-full flex flex-col items-center'>
                    <button type='submit' className='bg-pink-500 w-1/2 rounded-lg font-semibold p-1'  >login</button>
                    <p>
                        Don't have an account?
                        <Link to={"/signup"} className='text-blue-400' > Signup</Link>
                    </p>
                </div>

            </form>

        </div>
    )
}


export default Login
