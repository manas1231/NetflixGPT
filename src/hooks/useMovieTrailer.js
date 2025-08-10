import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from "../utils/movieSlice";
import React, { useEffect } from 'react'

const useMovieTrailer=(movieId)=>{
    const dispatch=useDispatch();
  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();

      // Pick the first video
      const firstVideo = json.results?.[0];
      if (firstVideo) {
        dispatch(addTrailerVideo(firstVideo))
      }
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, []); // refetch if movieId changes

}

export default useMovieTrailer;