<template>
	<div class="homepage">
		<div class="right">
            <section class="section">
                <div class="now_showing">
                    <div class="between p-2">
                        <div class="title">推荐</div>
                        <!-- <div class="title more">更多 <i class="el-icon-d-arrow-right"></i></div> -->
                    </div>
                    <div class="m_col" >
                        <div class="m-col-item" v-for="(item, index) in recommList"  style="margin: 10px" :key="index" @click="toRecomInfo(item)">
                            <v-card class="mx-auto" style="height:350px;overflow:hidden;width: 200px;">
                                <v-img
                                    :src="item.cover"
                                    width="200px"
                                ></v-img>
                                <v-card-title :title="item.title">
                                    {{item.title}}
                                </v-card-title>
                            </v-card>
                        </div>
                    </div>
                </div>
                <div class="between p-2">
                    <div class="title">电影</div>
                    <div class="title more" @click="toTypeDetails(getRecommListGet)">更多 <i class="el-icon-d-arrow-right"></i></div>
                </div>
                <div class="m_col" >
					<div class="m-col-item" v-for="(item, index) in getRecommListGet"  style="margin: 10px" :key="index" @click="toInfo(item)">
                        <v-card class="mx-auto" style="height:350px;overflow:hidden;width: 200px;">
                            <v-img
                                :src="item.cover"
                                width="200px"
                            ></v-img>
                            <v-card-title :title="item.title">
                                {{item.title}}
                            </v-card-title>
                        </v-card>
					</div>
				</div>
                <div class="between p-2">
                    <div class="title">电视剧</div>
                    <div class="title more" @click="toTypeDetails(getTeleplayList)">更多 <i class="el-icon-d-arrow-right"></i></div>
                </div>
                <div class="m_col" >
					<div class="m-col-item" v-for="(item, index) in getTeleplayList"  style="margin: 10px" :key="index" @click="toInfo(item)">
						<v-card class="mx-auto" style="height:350px;overflow:hidden;width: 200px;">
                            <v-img
                                :src="item.cover"
                                width="200px"
                            ></v-img>
                            <v-card-title :title="item.title">
                                {{item.title}}
                            </v-card-title>
                        </v-card>
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
            this.recommList = movies.slice(0,5);
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

<style lang="scss">
.homepage {
	width: 100vw;
    height: 100vh;
    padding-top: 6vh;
    color: black;
    background-color: #fdfdfd;
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
                    border-radius: 5px;
                }
            }
            .m_col {
                display: grid;
                justify-content: space-between;
                grid-template-columns: repeat(auto-fill, 220px);
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
            .v-card__title {
                word-break: break-all;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                display: block !important;
                font-size: 20px !important;
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