type setMoreHandlerType = {
   value: boolean
   setValue: (value: boolean) => void
   setLongDiv: (value: boolean) => void
}
export const setLongDiv = ({ value, setValue, setLongDiv }: setMoreHandlerType) => {
   if (value) {
      setValue(false)
      setLongDiv(false)
   } else {
      setLongDiv(true)
      setTimeout(() => {
         setValue(true)
      }, 1000)
   }
}
