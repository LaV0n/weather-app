import { Alert } from '@mui/material'
import React from 'react'
import styles from './AlertMessage.module.scss'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/store'

export const AlertMessage = () => {
   const [hidden, setHidden] = useState(true)
   const notice = useAppSelector(state => state.app.notice)
   const status = useAppSelector(state => state.app.status)

   const closeHandler = () => {
      setHidden(!hidden)
   }

   useEffect(() => {
      if (status === 'error') {
         setHidden(!hidden)
         setTimeout(() => setHidden(true), 5000)
      }
   }, [status])

   return (
      <div hidden={hidden} className={styles.block}>
         <Alert variant="filled" severity="error" onClose={closeHandler}>
            {notice}
         </Alert>
      </div>
   )
}
