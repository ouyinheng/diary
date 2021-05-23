<template>
	<div class="homepage">
		<!-- <header>
            <div>
                <el-button icon="el-icon-arrow-left"></el-button>
                <mu-button icon color="primary" small v-if="!showFolder" @click="showFolder=true">
                    <span class="el-icon-arrow-left"></span>
                </mu-button>
            </div>
            <div>
                <el-input
                    size="small"
                    class="header_search"
                    placeholder="请输入内容"
                    suffix-icon="el-icon-search"
                    v-model="keyWord">
                </el-input>
            </div>
        </header> -->
		<div class="right">
            <section class="section">
                <div class="now_showing">
                    <div class="between p-2">
                        <div class="title">推荐</div>
                        <!-- <div class="title more">更多 <i class="el-icon-d-arrow-right"></i></div> -->
                    </div>
                    <mu-grid-list class="gridlist-inline-demo" :cols="4">
                        <mu-grid-tile class="mu-grid-tile" v-for="(item, index) in recommList" :key="index" @click="toRecomInfo(item)">
                            <el-image style="width: 100%;" :src="item.cover" fit="unset"></el-image>
                            <span slot="title">{{item.title}}</span>
                        </mu-grid-tile>
                    </mu-grid-list>
                </div>
                <div class="between p-2">
                    <div class="title">电影</div>
                    <div class="title more" @click="toTypeDetails(getRecommListGet)">更多 <i class="el-icon-d-arrow-right"></i></div>
                </div>
                <div class="m_col" >
					<div class="m-col-item" v-for="(item, index) in getRecommListGet"  style="margin: 20px" :key="index" @click="toInfo(item)">
						<el-card style="height:340px;overflow:hidden;width: 200px;" :body-style="{ padding: '0px'}" shadow="hover">
							<div style="height:287px;overflow:hidden;width: 200px;">
								<el-image :src="item.cover" :title="item.title"></el-image>
							</div>
							<div style="">
								<div style="color:#37a;text-align:center;font-size:16px;">{{item.title}}</div>
								<div class="bottom clearfix" style="color:#e09015;text-align:center;">
									{{item.rate}}分
								</div>
							</div>
						</el-card>
					</div>
				</div>
                <div class="between p-2">
                    <div class="title">电视剧</div>
                    <div class="title more" @click="toTypeDetails(getTeleplayList)">更多 <i class="el-icon-d-arrow-right"></i></div>
                </div>
                <div class="m_col" >
					<div class="m-col-item" v-for="(item, index) in getTeleplayList"  style="margin: 20px" :key="index" @click="toInfo(item)">
						<el-card style="height:340px;overflow:hidden;width: 200px;" :body-style="{ padding: '0px'}" shadow="hover">
							<div style="height:287px;overflow:hidden;width: 200px;">
								<el-image :src="item.cover" :title="item.title"></el-image>
							</div>
							<div style="">
								<div style="color:#37a;text-align:center;font-size:16px;">{{item.title}}</div>
								<div class="bottom clearfix" style="color:#e09015;text-align:center;">
									{{item.rate}}分
								</div>
							</div>
						</el-card>
					</div>
				</div>
            </section>
        </div>
	</div>
</template>

<script>
import iconOyhMenus from '../components/magicIcon/menus'
const cheerio = require('cheerio')
import { mapGetters, mapActions } from 'vuex'
import * as utils from '@/utils/index'
export default {
    name: 'homepage',
    components: {
        iconOyhMenus
    },
    computed: {
        ...mapGetters([
            'getSites',
            'getTypeList',
            'getBannerList',
            'getRecommListGet',
            'getTeleplayList'
        ]),
        // sites() {
        //     return this.$store.state.Home.sites
        // }
	},
    data: () => ({
        cover: 'https://uploadfile.bizhizu.cn/up/ec/85/b6/ec85b6d07d9f2c2d8d1062aa03d9b322.jpg',
        title: '迪丽热巴',
        rate: '8.9',
        infos: [],
        keyWord: '',
        recommList: []
    }),
    methods: {
        ...mapActions([
            // 'getHomePageResourth',
            // 'getHomePageTypeList',
            'getBanner',
            'getRecommList',
            'getTVRecommList'
		]),
        async doubanMovieCrawler (url, movies = []) {
            const start = parseInt(Math.random()*220)
            const res = await this.$http.get(`https://movie.douban.com/top250?start=${start}&filter=`)
            const $ = cheerio.load(res.data)
            $('.grid_view .item').each(function () {
                const elem = $(this)
                movies.push({
                    id: elem.find('.hd a').attr('href'),
                    title: elem.find('.info .hd .title').text().trim(),
                    star: elem.find('.info .bd .star .rating_num').text().trim(),
                    url: elem.find('.hd a').attr('href'),
                    cover: elem.find('.pic img').attr('src'),
                    info: elem.find('.info .bd').children('p').first().text().trim(),
                    oneSentenceComment: elem.find('.info .bd .quote').text().trim()
                })
            })
            let list = [];
            // [1,2,3,4].forEach(item => {
            //     list.push(movies[parseInt(Math.random()*25)])
            // })
            this.recommList = movies.slice(0,4);
            console.log('movies', movies)
        },
        toInfo({title, id}) {
            this.$router.push({
				path: '/doubanInfo',
				query: {
					title,
                    id
				}
			})
        },
        toRecomInfo({title, url}) {
            this.$router.push({
				path: '/doubanInfo',
				query: {
					title,
                    url
				}
			})
        },
        toTypeDetails(ele) {
            this.$router.push('/typeDetails')
        }
    },
    async created() {
        // let xmlData = await this.getHomePageResourth()
        // let list = utils.xmlObj2json(xmlData.data)
        // this.infos = list.rss.list.video;
        // this.getHomePageTypeList()
        this.getBanner()
        this.getRecommList();
        this.getTVRecommList();
        this.doubanMovieCrawler();
    }
}
</script>

<style lang="scss" scoped>
.homepage {
	width: 100vw;
    height: 100vh;
    padding-top: 6vh;
    color: black;
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
        height: calc(100%);
        background-color: rgba(255, 255, 255, .1);
        padding: 10px 20px;
        overflow: {
            x: hidden;
            y: auto;
        };
        .section {
            color: black;
            .title {
                color: black;
                font-size: 26px;
            }
            .title.more {
                font-size: 16px;
                cursor: pointer;
                &:hover {
                    color: #409EFF;
                }
            }
            .input-placeholder {
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid white;
            }
            .gridlist-inline-demo {
                width: 100%;
                display: flex;
                flex-wrap: nowrap;
                overflow-x: auto;
                .mu-grid-tile {
                    overflow: hidden;
                    user-select: none;
                }
            }
            .m_col {
                display: grid;
                justify-content: space-between;
                grid-template-columns: repeat(auto-fill, 310px);
            }
            .el-iamge {
                position: relative;
                &-right {
                    position: absolute;
                    top: 0;
                    right: 20px;
                    display: block;
                    padding: 2px 5px;
                    background-color: rgba(0, 0, 0, .3);
                    color: white;
                }
            }
            .list {
                .item-list {
                    .cover {
                        width: 250px;
                        height: 150px;
                        object-fit: cover;
                        border-radius: 20px;
                    }
                    .title {
                        
                    }
                }
            }
        }
	}
}
</style>