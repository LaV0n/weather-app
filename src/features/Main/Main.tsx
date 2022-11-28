import styles from './Main.module.scss'
import {useAppDispatch, useAppSelector} from "../../app/store";

export const Main =()=>{

    const dispatch=useAppDispatch()
    const locationName=useAppSelector(state => state.app.locationName)

    return(
        <div>
            {locationName}
        </div>
    )
}