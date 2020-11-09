import axios from 'axios'
const host= 'http://118.25.95.147:3000';

// banner
export const getBanner = () => axios.get(`${host}/banner?type=1`)