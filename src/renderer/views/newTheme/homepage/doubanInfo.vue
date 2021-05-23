<template>
    <div class="douban_info" ref="douban_info">
        <!-- <header>
            <div>
                <mu-button icon color="primary" small @click="backUp">
                    <span class="el-icon-arrow-left"></span>
                </mu-button>
            </div>
            <div class="">
                
            </div>
        </header> -->
        <div class="right">
            <div class="content-box">
                <el-row class="header_info">
                    <el-col :span="6">
                        <el-image :src="info.cover" class="cover_image"></el-image>
                    </el-col>
                    <el-col :span="18">
                        <p>
                            <span style="font-size:16px;font-weight:bold;">{{info.introduce.title.pri}}</span>
                            <span class="sub">{{info.introduce.title.sub}}</span>
                        </p>
                        <div class="intro" ref="desc" v-html="descHtml">
                        </div>
                    </el-col>
                </el-row>
                <el-row class="header_info" style="background-color: white">
                    <el-col :span="24">
                        <div class="scen_title">剧情介绍</div>
                        <div class="scenario" ref="scenario" v-html="scenarioHtml">
                        </div>
                    </el-col>
                </el-row>
                <el-row class="header_info" style="background-color: white">
                    <el-col :span="24">
                        <div class="scen_title">播放列表</div>
                        <div class="play_list">
                            <mu-tabs :value.sync="activeTab" inverse color="secondary" text-color="rgba(0, 0, 0, .54)">
                                <mu-tab>腾讯</mu-tab>
                                <mu-tab>优酷</mu-tab>
                                <mu-tab>其他</mu-tab>
                            </mu-tabs>
                            <div class="demo-list" v-if="activeTab === 2">
                                <!-- playRRListInfo -->
                                <el-row v-for="(item, index) in playRRListInfo" :key="index" style="margin: 20px 0;">
                                    <el-col :span="6">
                                        <el-image :src="item.cover" class="cover_image"></el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <p>
                                            <span style="font-size:16px;font-weight:bold;">{{item.introduce.title.pri}}</span>
                                            <span class="sub">{{item.introduce.title.sub}}</span>
                                        </p>
                                        <p class="info_item" style="margin-top: 10px;">
                                            <span>导演：</span>
                                            <span class="content">{{item.introduce.info_item_odd}}</span>
                                        </p>
                                        <p class="info_item" style="margin: 10px 0;">
                                            <span>主演：</span>
                                            <span class="content">{{item.introduce.info_item_even}}</span>
                                        </p>
                                        <p>
                                            <span>简介：</span>
                                            <p class="content overflow-text-el" :title="item.introduce.info_item_desc">{{item.introduce.info_item_desc}}</p>
                                        </p>
                                        <p>
                                            <mu-button
                                                v-for="(Item, Index) in item.list"
                                                :key="Index"
                                                style="width:80px;margin-right: 5px;margin-top: 5px;overflow: hidden;"
                                                color="primary"
                                                @click="btnHandle(Item, item)">
                                                <div style="width: 80px;overflow: hidden;height: 35px;">{{Item.title}}</div>
                                            </mu-button>
                                            <mu-button color="primary" v-if="item.list.length==0" @click="playTXVideo(item)">立即播放</mu-button>
                                        </p>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="demo-list" v-if="activeTab === 0">
                                <el-row v-for="(item, index) in txListInfo" :key="index" style="margin: 20px 0;">
                                    <el-col :span="6">
                                        <el-image :src="item.cover" class="cover_image"></el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <p>
                                            <span style="font-size:16px;font-weight:bold;">{{item.introduce.title.pri}}</span>
                                            <span class="sub">{{item.introduce.title.sub}}</span>
                                        </p>
                                        <p>
                                            <mu-button
                                                v-for="(Item, Index) in item.list"
                                                :key="Index"
                                                style="width:80px;margin-right: 5px;margin-top: 5px;overflow: hidden;"
                                                color="primary"
                                                @click="btnHandle(Item, item)">
                                                <div style="width: 80px;overflow: hidden;height: 35px;">{{Item.title}}</div>
                                            </mu-button>
                                            <mu-button color="primary" v-if="item.list.length==0" @click="playTXVideo(item)">立即播放</mu-button>
                                        </p>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="demo-list" v-if="activeTab === 1">
                                <el-row v-for="(item, index) in iqyListInfo" :key="index" style="margin: 20px 0;">
                                    <el-col :span="6">
                                        <el-image :src="item.cover" class="cover_image"></el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <p>
                                            <span style="font-size:16px;font-weight:bold;">{{item.introduce.title.pri}}</span>
                                            <span class="sub">{{item.introduce.title.sub}}</span>
                                        </p>
                                        <p>
                                            <mu-button
                                                v-for="(Item, Index) in item.list" 
                                                :key="Index"
                                                style="width:80px;margin-right: 5px;margin-top: 5px;"
                                                color="primary"
                                                @click="playIQYVideo(Item)">
                                                <div style="width: 80px;overflow: hidden;height: 35px;">{{Item.title}}</div>
                                            </mu-button>
                                            <mu-button color="primary" v-if="item.list.length==0" @click="playIQYVideo(item)">立即播放</mu-button>
                                        </p>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
