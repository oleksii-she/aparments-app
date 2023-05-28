import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import globalComponents from '@/components/global'
import Toaster from '@meforma/vue-toaster'
import vue3GoogleLogin from 'vue3-google-login'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
import './assets/main.scss'
import 'vue3-carousel/dist/carousel.css'

const { VITE_API_CLIENT_ID } = import.meta.env;

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router)
app.use(globalComponents)
app.use(Toaster)
app.use(vue3GoogleLogin, {
  clientId: `${VITE_API_CLIENT_ID}`
})

app.mount('#app')
