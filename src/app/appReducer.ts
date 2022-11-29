import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {locationAPI} from "../api/location-api";
import {weatherApi} from "../api/weather-api";

type StatusType = 'success' | 'loading' | 'error'
export type WeatherDataType = {
    weather: [
        {
            main: string
            description: string,
            icon: string
        }
    ],
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
        sea_level: number
        grnd_level: number
    },
    visibility: number
    wind: {
        speed: number
        deg: number
        gust: number
    },
    clouds: {
        all: number
    },
    dt: number
    sys: {
        sunrise: number
        sunset: number
    },
    timezone: number
}

export type InitialStateType = {
    locationName: string
    location: {
        lon: number,
        lat: number,
        country: string,
        state: string
    }
    status: StatusType
    notice: string,
    weatherData: WeatherDataType
}

const initialState: InitialStateType = {
    locationName: '',
    location: {
        lon: 0,
        lat: 0,
        country: '',
        state: ''
    },
    status: 'success',
    notice: '',
    weatherData: {
        weather: [
            {
                main: '',
                description: '',
                icon: '',
            }
        ],
        main: {
            temp: 0,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            humidity: 0,
            sea_level: 0,
            grnd_level: 0,
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
    }
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ status: StatusType }>) {
            state.status = action.payload.status
        }
    },
    extraReducers: builder => {
        builder.addCase(getLocationTC.fulfilled, (state, action) => {
            state.location.lon = action.payload.location.lon
            state.location.lat = action.payload.location.lat
            state.location.state = action.payload.location.state
            state.location.country = action.payload.location.country
            state.locationName = action.payload.locationName
            state.weatherData=action.payload.weatherData

            state.status = 'success'
        })
        builder.addCase(getLocationTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = 'error'
        })
    }
})

export const appReducer = slice.reducer
export const {setStatus} = slice.actions

export const getLocationTC = createAsyncThunk<WeatherResultData, string, { rejectValue: { error: string } }>
('location/getLocation',
    async (location, {dispatch, rejectWithValue}) => {
        dispatch(setStatus({status: 'loading'}))
        try {
            const res = await locationAPI.getLocation(location)
            const data = await weatherApi.getWeather({lon: res.data[0].lon, lat: res.data[0].lat})
            let result: WeatherResultData = {
                weatherData: data.data,
                locationName: res.data[0].name,
                location: {
                    lon: res.data[0].lon,
                    lat: res.data[0].lat,
                    country: res.data[0].country,
                    state: res.data[0].state
                }
            }
            return result
        } catch (error: any) {
            return rejectWithValue({error})
        }
    })

export type WeatherResultData = {
    weatherData: WeatherDataType,
    locationName: string
    location: {
        lon: number,
        lat: number,
        country: string,
        state: string
    }
}