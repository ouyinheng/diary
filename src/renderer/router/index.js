import Vue from 'vue'
import Router from 'vue-router'
import ViewsRouter from '../views/router.js' 
import newThemeRouter from '../newTheme/router.js' 
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/newThemeRouter',
		}, 
		...ViewsRouter,
		...newThemeRouter,
		{
			path: '/showmovie',
			name: 'showmovie',
			component: require("@/views/home/movie").default
		}, {
			path: '/setup',
			name: 'setup',
			component: require("@/views/setup/index").default
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
