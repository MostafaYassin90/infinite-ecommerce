import React from 'react';
import { assets } from '../assets/assets';
import { FaLongArrowAltRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className='my-10 flex items-center gap-5 relative bg-gray-300 px-10'>

      {/* Left Side */}
      <div className='w-[20%] hidden sm:block'>
        <img src={assets.banner_1} alt='banner-image' />
      </div>

      {/* Middule Side */}
      <div className='w-full sm:w-[60%] text-center py-10'>
        <p className='text-3xl text-gray-700 font-bold'>Level Up Your<br /> Gaming Experience</p>
        <p className='text-xm text-gray-600 font-medium'>From Immersive Sound to precise Controls_<br /> Every Your need to win</p>
        <button className=' py-2 px-5 bg-primary text-white flex items-center gap-x-2 rounded-md hover:rounded-full mx-auto mt-5 w-fit justify-center transition-all duration-200'>Buy Now <FaLongArrowAltRight /> </button>
      </div>

      {/* Right Side */}
      <div className='w-[20%] absolute top-0 right-0 hidden sm:block'>
        <img src={assets.banner_2} alt='banner-image' />
      </div>

    </div>
  );
};

export default Banner;
