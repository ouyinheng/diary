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
            component: require("@/newTheme/Homepage/index").default,
        }, {
            path: '/liveBroadcast',
            name: 'liveBroadcast',
            component: require("@/newTheme/liveBroadcast/index").default,
        }, {
            path: '/favorites',
            name: 'favorites',
            component: require("@/newTheme/favorites/index").default,
        }
    ]
}]