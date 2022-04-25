import { reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import debounce from '@/utils/debounce'

export default function usePackages() {
  const store = useStore()

  const packages = computed(() => store.getters['packages/packages'])

  const filters = reactive({
    text: '',
    page: 1,
    perPage: 10
  })

  const totalCount = computed(() => store.getters['packages/total'])
  const totalPages = computed(() =>
    Math.ceil(totalCount.value / filters.perPage)
  )

  const debouncedGetPackages = debounce(() => {
    store.dispatch('packages/getPackages', {
      text: filters.text,
      size: filters.perPage,
      from: filters.page * filters.perPage - filters.perPage
    })
  })

  debouncedGetPackages()
  watch([() => filters.text, () => filters.page], ([newText], [oldText]) => {
    if (newText !== oldText) {
      filters.page = 1
    }

    debouncedGetPackages()
  })

  return {
    packages,
    filters,
    totalPages
  }
}
