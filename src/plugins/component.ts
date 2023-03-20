import type { App } from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import SvgIcon from '@/components/base/SvgIcon.vue'
// 加载svg图片
const svgFiles = require.context('@/assets/icons', true, /\.svg$/)
svgFiles.keys().map(svgFiles)

export default (app: App) => {
  //注册element图标组件
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  //注册svg图标组件
  app.component('SvgIcon', SvgIcon)
}
