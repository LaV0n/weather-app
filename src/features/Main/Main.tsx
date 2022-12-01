import styles from './Main.module.scss'
import {useAppSelector} from "../../app/store";
import {SearchPanel} from "../../components/SearchPanel";
import {Button} from "@mui/material";
import {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import LightModeIcon from '@mui/icons-material/LightMode';
import NorthIcon from '@mui/icons-material/North';
import compass from '../../assets/image/Compass_360_(en).svg.png'
import {BackGroundSelector} from "../../common/utils/backGroundSelector";

export const Main = () => {

    const locationName = useAppSelector(state => state.app.location.name)
    const country = useAppSelector(state => state.app.location.country)
    const state = useAppSelector(state => state.app.location.state)
    const weatherData = useAppSelector(state => state.app.weatherData)
    const [more, setMore] = useState(false)

    const setMoreHandler = () => {
        setMore(!more)
    }
    const getTime=(time:number)=>{
        let date=new Date(time*1000)
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const sec=date.getSeconds()
        return `${hour}:${minutes>9?minutes:`0${minutes}`}:${sec>9?sec:`0${sec}`}`
    }

    return (
        <div className={styles.container}
             style={{background:`url(${BackGroundSelector(weatherData.weather[0].icon)})`,
                 backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <div className={styles.block} style={more ? {height: '100%'} : {minHeight: '50%'}}>
                <div className={styles.searchBlock}>
                    <SearchPanel/>
                </div>
                <div className={styles.dataBlock}>
                    <div className={styles.cityName}>
                        Weather in {locationName}
                        <div className={styles.country}>
                            <div>country: <span>{country}</span></div>
                            <div>state: <span>{state}</span></div>
                        </div>
                    </div>
                    <div className={styles.weather}>
                        <div className={styles.temperature}>
                            {weatherData.main.temp} °C
                        </div>
                        {more &&
                            <div>
                                <div>
                                    <span>min:</span>{weatherData.main.temp_min} °C
                                    <span>max:</span> {weatherData.main.temp_max} °C
                                </div>
                                <div>
                                    <span>feels like:</span> {weatherData.main.feels_like} °C
                                </div>
                            </div>
                        }
                        <div className={styles.clouds}>
                            <div className={styles.iconBlock}>
                                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                     alt={''}/>
                                {weatherData.weather[0].main}
                            </div>
                            {more &&
                                <div>
                                    Cloudiness: {weatherData.clouds.all}%
                                </div>
                            }
                        </div>
                        <div>
                            Humidity: {weatherData.main.humidity} %
                        </div>
                        {more &&
                            <div>
                                <div>
                                    Pressure: {weatherData.main.pressure} hPa
                                </div>
                                <div>
                                    Visibility: {weatherData.visibility} meters
                                </div>
                            </div>
                        }
                        <div>
                            Wind Speed: {weatherData.wind.speed} meter/sec
                        </div>
                        {more &&
                            <div>
                                <div className={styles.windDirecrion}>
                                    <div>Wind direction:</div>
                                    <div className={styles.compassBlock}>
                                        <img src={compass} alt={'0'} className={styles.compass}/>
                                        <NorthIcon style={{transform:`rotate(${weatherData.wind.deg}deg)`}}/>
                                    </div>
                                </div>
                                <div>
                                    Wind gust: {weatherData.wind.gust} meter/sec
                                </div>
                                <div>
                                    <LightModeIcon/>
                                    Sunrise time: { getTime(weatherData.sys.sunrise) }
                                </div>
                                <div>
                                    <WbTwilightIcon/>
                                    Sunset time: {getTime(weatherData.sys.sunset)}
                                </div>
                                <div>
                                    <span>Weather data on time:</span> {getTime(weatherData.dt)}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <Button onClick={setMoreHandler} sx={{color:'white'}}>
                    {more
                        ? <ExpandLessIcon/>
                        : <ExpandMoreIcon/>
                    }
                </Button>
            </div>
        </div>
    )
}