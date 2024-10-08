import './assets/main.css'

import { createApp } from 'vue'

import { VueQueryPlugin } from '@tanstack/vue-query'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import i18n from './plugins/i18n/i18n'
import router from './router'

import SerieService from './services/SerieService/SerieService'
import { pinia } from './stores'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(VueQueryPlugin)

app.use(Vue3Toastify, {
  autoClose: 3000,
  dangerouslyHTMLString: true
} as ToastContainerOptions)

SerieService.init()

app.mount('#app')
