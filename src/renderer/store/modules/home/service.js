import axios from 'axios'
const host= 'http://118.25.95.147:3000';

// banner
export const getBanner = () => axios.get('http://api.tgmmvip.com/wolong/app/banner/list?ver=2.1.2&appid=wolong001&platform=android')

// 获取推荐
export const getRecommList = () => axios.get('https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=8&page_start=0')
// 获取电视剧
export const getTVRecommList = () => axios.get('https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&page_limit=8&page_start=0')

// 获取主页资源
export const getHomePageResourth = () => axios.get('http://cj.okzy.tv/inc/api.php')

// 获取分类
export const getTypelist = () => axios.get('http://api.tgmmvip.com/wolong/video/typelist')

// 获取分类详情
export const getTypeDetails = (type) => axios.get(`http://api.tgmmvip.com/wolong/gae/video/list?area=&size=20&year=&page=0&type=${type}`)

// 获取推荐