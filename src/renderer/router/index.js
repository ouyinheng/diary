import Vue from 'vue'
import Router from 'vue-router'
import newThemeRouter from '../newTheme/router.js' 
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/newThemeRouter',
		}, 
		...newThemeRouter,
		{
			path: '*',
			redirect: '/'
		}
	]
})
