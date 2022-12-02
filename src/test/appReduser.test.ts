import {
    appReducer,
    getLocationTC,
    InitialStateType, LocationType, setLocations, setNotice,
    setStatus,
} from "../app/appReducer";
import {weatherApi} from "../api/weather-api";
import axios from "axios";
import { APIKey } from "../api/instance";

let initialState: InitialStateType = {
    location: {
        name: '',
        lon: 0,
        lat: 0,
        country: '',
        state: ''
    },
    locations:[],
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
beforeEach(() => {
    initialState = {
        location: {
            name: '',
            lon: 0,
            lat: 0,
            country: '',
            state: ''
        },
        locations:[],
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
})

test('get correct coordinates', () => {
        let result:LocationType = {
                name: 'London',
                lon: 51.5073219,
                lat: 51.5073219,
                country: 'GB',
                state: "string"
        }


        const action = getLocationTC.fulfilled(result, 'London', ' requestId')
        const endState = appReducer(initialState, action)

        expect(endState.location.name).toBe('London')
        expect(endState.location.lat).toBe(51.5073219)
        expect(endState.status).toBe('success')

    }
)

test('change status correct', () => {

    const action = setStatus({status: 'error'})
    const endState = appReducer(initialState, action)

    expect(endState.status).toBe('error')
})

test('changing notice correct',()=>{

    const action=setNotice({notice:'New error'})
    const endState=appReducer(initialState,action)

    expect(endState.status).toBe('success')
    expect(endState.notice).toBe('New error')
})

test('set correct location',()=>{

    const location=[{
        name: 'Rome',
        lon: 12.4829,
        lat: 41.8933,
        country: 'IT',
        state: 'Lazio'
    }]

    const action=setLocations({locations:location})
    const endState=appReducer(initialState,action)

    expect(endState.status).toBe('success')
    expect(endState.location.name).toBe('Rome')
})

test('weather data is correct from server',async ()=>{

    const position={
        lon: 12.4829,
        lat: 41.8933,
    }

    const data= await weatherApi.getWeather(position)
    const result=data.status

    expect(result).toBe(200)

})

test('weather data is incorrect from server', async ()=>{

    const position={
        lon: 1002.4829,
        lat: 41.8933,
    }
    let result

    try {
        const data=  await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${APIKey}&units=metric`)
        result=data.data
    }catch (err:any){
        result=err.message
    }

    expect(result).toBe('Request failed with status code 400')
})
