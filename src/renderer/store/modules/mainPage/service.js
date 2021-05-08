import axios from 'axios'

// banner
export const getMoreList = (id) => axios.get(`https://s.video.qq.com/get_playsource?id=${id}&plat=2&type=4&range=0-1&data_type=2&video_type=2&plname=qq&otype=json&callback=getMoreList&_t=${new Date().getTime()}`)