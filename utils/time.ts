export const formatDateTime = (): string => {
  const obj = new Date()
  const year = obj.getFullYear()
  let month: number | string = obj.getMonth() + 1
  let date: number | string = obj.getDate()
  let hours: number | string = obj.getHours()
  let minutes: number | string = obj.getMinutes()
  let seconds: number | string = obj.getSeconds()
  month = month < 10 ? '0' + month : month
  date = date < 10 ? '0' + date : date
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
}