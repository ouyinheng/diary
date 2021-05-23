import axios from 'axios';
import { apply } from 'file-loader';
let movie_annual = []; // 列表
let length = 0;
let movie_annual_copy = [];
let randomIndex = [];
let randomLenth = 0;
let updateTime = new Date().getTime(); // 更新时间

function randomGetData() {
    while(randomLenth < 16) {
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
function getYear() {
    let startYear = 2015;
    let nowYear = new Date().getFullYear();
    let i = 0;
    let yearList = [];
    while(2015 + i < Number(nowYear)) {
        yearList.push(2015 + i)
        i=i+1;
    }
    localStorage.yearList = JSON.stringify(yearList)
    return yearList;
}
export const getRecommList = async () => {
    if(localStorage.updateTime && updateTime - localStorage.updateTime <= 1000*1800)return;
    let yearList = getYear();
    let yearIndex =yearList[parseInt(Math.random(0,1)*yearList.length)];
    localStorage.yearIndex = yearIndex;
    /**
     * @params year 2017
     */
    // https://movie.douban.com/annual/${year}?source=navigation#3
    await axios.get('https://movie.douban.com/ithil_j/activity/movie_annual'+yearIndex).then(res => {
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
    await axios.get(`https://movie.douban.com/ithil_j/activity/movie_annual${localStorage.yearIndex}/widget/${index}`).then(res => {
        console.log('res.data.res', res.data.res)
        details = res.data.res
    })
    return details
}