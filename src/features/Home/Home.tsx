import styles from './Home.module.scss'
import React from 'react'
import macbookImg from '../../assets/image/MacBook Pro.png'
import iphoneImg from '../../assets/image/iPhone.png'
import { SearchPanel } from '../../components/SearchPanel/SearchPanel'

export const Home = () => {
   return (
      <div className={styles.container}>
         <div className={styles.inputBlock}>
            <SearchPanel />
            <p>Check Weather Anytime, Anywhere of Anyplace !!</p>
         </div>
         <div className={styles.imgBlock}>
            <img src={macbookImg} alt={'0'} />
            <img src={iphoneImg} alt={'0'} className={styles.iphoneImg} />
         </div>
      </div>
   )
}
