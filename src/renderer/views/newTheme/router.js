import applyRoute from './apply/router.js'
export default [{
    path: '/newThemeRouter',
    name: 'newTheme-page',
    component: require('@/views/newTheme/MainPage').default,
    children: [
        {
            path: '/newThemeRouter',
            name: 'newTHomepage',
            component: require("@/views/newTheme/home/index").default,
            children: []
        }, {
            path: '/homepage',
            name: 'Homepage',
            meta: {
                needKeep: true
            },
            component: require("@/views/newTheme/Homepage/index").default,
        }, {
            path: '/liveBroadcast',
            name: 'liveBroadcast',
            meta: {
                needKeep: true
            },
            component: require("@/views/newTheme/liveBroadcast/index").default,
        }, {
            path: '/favorites',
            name: 'favorites',
            meta: {
                needKeep: true
            },
            component: require("@/views/newTheme/favorites/index").default,
        }, {
            path: '/apply',
            name: 'apply',
            meta: {
                needKeep: true
            },
            component: require("@/views/newTheme/apply/apply").default,
            children: [
                ...applyRoute
            ]
        }, {
            path: '/movieDetails',
            name: 'movieDetails',
            component: require("@/views/newTheme/home/movieDetails").default,
        }
    ]
}, {
    path: '/showMovies',
    name: 'showMovie',
    component: require("@/views/newTheme/showMovie/index").default,
}, {
    path: '/playMovie',
    name: 'playMovie',
    component: require("@/views/newTheme/showMovie/showMovie").default,
}, {
    path: '/xgplayer',
    name: 'xgplayer',
    component: require("@/views/newTheme/xgplayer/index").default,
}, {
    path: '/typeDetails',
    name: 'typeDetails',
    component: require("@/views/newTheme/homepage/typeDetails").default,
}]