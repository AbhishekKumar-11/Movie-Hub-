"use client";

import axios from "axios";
import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";
import SkeletonLoading from "./components/SkeletonLoading";
import { useSearchParams } from "next/navigation";

const apikey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPages] = useState(10);
  const [allMovies, setAllMovies] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const fetchAllMovies = async () => {
    try {
      setLoading(true);

      const query = search || "popular";

      const apiUrl = `https://omdbapi.com/?apikey=${apikey}&s=${query}&type=movie&page=${page}`;

      const response = await axios.get(apiUrl);

      setAllMovies(response.data.Search || []);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, [page, search]);

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">
          {search ? `Search results for "${search}"` : "Popular Movies"}
        </h2>
      </div>

      {/* Pagination Top */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-4 bg-gray-300 text-gray-700 rounded-l-lg disabled:opacity-50"
          disabled={page === 1}
        >
          Prev
        </button>

        <span className="px-4 py-4 bg-gray-200 text-gray-800">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, 10))}
          className="px-4 py-4 bg-gray-300 text-gray-700 rounded-r-lg disabled:opacity-50"
          disabled={page === 10}
        >
          Next
        </button>
      </div>

      
      {loading ? (
        <SkeletonLoading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-20">
          {allMovies.length === 0
            ? "No movies found"
            : allMovies.map((movie: any, index: number) => (
                <MovieCard
                  key={index}
                  id={movie.imdbID}
                  title={movie.Title}
                  rating={movie.Year}
                  posterUrl={movie.Poster}
                />
              ))}
        </div>
      )}

      {/* Pagination Bottom */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-4 bg-gray-300 text-gray-700 rounded-l-lg disabled:opacity-50"
          disabled={page === 1}
        >
          Prev
        </button>

        <span className="px-4 py-4 bg-gray-200 text-gray-800">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, 10))}
          className="px-4 py-4 bg-gray-300 text-gray-700 rounded-r-lg disabled:opacity-50"
          disabled={page === 10}
        >
          Next
        </button>
      </div>
    </>
  );
}
