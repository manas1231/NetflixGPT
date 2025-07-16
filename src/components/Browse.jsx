import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from 'react-redux';

const Browse = () => {
  const user=useSelector(state=>state.user)
  const navigate=useNavigate();
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      navigate("/")
      console.log("Sign out successful")
      // Sign-out successful.
    }).catch((error) => {
      navigate("/error")
      // An error happened.
    });
  }
  return (
    <div>
      <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center'>
        <img className='w-44' 
          src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' 
          alt='Netflix logo'
        />
        {user && <div className='flex items-center cursor-pointer' onClick={handleSignOut}>
          <img 
            alt="usericon"
            className='w-8 h-8 rounded'
            src='https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229'
          />
          <button   className='ml-2 text-white cursor-pointer'>(Sign Out)</button>
        </div>}
      </div>
    </div>
  )
}

export default Browse
