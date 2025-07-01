import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignInForm,setisSignInForm]=useState(true);
  const toggleSignInForm=()=>{
    setisSignInForm(!isSignInForm)
  }
  return (
    <div className="relative h-screen w-screen">
      <Header />
      
      <div className='absolute inset-0'>
        <img 
          src='https://assets.nflxext.com/ffe/siteui/vlv3/75b0ed49-75ab-4a63-bd45-37bc2c95cb73/web/IN-en-20250623-TRIFECTA-perspective_ae5833b7-6ce5-4e88-853e-014f38c506f1_large.jpg'
          alt='background'
          className='h-full w-full object-cover'
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center rounded-lg opacity-80">
        <form className='w-3/12 p-12 bg-black bg-opacity-80 rounded-lg'>
            <h1 className='text-white font-bold text-3xl ml-2'>{isSignInForm?"Sign In":"Sign Up"}</h1><br></br>
          {!isSignInForm && <input type='text' placeholder='Full Name' className='p-4 my-4 bg-gray-700 w-full  rounded' />}
          <input type='text' placeholder='Email Address' className='p-4 my-4 bg-gray-700 w-full  rounded' />
          <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded' />
          <button className='p-2 m-2 w-full bg-red-600 text-white rounded cursor-pointer rounded-lg'>{isSignInForm?"Sign In":"Sign Up"}</button>
          <p className='py-4 text-white cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix ? Sign Up":"Already registered ? Sign In"}</p>
        </form>
      </div>
    </div>
  )
}

export default Login
