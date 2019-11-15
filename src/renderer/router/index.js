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
          name: 'Homepage',
          component: require("@/views/home/douban/TvPlay").default
        }, {
          path: '/movie',
          name: 'Homepage',
          component: require("@/views/home/douban/movie").default
        }, {
          path: '/movieinfo',
          name: 'MovieInfo',
          component: require("@/views/home/douban/movieinfo").default
        }, {
            path: '/skin',
            name: 'skin',
            component: require("@/views/setup/skin").default
        }
      ]
    }, {
        path: '/showmovie',
        name: 'Homepage',
        component: require("@/views/home/movie").default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
