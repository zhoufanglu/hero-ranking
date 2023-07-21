import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/store/index'
const app = createApp(App)
import '@/style.scss' // 引入下 不然全局scss不生效(https://github.com/vitejs/vite/issues/5682#issuecomment-968713998)

// element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus).use(router).use(pinia).mount('#app')
