import { createStore } from 'vuex'
import packages from './modules/packages'

export default createStore({
  strict: import.meta.env.DEV,
  modules: {
    packages
  }
})
