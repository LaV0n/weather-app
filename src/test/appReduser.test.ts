import {appReducer, getLocationTC, InitialStateType, setStatus} from "../app/appReducer";

let initialState: InitialStateType = {
    locationName: '',
    location: {
        lon: 0,
        lat: 0,
        country:'',
        state:''
    },
    status: 'success',
    notice: ''
}
beforeEach(()=>{
    initialState = {
        locationName: '',
        location: {
            lon: 0,
            lat: 0,
            country:'',
            state:''
        },
        status: 'success',
        notice: ''
    }
})

test('get correct coordinates', () => {
    let result = {
        lon: -0.1276474,
        lat: 51.5073219,
        location: 'London',
        country:'GB',
        state:'England'
    }
    const action = getLocationTC.fulfilled(result, 'London', ' requestId')
    const endState = appReducer(initialState, action)

    expect(endState.locationName).toBe('London')
    expect(endState.location.lat).toBe(51.5073219)

})

test('change status correct',()=>{

    const action=setStatus({status:'error'})
    const endState=appReducer(initialState,action)

    expect(endState.status).toBe('error')
})