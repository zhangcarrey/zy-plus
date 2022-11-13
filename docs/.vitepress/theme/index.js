import DefaultTheme from 'vitepress/theme'
import '@zy-plus/theme-chalk/src/index.scss'
import Icon from '@zy-plus/components/icon'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Icon) // 注册组件
  }
}
