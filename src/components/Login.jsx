import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import {auth } from "../utils/firebase"
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const navigate=useNavigate();
  const [isSignInForm,setisSignInForm]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);
  const dispatch=useDispatch();
  const toggleSignInForm=()=>{
    setisSignInForm(!isSignInForm)
  }
  const handleButtonClick=()=>{
    //Validate the form data 
    
    console.log(email.current.value)
    console.log(password.current.value)
    const message=checkValidateData(email.current.value,password.current.value)
    setErrorMessage(message)
    if(message) return;

    if(!isSignInForm)
    {
      //Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      const {uid,email,displayName}=auth.currentUser;
      dispatch(addUser({uid:uid,email:email,displayName:displayName}))
      navigate("/browse")
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(error.code+"-"+error.message)
    // ..
  });

    }
    else
    {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    const {uid,email,displayName}=auth.currentUser;
    dispatch(addUser({uid:uid,email:email,displayName:displayName}))
    
    navigate("/browse")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(error.code+"-"+error.message)
  });
      //Sign In Logic
    }
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
        <form className='w-3/12 p-12 bg-black bg-opacity-80 rounded-lg' onSubmit={(e)=>e.preventDefault()}>
            <h1 className='text-white font-bold text-3xl ml-2' 
            >{isSignInForm?"Sign In":"Sign Up"}</h1><br></br>
          {!isSignInForm && <input type='text' ref={name} placeholder='Full Name' className='p-4 my-4 bg-gray-700 w-full  rounded text-white' />}
          <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 bg-gray-700 w-full  rounded  text-white' />
          <input ref={password  } type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded text-white' />
          <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
          <button onClick={handleButtonClick}  className='p-2 m-2 w-full bg-red-600 text-white rounded cursor-pointer rounded-lg'>{isSignInForm?"Sign In":"Sign Up"}</button>
          <p className='py-4 text-white cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix ? Sign Up":"Already registered ? Sign In"}</p>
        </form>
      </div>
    </div>
  )
}

export default Login
