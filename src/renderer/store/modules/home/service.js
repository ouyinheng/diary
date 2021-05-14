import axios from 'axios'
const host= 'http://118.25.95.147:3000';

// banner
export const getBanner = () => axios.get('http://api.tgmmvip.com/wolong/app/banner/list?ver=2.1.2&appid=wolong001&platform=android')

// 获取推荐
// http://api.tgmmvip.com/wolong/gae/video/home?ver=2.1.2&appkey=wolong001&platform=android
export const getRecommList = () => axios.get('http://api.tgmmvip.com/wolong/gae/video/home?ver=2.1.2&appkey=wolong001&platform=android')

// 获取主页资源
export const getHomePageResourth = () => axios.get('http://cj.okzy.tv/inc/api.php')

// 获取分类
export const getTypelist = () => axios.get('http://api.tgmmvip.com/wolong/video/typelist')

// 获取分类详情
export const getTypeDetails = (type) => axios.get(`http://api.tgmmvip.com/wolong/gae/video/list?area=&size=20&year=&page=0&type=${type}`)

// 获取推荐