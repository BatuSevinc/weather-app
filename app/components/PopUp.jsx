import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Sunny } from '@/public';

const AnimatedText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText((prevText) => prevText + text[currentIndex]);
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(interval);
        setDisplayedText('PATRION');
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);
  const letterColors = ['black', 'white', 'black', 'black', 'black', 'black', 'black'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {displayedText.split('').map((letter, index) => (
        <span key={index} className='mb-4' style={{ color: letterColors[index] }}>{letter}</span>
      ))}
    </div>
  );
};


const PopUp = ({datas,setDatas,setSelectedCity}) => {
  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
    <div className='bg-[#cf1f37] relative rounded-3xl w-[80%] max-w-[900px] h-[600px]'>
      <div className='absolute font-bold text-3xl md:text-4xl text-center left-[3%] sm:left-[5%] md:left-[6%] leading-normal text-white top-[15%]'>
          <AnimatedText text="PATRION" />
      </div>
      <div className="h-full flex flex-col rounded-3xl pl-[17%] pt-[5%]" style={{ background: 'linear-gradient(to right, #cf1f37 15%, #f6f6f6 15%)' }}>
        <p className='font-semibold'>
          <p className='text-xs'>
        <small>Seçilen Şehir</small>
        </p>
        Los angeles,CA,USA
        </p>
        <div className='relative'>
        <Image
        src={Sunny}
        width={400}
        height={200}
        className='max-h-[250px] w-[90%] max-w-[400px] shadow-2xl mt-4 h-[250px] bg-cover rounded-xl'
        />
      <div className="absolute inset-0 bg-black opacity-25 max-h-[250px] w-[90%] max-w-[400px] shadow-2xl mt-4 h-[250px] bg-cover rounded-xl z-20"></div>
      <div className='absolute sm:flex pr-2 text-center max-h-[250px] w-[90%] max-w-[400px] justify-between items-center top-4 z-50'>
      {datas && datas.weather && datas.weather[0] && (
        <div className='flex justify-center sm:justify-start items-center'>
          <Image
            src={`http://openweathermap.org/img/wn/${datas.weather[0].icon}@2x.png`}
            alt='/'
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
          <p>Monday, 07:43 AM</p>
          <p>Partly Cloudy</p>
        </div>
      )}
    </div>
      </div>
      </div>
    </div>
  </div>
  )
}

export default PopUp