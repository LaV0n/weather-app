import styles from './Main.module.scss'
import { useAppSelector} from "../../app/store";
import {SearchPanel} from "../../components/SearchPanel";

export const Main = () => {

    const locationName = useAppSelector(state => state.app.location.name)
    const country = useAppSelector(state => state.app.location.country)
    const state = useAppSelector(state => state.app.location.state)
    const weatherData=useAppSelector(state=>state.app.weatherData)

    return (
        <div className={styles.container}>
            <div className={styles.block}>
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
                    <div>
                        {weatherData.weather[0].main}
                        {weatherData.main.temp}
                    </div>

                </div>
            </div>
        </div>
    )
}