import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type StatusType='success' | 'loading' | 'error'


type InitialStateType = {
    location: string
    status:StatusType
}

const initialState: InitialStateType = {
    location: '',
    status:'success'
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLocation(state, action: PayloadAction<{ location: string }>) {
            state.location = action.payload.location
        }
    }
})

export const appReducer = slice.reducer
export const {setLocation}=slice.actions