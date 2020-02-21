import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import themeMuseUI from 'muse-ui/lib/theme';
themeMuseUI.add('teal', {
  primary: '#1FD3AA',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#ffeb3b',
}, 'light');

themeMuseUI.use('teal');
import 'video.js/dist/video-js.css';

import './static/index.scss'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(MuseUI);
Vue.prototype.$url= 'http://localhost:3000'
// 主题
import {theme,themeSetup} from './assets/css/index.js'
Vue.themeSetup = Vue.prototype.$themeSetup = themeSetup
Vue.theme = Vue.prototype.$theme = theme


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')





