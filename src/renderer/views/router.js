export default [{
    path: '/viewRouter',
    name: 'landing-page',
    component: require('@/views/MainPage').default,
    children: [
        {
            path: '/viewRouter',
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
        }, {
            path: '/play',
            name: 'play',
            component: require("@/views/play/index").default
        }
    ]
}]