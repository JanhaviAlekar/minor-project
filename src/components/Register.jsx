import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const SignupPage= () => {
const[name,setName]=useState()
const[email,setEmail]=useState()
const[password,setPassword]=useState()

const handleSubmit=(e)=>{
  e.preventDefault()
  axios.post('http://localhost:3001/register',{name,email,password})
  .then(result=>console.log(result))
  .catch(err=>console.log(err))
}
  return (
    <div className="bg-gray-100 px-10 py-20 rounded-3xl border-gray-200   h-screen ">
      <form onSubmit={handleSubmit} className='bg-white rounded-2xl  py-20 px-20 justify-center item-center w-3/4'>
            <div className='bg-white w-full justify-center item-center '>
                  <div>
                    <h1 className='text-5xl font-semibold'>Welcome Foodies</h1>
                    <p className=' mt-4 font-medirm text-lg text-gray-500'>Please enter your details.</p>
                    <div>
                        <div >
                          <label className='text-lg font-medium'>Name</label>
                          <input className='w-full border-2 border-gray-100 rounded-xl p-4'
                          onChange={(e)=>setName(e.target.value)}
                                  placeholder='Enter your name' />
                        </div>
                        <div >
                          <label className='text-lg font-medium' >Email</label>
                          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                onChange={(e)=>setEmail(e.target.value)}
                                  placeholder='Enter your email' />
                        </div>
                        <div>
                          <label >Password</label>
                          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                  placeholder='Enter your password'
                                  onChange={(e)=>setPassword(e.target.value)}
                                  type="password" />
                                
                        </div>
                    </div>
                    <div className='mt-8 justify-between items-center flex'>
                        <div>
                          <input type="checkbox" 
                          id="remember"/>
                          <label for="remember">Remember me</label>
                        </div>
                      
                    </div>
                    <button className='rounded-xl w-1/3 items-center justify-center mt-8 gap-y-4 py-4 bg-red-500 text-white text-lg font-bold'>Sign in</button>
                    
                    </div> 
                    </div>
                    
                    
                    
                    
                    </form>
            
    </div>
  )
}

export default SignupPage
