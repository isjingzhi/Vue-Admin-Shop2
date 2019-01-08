import Vue from 'vue/dist/vue.js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import httpPlugin from '@/assets/js/http'
import ElTreeGrid from 'element-tree-grid'
// 加载公共样式
import "./assets/css/style.css"
Vue.use(ElementUI)
// 将 ElTreeGrid 注册为全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid)

Vue.use(httpPlugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
