import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'landing-page',
			component: require('@/views/MainPage').default,
			children: [
				{
					path: '/',
					name: 'Homepage',
					component: require("@/views/home/home").default
				}, {
					path: '/tv',
					name: 'tv',
					component: require("@/views/douban/list").default
				}, {
					path: '/movie',
					name: 'movie',
					component: require("@/views/douban/movie").default
				}, {
					path: '/movieinfo',
					name: 'MovieInfo',
					component: require("@/views/douban/movieinfo").default
				}, {
					path: '/skin',
					name: 'skin',
					component: require("@/views/setup/skin").default
				}, {
					path: '/picture',
					name: 'picture',
					component: require("@/views/pictures/index").default
				}
			]
		}, {
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
