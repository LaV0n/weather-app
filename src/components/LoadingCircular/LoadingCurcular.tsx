import {Backdrop, CircularProgress} from "@mui/material";
import {useState} from "react";
import {useAppSelector} from "../../app/store";

export const LoadingCurcular=()=>{

    const [backDrop,setBackDrop]=useState(true)
    const status = useAppSelector(state=>state.app.status)

    return(
        <div>
            {status === 'loading' &&
                <Backdrop
                sx={{color: '#fff', zIndex: 5}}
                open={status === 'loading'}
                onClick={() => setBackDrop(!backDrop)}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            }
        </div>
    )
}