import { mapGetters, mapMutations } from 'vuex'
import getQQMovieInfo from '../../../utils/mixins/getQQMovieInfo'

export default {
	name: 'TvPlay',
    mixins: [getQQMovieInfo],
	data() {
		return {
            id: '',
            title: '',
            descHtml: '',
            scenarioHtml: '', //剧情
            info: {},
            activeTab: 0,
            playRRListInfo: [], // 人人视频数据
            rrPlayUrl: 'https://qn-cdn-web-local.rr.tv/',
            txListInfo: [],
            iqyListInfo: []
		}
	},
    watch: {
        '$route.query'() {
            this.id = this.$route.query.id;
            this.title = this.$route.query.title;
            this.$http.get(`https://movie.douban.com/subject/${this.id}/`).then(res => {
                // ipc.send('saveFile', this.title+'.html', res.data);
                this.$nextTick(() => {
                    this.doubanParseHtml(res.data)
                })
            })
        }
    },
	methods: {
        ...mapMutations([
            'setPlayMovieUrl', 'setClosePlay', 'setVideoType'
        ]),
        
        backUp(item) {
            this.$router.back();
        },
		// https://movie.douban.com/subject/30464901/?tag=%E7%83%AD%E9%97%A8&from=gaia_video
        doubanParseHtml(html) {
            const item = document.createElement('div');
            item.innerHTML = html.split('<body>')[1].split('</body>')[0];
            this.info = {
                cover: item.querySelector('.nbgnbg img') ? item.querySelector('.nbgnbg img').getAttribute('src') : '',
                href: '',
                introduce: {
                    title: {
                        sub: item.querySelector('#content h1 span') ? item.querySelector('#content h1 span:nth-of-type(2)').innerText : '',
                        pri: item.querySelector('#content h1 span') ? item.querySelector('#content h1 span:nth-of-type(1)').innerText : '',
                        type: '',
                    },
                },
                rating: item.querySelector('.result-right .score') ? item.querySelector('.result-right .score').innerText : '',
            }
            this.descHtml = item.querySelector('#info').innerHTML.replace(/\/a>/ig, '/span>').replace(/<a/ig, '<span')
            this.scenarioHtml = item.querySelector('.related-info .indent').innerText
            let sourth = item.querySelectorAll('.gray_ad .bs li a');
            let list = [];
            if(sourth.length) {
                sourth.forEach(item => {
                    list.push(item.innerText.trim())
                })
            }
            if(list.includes('爱奇艺视频')) {
                this.getIQYList()
            }
            if(list.includes('腾讯视频')) {
                this.getTXList()
            }
            this.getRRList()
            // console.log('list', list)
            // this.getRRList()
        },
        getRRList(need=true, title) {
            const that = this;
            // https://web-api.rr.tv/search/season_h5?keywords=%E8%87%B4%E5%91%BD%E5%A5%B3%E4%BA%BA%20%E7%AC%AC%E4%B8%80%E5%AD%A3&size=10&id=&sort=&5-16-21
            this.$http.get(`https://www.mahua110.com/search/-------------.html?wd=${encodeURIComponent(title ? title : this.title)}`).then(res => {
                const ele = document.createElement('div');
                let html = res.data;
                ele.innerHTML = html.split('<body>')[1].split('</body>')[0];
                const searchList = ele.querySelectorAll('#searchList .clearfix')
                searchList.forEach(item => {
                    let movieInfo = {
                        id: '',
                        href: item.querySelector('a').getAttribute('href'),
                        cover: item.querySelector('a').getAttribute('data-original'),
                        source: {
                            img: '',
                            text: '麻花影视'
                        },
                        introduce: {
                            title: {
                                pri: item.querySelector('.detail .searchkey').innerText,
                                sub: '',
                                type: '',
                            },
                            info_item_odd: item.querySelector('.detail p:nth-of-type(1)').innerText.replace('导演：', ''),
                            info_item_even: item.querySelector('.detail p:nth-of-type(2)').innerText.replace('主演：', ''),
                            info_item_desc: item.querySelector('.detail .hidden-xs').innerText.replace('简介：', ''),
                        },
                        rating: item.querySelector('a .pic-tag.pic-tag-top').innerText.trim(),
                        list: []
                    }
                    console.log('人人', movieInfo)
                    that.playRRListInfo.push(movieInfo)
                })
                // playRRListInfo
            })
        },
        getTXList(title) {
            this.$http.get(`https://v.qq.com/x/search/?q=${encodeURIComponent(title ? title : this.title)}`).then(res => {
                const item = this.parseHtml(res.data, false);
                console.log('tx', item)
                this.txListInfo = item;
            })
        },
        getIQYList(title) {
            this.$http.get(`https://so.iqiyi.com/so/q_${encodeURIComponent(title ? title : this.title)}`).then(res => {
                const item = this.parseIQYHtml(res.data, false);
                console.log('item', item)
                this.iqyListInfo = item
            })
        },
        deleteContent(dom) {
            Array.from(dom.querySelectorAll('span')).forEach(item => {
            })
        },
        playRRVideo(item) {
            const url = this.rrPlayUrl + item.key + `?sign=cc14b3645229d0db6c1ca3811d04514c&t=60a139af`
            this.setPlayMovieUrl(url);
            this.setVideoType('html')
            this.setClosePlay(false);
        },
        btnHandle(Item, item) {
            if(Item.title === '...') {
				this.getMoreList(Item, item)
			} else {
				this.playTXVideo(item)
			}
        },
        playTXVideo(item) {
            let url = item.href || item.url;
            if(url && !url.includes('https:')) {
                url = 'http:' + url
            }
            this.setPlayMovieUrl(url);
            this.setVideoType('webview')
            this.setClosePlay(false);
        },
        getMoreList(Item, item) {
            this.$http.get(`https://s.video.qq.com/get_playsource?id=${item.id}&plat=2&type=4&range=0-1&data_type=2&video_type=2&plname=qq&otype=json&callback=getMoreList&_t=${new Date().getTime()}`).then(res => {
				let result = JSON.parse(res.data.substring(12, res.data.length-1));
				console.log(item, result)
				item.list = result.PlaylistItem.videoPlayList.map(row => {
					return {
						title: row.title,
						url: row.playUrl,
						type: row.type
					}
				})
			})
        },
        playIQYVideo(item) {
            let url = item.href || item.url;
            if(url && !url.includes('https:')) {
                url = 'http:' + url
            }
            this.setPlayMovieUrl(url);
            this.setVideoType('webview')
            this.setClosePlay(false);
        }
	},
	created() {
        this.id = this.$route.query.id;
        this.title = this.$route.query.title;
		this.$http.get(`https://movie.douban.com/subject/${this.id}/`).then(res => {
            // ipc.send('saveFile', this.title+'.html', res.data);
            this.$nextTick(() => {
                this.doubanParseHtml(res.data);
                // 获取人人数据
            })
        })
	},
	mounted() {
	}
}
</script>

