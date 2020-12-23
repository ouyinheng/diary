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
                        <mu-grid-tile class="mu-grid-tile" v-for="(item, index) in getBannerList" :key="index" @click="toInfo(item.title)">
                            <el-image style="width: 100%;" :src="item.img" fit="fill"></el-image>
                            <span slot="title">{{item.title}}</span>
                        </mu-grid-tile>
                    </mu-grid-list>
                </div>
                <!--  -->
                <div class="now_showing" v-for="(ele, col) in getRecommListGet" :key="col" >
                    <div class="between p-2">
                        <div class="title">{{ele.albumTitle}}</div>
                        <div class="title more" @click="toTypeDetails(ele)">更多 <i class="el-icon-d-arrow-right"></i></div>
                    </div>
                    <Stick
                        :list="ele.videoList"
                        :loadTriggerDistance="200"
                    >
                        <template slot-scope="scope">
                            <el-card class="el-image">
                                <el-image scroll-container=".right" style="height: 400px;" fit="fill" :src="scope.data.imgUrl">
                                    <div slot="error" class="image-slot">
                                        <el-image :src="cover"></el-image>
                                    </div>
                                    <div slot="placeholder" class="image-slot">
                                        加载中<span class="dot">...</span>
                                    </div>
                                </el-image>
                                <h2>{{scope.data.title}}</h2>
                                <span class="el-iamge-right">{{scope.data.updateText}}</span>
                            </el-card>
                        </template>
                    </Stick>
                </div>
            </section>
        </div>
	</div>
</template>

<script>
import iconOyhMenus from '../components/magicIcon/menus'
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
            'getRecommListGet'
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
        keyWord: ''
    }),
    methods: {
        ...mapActions([
            'getHomePageResourth',
            'getHomePageTypeList',
            'getBanner',
            'getRecommList'
		]),
        toInfo(item) {

        },
        toTypeDetails(ele) {
            this.$router.push('/typeDetails')
        }
    },
    async created() {
        // let xmlData = await this.getHomePageResourth()
        // let list = utils.xmlObj2json(xmlData.data)
        // this.infos = list.rss.list.video;
        this.getHomePageTypeList()
        this.getBanner()
        this.getRecommList();
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
        height: calc(100% - 50px);
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