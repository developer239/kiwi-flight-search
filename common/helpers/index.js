import moment from 'moment'


export const throttle = (callback, limit) => {
  let wait = false
  return function a() {
    if (!wait) {
      callback.call()
      wait = true
      setTimeout(() => {
        wait = false
      }, limit)
    }
  }
}

export const formatDateTime = dateTime => moment.parseZone(dateTime).format('MM. DD. YYYY H:mm')
