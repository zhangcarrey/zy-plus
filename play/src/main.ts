import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@zy-plus/components/icon'
import Tree from '@zy-plus/components/Tree'
import '@zy-plus/theme-chalk/src/index.scss'

const plugins = [Icon, Tree]
const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
