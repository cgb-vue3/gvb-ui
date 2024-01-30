import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import 'virtual:svg-icons-register'
import GlobalComponent from '@/components'
import Pinia from '@/store'
import '@/style/style.css'
import '@/style/element.css'
import '@/router/permission.ts'
import 'animate.css/animate.min.css'
import 'highlight.js/styles/default.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const app = createApp(App)
app.use(Router).use(GlobalComponent).use(Pinia).use(ElementPlus, {
	locale: zhCn
})
app.mount('#app')
