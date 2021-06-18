const {ipcRenderer: ipc} = require('electron');
import {mapActions, mapGetters, mapMutations} from 'vuex';
import axios from 'axios'
import oxios from '../httpModule'
export default {
    name: 'qq',
    data() {
        return {
            list: [],
            iqyList: [],
            txList: [],
            dbList: []
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
        myQuerySelector(dom, className) {
            return dom.querySelector(className) ? dom.querySelector(className) : ''
        },
        getInfo(keyword) {
            this.list = [];
            // this.SET_LOADING_TURE();
            this.$http.get(`https://www.douban.com/search?q=${keyword}`).then(res => {
                ipc.send('saveFile', keyword+'.html', res.data);
                this.parseDBHtml(res.data)
            })
           
        },
        parseHtml(html, next=true) {
            this.txList = []
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
                this.txList.push(movieInfo)
            })
            // this.infos = this.list
            if(next)this.setQqList(this.list)
		    // this.SET_LOADING_FALSE();
            return this.txList
        },
        parseIQYHtml(html, next=true) {
            this.iqyList = [];
            let div = document.createElement('div');
            div.innerHTML = html;
            let info =  div.querySelectorAll('.qy-search-result-con .layout-main div[desc="card"] div[desc="剧集类"],[desc="单视频"],[desc="长视频(电影)类"]');
            let movieInfo = {}
            Array.from(info).forEach(div => {
                let list  = [];
                let item = document.createElement('div');
                item.appendChild(div)
                item.querySelectorAll('.album-list:nth-of-type(2) .album-item').forEach((Ele, index) => {
                    let ele = document.createElement('div');
                    ele.appendChild(Ele);
    				list.push({
    					title: ele.querySelector('.album-link').getAttribute('title'),
    					url: ele.querySelector('.album-link').getAttribute('href')
    				})
                })
                const halfList = item.querySelectorAll('.qy-search-result-info.half')
                const dList =  (text) => Array.from(halfList).filter(item => {
                    const dom = document.createElement('div')
                    dom.appendChild(item)
                    return dom.querySelector('.info-lbl') &&dom.querySelector('.info-lbl').innerText === text
                })
                const getTitledom = item.querySelector('.qy-search-result-tit .main-tit') || item.querySelector('.qy-search-result-tit .main-tit span')
                movieInfo = {
                    // id: item.querySelector('.result_item.result_item_v') ? item.querySelector('.result_item.result_item_v').getAttribute('data-id') : '',
                    href: item.querySelector('.result-figure .qy-mod-link-wrap .qy-mod-link') ? item.querySelector('.result-figure .qy-mod-link-wrap .qy-mod-link').getAttribute('href') : '',
                    cover: item.querySelector('.qy-mod-cover') ? item.querySelector('.qy-mod-cover').getAttribute('src') : '',
                    source: {
                        img: '',
                        text: item.querySelector('.result-bottom player-name') ? item.querySelector('.result-bottom player-name').innerText : ''
                    },
                    introduce: {
                        title: {
                            sub: item.querySelector('.qy-search-result-tit .item-type') ? item.querySelector('.qy-search-result-tit .item-type').innerText : '',
                            pri: getTitledom ? getTitledom.innerText.replace(/\s*/g,"") : '',
                            type: item.querySelector('.result_title .type') ? item.querySelector('.result_title .type').innerText : '',
                        },
                        // 导演
                        // qy-search-result-info half
                        info_item_odd: dList('导演:').length ? dList('导演:')[0].querySelector('.info-link').innerText : '',
                        info_item_even: dList('主演:').length ? dList('主演:')[0].querySelector('.info-link').innerText : '',
                        info_item_desc: item.querySelector('.qy-search-result-info.multiple .info-des') ? item.querySelector('.qy-search-result-info.multiple .info-des').innerText : '',
                    },
                    rating: item.querySelector('.result-right .score') ? item.querySelector('.result-right .score').innerText : '',
                    list
                }
                this.list.push(movieInfo)
                this.iqyList.push(movieInfo)
            })
            // this.infos = this.list
            if(next)this.setYkList(this.list)
		    // this.SET_LOADING_FALSE();
            return this.iqyList
        },
        parseDBHtml(html) {
            let list = [];
            let div = document.createElement('div');
            div.innerHTML = html;
            let info =  div.querySelectorAll('.result');
            Array.from(info).forEach(div => {
                if(div.innerHTML.includes('<span>[电影]</span>')) {
                    list.push({
                        title: div.querySelector('.content .title h3 a').innerText,
                        id: div.querySelector('.content .title h3 a').getAttribute('onclick').split('sid:')[1].split(', qcat:')[0].trim(),
                        subjectCast: div.querySelector('.subject-cast').innerText,
                        desc: div.querySelector('.content>p').innerText,
                        cover: div.querySelector('.pic a img').getAttribute('src')
                    })
                }
                // let list  = [];
                // let item = document.createElement('div');
                // item.appendChild(div)
                
            })
            this.dbList = list;
        }
    },
    created() {
        // this.getInfo()
    }
}
