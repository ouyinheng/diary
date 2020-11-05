import axios from 'axios';
import { apply } from 'file-loader';
let movie_annual = []; // 列表
let length = 0;
let movie_annual_copy = [];
let randomIndex = [];
let randomLenth = 0;
let updateTime = new Date().getTime(); // 更新时间

function randomGetData() {
    while(randomLenth < 5) {
        let index = parseInt(Math.random(0,1)*length);
        if(!randomIndex.includes(index)) {
            randomIndex.push(index);
            randomLenth += 1;
            movie_annual_copy.push({
                index,
                ...movie_annual[index]
            })
        }
    }
}
export const getRecommList = async () => {
    if(localStorage.updateTime && updateTime - localStorage.updateTime <= 1000000*3600)return;
    /**
     * @params year 2017
     */
    // https://movie.douban.com/annual/${year}?source=navigation#3
    await axios.get('https://movie.douban.com/ithil_j/activity/movie_annual2018').then(res => {
        movie_annual = res.data.res.widget_infos;
        length = movie_annual.length;
        // localStorage.setItem('movie_annual', JSON.stringify(movie_annual))
        localStorage.updateTime = updateTime;
        randomGetData();
    })
    return movie_annual_copy
}

export const getDetailsList = async (index) => {
    let details = {};
    await axios.get(`https://movie.douban.com/ithil_j/activity/movie_annual2018/widget/${index}`).then(res => {
        details = res.data.res
    })
    return details
}