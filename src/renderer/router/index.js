import Vue from 'vue'
import Router from 'vue-router'
import newThemeRouter from '../views/newTheme/router.js' 
import homeRouter from '../views/home/router.js' 
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/newThemeRouter',
		}, 
        ...homeRouter,
		...newThemeRouter,
		{
			path: '*',
			redirect: '/'
		}
	]
})
