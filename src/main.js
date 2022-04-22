import { createApp } from 'vue'
import store from './store'
import App from './App.vue'

import '@/assets/scss/style.scss'

createApp(App).use(store).mount('#app')
