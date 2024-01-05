import React from 'react'
import {getSunRise, getSunSet}  from '../helpers/getSunSetSunRise';
const DetailsMobile = ({datas}) => {
  return (
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
  )
}

export default DetailsMobile