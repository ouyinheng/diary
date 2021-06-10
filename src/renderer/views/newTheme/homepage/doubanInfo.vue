<template>
    <div class="doubanInfo">
        <header class="db-hader" :style="{
            backgroundImage: `url('${bannerImg}')`
        }">
            <div class="movie-content">
                <div class="cover-box">
                    <v-img
                        :src="info.cover"
                        lazy-src="https://uploadfile.bizhizu.cn/up/ec/85/b6/ec85b6d07d9f2c2d8d1062aa03d9b322.jpg"
                        class="grey poster"
                        :alt="info.introduce.title.pri"
                    >
                    </v-img>
                </div>
                <!-- <img class="poster" :src="info.cover" :alt="info.introduce.title.pri"> -->
                <div style="width: 220px;"></div>
                <div class="movie-info">
                    <h3>
                        {{info.introduce.title.pri}}
                        <span class="sub">{{info.introduce.title.sub}}</span>
                    </h3>
                   
                    <div class="intro" ref="desc">
                        <div v-html="info.dy"></div>
                        <!-- <div v-html="info.bj"></div> -->
                        <!-- <div v-html="info.type"></div> -->
                        <div v-html="info.actor"></div>
                    </div>
                </div>
            </div>
            <div class="play-btn">
                <v-btn depressed color="#df2d2d" style="color: white;" @click="showTheList">
                    <i class="el-icon-caret-right"></i>播放
                </v-btn>
            </div>
        </header>
        <section class="movie-section">
            <el-row class="header_info" style="background-color: white;width: 80%;">
                <el-col :span="24">
                    <div class="scen_title">剧情介绍</div>
                    <div class="scenario" ref="scenario" v-html="scenarioHtml">
                    </div>
                </el-col>
                <el-col :span="24" class="mt-6">
                    <div class="scen_title">播放列表</div>
                    <div class="scenario">
                       <v-data-table
                            dense
                            :headers="headers"
                            :items="tableData"
                            item-key="name"
                            class="elevation-1"
                        >
                        <template v-slot:item.title="{ item }">
                            <div class="title_btn" @click="showTheList(item)">
                                {{ item.title }}
                            </div>
                        </template>
                        </v-data-table>
                    </div>
                </el-col>
            </el-row>
        </section>
        <play-list v-model="showDialog" v-if="showDialog" :movieName="movieName" :selectItem="selectItem"></play-list>
    </div>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
