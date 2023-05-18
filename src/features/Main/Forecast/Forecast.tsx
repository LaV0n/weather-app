import React, { useEffect, useState } from 'react'
import style from './Forecast.module.scss'
import { DayWeather } from './DayWeather/DayWeather'
import { useAppSelector } from '../../../app/store'
import { getDay } from '../../../common/utils/getTime'
import { WeatherDataType } from '../../../app/appReducer'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button } from '@mui/material'

type SortForecastDataType = WeatherDataType[][] | []
type ForecastType = {
   longDiv: boolean
   more: boolean
   setMoreHandler: () => void
   hidden: boolean
}

export const Forecast = ({ longDiv, more, setMoreHandler, hidden }: ForecastType) => {
   const forecastWeatherData = useAppSelector(state => state.app.forecastWeatherData)
   const currentTime = useAppSelector(state => state.app.weatherData.dt)
   const [sortForecastData, setSortForecastData] = useState<SortForecastDataType>([])

   useEffect(() => {
      if (!currentTime) return
      const sortData: SortForecastDataType = [[], [], [], [], [], []]
      forecastWeatherData.map(f => sortData[getDay(f.dt) - getDay(currentTime)].push(f))
      setSortForecastData(sortData)
   }, [forecastWeatherData, currentTime])

   return (
      <div
         className={longDiv ? style.containerLong : style.container}
         style={{ display: hidden ? 'none' : 'flex' }}
      >
         <div className={style.block}>
            {sortForecastData.map((d, index) => (
               <DayWeather key={index} forecastData={d} longDiv={longDiv} />
            ))}
         </div>
         <Button onClick={setMoreHandler} sx={{ color: 'white', height: 30 }}>
            {more ? <ExpandLessIcon /> : <ExpandMoreIcon />}
         </Button>
      </div>
   )
}
