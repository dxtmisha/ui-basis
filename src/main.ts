import { createApp } from 'vue'

import './registerServiceWorker'

import App from './App.vue'
import router from './router'
import store from './store'

import './main.scss'
// import './assets/tailwind.css'

import Md2Button from '../md2/Button/Md2Button.vue'
import Md2Image from '../md2/Image/Md2Image.vue'
import Md2Icon from '../md2/Icon/Md2Icon.vue'

const vueItem = createApp(App)
  .use(store)
  .use(router)

vueItem.component('md2-button', Md2Button)
vueItem.component('md2-image', Md2Image)
vueItem.component('md2-icon', Md2Icon)

vueItem.mount('#app-test')
