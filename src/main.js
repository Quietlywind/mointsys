// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import iView from 'iview'
import config from '@/config'
import 'iview/dist/styles/iview.css'

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

/**
 * @description 全局axios请求配置
 */
Vue.prototype.$axios = axios

Vue.use(iView)

//全局配置进度条
// iView.LoadingBar.config({
//     color: '#5cb85c',
//     failedColor: '#f0ad4e',
//     height: 2
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
