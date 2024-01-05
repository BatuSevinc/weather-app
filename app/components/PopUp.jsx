import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Sunny } from '@/public';
import AnimatedText from '../helpers/animatedText';
import { LineChart } from '.';
import { getTurkishDateTime } from '../helpers/getTurkishDateTime';
import {translateWeather} from '../helpers/translateWeather';
import {getSunRise, getSunSet}  from '../helpers/getSunSetSunRise';
const PopUp = ({datas,setDatas,setSelectedCity,weeklyData}) => {
  console.log("datas",datas)
  const hours = weeklyData?.map(entry => {
    const dt = new Date(entry.dt_txt);
    return dt.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  });
  console.log(hours)

  const userData = {
    labels: hours || [], 
    datasets: [
      {
        label: "Hava Sıcaklığı °C",
        data: weeklyData?.map((data) => (data?.main?.temp - 273.15).toFixed(0)) || [],
        backgroundColor: [
          "#cf1f37"
        ],
        borderColor: "#cf1f37",
        borderWidth: 2,
      
      },
    ],
  };
  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center cursor-pointer' onClick={() => (setSelectedCity(""),setDatas())}>
    <div className='bg-[#cf1f37] relative rounded-3xl w-[80%] lg:w-[95%] max-w-[1000px] min-h-[600px] h-[600px] cursor-default' onClick={(e) => e.stopPropagation()}>
      <div className='absolute right-4 top-4 cursor-pointer' onClick={() =>(setSelectedCity(""),setDatas())}><IoClose size={24}/></div>
      <div className='absolute font-bold text-3xl md:text-4xl text-center left-[3%] sm:left-[5%] md:left-[6%] leading-normal text-white top-[15%]'>
          <AnimatedText text="PATRION" />
      </div>
      <div className="h-full flex flex-col rounded-3xl pl-[17%] pt-[5%]" style={{ background: 'linear-gradient(to right, #cf1f37 15%, #f6f6f6 15%)' }}>
        <div className='font-semibold'>
          <p className='text-xs'>
        <small>Seçilen Şehir</small>
        </p>
        {(datas && datas.name) && datas.name.split(" ")[0]},  {(datas && datas.sys && datas.sys.country) && (datas.sys.country === "TR" ? "Türkiye" : datas.sys.country)}
        </div>
        <div className='relative flex flex-wrap'>
        <Image
        src={Sunny}
        alt='/'
        width={400}
        height={200}
        className='max-h-[250px] w-[95%] lg:max-w-[400px] shadow-2xl mt-4 h-[250px] bg-cover rounded-xl'
        />
      <div className="absolute inset-0 bg-black opacity-25 max-h-[250px] w-[95%] lg:max-w-[400px] shadow-2xl mt-4 h-[250px] bg-cover rounded-xl z-20"></div>
      <div className='absolute flex flex-col justify-between sm:pr-2 text-center h-full max-h-[250px] w-[90%] lg:max-w-[400px] top-4 z-50'>
      <div className='sm:flex items-center justify-between w-full'>
      {datas && datas.weather && datas.weather[0] && (
        <div className='flex justify-center sm:justify-start items-center'>
          <Image
            src={`http://openweathermap.org/img/wn/${datas.weather[0].icon}@2x.png`}
            alt='weather-icon'
            width='60'
            height='60'
            className='z-10 m-2 bg-white/60 rounded-full'
            priority={true}
          />
          <div className='relative text-2xl font-bold text-white'>
            {(datas && datas.main && datas.main.temp) ? (Number(datas.main.temp) - 273.15).toFixed(0) : "-"}
            <small className='absolute top-[-7px] text-base'>&#176;C</small>
          </div>
        </div>
      )}
      {datas && (
        <div className='text-white'>
          <p>{getTurkishDateTime()}</p>
          <p>{(datas && datas.weather && datas.weather[0] && datas.weather[0].main ) && translateWeather(datas.weather[0].main)}</p>
        </div>
      )}
      </div>
      <div className='text-white flex lg:hidden flex-wrap justify-between items-center px-1 sm:px-2'>
        <div>
          <p className='text-[10px] sm:text-xs'>His. Sıcaklık</p>
          <p className='text-center font-semibold'>{(datas && datas.main && datas.main.feels_like)&&(datas.main.feels_like - 273.15).toFixed(0)}&#176;C</p>
          </div>
          <div>
          <p className='text-[10px] sm:text-xs'>Nem</p>
          <p className='text-center font-semibold'>{(datas && datas.main && datas.main.humidity)&&datas.main.humidity.toFixed(0)}%</p>
          </div>
          <div>
          <p className='text-[10px] sm:text-xs'>Gün Doğumu</p>
          <p className='text-center font-semibold'>{(datas && datas.sys && datas.sys.sunrise) && getSunRise(datas.sys.sunrise)}</p>
          </div>
          <div>
          <p className='text-[10px] sm:text-xs'>Gün Batımı</p>
          <p className='text-center font-semibold'>{(datas && datas.sys && datas.sys.sunrise) && getSunSet(datas.sys.sunset)}</p>
          </div>
      </div>
    </div>
    <div className='w-[100%] max-w-[400px] mx-auto mt-4 pb-4'>
        <LineChart chartData={userData}/>
    </div>
      </div>
      <div className='hidden mt-20 lg:flex gap-4'>
        <div className='flex bg-slate-200 flex-col flex-wrap justify-center items-center min-w-[100px] min-h-[100px] rounded-2xl border border-gray-200'>
          <p className='text-gray-500 text-center text-xs'>Hissedilen <br /> Sıcaklık</p>
          <p className='text-center font-semibold'>{(datas && datas.main && datas.main.feels_like)&&(datas.main.feels_like - 273.15).toFixed(0)}&#176;C</p>
        </div>
        <div className='flex bg-slate-200 flex-col justify-center items-center min-w-[100px] min-h-[100px] rounded-2xl border border-gray-200'>
          <p className='text-gray-500 text-center text-xs'>Nem</p>
          <p className='text-center font-semibold'>{(datas && datas.main && datas.main.humidity)&&datas.main.humidity.toFixed(0)}%</p>
        </div>
        <div className='flex bg-slate-200 flex-col justify-center items-center min-w-[100px] min-h-[100px] rounded-2xl border border-gray-200'>
          <p className='text-gray-500 text-center text-xs'>Gün Doğumu</p>
          <p className='text-center font-semibold'>{(datas && datas.sys && datas.sys.sunrise) && getSunRise(datas.sys.sunrise)}</p>
        </div>
        <div className='flex bg-slate-200 flex-col justify-center items-center min-w-[100px] min-h-[100px] rounded-2xl border border-gray-200'>
          <p className='text-gray-500 text-center text-xs'>Gün Batımı</p>
          <p className='text-center font-semibold'>{(datas && datas.sys && datas.sys.sunrise) && getSunRise(datas.sys.sunset)}</p>
        </div>
      </div>
      </div>
    </div>
  </div>
  )
}

export default PopUp