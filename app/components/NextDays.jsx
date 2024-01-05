import React, { useEffect, useState } from 'react'
import filterDailyWeather from '../helpers/dailyWeather'
import { IoArrowUpOutline,IoArrowDownOutline } from "react-icons/io5";
import {translateWeather} from '../helpers/translateWeather';
import Image from 'next/image';

const NextDays = ({weeklyAllData}) => {
  const [allForecastsAt12Hour, setAllForecastsAt12Hour] = useState([]);
  const [allForecastsAt21Hour, setAllForecastsAt21Hour] = useState([]);

  useEffect(() => {
    if (weeklyAllData && weeklyAllData.list) {
      const numberOfDays = 4;
      const daysForecasts = filterDailyWeather(weeklyAllData, numberOfDays);
  
      const updatedAllForecastsAt12Hour = [];
      const updatedAllForecastsAt21Hour = [];
  
      Object.keys(daysForecasts).forEach((day) => {
        const forecastsForDay = daysForecasts[day];
        const forecastsAt12 = forecastsForDay.find((forecast) => {
          const date = new Date(forecast.dt_txt);
          return date.getHours() === 12 && !isToday(date);
        });
  
        if (forecastsAt12) {
          updatedAllForecastsAt12Hour.push(forecastsAt12);
        }
        const forecastsAt21 = forecastsForDay.find((forecast) => {
          const date = new Date(forecast.dt_txt);
          return date.getHours() === 21 && !isToday(date);
        });

        if (forecastsAt21) {
          updatedAllForecastsAt21Hour.push(forecastsAt21);
        }
      });
  
      setAllForecastsAt12Hour(updatedAllForecastsAt12Hour);
      setAllForecastsAt21Hour(updatedAllForecastsAt21Hour);
    }
  }, [weeklyAllData]);
  
  function isToday(date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  return (
    <>
    {
      (allForecastsAt12Hour && allForecastsAt12Hour[0]) &&
    <div className='flex border border-slate-400 rounded-md h-[50px] lg:w-[90%]'>
          <div className='bg-[#cf1f37] flex justify-around items-center min-w-[100px] font-semibold w-[50%] rounded-md'>
            {
              (allForecastsAt12Hour[0].main && allForecastsAt12Hour[0].main.temp) &&
              <div className='flex items-center text-white gap-1'>
           <IoArrowUpOutline/> {(allForecastsAt12Hour[0].main.temp - 273.15).toFixed(0)} &#176;
            </div>
            }
            {
              (allForecastsAt21Hour[0].main && allForecastsAt21Hour[0].main.temp) &&
              <div className='flex items-center text-white gap-1'>
             <div><IoArrowDownOutline /></div>{(allForecastsAt21Hour[0].main.temp - 273.15).toFixed(0)} &#176;
            </div>
            }
          </div>
          <div className='flex items-center justify-around lg:ml-5 min-w-[100px] gap-1 md:gap-2'>
          {allForecastsAt12Hour[0].weather && allForecastsAt12Hour[0].weather[0] &&
          <Image
            src={`http://openweathermap.org/img/wn/${allForecastsAt12Hour[0].weather[0].icon}@2x.png`}
            alt='weather-icon'
            width='30'
            height='30'
            className='z-10 bg-black/60 rounded-full'
            priority={true}
          />
          }
          <div className='text-start'>
            <p className='text-xs font-medium'>{new Date(allForecastsAt12Hour[0].dt_txt).toLocaleDateString('tr-TR', { weekday: 'long' })}</p>
            <p className='text-[10px]'>{translateWeather(allForecastsAt12Hour[0].weather[0].main)}</p>
          </div>
          </div>
        </div>  
      }
      {
      (allForecastsAt12Hour && allForecastsAt12Hour[1]) &&
    <div className='flex border border-slate-400 rounded-md h-[50px] lg:w-[90%]'>
          <div className='bg-[#cf1f37] flex justify-around items-center min-w-[100px] font-semibold w-[50%] rounded-md'>
            {
              (allForecastsAt12Hour[1].main && allForecastsAt12Hour[1].main.temp) &&
              <div className='flex items-center text-white gap-1'>
           <IoArrowUpOutline/> {(allForecastsAt12Hour[1].main.temp - 273.15).toFixed(0)} &#176;
            </div>
            }
            {
              (allForecastsAt21Hour[1].main && allForecastsAt21Hour[1].main.temp) &&
              <div className='flex items-center text-white gap-1'>
             <div><IoArrowDownOutline /></div>{(allForecastsAt21Hour[1].main.temp - 273.15).toFixed(0)} &#176;
            </div>
            }
          </div>
          <div className='flex items-center justify-around lg:ml-5 min-w-[100px] gap-1 md:gap-2'>
          {allForecastsAt12Hour[1].weather && allForecastsAt12Hour[1].weather[0] &&
          <Image
            src={`http://openweathermap.org/img/wn/${allForecastsAt12Hour[1].weather[0].icon}@2x.png`}
            alt='weather-icon'
            width='30'
            height='30'
            className='z-10 bg-black/60 rounded-full'
            priority={true}
          />
          }
          <div className='text-start'>
            <p className='text-xs font-medium'>{new Date(allForecastsAt12Hour[1].dt_txt).toLocaleDateString('tr-TR', { weekday: 'long' })}</p>
            <p className='text-[10px]'>{translateWeather(allForecastsAt12Hour[1].weather[0].main)}</p>
          </div>
          </div>
        </div>  
      }
            {
      (allForecastsAt12Hour && allForecastsAt12Hour[2]) &&
    <div className='flex border border-slate-400 rounded-md h-[50px] lg:w-[90%]'>
          <div className='bg-[#cf1f37] flex justify-around items-center min-w-[100px] font-semibold w-[50%] rounded-md'>
            {
              (allForecastsAt12Hour[2].main && allForecastsAt12Hour[2].main.temp) &&
              <div className='flex items-center text-white gap-1'>
           <IoArrowUpOutline/> {(allForecastsAt12Hour[2].main.temp - 273.15).toFixed(0)} &#176;
            </div>
            }
            {
              (allForecastsAt21Hour[2].main && allForecastsAt21Hour[2].main.temp) &&
              <div className='flex items-center text-white gap-1'>
             <div><IoArrowDownOutline /></div>{(allForecastsAt21Hour[2].main.temp - 273.15).toFixed(0)} &#176;
            </div>
            }
          </div>
          <div className='flex items-center justify-around lg:ml-5 min-w-[100px] gap-1 md:gap-2'>
          {allForecastsAt12Hour[2].weather && allForecastsAt12Hour[2].weather[0] &&
          <Image
            src={`http://openweathermap.org/img/wn/${allForecastsAt12Hour[2].weather[0].icon}@2x.png`}
            alt='weather-icon'
            width='30'
            height='30'
            className='z-10 bg-black/60 rounded-full'
            priority={true}
          />
          }
          <div className='text-start'>
            <p className='text-xs font-medium'>{new Date(allForecastsAt12Hour[2].dt_txt).toLocaleDateString('tr-TR', { weekday: 'long' })}</p>
            <p className='text-[10px]'>{translateWeather(allForecastsAt12Hour[2].weather[0].main)}</p>
          </div>
          </div>
        </div>  
      }
    </>
  )
}

export default NextDays