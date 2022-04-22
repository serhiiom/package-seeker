import { computed, reactive, watchEffect } from 'vue'
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

  const totalPages = computed(() =>
    Math.ceil(store.getters['packages/total'] / filters.perPage)
  )

  const debouncedGetPackages = debounce((params) => {
    store.dispatch('packages/getPackages', params)
  })

  watchEffect(() => {
    debouncedGetPackages({
      text: filters.text,
      size: filters.perPage,
      from: filters.page * filters.perPage - filters.perPage
    })
  })

  return {
    packages,
    filters,
    totalPages
  }
}
