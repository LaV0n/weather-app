import { APIKey, instance } from './instance'
import { WeatherDataType } from '../app/appReducer'

export type PositionType = {
   lon: number
   lat: number
}

export const weatherApi = {
   getWeather(position: PositionType) {
      return instance.get<WeatherDataType>(
         `/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${APIKey}&units=metric`
      )
   },
   getWeatherForecast(position: PositionType) {
      return instance.get(
         `data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&cnt=7&appid=${APIKey}`
      )
   },
}
