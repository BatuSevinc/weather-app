import Image from 'next/image';
import React, { useEffect } from 'react'
import { IoClose } from "react-icons/io5";
import { bgImg } from '@/public';
import AnimatedText from '../helpers/animatedText';
import Skeleton from 'react-loading-skeleton'
import { DetailsLarge,DetailsMobile, LineChart, NextDays } from '.';
import { getTurkishDateTime } from '../helpers/getTurkishDateTime';
import {translateWeather} from '../helpers/translateWeather';

const PopUp = ({datas,setDatas,setSelectedCity,weeklyData,weeklyAllData,setWeeklyAllData,loading,setLoading,loadingWeather,setLoadingWeather}) => {
  const hours = weeklyData?.map(entry => {
    const dt = new Date(entry.dt_txt);
    return dt.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  });

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
  useEffect(() => {
    if(datas){
      setLoading(false)
    } else {
      setLoading(true)
    }
  },[datas])
  useEffect(() => {
    if(weeklyAllData){
      setLoadingWeather(false)
    } else {
      setLoadingWeather(true)
    }
  },[weeklyAllData])
  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center cursor-pointer' onClick={() => (setSelectedCity(""),setDatas(),setWeeklyAllData())}>
    <div className='bg-[#cf1f37] relative rounded-3xl w-[80%] lg:w-[95%] max-w-[1000px] min-h-[700px] h-[600px] cursor-default' onClick={(e) => e.stopPropagation()}>
      <div className='absolute right-4 top-4 cursor-pointer' onClick={() =>(setSelectedCity(""),setDatas(),setWeeklyAllData())}><IoClose size={24}/></div>
      <div className='absolute font-bold text-3xl md:text-4xl text-center left-[3%] sm:left-[5%] md:left-[6%] leading-normal text-white top-[20%] md:top-[23%]'>
          <AnimatedText text="PATRION" />
      </div>
      <div className="h-full flex flex-col rounded-3xl pl-[17%] pt-[5%] overflow-auto" style={{ background: 'linear-gradient(to right, #cf1f37 15%, #f6f6f6 15%)' }}>
        <div className='font-semibold'>
          <p className='text-xs'>
          {
          loading ? (
    <Skeleton width={50} height={10} className='z-10 bg-white/10' />
  ) :
        <small>Seçilen Şehir</small>
        }
        </p>
        {
  loading ? (
    <Skeleton width={100} height={20} className='z-10 bg-white/10' />
  ) : (
    <>
      {datas && datas.name && datas.sys && datas.sys.country && (
        <>
          {datas.name.split(" ")[0]}, {datas.sys.country === "TR" ? "Türkiye" : datas.sys.country}
        </>
      )}
    </>
  )
}
        </div>
        { loading ? (
     <div className='relative flex flex-wrap'>
    <Skeleton width={400} height={200} className='max-h-[250px] w-[95%] lg:max-w-[400px] shadow-2xl mt-4 h-[250px] bg-cover rounded-xl' />
    <Skeleton width={400} height={200}  className='max-h-[250px] w-[95%] lg:max-w-[400px] shadow-2xl mt-4 h-[250px] bg-cover rounded-xl' />
  </div>
  ) :
          <div className='relative flex flex-wrap'>
        <Image
        src={bgImg}
        alt='/'
        width={400}
        height={200}
        className='max-h-[250px] w-[95%] lg:max-w-[400px] shadow-2xl mt-4 h-[250px] bg-cover rounded-xl'
        />
      <div className="absolute inset-0 bg-black opacity-25 max-h-[250px] w-[95%] lg:max-w-[400px] shadow-2xl mt-4 h-[250px] bg-cover rounded-xl z-20"></div>
      <div className='absolute flex flex-col justify-between sm:pr-2 text-center h-[250px] sm:h-full max-h-[250px] w-[90%] lg:max-w-[400px] top-4 z-50'>
      <div className='sm:flex items-center justify-between w-full'>
      { datas && datas.weather && datas.weather[0] && (
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
      { datas && (
        <div className='text-white'>
          <p>{getTurkishDateTime()}</p>
          <p>{(datas && datas.weather && datas.weather[0] && datas.weather[0].main ) && translateWeather(datas.weather[0].main)}</p>
        </div>
      )}
      </div>
        <DetailsMobile datas={datas}/>
    </div>
    <div className={`w-[100%] shadow-2xl rounded-xl mt-10 max-w-[400px] mx-auto ${!loading ? "" : "mt-4 pb-4"}`}>
        <LineChart chartData={userData}/>
    </div>
      </div>
      }
      <div className='lg:mt-20 flex justify-between px-2 items-center'>
        { loading ?
          <div className='hidden mt-10 lg:flex gap-4'>
          <Skeleton width={100} height={100} className='bg-slate-200 flex-col flex-wrap justify-center items-center min-w-[100px] min-h-[100px] rounded-2xl border border-gray-200' />
          <Skeleton width={100} height={100} className='bg-slate-200 flex-col flex-wrap justify-center items-center min-w-[100px] min-h-[100px] rounded-2xl border border-gray-200' />
          <Skeleton width={100} height={100} className='bg-slate-200 flex-col flex-wrap justify-center items-center min-w-[100px] min-h-[100px] rounded-2xl border border-gray-200' />
          <Skeleton width={100} height={100} className='bg-slate-200 flex-col flex-wrap justify-center items-center min-w-[100px] min-h-[100px] rounded-2xl border border-gray-200' />

          </div>
          :
          <div className='hidden lg:grid w-[50%]'>
      <DetailsLarge datas={datas}/>
      </div>
      }
      
      <div className='lg:w-[40%] flex flex-wrap mt-10 md:mt-5 lg:mt-0 lg:flex-col gap-2 justify-center rounded-lg py-2 items-center bg-[#f5f4fc] h-full'>
        {
          loadingWeather ? 
          <>
          <Skeleton width={300} height={50} className='rounded-md h-[50px] lg:w-[90%]' />
          <Skeleton width={300} height={50} className='rounded-md h-[50px] lg:w-[90%]' />
          <Skeleton width={300} height={50} className='rounded-md h-[50px] lg:w-[90%]' />
          </>
          :
          <NextDays weeklyAllData={weeklyAllData}/>
        }
      </div>
      </div>
      </div>
    </div>
  </div>
  )
}

export default PopUp