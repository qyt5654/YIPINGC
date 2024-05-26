import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/dist/index.css'

//注册自己的组件
import YPC from "./components/ypc/index.js"

createApp(App).use(router).use(store).use(ElementPlus).use(VueAxios,axios).use(YPC).mount('#app')
