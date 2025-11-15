"use client"
import axios from "axios";
import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";
 const apikey = ``
const  ApiUrl = `https://omdbapi.com/?apikey=${apikey}&s=popular&type=movie&page=1`
export default function Home() {
  const [page,setpage] = useState(1);
  const [totalPages,setTotalPages] = useState(10); 
  const [allmovies,setAllMovies]  = useState<any|null>(null) ;
  const  fetchAllMovies= async ()=>{
     try {
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
    <div className="flex flex-wrap gap-4  p-3">
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
  );
}
