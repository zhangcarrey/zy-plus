import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@zy-plus/components/icon'
import '@zy-plus/theme-chalk/src/index.scss'

const plugins = [Icon]
const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
