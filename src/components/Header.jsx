import React,{useEffect} from 'react'
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useSelector } from 'react-redux';
import { LOGO, USER_AVATAR } from '../utils/constants';
const Header = () => {
  const user=useSelector(state=>state.user)
  const navigate=useNavigate();
  const dispatch=useDispatch();
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
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName}=user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName}));
        navigate("/browse");
        //redirect user to browse page upon successful signin
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=>unsubscribe();
  },[])
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center">
  <img 
    className="w-44" 
    src={LOGO}
    alt="Netflix Logo"
  />

  {user && (
    <div className="flex items-center cursor-pointer" onClick={handleSignOut}>
      <img 
        alt="usericon"
        className="w-8 h-8 rounded"
        src={USER_AVATAR}
      />
      <button className="ml-2 text-white cursor-pointer">(Sign Out)</button>
    </div>
  )}
</div>

  )
}

export default Header