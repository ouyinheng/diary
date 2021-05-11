const {ipcRenderer: ipc} = require('electron');
import {mapActions, mapGetters, mapMutations} from 'vuex';
import axios from 'axios'
import oxios from '../httpModule'
export default {
    name: 'qq',
    data() {
        return {
            list: [],
        }
    },
    computed: {
        ...mapGetters([
            'getQqList', 'getYkList', 'getSearchKeyWord', 'getSelectSourch'
        ])
    },
    methods: {
        ...mapActions([
            'SET_LOADING_FALSE',
            'SET_LOADING_TURE'
        ]),
        ...mapMutations([
            'setQqList', 'setYkList', 'setSearchKeyWord', 'setSelectSourch'
        ]),
        getInfo(keyword) {
            this.list = [];
            // this.SET_LOADING_TURE();
            if(this.getSelectSourch === '腾讯') {
                this.$http.get(`https://v.qq.com/x/search/?q=${keyword}`).then(res => {
                    ipc.send('saveFile', keyword+'.html', res.data);
                    this.parseHtml(res.data)
                })
            } else if(this.getSelectSourch === '优酷') {
                // 
                axios.get(`https://so.iqiyi.com/so/q_${keyword}`).then(res => {
                    ipc.send('saveFile', keyword+'.html', res.data);
                    this.parseIQYHtml(res.data)
                })
                
            }
        },
        parseHtml(html) {
            let div = document.createElement('div');
            div.innerHTML = html;
            let info =  div.querySelectorAll('.result_item.result_item_v');
            let movieInfo = {}
            Array.from(info).forEach(div => {
                let list  = [];
                let item = document.createElement('div');
                item.appendChild(div)
                item.querySelectorAll('._playlist .item').forEach((Ele, index) => {
                    let ele = document.createElement('div');
                    ele.appendChild(Ele);
    				list.push({
    					title: ele.querySelector('a').innerText,
    					url: ele.querySelector('a').getAttribute('href')
    				})
                })
                movieInfo = {
                    id: item.querySelector('.result_item.result_item_v') ? item.querySelector('.result_item.result_item_v').getAttribute('data-id') : '',
                    href: item.querySelector('._infos a.figure.result_figure') ? item.querySelector('._infos a.figure.result_figure').getAttribute('href') : '',
                    cover: item.querySelector('.figure_pic') ? item.querySelector('.figure_pic').getAttribute('src') : '',
                    source: {
                        img: item.querySelector('.result_source img._cur_playsrc_img') ? item.querySelector('.result_source img._cur_playsrc_img').getAttribute('src') : '',
                        text: item.querySelector('.result_source .icon_text') ? item.querySelector('.result_source .icon_text').innerText : ''
                    },
                    introduce: {
                        title: {
                            pri: item.querySelector('.result_title .hl') ? item.querySelector('.result_title .hl').innerText : '',
                            sub: item.querySelector('.result_title .sub') ? item.querySelector('.result_title .sub').innerText.replace(/\s*/g,"") : '',
                            type: item.querySelector('.result_title .type') ? item.querySelector('.result_title .type').innerText : '',
                        },
                        info_item_odd: item.querySelector('.info_item.info_item_odd .content') ? item.querySelector('.info_item.info_item_odd .content').innerText : '',
                        info_item_even: item.querySelector('.info_item.info_item_even .content') ? item.querySelector('.info_item.info_item_even .content').innerText : '',
                        info_item_desc: item.querySelector('.info_item.info_item_desc .desc_text') ? item.querySelector('.info_item.info_item_desc .desc_text').innerText : '',
                    },
                    rating: item.querySelector('._infos .result_score') ? item.querySelector('._infos .result_score').innerText : '',
                    list
                }
                this.list.push(movieInfo)
            })
            // this.infos = this.list
            this.setQqList(this.list)
            // console.log(this.infos)
		    // this.SET_LOADING_FALSE();
        },
        parseIQYHtml(html) {
            let div = document.createElement('div');
            div.innerHTML = html;
            let info =  div.querySelectorAll('.qy-search-result-con .layout-main div[desc="card"] div[desc="剧集类"],[desc="单视频"]');
            let movieInfo = {}
            Array.from(info).forEach(div => {
                let list  = [];
                let item = document.createElement('div');
                item.appendChild(div)
                item.querySelectorAll('.album-list .album-item').forEach((Ele, index) => {
                    let ele = document.createElement('div');
                    ele.appendChild(Ele);
    				list.push({
    					title: ele.querySelector('.album-link').getAttribute('title'),
    					url: ele.querySelector('.album-link').getAttribute('href')
    				})
                })
                console.log('item', item.querySelector('.qy-mod-cover').getAttribute('src'))
                movieInfo = {
                    // id: item.querySelector('.result_item.result_item_v') ? item.querySelector('.result_item.result_item_v').getAttribute('data-id') : '',
                    href: item.querySelector('.result-figure .main-tit') ? item.querySelector('.result_figure .qy-mod-link').getAttribute('href') : '',
                    cover: item.querySelector('.qy-mod-cover') ? item.querySelector('.qy-mod-cover').getAttribute('src') : '',
                    source: {
                        img: '',
                        text: item.querySelector('.result-bottom player-name') ? item.querySelector('.result-bottom player-name').innerText : ''
                    },
                    introduce: {
                        title: {
                            sub: item.querySelector('.qy-search-result-tit .item-type') ? item.querySelector('.qy-search-result-tit .item-type').innerText : '',
                            pri: item.querySelector('.qy-search-result-tit .main-tit .orange') ? item.querySelector('.qy-search-result-tit .main-tit .orange').innerText.replace(/\s*/g,"") : '',
                            type: item.querySelector('.result_title .type') ? item.querySelector('.result_title .type').innerText : '',
                        },
                        info_item_odd: '',
                        info_item_even: item.querySelectorAll('.qy-search-result-info.half .info-link').length ? Array.from(item.querySelectorAll('.qy-search-result-info.half .info-link')).map(item => item.innerText).join(', ') : '',
                        info_item_desc: item.querySelector('.qy-search-result-info.multiple .info-des') ? item.querySelector('.qy-search-result-info.multiple .info-des').innerText : '',
                    },
                    rating: item.querySelector('.result-right .score') ? item.querySelector('.result-right .score').innerText : '',
                    list
                }
                this.list.push(movieInfo)
            })
            // this.infos = this.list
            this.setYkList(this.list)
            // console.log(this.infos)
		    // this.SET_LOADING_FALSE();
        }
    },
    created() {
        // this.getInfo()
    }
}
