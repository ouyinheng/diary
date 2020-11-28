import axios from 'axios'
const host= 'http://118.25.95.147:3000';

// banner
export const getBanner = () => axios.get(`${host}/banner?type=1`)

// 获取主页资源
export const getHomePageResourth = () => axios.get('http://cj.okzy.tv/inc/api.php')