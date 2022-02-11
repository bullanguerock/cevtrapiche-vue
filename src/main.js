import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

require('@/assets/main.scss');

if (false || process.env.VUE_APP_SERVER_NAME){
    axios.defaults.baseURL = 'http://localhost:8000'
} 
else {
    axios.defaults.baseURL = process.env.VUE_APP_SERVER_NAME
}

createApp(App).use(store).use(router).mount('#app')

