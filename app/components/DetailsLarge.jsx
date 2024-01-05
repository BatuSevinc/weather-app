import React from 'react'
import {getSunRise, getSunSet}  from '../helpers/getSunSetSunRise';

const DetailsLarge = ({datas}) => {
  return (
      <div className='hidden mt-10 lg:flex gap-4'>
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
  )
}

export default DetailsLarge