import React from 'react'
import style from './DayWeather.module.css'
import { WeatherDataType } from '../../../../app/appReducer'
import { getDay, getTime } from '../../../../common/utils/getTime'

type DayWeatherType = {
   forecastData: WeatherDataType[]
}
export const DayWeather = ({ forecastData }: DayWeatherType) => {
   return (
      <div className={style.day}>
         <div className={style.description}>{getDay(forecastData[0].dt)}</div>
         {forecastData.map(d => (
            <div key={d.dt} className={style.description}>
               {getTime(d.dt) === '14:00:00' && d.weather[0].main} - {Math.floor(d.main.temp - 273)}
            </div>
         ))}
      </div>
   )
}
