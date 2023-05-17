import styles from './Main.module.scss'
import React, { useState } from 'react'
import { useAppSelector } from '../../app/store'
import { BackGroundSelector } from '../../common/utils/backGroundSelector'
import { AlertMessage } from '../../components/AlertMessage/AlertMessage'
import { LoadingCurcular } from '../../components/LoadingCircular/LoadingCurcular'
import { Forecast } from './Forecast/Forecast'
import { Weather } from './Weather/Weather'
import { setLongDiv } from '../../common/utils/setLongDiv'

export const Main = () => {
   const weatherData = useAppSelector(state => state.app.weatherData)
   const [moreWeatherData, setMoreWeatherData] = useState(false)
   const [longWeatherDiv, setLongWeatherDiv] = useState(false)
   const [moreForecastData, setMoreForecastData] = useState(false)
   const [longForecastDiv, setLongForecastDiv] = useState(false)

   const setMoreWeatherHandler = () => {
      setLongDiv({
         value: moreWeatherData,
         setValue: setMoreWeatherData,
         setLongDiv: setLongWeatherDiv,
      })
   }
   const setMoreForecastHandler = () => {
      setLongDiv({
         value: moreForecastData,
         setValue: setMoreForecastData,
         setLongDiv: setLongForecastDiv,
      })
   }

   return (
      <div
         className={styles.container}
         style={{
            background: `url(${BackGroundSelector(weatherData.weather[0].icon)})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
         }}
      >
         <Weather
            longDiv={longWeatherDiv}
            more={moreWeatherData}
            setMoreHandler={setMoreWeatherHandler}
            hidden={longForecastDiv}
         />
         <Forecast
            longDiv={longForecastDiv}
            more={moreForecastData}
            setMoreHandler={setMoreForecastHandler}
            hidden={longWeatherDiv}
         />
         <AlertMessage />
         <LoadingCurcular />
      </div>
   )
}