import { mapGetters, mapMutations } from 'vuex'
import getQQMovieInfo from '../../../utils/mixins/getQQMovieInfo'
import bannerImg from '../../../../../static/images/banner_bg.png'
import playList from './playList'
export default {
	name: 'TvPlay',
    mixins: [getQQMovieInfo],
    components: {
        'play-list': playList
    },
    computed: {
        tableData() {
            let list = [];
            let iqylist = [];
            let txlist = [];
            this.iqyListInfo.forEach(item => {
                console.log(item)
                iqylist.push({
                    title: item.introduce.title.pri,
                    laiyuan: '爱奇艺',
                    year: '',
                    area: '',
                    href: item.href
                })
            })
            this.txListInfo.forEach(item => {
                txlist.push({
                    title: item.introduce.title.pri,
                    laiyuan: '腾讯',
                    year: '',
                    area: '',
                    href: item.href
                })
            })
            list = this.playRRListInfo.map(item => {
                return {
                    ...item,
                    laiyuan: '人人'
                }
            })
            return list.concat(iqylist).concat(txlist);
        }
    },
	data() {
		return {
            selectItem: null,
            bannerImg: bannerImg,
            showDialog: false,
            id: '',
            title: '',
            descHtml: '',
            scenarioHtml: '', //剧情
            info: {introduce: {title:{pri: '',sub:''}}},
            activeTab: 0,
            playRRListInfo: [], // 人人视频数据
            rrPlayUrl: 'https://qn-cdn-web-local.rr.tv/',
            txListInfo: [],
            iqyListInfo: [],
            activeName: '0',
            movieName: '',
            headers: [
                { text: '片名', align: 'start', value: 'title'},
                { text: '来源', value: 'laiyuan' },
                { text: '上映', value: 'year' },
                { text: '语言', value: 'area' },
            ]
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
        setAcitve(index) {
            this.activeTab = index;
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        // 获取播放列表
        showTheList(item) {
            let name = this.info.introduce.title.pri.split(' ');
            this.movieName = name.length > 0 ? name[0] : '';
            if(this.movieName) {
                this.showDialog = true;
                this.selectItem = item;
            } else {
                this.$message.error('解析失败');
            }
        },
        backUp(item) {
            this.$router.back();
        },
        handleClick() {

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
                dy: item.querySelector('#info span:nth-of-type(1)').innerHTML.replace(/\/a>/ig, '/span>').replace(/<a/ig, '<span'),
                // bj: item.querySelector('#info span:nth-of-type(2)').innerHTML.replace(/\/a>/ig, '/span>').replace(/<a/ig, '<span'),
                // type: item.querySelector('#info span.p1:nth-of-type(1)').innerHTML.replace(/\/a>/ig, '/span>').replace(/<a/ig, '<span'),
                actor: item.querySelector('#info span.actor').innerHTML.replace(/\/a>/ig, '/span>').replace(/<a/ig, '<span'),
                rating: item.querySelector('.result-right .score') ? item.querySelector('.result-right .score').innerText : '',
            }
            this.descHtml = item.querySelector('#info span:not(.p1)').innerHTML.replace(/\/a>/ig, '/span>').replace(/<a/ig, '<span')
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
            // this.getRRList()
        },
        getRRList(title) {
			// https://web-api.rr.tv/search/season_h5?keywords=%E8%87%B4%E5%91%BD%E5%A5%B3%E4%BA%BA%20%E7%AC%AC%E4%B8%80%E5%AD%A3&size=10&id=&sort=&5-16-21
			this.$http.get(`https://web-api.rr.tv/search/season_h5?keywords=${encodeURIComponent(title ? title : this.title)}`).then((res) => {
                this.playRRListInfo = res.data.result;
            });
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
        const url = this.$route.query.url;
        this.title = this.$route.query.title;
		this.$http.get(this.id ? `https://movie.douban.com/subject/${this.id}/` : url).then(res => {
            // ipc.send('saveFile', this.title+'.html', res.data);
            this.$nextTick(() => {
                this.doubanParseHtml(res.data);
                // 获取人人数据
                // this.getRRList();
            })
        })
	},
	mounted() {
	}
}
</script>
<style lang="scss">
.doubanInfo {
    width: 100vw;
    height: 100vh;
    // padding-top: 6vh;
    color: black;
    overflow: hidden;
    overflow-y: auto;
    // padding-bottom: 30px;
    .title_btn {
        cursor: pointer;
        &:hover {
            color: #409EFF;
        }
    }
    .m_col {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 220px);
        .cover-box {
            width: 200px;
            height: 300px;
            overflow: hidden;
            cursor: pointer;
        }
        .movie-cover {
            transition: all .3s;
            &:hover {
                transform: scale(1.1);
            }
        }
    }
    .mt-6 {
        margin-top: 30px;
    }
    .play-btn {
        position: absolute;
        bottom: 30px;
        width: 70%;
        left: 50%;
        right: 50%;
        transform: translate(-50%, 0%);
        .v-btn {
            margin-left: 270px;
            width: 150px;
        }
    }
    .db-hader {
        width: 100%;
        height: calc(320px + 6vh);
        object-fit: cover;
        position: relative;
        background-size: 100% 100%;
        .movie-content {
            width: 70%;
            margin: 0 auto;
            display: flex;
            color: white;
            .cover-box {
                position: absolute;
                width: 220px;
                height: 315px;
                top: 70px;
                box-shadow: 1px 1px 30px #000;
                border: 4px solid white;
                overflow: hidden;
                box-sizing: content-box;
                cursor: pointer;
            }
            .poster {
                width: 220px;
                height: 315px;
                display: block;
                transition: all .3s;
                &:hover {
                    transform: scale(1.1);
                }
            }
            .movie-info {
                margin-top: 70px;
                margin-left: 50px;
                .sub {
                    display: inline-block;
                    vertical-align: top;
                    padding: 2px 5px;
                    margin: 6px 5px 0 0;
                    font-size: 12px;
                    line-height: 1;
                    font-weight: 400;
                    color: rgba( 255, 255, 255, .8);
                    border-radius: 2px;
                }
                .intro {
                    width: 550px;
                    font-size: 12px;
                    line-height: 20px;
                    padding-top: 10px;
                    .actor {
                        display: block;
                        width: 550px;
                        height: 20px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .attrs {
                        max-height: 60px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 100%;
                        display: inline-block;
                    }
                }
            }
        }
    }
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
    .movie-section {
        margin-top: 90px;
        width: 100%;
        height: 400px;
        background-color: whtie;
        display: flex;
        justify-content: space-around;
        .header_info {
            background-color: #eee;
            padding: 20px;
            box-sizing: content-box;
            .scen_title {
                color: #ff5f00;
                font-size: 20px;
            }
            .scenario {
                margin-top: 20px;
                font-size: 14px;
                line-height: 19px;
            }
            .play_list {
                .demo-list {
                    min-height: 150px;
                }
            }
        }
    }
}
</style>