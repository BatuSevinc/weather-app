"use client"
import { useEffect, useRef, useState } from 'react';
import TurkeyMap from 'turkey-map-react';
import cities from './data/datas.json'
import { City,CurrentCity, PopUp } from './components';
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';

export default function Home() {

  const [activeFilter,setActiveFilter] = useState('map');
  const [filteredCities,setFilteredCities] = useState(cities)
  const [weeklyData,setWeeklyData] = useState()
  const [weeklyAllData,setWeeklyAllData] = useState()
  const [selectedCity,setSelectedCity] = useState()
  const [datas,setDatas] = useState([])
  const [loading,setLoading] = useState(true)
  const [loadingWeather,setLoadingWeather] = useState(true)
  const [position,setPosition] = useState({
    left: null,
    top: null,
    width: null,
    height: null
  })

  const parentRef = useRef(null);


  const handleClickCity = (city) => {
    setSelectedCity(city)
  } 
useEffect(() => {
  const element = parentRef.current?.querySelector('.active');
  if (element) {
    const { top, width, height } = element.getBoundingClientRect();
    const left = element.offsetLeft;
    setPosition({
      left,
      top,
      width,
      height,
    });
  }
}, []);

const handleClick = (e, activeFilt) => {
  setActiveFilter(activeFilt);
  const { top, width, height } = e.currentTarget.getBoundingClientRect();
  const left = e.currentTarget.offsetLeft;
  setPosition({
    left,
    top,
    width,
    height,
  });
};
useEffect(() => {
  if(selectedCity){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${
      selectedCity.name || selectedCity
    }&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    axios.get(url).then((response) => {
      setDatas(response.data)
      setLoading(false)
    });
    const weeklyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${
      selectedCity.name || selectedCity
    }&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    axios.get(weeklyUrl).then((response) => {
      setWeeklyData(response.data?.list?.slice(0,8))
      setWeeklyAllData(response.data)
      setLoadingWeather(false)
    });
  }
},[selectedCity])

const [showTooltip, setShowTooltip] = useState(true);

const handleResize = () => {
  if (window.innerWidth <= 1024) {
    setShowTooltip(false);
  } else {
    setShowTooltip(true);
  }
};

useEffect(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

  return (
    <div className="relative pt-10 pb-4 h-screen">
      <div className='flex flex-col'>

      <h1 className=" text-2xl md:text-3xl lg:text-5xl font-semibold text-white text-center mb-8">Patrion - İllere Göre Hava Durumu</h1>
      <div
        className="sticky top-4 flex justify-center bg-white border-2 p-1 rounded-full text-[#cf1f37] self-center shadow-xl"
        ref={parentRef}
      >
        <div
          className="selection bg-[#cf1f37] rounded-full"
          style={
            {
              '--left': `${position.left}px`,
              '--top': `${position.top}px`,
              '--width': `${position.width}px`,
              '--height': `${position.height}px`,
            }
          }
        />

        <button
          className={`py-2 px-4 font-semibold text-lg relative duration-100 ${
            !position.left ? 'bg-[#cf1f37] rounded-full' : ''
          } ${activeFilter === 'map' ? 'active text-white' : ''}`}
          onClick={(e) => (handleClick(e, 'map'),setFilteredCities(cities))}
          
        >
          Harita
          
        </button>
        <button
          className={`py-2 px-4 font-semibold text-lg relative duration-100 ${
            activeFilter === 'cities' ? 'active text-white' : ''
          }`}
          onClick={(e) => handleClick(e, 'cities')}
        >
          Şehir Listesi
        </button>
      </div>
      </div>
      {
        activeFilter === "map" ?
        <div className='lg:-mt-10'>
        <TurkeyMap
        hoverable={true}
        customStyle={{idleColor:"#cf1f37",hoverColor:"#b43a42"}}
        showTooltip={showTooltip}
        onClick={(city) => handleClickCity(city)}
        viewBox={{ top: 0, left: 80, width: 1050, height: 585} }
        />
        </div>
        :
        <div className="sm:flex sm:justify-center pb-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:justify-between">
          {filteredCities.map((city,index) => (
            <City key={index} name={city.name} no={city.no} onClickCity={handleClickCity}/>
          ))}
        </div>
      </div>
      }
      {
        activeFilter === "map" &&
      <div className='flex justify-center'>
      <CurrentCity/>
      </div>
      }
     {
      selectedCity &&
       <PopUp datas={datas} weeklyData={weeklyData} setDatas={setDatas} loading={loading} setLoading={setLoading} loadingWeather={loadingWeather} setLoadingWeather={setLoadingWeather} setSelectedCity={setSelectedCity} weeklyAllData={weeklyAllData} setWeeklyAllData={setWeeklyAllData}/>
     }
    </div>
  )
}
