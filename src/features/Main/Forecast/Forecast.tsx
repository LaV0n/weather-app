import React, { useEffect, useState } from 'react'
import style from './Forecast.module.css'
import { DayWeather } from './DayWeather/DayWeather'
import { useAppSelector } from '../../../app/store'
import { getDay } from '../../../common/utils/getTime'
import { WeatherDataType } from '../../../app/appReducer'

type SortForecastDataType = WeatherDataType[][] | []

export const Forecast = () => {
   const forecastWeatherData = useAppSelector(state => state.app.forecastWeatherData)
   const currentTime = useAppSelector(state => state.app.weatherData.dt)
   const [sortForecastData, setSortForecastData] = useState<SortForecastDataType>([])

   useEffect(() => {
      if (!currentTime) return
      const sortData: SortForecastDataType = [[], [], [], [], [], []]
      forecastWeatherData.map(f => sortData[getDay(f.dt) - getDay(currentTime)].push(f))
      setSortForecastData(sortData)
   }, [forecastWeatherData, currentTime])

   console.log(sortForecastData)

   return (
      <div className={style.block}>
         {sortForecastData.map((d, index) => (
            <DayWeather key={index} forecastData={d} />
         ))}
      </div>
   )
}
