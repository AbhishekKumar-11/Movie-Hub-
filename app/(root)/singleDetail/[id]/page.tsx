'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SingleDetail({ params }: any) {
  const apikey = 'cb9db9aa';

  const [singleDetail, setSingleDetail] = useState<any>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Resolve params if it's a Promise
    Promise.resolve(params).then((resolvedParams) => {
      if (isMounted) {
        setId(resolvedParams.id);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchSingleMovie = async () => {
      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${apikey}&i=${id}&plot=full`);
        setSingleDetail(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleMovie();
  }, [id]);

  if (!id) return <h2>Loading ID...</h2>;
  if (!singleDetail) return <h2>Loading movie details...</h2>;

  return (
    <div>
      <h2>{singleDetail.Title}</h2>
      <p>{singleDetail.Plot}</p>
      {/* Add more movie details here as needed */}
    </div>
  );
}
