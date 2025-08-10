import React,{useEffect} from 'react'
import { onAuthStateChanged ,signOut} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useSelector } from 'react-redux';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import lang from '../utils/languageConstants';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
  const user=useSelector(state=>state.user)
  const showGPTSearch=useSelector((store)=>store.gpt.showGptSearch);
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
  const handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView())
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center">
  <img 
    className="w-44" 
    src={LOGO}
    alt="Netflix Logo"
  />

  {user && (
    <div className="flex items-center cursor-pointer" >
{ showGPTSearch && (<select className='p-2 m-4 bg-gray-900 text-white' onChange={handleLanguageChange}>
        {SUPPORTED_LANGUAGES.map(lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        

      </select>)}
      <button className='py-2 px-4 mx-4 my-4 bg-purple-800 text-white rounded-lg cursor-pointer'
      onClick={handleGptSearchClick}>{showGPTSearch?"Home Page" :"GPT Search"}</button>
      <img 
        alt="usericon"
        className="w-8 h-8 rounded"
        src={USER_AVATAR}
      />
      <button className="ml-2 text-white cursor-pointer" onClick={handleSignOut}>(Sign Out)</button>
    </div>
  )}
</div>

  )
}

export default Header