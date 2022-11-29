import styles from "./SearchPanel.module.scss";
import {IconButton, InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {KeyboardEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/store";
import {useNavigate} from "react-router-dom";
import {getLocationTC, getWeatherDataTC} from "../app/appReducer";

export const SearchPanel=()=>{

    const [value, setValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const position=useAppSelector(state => state.app.location)

    const searchHandler = () => {
        dispatch(getLocationTC(value))
        dispatch(getWeatherDataTC({lon:position.lon,lat:position.lat}))
        setValue('')
        navigate('/main')
    }

    const enterPressHandler = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && value.length !== 0) {
            searchHandler()
        }
    }

    return(
            <div
                className={styles.inputForm}
            >
                <InputBase
                    className={styles.input}
                    placeholder="What’s The Weather??"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    onKeyDown={enterPressHandler}
                />
                <IconButton type="button"
                            className={styles.searchButton}
                            aria-label="search"
                            onClick={searchHandler}>
                    <SearchIcon/>
                </IconButton>
            </div>
    )
}