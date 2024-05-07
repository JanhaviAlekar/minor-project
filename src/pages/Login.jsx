import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import { useAuth } from '../context/Auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(" http://localhost:8080/api/v1/auth/login",
                { email, password });
            console.log(res.data.success);
            if (res && res.data.success) {
                toast.success(res.data.message, { duration: 4000 })
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        console.log(process.env.REACT_APP_API)
    }
    return (
        <div className='flex justify-center items-center h-screen'>
        <div className='w-full max-w-md'>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h4 className='text-2xl mb-6 text-center'>LOGIN FORM</h4>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="exampleInputEmail"
                        placeholder="Enter Email"
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className='flex justify-between items-center mb-6'>
                    <button type="button" className="text-blue-500 hover:text-blue-700" onClick={() => { navigate("/forgot-password") }}>Forgot Password?</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login;