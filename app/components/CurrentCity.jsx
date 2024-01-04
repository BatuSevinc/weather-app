import React from 'react'
import { FaWind } from "react-icons/fa6";
import { BsMoisture } from "react-icons/bs";
const CurrentCity = () => {
  return (
    <div className=' md:fixed grid gap-6 right-4 bg-[#cf1f37] bottom-4 p-2 rounded-xl bg-opacity-90 text-white w-[300px]'>
      <div className='flex text-xs justify-between'>
          <p>Multan</p>
          <p>25.21.2024</p>
      </div>
      <div className='flex justify-center items-center gap-6'>
      <div className='flex-2 md:text-4xl font-bold text-center'>
        20 °C 
        <p className='lg:text-2xl'>Cloudy</p>
      </div>
      <div className='flex-2 text-xs'> 
      <div className='flex items-center gap-2'>
      <FaWind/> 6.1 mph
      </div>
      <div className='flex items-center gap-2'>
        <BsMoisture/> 90%
      </div>
        </div>
      </div>
      <div className='flex justify-between text-xs'>
        <div className='text-center'>
          <p>Feels like</p>
          <p>18 °C </p>
        </div>
        <div className='text-center'>
          <p>Feels like</p>
          <p>18 °C </p>
        </div>
        <div className='text-center'>
          <p>Feels like</p>
          <p>18 °C </p>
        </div>
        <div className='text-center'>
          <p>Feels like</p>
          <p>18 °C </p>
        </div>
      </div>
    </div>
  )
}

export default CurrentCity