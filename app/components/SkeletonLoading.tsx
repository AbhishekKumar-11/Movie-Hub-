import React from 'react'

function SkeletonLoading() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-6 gap-5'>
      {Array.from({length : 12 }).map((_, index)=>
        <div key={index} className='w-full bg-gray-200 rounded overflow-hidden shadow-lg animate-pulse'>
        <div className='h-64 bg-gray-300'></div>
        <div className='p-4'>
          <div className="h-4 bg-gray-300w-3/4mb-2"></div>
        </div>
        </div>
      )}
    </div>
  )
}

export default SkeletonLoading