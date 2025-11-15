'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  imdbVotes: string;
}

interface SingleDetailProps {
  params: { id: string } | Promise<{ id: string }>;
}

const SingleDetail: React.FC<SingleDetailProps> = ({ params }) => {
  const API_KEY = 'cb9db9aa';

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // safely resolve params if promise
    Promise.resolve(params).then((resolved) => setId(resolved.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    axios
      .get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
      .then((res) => {
        if (res.data.Response === 'False') {
          setError(res.data.Error || 'Movie not found');
          setMovie(null);
        } else {
          setMovie(res.data);
        }
      })
      .catch(() => {
        setError('Failed to fetch movie details');
        setMovie(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center text-white mt-10 text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10 text-xl">Error: {error}</p>;
  }

  if (!movie) {
    return <p className="text-center text-white mt-10 text-xl">No movie data found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-8 flex flex-col lg:flex-row gap-6">
      {/* Poster */}
      <div className="flex-shrink-0 w-full lg:w-1/3">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/fallback-image.png'}
          alt={movie.Title}
          className="rounded-lg shadow-lg w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow">
        <h1 className="text-4xl font-bold mb-2">{movie.Title} ({movie.Year})</h1>
        <p className="text-gray-400 mb-4 italic">Directed by {movie.Director}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
          <span><strong>Genre:</strong> {movie.Genre}</span>
          <span><strong>Runtime:</strong> {movie.Runtime}</span>
          <span><strong>Language:</strong> {movie.Language}</span>
          <span><strong>Released:</strong> {movie.Released}</span>
          <span><strong>IMDb Rating:</strong> {movie.imdbRating} ({movie.imdbVotes} votes)</span>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Plot</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">{movie.Plot}</p>

        <h2 className="text-2xl font-semibold mb-2">Cast</h2>
        <p className="text-gray-300">{movie.Actors}</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Awards</h2>
        <p className="text-gray-300">{movie.Awards}</p>
      </div>
    </div>
  );
};

export default SingleDetail;
