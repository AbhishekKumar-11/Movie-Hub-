import React from 'react'
 interface Card{
    title:string
    rating:number
    posterUrl:string
}
const MovieCard : React.FC<Card> = ({title,rating,posterUrl}) => {
  return (
    <div className='w-[200px] bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg cursor-pointer h-[430px]'>
        <img src={posterUrl} alt={`${title} poster`} className='w-full object-cover' />
        <div className='p-4'>
            <h3 className="text-lgfont-bold-mb-2 ">
                {title}
            </h3>
            <p className='text-gray-400 '> Year: {rating}</p>
        </div>
    </div>
  )
}

export default MovieCard