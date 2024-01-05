import React, { useEffect, useState } from 'react'
import { FaWind } from "react-icons/fa6";
import { BsMoisture } from "react-icons/bs";
import {getSunRise, getSunSet}  from '../helpers/getSunSetSunRise';
import axios from 'axios';
import Image from 'next/image';
const CurrentCity = () => {

  const [currentData,setCurrentData] = useState([])
  const currentCity = "istanbul"
  useEffect(() => {
    if(currentCity){
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      axios.get(url).then((response) => {
        setCurrentData(response.data)
      });
    }
  },[])

  return (
    <div className='md:fixed grid gap-6 right-4 bg-[#cf1f37] shadow-lg shadow-[#352023] bottom-4 p-2 rounded-xl bg-opacity-40 text-white w-[300px]'>
      <div className='flex text-xs justify-between'>
          <p>{currentData.name}</p>
          <p>{(new Date()).toLocaleDateString('tr-TR')}</p>
      </div>
      <div className='flex justify-center items-center gap-6'>
        {
          currentData && currentData.weather && currentData.weather[0] &&
          <div>
        <Image 
          src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`} 
          alt='/'
          width='60'
          height='60'
          className='z-10 p-2 m-2 bg-white/80 rounded-full'
          priority={true}
          />
        </div>
        }
      <div className='flex-2 md:text-2xl font-bold text-center'>
      {(currentData && currentData.main && currentData.main.temp) ? (Number(currentData.main.temp) - 273.15).toFixed(0) : "-"}&#176;C
        
      </div>
      <div className='flex-2 text-xs'> 
      <div className='flex items-center gap-2'>
      <FaWind/> {(currentData && currentData.wind && currentData.wind.speed) && currentData.wind.speed} m/s
      </div>
      <div className='flex items-center gap-2'>
        <BsMoisture/> {(currentData && currentData.main && currentData.main.humidity) && currentData.main.humidity} %
      </div>
        </div>
      </div>
      <div className='flex justify-between text-xs'>
        <div className='text-center'>
          <p>Hissedilen Sıcaklık</p>
          <p>{ currentData && currentData.main && currentData.main.feels_like && (currentData.main.feels_like - 273.15).toFixed(0)}&#176;C</p>
        </div>
        <div className='text-center'>
          <p>Gün Doğumu </p>
          <p>{(currentData && currentData.sys && currentData.sys.sunrise) && getSunRise(currentData.sys.sunrise)}</p>
        </div>
        <div className='text-center'>
          <p>Gün Batımı </p>
          <p>{(currentData && currentData.sys && currentData.sys.sunset) && getSunSet(currentData.sys.sunset)}</p>
        </div>
        
      </div>
    </div>
  )
}

export default CurrentCity