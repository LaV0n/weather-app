import styles from "./SearchPanel.module.scss";
import {IconButton, InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {KeyboardEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {useNavigate} from "react-router-dom";
import {getLocationTC, getWeatherDataTC, LocationType, setLocations} from "../../app/appReducer";

export const SearchPanel = () => {

    const [value, setValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const locations = useAppSelector(state => state.app.locations)

    const searchHandler = () => {
        dispatch(getLocationTC(value))
        setValue('')
        navigate('/main')
    }

    const enterPressHandler = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && value.length !== 0) {
            searchHandler()
        }
    }

    const setLocationHandler = (l:LocationType) => {
        dispatch(getWeatherDataTC({lon:l.lon, lat:l.lat}))
        dispatch(setLocations({locations:[l]}))
    }

    return (
        <div className={styles.inputBlock}>
            <div className={styles.inputForm}>
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
                            disabled={value.length === 0}
                            onClick={searchHandler}>
                    <SearchIcon/>
                </IconButton>
            </div>
            {locations.length > 1
                && <div className={styles.locations}>
                    {
                        locations.map((l,index) =>
                            <button key={index}
                                    className={styles.location}
                                    onClick={() => setLocationHandler(l)}>
                                <div>
                                    <span>city </span>
                                    {l.name}
                                </div>
                                <div>
                                    <span>state </span>
                                    {l.state}
                                </div>
                                <div>
                                    <span>country </span>
                                    {l.country}
                                </div>
                            </button>)
                    }
                </div>

            }
        </div>
    )
}