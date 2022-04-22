export default function debounce(func, timeout = 1000) {
  let timeoutID

  return function (...args) {
    clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
