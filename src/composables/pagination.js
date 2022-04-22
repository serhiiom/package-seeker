import { computed } from 'vue'
import range from '@/utils/range'

export default function usePagination(props, emit) {
  const visibleCenter = computed(() => Math.floor(props.visible / 2))

  const startPage = computed(() => {
    if (props.modelValue <= visibleCenter.value) {
      return 1
    }

    if (props.modelValue >= props.total - visibleCenter.value) {
      return props.total - props.visible + 1
    }

    return props.modelValue - visibleCenter.value
  })

  const pages = computed(() =>
    range(
      startPage.value,
      Math.min(startPage.value + props.visible - 1, props.total)
    )
  )

  const isFirst = computed(() => props.modelValue === 1)
  const isLast = computed(() => props.modelValue === props.total)

  function changePage(page) {
    emit('update:modelValue', page)
  }

  function isActive(page) {
    return props.modelValue === page
  }

  return {
    pages,
    isFirst,
    isLast,
    isActive,
    changePage
  }
}
