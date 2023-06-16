import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import globalComponents from '@/components/global'
import Toaster from '@meforma/vue-toaster'
import VueObserveVisibility from 'vue-observe-visibility'
import '@vuepic/vue-datepicker/dist/main.css'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
import './assets/main.scss'
import 'vue3-carousel/dist/carousel.css'
import dayjs from 'dayjs'

import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
const pinia = createPinia()

pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router)
app.use(globalComponents)
app.use(Toaster)
app.use(VueObserveVisibility)

app.mount('#app')
