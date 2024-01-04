"use client"
import { useEffect, useRef, useState } from 'react';
import TurkeyMap from 'turkey-map-react';
import cities from './data/datas.json'
import City from './components/City';

export default function Home() {

  const [activeFilter,setActiveFilter] = useState('map');
  const [filteredCities,setFilteredCities] = useState(cities)
  const [position,setPosition] = useState({
    left: null,
    top: null,
    width: null,
    height: null
  })

  const parentRef = useRef(null);


  const handleClickCity = (city) => {
    console.log(city)
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

  return (
    <div className=" mt-20 mb-4">
      <div className='flex flex-col'>

      <h1 className=" text-5xl font-semibold text-white text-center mb-8">Patrion - İllere Göre Hava Durumu</h1>
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
        <TurkeyMap
        hoverable={true}
        customStyle={{idleColor:"#cf1f37",hoverColor:"#b43a42"}}
        showTooltip={true}
        onClick={(city) => handleClickCity(city)}
        />
        :
        <div className="sm:flex sm:justify-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:justify-between">
          {filteredCities.map((city,index) => (
            <City key={index} name={city.name} no={city.no} onClickCity={handleClickCity}/>
          ))}
        </div>
      </div>
      }
    </div>
  )
}
