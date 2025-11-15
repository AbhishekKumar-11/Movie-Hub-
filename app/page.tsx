"use client"
import axios from "axios";
import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";
import SkeletonLoading from "./components/SkeletonLoading";
import { useSearchParams } from "next/navigation";

 const apikey = `cb9db9aa`

export default function Home() {
  const [page,setpage] = useState(1);
  const [totalPages,setTotalPages] = useState(10); 
  const [allmovies,setAllMovies]  = useState<any>(null) ;
  const [loading,setLoading] = useState(true);
  const search = useSearchParams().get('search');
  console.log(search);
  const  fetchAllMovies= async ()=>{
     try {
      let ApiUrl = '';

   if(search){
  ApiUrl = `https://omdbapi.com/?apikey=${apikey}&s=${search}&type=movie&page=${page}`
      setLoading(true);
       const responce = await axios.get(ApiUrl);
      
       setAllMovies(responce.data.Search)
   }else{
     ApiUrl = `https://omdbapi.com/?apikey=${apikey}&s=popular&type=movie&page=${page}`
      setLoading(true);
       const responce = await axios.get(ApiUrl);
      
       setAllMovies(responce.data.Search)
   }
       
     } catch (error:any) {
      console.log(error.message);
     }finally{
      setLoading(false);
     }
  }
  useEffect(()=>{
    fetchAllMovies();
  },[page,search])
  return (
    <>
    <div>
      <h2 className="text-2xl font-bold">
      {search? `search result for ${search} ` : `popular movies` }
      </h2>
    </div>
    <div className={`flex justify-center mb-4`}>
        <button onClick={() =>{setpage((prev) => Math.max(prev-1,1)) }} className={`px-4 py-4 bg-gray-300 text-gray-700 rounded-l-lg disabled:opacity-50`} disabled={page===1}>prev</button>
        <span className={`px-4 py-4 bg-gray-200 text-gray-800`}>Page {page} of {totalPages}</span>
        <button className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg disabled:opacity-50`}  onClick={() =>{setpage((prev) => Math.min(prev+1,10)) }} disabled={page===10}>Next</button>
        </div>
    
    {
      loading ? <SkeletonLoading/> : <div className="grid grid-cols-2 md:grid-cols-4 gap-4  p-20">
      
      {!allmovies
        ? "Loading"
        : allmovies.length === 0
        ? "No movies found"
        : allmovies.map((movie:any, index:number) => (
            <MovieCard
              key={index}
              id={movie.imdbID}
              title={movie.Title}
              rating={movie.Year}
              posterUrl={movie.Poster}
            />
          ))}
    </div>
    }
      <div className={`flex justify-center mb-4`}>
        <button onClick={() =>{setpage((prev) => Math.max(prev-1,1)) }} className={`px-4 py-4 bg-gray-300 text-gray-700 rounded-l-lg disabled:opacity-50`} disabled={page===1}>prev</button>
        <span className={`px-4 py-4 bg-gray-200 text-gray-800`}>Page {page} of {totalPages}</span>
        <button className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg disabled:opacity-50`}  onClick={() =>{setpage((prev) => Math.min(prev+1,10)) }} disabled={page===10}>Next</button>
        </div>
    </>
  );
}
