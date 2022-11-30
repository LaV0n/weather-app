import {
    appReducer,
    getLocationTC,
    InitialStateType, LocationType,
    setStatus,
} from "../app/appReducer";

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

    }
)

test('change status correct', () => {

    const action = setStatus({status: 'error'})
    const endState = appReducer(initialState, action)

    expect(endState.status).toBe('error')
})