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
            component: require("@/newTheme/home/Homepage/index").default,
        }
    ]
}]