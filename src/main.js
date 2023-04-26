import { createApp } from 'vue'
import router from '@/router'
import './style.css'
import App from './App.vue'
import dayjs from 'dayjs'

const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
app.use(router).mount('#app')
