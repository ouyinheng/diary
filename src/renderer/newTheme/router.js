export default [{
    path: '/newThemeRouter',
    name: 'newTheme-page',
    component: require('@/newTheme/MainPage').default,
    children: [
        {
            path: '/newThemeRouter',
            name: 'newTHomepage',
            component: require("@/newTheme/home/index").default,
            children: []
        }, {
            path: '/homepage',
            name: 'Homepage',
            meta: {
                needKeep: true
            },
            component: require("@/newTheme/Homepage/index").default,
        }, {
            path: '/liveBroadcast',
            name: 'liveBroadcast',
            meta: {
                needKeep: true
            },
            component: require("@/newTheme/liveBroadcast/index").default,
        }, {
            path: '/favorites',
            name: 'favorites',
            meta: {
                needKeep: true
            },
            component: require("@/newTheme/favorites/index").default,
        }
    ]
}, {
    path: '/showMovies',
    name: 'showMovie',
    component: require("@/newTheme/showMovie/index").default,
}, {
    path: '/xgplayer',
    name: 'xgplayer',
    component: require("@/newTheme/xgplayer/index").default,
}, {
    path: '/typeDetails',
    name: 'typeDetails',
    component: require("@/newTheme/homepage/typeDetails").default,
}]