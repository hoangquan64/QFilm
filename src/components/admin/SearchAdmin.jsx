import React from 'react'
import { FaSearch } from 'react-icons/fa';

function SearchAdmin({handleClickOpen, title,add}) {
    
    return (
        <div className='flex justify-around items-center mb-4 mt-5 '>
            <div>
                <h1 className='text-white'>{title}</h1>
            </div>
            <div className='rounded-full relative w-1/3 border text-white border-gray-300 px-4 py-2 flex items-center gap-2'>
                <input type="text" placeholder= 'Search...' className='outline-none text-white' />
                <FaSearch className="absolute right-4 -tranlate-y-1/2" />
            </div>
            <div className="relative group">
  <button
    onClick={handleClickOpen}
    className="
      relative z-10 
      px-6 py-2 
      rounded-full 
      font-semibold 
      text-white 
      bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-700
      shadow-[0_0_20px_rgba(100,200,255,0.5)]
      overflow-hidden
      transition-all duration-500 ease-out
      hover:shadow-[0_0_40px_rgba(150,100,255,0.8)]
      hover:scale-105
      active:scale-95
    "
  >
    <span className="relative z-20">{add}</span>
    <span
      className="
        absolute top-0 left-[-100%] w-full h-full 
        bg-gradient-to-r from-transparent via-white to-transparent 
        opacity-30 
        transform skew-x-12 
        group-hover:animate-shine
      "
    ></span>
  </button>
  <div
    className="
      absolute inset-0 
      rounded-full 
      bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-700 
      blur-2xl opacity-30 
      group-hover:opacity-70 
      transition-all duration-700 ease-out
    "
  ></div>
</div>
 
        </div>
    );
}

export default SearchAdmin;