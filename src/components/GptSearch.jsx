import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { HOME_PAGE_BACKGROUND } from '../utils/constants'
const GptSearch = () => {
  return (
    <div>
      <div className='absolute -z-10'>
        <img 
          src={HOME_PAGE_BACKGROUND}
          alt='background'
          className='h-full w-full object-cover'
        />
      </div>

      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch