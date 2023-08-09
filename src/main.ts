import { createApp } from 'vue'

import './registerServiceWorker'

import App from './App.vue'
import router from './router'
import store from './store'

import './main.scss'
// import './assets/tailwind.css'

import Md3Button from '../md3/Button/Md3Button.vue'

const vueItem = createApp(App)
  .use(store)
  .use(router)

vueItem.component('md3-button', Md3Button)
vueItem.mount('#app')
