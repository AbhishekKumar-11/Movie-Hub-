"use client";

import axios from "axios";
import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";
import SkeletonLoading from "./components/SkeletonLoading";
import { useSearchParams } from "next/navigation";

const apikey = `cb9db9aa`;

export default function HomeClient() {
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
      <h2 className="text-2xl font-bold px-4 mt-4">
        {search ? `Search results for "${search}"` : "Popular Movies"}
      </h2>

      {/* Pagination Top */}
      <div className="flex justify-center mb-4 mt-4">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-200 text-gray-800">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === 10}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(p + 1, 10))}
        >
          Next
        </button>
      </div>

      {loading ? (
        <SkeletonLoading />
      ) : (
        <div
          className="
            grid
            grid-cols-1                      /* 1 card on mobile */
            sm:grid-cols-2                   /* 2 cards on small */
            md:grid-cols-3                   /* 3 cards on medium */
            lg:grid-cols-4                   /* 4 cards on large */
            gap-5                            /* Gap between cards */
            px-4 md:px-8 lg:px-16 py-8       /* Spacing around */
            justify-items-center
          "
        >
          {allMovies.length === 0
            ? "No movies found"
            : allMovies.map((movie: any, index: number) => (
                <div
                  key={index}
                  className="
                    w-full 
                    max-w-[160px]          /* mobile size */
                    sm:max-w-[180px]       /* slightly bigger */
                    md:max-w-[200px]       /* medium screens */
                    lg:max-w-[220px]       /* desktop size */
                  "
                >
                  <MovieCard
                    id={movie.imdbID}
                    title={movie.Title}
                    rating={movie.Year}
                    posterUrl={movie.Poster}
                  />
                </div>
              ))}
        </div>
      )}

      {/* Pagination Bottom */}
      <div className="flex justify-center mb-4">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-200 text-gray-800">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === 10}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(p + 1, 10))}
        >
          Next
        </button>
      </div>
    </>
  );
}
