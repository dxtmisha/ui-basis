import { createApp } from 'vue'

import './registerServiceWorker'

import App from './App.vue'
import router from './router'
import store from './store'

import './main.scss'
// import './assets/tailwind.css'

const vueItem = createApp(App)
  .use(store)
  .use(router)

vueItem.mount('#app-test')
