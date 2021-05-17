import Vue from 'vue'
import axios from 'axios'
import Stick from 'vue-stick'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss'
Vue.use(ElementUI);

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);

import _ from 'lodash' 
Vue.prototype.$lodash = _;

import './static/index.scss'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$url= 'http://localhost:3000'
// 主题
import {theme,themeSetup} from './assets/css/index.js'
Vue.themeSetup = Vue.prototype.$themeSetup = themeSetup
Vue.theme = Vue.prototype.$theme = theme
// 全局注册
Vue.use(Stick)
import VueXgplayer from 'vue-xgplayer'

Vue.use(VueXgplayer, {
  // globalOptions
//   enterLogo: {
//     url: 'https://uploadfile.bizhizu.cn/up/ec/85/b6/ec85b6d07d9f2c2d8d1062aa03d9b322.jpg',
//     width: 100,
//     height: 40
//   },
  playsinline: true
})
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')





