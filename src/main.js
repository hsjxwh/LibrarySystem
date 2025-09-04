import { createApp } from 'vue'
import App from './App.vue'
const vue=createApp(App)
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/es/locale/lang/zh-cn'
import axios from 'axios'
axios.defaults.withCredentials = false 
export const HTTP_URL='http://localhost:8081'

vue.use(ElementPlus)
vue.use(router)
vue.mount('#app')
