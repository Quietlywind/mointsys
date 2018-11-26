// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import iView from 'iview'
import config from '@/config'
import { L } from 'vue2-leaflet'
import "babel-polyfill"
import './mock/index'
import {MessageBox,Message} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css'
// 自定义图标css文件
import '@/assets/icons/iconfont.css'
//leaflet地图css文件
import 'leaflet/dist/leaflet.css'

import jquery from 'jquery'

/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
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
/**
 * @description 全局axios请求配置
 */
/**
 * @description 全局element-ui的弹框配置
 */
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

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
