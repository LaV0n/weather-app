import styles from './Main.module.scss'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {SearchPanel} from "../../components/SearchPanel";

export const Main = () => {

    const dispatch = useAppDispatch()
    const locationName = useAppSelector(state => state.app.locationName)
    const country = useAppSelector(state => state.app.location.country)
    const state = useAppSelector(state => state.app.location.state)

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

                </div>
            </div>
        </div>
    )
}