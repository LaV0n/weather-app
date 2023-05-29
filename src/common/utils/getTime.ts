const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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

export const getMonth = (time: number) => {
   const date = new Date(time * 1000)
   return date.getMonth()
}

export const daysInMonth = (time: number) => {
   return new Date(new Date().getFullYear(), new Date(time * 1000).getMonth(), 0).getDate() + 1
}
export const getWeekDay = (time: number) => {
   const date = new Date(time * 1000)
   return week[date.getDay()]
}

export const getDate = (time: number) => {
   const date = new Date(time * 1000)
   const day = date.getDate()
   const month = months[date.getMonth()]
   return `${day} ${month}`
}
