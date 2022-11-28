import styles from './Home.module.scss'
import macbookImg from '../../assets/image/MacBook Pro.png'
import iphoneImg from '../../assets/image/iPhone.png'
import {IconButton, InputBase, Paper} from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import {useState, KeyboardEvent} from "react";
import {useAppDispatch} from "../../app/store";
import {getLocationTC} from "../../app/appReducer";
import {useNavigate} from "react-router-dom";

export const Home = () => {

    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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

    return (
        <div className={styles.container}>
            <div className={styles.inputBlock}>
                <Paper
                    component="form"
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
                </Paper>
                <p>
                    Check Weather Anytime, Anywhere of Anyplace !!
                </p>
            </div>
            <div className={styles.imgBlock}>
                <img src={macbookImg} alt={'0'}/>
                <img src={iphoneImg} alt={'0'} className={styles.iphoneImg}/>
            </div>

        </div>
    )
}