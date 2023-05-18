import React, { useEffect, useState } from 'react'
import style from './DayWeather.module.scss'
import { WeatherDataType } from '../../../../app/appReducer'
import { getDate, getWeekDay } from '../../../../common/utils/getTime'
import { HourWeather } from './HourWeather/HourWeather'

type DayWeatherType = {
   forecastData: WeatherDataType[]
   longDiv: boolean
}
export const DayWeather = ({ forecastData, longDiv }: DayWeatherType) => {
   const maxTemp = forecastData.reduce((acc, f) => (acc.main.temp > f.main.temp ? acc : f))
   const [width, setWidth] = useState(window.innerWidth)

   useEffect(() => {
      window.addEventListener('resize', () => setWidth(window.innerWidth))
      return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
   }, [])

   return (
      <div className={longDiv ? style.dataBlockLongDiv : style.dayBlock}>
         <div className={style.weekDay}>
            {width > 1200
               ? getWeekDay(forecastData[0].dt)
               : getWeekDay(forecastData[0].dt).slice(0, 3)}
         </div>
         <div className={style.dataBlock}>{getDate(forecastData[0].dt)}</div>
         {longDiv ? (
            <div className={style.hourForecast}>
               {forecastData.map(d => (
                  <HourWeather key={d.dt} hourWeather={d} />
               ))}
            </div>
         ) : (
            <div>
               <div className={style.description}>
                  <img
                     src={`http://openweathermap.org/img/wn/${maxTemp.weather[0].icon}@2x.png`}
                     alt={''}
                  />
                  {Math.floor(maxTemp.main.temp)} °C
               </div>
               <div>{maxTemp.weather[0].main}</div>
            </div>
         )}
      </div>
   )
}
