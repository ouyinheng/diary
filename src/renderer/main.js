import Vue from 'vue'
// import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './static/index.scss'
import axios from './http'
import moment from 'moment'
import * as filters from './config/filter'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$moment = moment;
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
})
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
