export const getTime = (time: number) => {
   const date = new Date(time * 1000)
   const hour = date.getHours()
   const minutes = date.getMinutes()
   const sec = date.getSeconds()
   return `${hour}:${minutes > 9 ? minutes : `0${minutes}`}:${sec > 9 ? sec : `0${sec}`}`
}
export const getDay = (time: number) => {
   const date = new Date(time * 1000)
   return date.getDate()
}
