import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {addNowPlayingMovies} from '../utils/movieSlice'
import React, { useEffect } from 'react'


const useNowPlayingMovies=()=>{
    const dispatch=useDispatch();
const getNowPlayingMovies=async()=>{
  const data=await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
  const json=await data.json();
  console.log(json.results)
  dispatch(addNowPlayingMovies(json.results))
}

useEffect(()=>{
  getNowPlayingMovies();
  //If you observe in the console this data is printed twice.This is because of the Strict Mode.It is just a react thing
  //If you remove the Strict Mode it is printed once
  //This happens because react does extra rendering to check for any inconsistencies.In production it is not occured
},[])
}

export default useNowPlayingMovies;