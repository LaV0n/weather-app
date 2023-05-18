import React from 'react'
import styles from './Weather.module.scss'
import { SearchPanel } from '../../../components/SearchPanel/SearchPanel'
import NorthIcon from '@mui/icons-material/North'
import LightModeIcon from '@mui/icons-material/LightMode'
import { getTime } from '../../../common/utils/getTime'
import WbTwilightIcon from '@mui/icons-material/WbTwilight'
import { Button } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useAppSelector } from '../../../app/store'

type WeatherType = {
   longDiv: boolean
   more: boolean
   setMoreHandler: () => void
   hidden: boolean
}

export const Weather = ({ longDiv, more, setMoreHandler, hidden }: WeatherType) => {
   const locationName = useAppSelector(state => state.app.location.name)
   const weatherData = useAppSelector(state => state.app.weatherData)
   const country = useAppSelector(state => state.app.location.country)
   const state = useAppSelector(state => state.app.location.state)
   const status = useAppSelector(state => state.app.status)

   return (
      <div
         className={longDiv ? styles.containerLong : styles.container}
         style={{ display: hidden ? 'none' : 'flex' }}
      >
         <div className={styles.block}>
            <div className={styles.searchBlock}>
               <SearchPanel />
            </div>
            {status === 'success' && (
               <div className={styles.dataBlock}>
                  <div className={styles.cityName}>
                     Weather now in {locationName}
                     <div className={styles.country}>
                        <div>
                           country: <span>{country}</span>
                        </div>
                        {state && (
                           <div>
                              state: <span>{state}</span>
                           </div>
                        )}
                     </div>
                  </div>
                  <div className={styles.weather}>
                     <div className={styles.temperature}>{weatherData.main.temp} °C</div>
                     {more && (
                        <div>
                           <div>
                              <span>min:</span>
                              {weatherData.main.temp_min} °C
                              <span>max:</span> {weatherData.main.temp_max} °C
                           </div>
                           <div>
                              <span>feels like:</span> {weatherData.main.feels_like} °C
                           </div>
                        </div>
                     )}
                     <div className={styles.clouds}>
                        <div className={styles.iconBlock}>
                           <img
                              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                              alt={''}
                           />
                           {weatherData.weather[0].main}
                        </div>
                        {more && <div>Cloudiness: {weatherData.clouds.all}%</div>}
                     </div>
                     <div>Humidity: {weatherData.main.humidity} %</div>
                     {more && (
                        <div>
                           <div>Pressure: {weatherData.main.pressure} hPa</div>
                           <div>Visibility: {weatherData.visibility} meters</div>
                        </div>
                     )}
                     <div>Wind Speed: {weatherData.wind.speed} meter/sec</div>
                     {more && (
                        <div>
                           <div className={styles.windDirecrion}>
                              <div>Wind direction:</div>
                              <div className={styles.compassBlock}>
                                 <NorthIcon
                                    style={{
                                       transform: `rotate(${weatherData.wind.deg}deg)`,
                                       filter: 'invert(1)',
                                    }}
                                 />
                              </div>
                           </div>
                           <div>Wind gust: {weatherData.wind.gust} meter/sec</div>
                           <div>
                              <LightModeIcon />
                              Sunrise time: {getTime(weatherData.sys.sunrise)}
                           </div>
                           <div>
                              <WbTwilightIcon />
                              Sunset time: {getTime(weatherData.sys.sunset)}
                           </div>
                           <div>
                              <span>Weather data for the time:</span> {getTime(weatherData.dt)}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>
         <Button onClick={setMoreHandler} sx={{ color: 'white' }}>
            {more ? <ExpandLessIcon /> : <ExpandMoreIcon />}
         </Button>
      </div>
   )
}