<style lang="scss">
.douban_info {
    .el-input--small .el-input__inner {
        border-radius: 50px;
    }
    .el-button+.el-button {
        margin-left: 0 !important;
    }
    .el-button {
        width: 80px;
        margin-right: 5px !important;
        margin-top: 5px !important;
    }
    .intro{
        &>span {
            line-height: 25px;
        }
        span[text='官方网站'] {
            display: none;
        }
        select {
            display: none;
        }
    }
}
</style>

<style lang="scss" scoped>
.douban_info {
    width: 100vw;
    height: 100vh;
    margin-top: 6vh;
    color: black;
    overflow: hidden;
    header {
        height: 50px;
        padding: 10px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        .header_search {
            width: 250px;
        }
    }
    .right {
        width: 100%;
        height: calc(100% - 50px);
        background-color: rgba(255, 255, 255, .1);
        padding: 10px 20px;
        overflow: {
            x: hidden;
            y: auto;
        };
        .content-box {
            padding: 0px 20px;
            .header_info {
                background-color: #eee;
                padding: 20px;
                box-sizing: content-box;
                border-radius: 20px;
                margin-bottom: 20px;
                .scen_title {
                    color: #ff5f00;
                    font-size: 20px;
                }
                .play_list {
                    .demo-list {
                        min-height: 150px;
                    }
                }
            }
            .cover_image {
                // width: 180px;
                border-radius: 5px;
                background: #ebebeb;
            }
            .sub {
                // color: rgba(0, 0, 0, .7);
                // font-size: 14px;
                display: inline-block;
                vertical-align: top;
                padding: 2px 5px;
                margin: 6px 5px 0 0;
                font-size: 12px;
                line-height: 1;
                color: #666;
                border: 1px solid #ececec;
                border-radius: 2px;
                background-color: #f8f8f8;
            }
            .type {
                color: #999;
                font-size: 12px;
            }
            .info_item {
                zoom: 1;
                max-width: 100%;
                margin-top: 10px;
                overflow: hidden;
                color: rgba(0, 0, 0, .7);
                font-size: 12px;
                letter-spacing: normal;
                line-height: 22px;
                text-overflow: ellipsis;
                vertical-align: top;
                white-space: nowrap;
                word-break: break-all;
            }
        }
    }
    .m_col {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 300px);
    }
}
</style>