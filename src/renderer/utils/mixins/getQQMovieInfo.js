const {ipcRenderer: ipc} = require('electron');
import {mapState,mapActions} from 'vuex';
export default {
    name: 'qq',
    data() {
        return {
            list: [],
            infos: []
        }
    },
    methods: {
        ...mapActions([
            'SET_LOADING_FALSE',
            'SET_LOADING_TURE'
        ]),
        getInfo(keyword) {
            this.list = [];
            // this.SET_LOADING_TURE();
            this.$http.get(`https://v.qq.com/x/search/?q=${keyword}`).then(res => {
                // ipc.send('saveFile', keyword, res.data);
                this.parseHtml(res.data)
            })
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
                    id: item.querySelector('.result_item.result_item_v').getAttribute('data-id'),
                    href: item.querySelector('._infos a.figure.result_figure').getAttribute('href'),
                    cover: item.querySelector('.figure_pic').getAttribute('src'),
                    source: {
                        img: item.querySelector('.result_source img._cur_playsrc_img').getAttribute('src'),
                        text: item.querySelector('.result_source .icon_text').innerText
                    },
                    introduce: {
                        title: {
                            pri: item.querySelector('.result_title .hl').innerText,
                            sub: item.querySelector('.result_title .sub') ? item.querySelector('.result_title .sub').innerText.replace(/\s*/g,"") : '',
                            type: item.querySelector('.result_title .type').innerText,
                        },
                        info_item_odd: item.querySelector('.info_item.info_item_odd .content') ? item.querySelector('.info_item.info_item_odd .content').innerText : '',
                        info_item_even: item.querySelector('.info_item.info_item_even .content').innerText,
                        info_item_desc: item.querySelector('.info_item.info_item_desc .desc_text').innerText,
                    },
                    rating: item.querySelector('._infos .result_score') ? item.querySelector('._infos .result_score').innerText : '',
                    list
                }
                this.list.push(movieInfo)
            })
            this.infos = this.list
            console.log(this.infos)
		    // this.SET_LOADING_FALSE();
        },
    },
    created() {
        // this.getInfo()
    }
}
