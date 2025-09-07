import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import axios from 'axios'
import router from './router'
export const HTTP_URL='http://localhost:8080'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//允许携带cookie
axios.defaults.withCredentials = true 


const vue=createApp(App)
vue.use(router)
vue.use(ElementPlus,{locale:zhCn})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  vue.component(key, component)
}
vue.mount('#app')
