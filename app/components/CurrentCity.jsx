import React, { useEffect, useState } from 'react'
import { FaWind } from "react-icons/fa6";
import { BsMoisture } from "react-icons/bs";
import {getSunRise, getSunSet}  from '../helpers/getSunSetSunRise';
import axios from 'axios';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton'
const CurrentCity = () => {

  const [currentData, setCurrentData] = useState();  
  const [defaultData, setDefaultData] = useState();
  const [realData,setRealData] = useState([])
  const [loading, setLoading] = useState(true);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  useEffect(() => {
    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLatitude(latitude);
      setUserLongitude(longitude);
    };
    navigator.geolocation.getCurrentPosition(successHandler);
  }, []);


  useEffect(() => {
    if(userLatitude !== null && userLongitude !== null){
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${userLatitude}&lon=${userLongitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      axios.get(url).then((response) => {
        setCurrentData(response.data)
        setLoading(false)
      });
    } else {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      axios.get(url).then((response) => {
        setDefaultData(response.data)
        setLoading(false)
      })
    }
  },[userLatitude,userLongitude])
  useEffect(() => {
    const dataToSet = currentData ? currentData : defaultData;
    setRealData(dataToSet);
  }, [currentData, defaultData]);

  return (
    <div className='md:fixed grid gap-6 right-4 bg-[#cf1f37] shadow-lg shadow-[#352023] bottom-4 p-2 rounded-xl bg-opacity-40 text-white w-[300px]'>
      <div className='flex text-xs justify-between'>
        {
            loading ? <Skeleton width={50} height={10} className='z-10  bg-white/80 rounded-full' /> :
          <p>{(realData && realData.name) && realData.name}</p>
        }
        
        {
         loading ? <Skeleton width={90} height={10} className='z-10  bg-white/80 rounded-full' /> :
          <p>{(new Date()).toLocaleDateString('tr-TR')}</p>
        }
      </div>
      <div className='flex justify-center items-center gap-6'>
        { 
          loading ? <Skeleton width={60} height={60} className='z-10 p-2 m-2 bg-white/80 rounded-full' style={{borderRadius:"100%"}} /> :
          realData && realData.weather && realData.weather[0] &&
          <div>
        <Image 
          src={`http://openweathermap.org/img/wn/${realData.weather[0].icon}@2x.png`} 
          alt='/'
          width='60'
          height='60'
          className='z-10 p-2 m-2 bg-white/80 rounded-full'
          priority={true}
          />
        </div>
        }
        {
            loading ? <Skeleton width={60} height={30} className='z-10 p-2 m-2 bg-white/80 rounded-full' /> :
          <div className='flex-2 md:text-2xl font-bold text-center'>
      {(realData && realData.main && realData.main.temp) ? (Number(realData.main.temp) - 273.15).toFixed(0) : "-"}&#176;C 
      </div>
      }
      {
        loading ? <Skeleton width={60} height={30} className='z-10 p-2 m-2 bg-white/80 rounded-full' /> :
      <div className='flex-2 text-xs'> 
      <div className='flex items-center gap-2'>
      <FaWind/> {(realData && realData.wind && realData.wind.speed) && realData.wind.speed} m/s
      </div>
      <div className='flex items-center gap-2'>
        <BsMoisture/> {(realData && realData.main && realData.main.humidity) && realData.main.humidity} %
      </div>
        </div>
      }
      </div>
      <div className='flex justify-between text-xs'>
        <div className='text-center'>
          {
        loading ? <Skeleton width={90} count={2} height={10} className='z-10  bg-white/80 rounded-full' /> :
        <>
          <p>Hissedilen Sıcaklık</p>
          <p>{ realData && realData.main && realData.main.feels_like && (realData.main.feels_like - 273.15).toFixed(0)}&#176;C</p>
        </>
          }
          </div>
        
        <div className='text-center'>
        {
        loading ? <Skeleton width={90} count={2} height={10} className='z-10  bg-white/80 rounded-full' /> :
        <>
          <p>Gün Doğumu </p>
          <p>{(realData && realData.sys && realData.sys.sunrise) && getSunRise(realData.sys.sunrise)}</p>
        </>
        }
        </div>
        <div className='text-center'>
        {
        loading ? <Skeleton width={90} count={2} height={10} className='z-10  bg-white/80 rounded-full' /> :
        <>
          <p>Gün Batımı </p>
          <p>{(realData && realData.sys && realData.sys.sunset) && getSunSet(realData.sys.sunset)}</p>
        </>
        }
        </div>
      </div>
    </div>
  )
}

export default CurrentCity