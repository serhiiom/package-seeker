import { ref, watchEffect } from 'vue'
import { useEventListener } from './event'

export default function usePaginationVisible(initialValue) {
  const visible = ref(initialValue)

  const windowWidth = ref(window.innerWidth)

  const resize = () => {
    windowWidth.value = window.innerWidth
  }

  useEventListener(window, 'resize', resize)

  const LARGE_SCREEN_WIDTH = 992,
    SMALL_SCREEN_WIDTH = 480

  watchEffect(() => {
    if (windowWidth.value < SMALL_SCREEN_WIDTH) {
      visible.value = 3
    } else if (windowWidth.value < LARGE_SCREEN_WIDTH) {
      visible.value = 5
    } else {
      visible.value = initialValue
    }
  })

  return {
    visible
  }
}
