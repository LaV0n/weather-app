import React from 'react'
import style from './HourWeather.module.scss'
import { WeatherDataType } from '../../../../../app/appReducer'
import { getTime } from '../../../../../common/utils/getTime'
import rainIcon from '../../../../../assets/icons/icons8-umbrella-50.png'
import humidityIcon from '../../../../../assets/icons/icons8-humidity-50.png'
import pressureIcon from '../../../../../assets/icons/icons8-pressure-50.png'

type HourWeatherType = {
   hourWeather: WeatherDataType
}

export const HourWeather = ({ hourWeather }: HourWeatherType) => {
   return (
      <div className={style.block}>
         <div className={style.time}>{getTime(hourWeather.dt).slice(0, -3)}</div>
         <div className={style.temperatureBlock}>
            <img
               src={`http://openweathermap.org/img/wn/${hourWeather.weather[0].icon}@2x.png`}
               alt={''}
               className={style.weatherImg}
            />
            <div className={style.temperatureData}>
               <div>{Math.floor(hourWeather.main.temp)} °C</div>
               <div className={style.weatherData}>{hourWeather.weather[0].main}</div>
            </div>
         </div>
         <div className={style.description}>
            <img src={rainIcon} alt={''} />
            {Math.floor(100 * Number(hourWeather.pop))} %
         </div>
         <div className={style.description}>
            <img src={humidityIcon} alt={''} />
            {hourWeather.main.humidity} %
         </div>
         <div className={style.description}>
            <img src={pressureIcon} alt={''} />
            {hourWeather.main.pressure} hPa
         </div>
      </div>
   )
}
