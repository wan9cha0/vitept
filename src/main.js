import { createApp } from 'vue'
import router from '@/router'
import './style.css'
import App from './App.vue'
import dayjs from 'dayjs'

import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'

const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
app.use(router).use(Varlet).mount('#app')
