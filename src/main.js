import { createApp } from 'vue'
import router from './utils/router'
import './css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'

createApp(App).use(router).mount('#app')