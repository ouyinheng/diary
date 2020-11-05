export default [{
    path: '/newThemeRouter',
    name: 'newTheme-page',
    component: require('@/newTheme/MainPage').default,
    children: [
        {
            path: '/newThemeRouter',
            name: 'Homepage',
            component: require("@/newTheme/home/index").default
        }
    ]
}]