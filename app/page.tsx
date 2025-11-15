"use client"
import axios from "axios";
import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";
 const apikey = `cb9db9aa`

export default function Home() {
  const [page,setpage] = useState(1);
  const [totalPages,setTotalPages] = useState(10); 
  const [allmovies,setAllMovies]  = useState<any>(null) ;
  const  fetchAllMovies= async ()=>{
     try {
      const  ApiUrl = `https://omdbapi.com/?apikey=${apikey}&s=popular&type=movie&page=${page}`
       const responce = await axios.get(ApiUrl);
      // console.log(responce.data.Search);
       setAllMovies(responce.data.Search)
     } catch (error:any) {
      console.log(error.message);
     }
  }
  useEffect(()=>{
    fetchAllMovies();
  },[page])
  return (
    <>
    <div>
        <button>prev</button>
        <button>Next</button>
        </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4  p-20">
      
      {!allmovies
        ? "Loading"
        : allmovies.length === 0
        ? "No movies found"
        : allmovies.map((movie:any, index:number) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              rating={movie.Year}
              posterUrl={movie.Poster}
            />
          ))}
    </div>
    </>
  );
}
