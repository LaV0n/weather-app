import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {locationAPI} from "../api/location-api";

type StatusType = 'success' | 'loading' | 'error'


export type InitialStateType = {
    locationName: string
    location: {
        lon: number,
        lat: number,
        country:string,
        state:string
    }
    status: StatusType
    notice: string,

}

const initialState: InitialStateType = {
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
            state.location.lon = action.payload.lon
            state.location.lat = action.payload.lat
            state.locationName=action.payload.location
            state.location.state=action.payload.state
            state.location.country=action.payload.country
            state.status = 'success'
        })
        builder.addCase(getLocationTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = 'error'
        })
    }
})

export const appReducer = slice.reducer
export const { setStatus} = slice.actions

export const getLocationTC = createAsyncThunk<any, string, { rejectValue: { error: string } }>
('location/getLocation',
    async (location, {dispatch, rejectWithValue}) => {
        dispatch(setStatus({status: 'loading'}))
        try {
            const res = await locationAPI.getLocation(location)
            return {
                lon: res.data[0].lon,
                lat: res.data[0].lat,
                location:res.data[0].name,
                country:res.data[0].country,
                state:res.data[0].state
            }
        } catch (error: any) {
            return rejectWithValue({error})
        }
    })