import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openAI';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const searchText=useRef(null);
    const dispatch=useDispatch();
    const langKey=useSelector((store)=>store.config.lang);
    const searchMovieTMDB = async (movie) => {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
  
      return json.results;
    };
  
    const handleGPTSearchClick=async ()=>{
      console.log(searchText.current.value);
      const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: "user", content: gptQuery }],
      

    });
      
      const gptMovies=gptResults.choices[0].message.content.split(",");
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      //So here we are calling the searchMovie method where it is an async function and 
      //an api call is made but it may take time for response to come.So instead of waiting it will return a promise
      //which is captured in promiseArray.Below using promiseAll it is resolved and finally we will get the list
      // [Promise, Promise, Promise, Promise, Promise]
  
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    
    }
    
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-4 bg-white col-span-9' placeholder={lang[langKey].gptSearchPlaceholder}></input>
            <button className='py-2 px-4 col-span-3 m-4 bg-red-700 text-white rounded-lg'
            onClick={handleGPTSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar