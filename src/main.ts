import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import axios from './plugins/axios' // axios 인스턴스 불러오기

const app = createApp(App)
app.config.globalProperties.$http = axios // 전역 속성으로 설정

app.use(createPinia())
app.use(router)

app.mount('#app')
