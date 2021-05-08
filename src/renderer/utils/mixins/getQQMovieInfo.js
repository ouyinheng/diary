const {ipcRenderer: ipc} = require('electron');
import {mapActions, mapGetters, mapMutations} from 'vuex';
import axios from 'axios'
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
                    // ipc.send('saveFile', keyword, res.data);
                    this.parseHtml(res.data)
                })
            } else if(this.getSelectSourch === '优酷') {
                // 
                axios.get(`https://so.youku.com/search_video/q_白夜追凶?searchfrom=3`).then(res => {
                    ipc.send('saveFile', keyword + '.html', res.data);
                    console.log(res)
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
    },
    created() {
        // this.getInfo()
    }
}
