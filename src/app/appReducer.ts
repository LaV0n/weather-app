import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { locationAPI } from '../api/location-api'
import { PositionType, weatherApi } from '../api/weather-api'
import { errorAsString } from '../common/utils/errorAsString'

export type StatusType = 'success' | 'loading' | 'error' | 'initial'
export type LocationType = {
   name: string
   lon: number
   lat: number
   country: string
   state: string
}
export type WeatherDataType = {
   weather: [
      {
         main: string
         description: string
         icon: string
      }
   ]
   main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
   }
   visibility: number
   pop?: number
   wind: {
      speed: number
      deg: number
      gust: number
   }
   clouds: {
      all: number
   }
   dt: number
   sys: {
      sunrise: number
      sunset: number
   }
   timezone: number
}

export type InitialStateType = {
   location: LocationType
   locations: LocationType[]
   status: StatusType
   notice: string
   weatherData: WeatherDataType
   forecastWeatherData: WeatherDataType[]
}

const initialState: InitialStateType = {
   location: {
      name: '',
      lon: 0,
      lat: 0,
      country: '',
      state: '',
   },
   locations: [],
   status: 'initial',
   notice: '',
   weatherData: {
      weather: [
         {
            main: '',
            description: '',
            icon: '',
         },
      ],
      main: {
         temp: 0,
         feels_like: 0,
         temp_min: 0,
         temp_max: 0,
         pressure: 0,
         humidity: 0,
      },
      visibility: 0,
      wind: {
         speed: 0,
         deg: 0,
         gust: 0,
      },
      clouds: {
         all: 0,
      },
      dt: 0,
      sys: {
         sunrise: 0,
         sunset: 0,
      },
      timezone: 0,
   },
   forecastWeatherData: [],
}

const slice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      setStatus(state, action: PayloadAction<{ status: StatusType }>) {
         state.status = action.payload.status
      },
      setNotice(state, action: PayloadAction<{ notice: string }>) {
         state.notice = action.payload.notice
      },

      setLocations(state, action: PayloadAction<{ locations: LocationType[] }>) {
         if (action.payload.locations.length !== 1) {
            state.locations = action.payload.locations
         } else {
            state.locations = action.payload.locations
            state.location = action.payload.locations[0]
         }
      },
      setForecastWeatherData(state, action: PayloadAction<WeatherDataType[]>) {
         state.forecastWeatherData = action.payload
      },
   },
   extraReducers: builder => {
      builder.addCase(getLocationTC.fulfilled, (state, action) => {
         if (action.payload.name) state.location = action.payload
         state.status = 'success'
      })
      builder.addCase(getLocationTC.rejected, (state, action) => {
         state.notice = action.payload
            ? action.payload.error
            : 'unknown error, please try again later'
         state.status = 'error'
      })
      builder.addCase(getWeatherDataTC.fulfilled, (state, action) => {
         state.weatherData = action.payload
         state.status = 'success'
      })
      builder.addCase(getWeatherDataTC.rejected, (state, action) => {
         state.notice = action.payload
            ? action.payload.error
            : 'unknown error, please try again later'
         state.status = 'error'
      })
   },
})

export const appReducer = slice.reducer
export const { setStatus, setLocations, setNotice, setForecastWeatherData } = slice.actions

export const getLocationTC = createAsyncThunk<
   LocationType,
   string,
   { rejectValue: { error: string } }
>('app/getLocation', async (location, { dispatch, rejectWithValue }) => {
   dispatch(setStatus({ status: 'loading' }))
   try {
      const res = await locationAPI.getLocation(location)
      let result: LocationType = {
         name: '',
         lon: 0,
         lat: 0,
         country: '',
         state: '',
      }
      if (res.data.length === 1) {
         result = {
            name: res.data[0].name,
            lon: res.data[0].lon,
            lat: res.data[0].lat,
            country: res.data[0].country,
            state: res.data[0].state,
         }
         dispatch(getWeatherDataTC({ lon: res.data[0].lon, lat: res.data[0].lat }))
      } else if (res.data.length === 0) {
         dispatch(setNotice({ notice: 'Invalid City Name' }))
         dispatch(setStatus({ status: 'error' }))
      } else {
         dispatch(setLocations({ locations: res.data }))
      }
      return result
   } catch (err) {
      const error = errorAsString(err)
      return rejectWithValue({ error })
   }
})

export const getWeatherDataTC = createAsyncThunk<
   WeatherDataType,
   PositionType,
   { rejectValue: { error: string } }
>('app/getWeatherData', async (position, { dispatch, rejectWithValue }) => {
   dispatch(setStatus({ status: 'loading' }))
   try {
      const data = await weatherApi.getWeather(position)
      const forecast = await weatherApi.getWeatherForecast(position)
      dispatch(setForecastWeatherData(forecast.data.list))
      return data.data
   } catch (err) {
      const error = errorAsString(err)
      return rejectWithValue({ error })
   }
})
