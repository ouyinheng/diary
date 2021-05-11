<template>
    <div id="main-page">
        <div class="top" :class="{ hiddenTop: hiddenTop}">
            <div class="top_left">
                <img class="logo" src="../../assets/images/logo_icon.png" @click.stop="goHome()">
                <div class="link" v-if="isHomeLink">
                    <span v-for="(item, index) in menus" :key="index" :class="{
                        active: item.link===activeIndex
                    }" @click="setActive(index)">{{item.name}}</span>
                </div>
                <el-input v-if="isHomeLink" v-model="keyword" size="mini" placeholder="请输入内容" @keyup.native.enter="enterDetails" clearable></el-input>
            </div>
            <div class="setting">
                <span class="iconfont icon-minus" @click="closeWin('min')"></span>
                <span class="iconfont icon-fullscreen-expand" @click="closeWin('max')"></span>
                <span class="iconfont icon-error" @click="closeWin('close')"></span>
            </div>
        </div>
        <div class="section">
            <div class="content" v-loading="loading">
                <el-scrollbar :native="false">
                    <transition :name="transition" mode="out-in">
                        <keep-alive v-if="needKeep">
                            <router-view class="view"></router-view>
                        </keep-alive>
                        <router-view v-else class="view"></router-view>
                    </transition>
                </el-scrollbar>
            </div>
        </div>
        <div class="play-box" :class="{
                'closePlay': getClosePlay
            }" @click.stop="showThisBox" v-if="getPlayMovieUrl">
            <header class="play-box-header" v-if="!getClosePlay">
                <span></span>
                <span class="close-play el-icon-circle-close" @click.stop="closePlayHandler"></span>
            </header>
            <show-movie :playUrl="getPlayMovieUrl" v-if="showCom" v-show="!getClosePlay"></show-movie>
        </div>
    </div>
</template>

<script>
// import showMovie from '@/views/newTheme/showMovie/showMovie'
import ShowMovie from './showMovie/showMovie.vue';
const {ipcRenderer: ipc} = require('electron');
import { mapGetters , mapMutations } from 'vuex'
export default {
    name: "MainPage",
    components: {
        ShowMovie
    },
    data() {
        return {
            pageName: ['Homepage', 'picture'],
            transition: 'el-fade-in',
            max: false,
            activeIndex: 0,
            keyword: '',
            showCom: true,
            closePlay: true,
            menus: [{
                name: '推荐',
                link: '/newThemeRouter'
            }, {
                name: '主页',
                link: '/homePage'
            }, {
                name: '直播',
                link: '/liveBroadcast'
            }, {
                name: '收藏',
                link: '/favorites'
            }, {
                name: '应用',
                link: '/apply'
            }],
            needKeep: false
        }
    },
    watch: {
        $route (to, from ) {
            console.log(from)
            this.needKeep = !!from.meta.needKeep
            if(this.pageName.includes(to.name)) {
                this.transition = 'page-transfer'
            }
        },
        '$route.fullPath'(path) {
            this.activeIndex = path;
            this.hiddenTop = (this.activeIndex != '/newThemeRouter');
        },
        getPlayMovieUrl() {
            this.showCom = false;
            this.$nextTick(() => {
                this.showCom = true;
            })
        }
    },
    computed: {
        ...mapGetters([
            'getPlayMovieUrl', 'getClosePlay'
        ]),
        loading() {
            return this.$store.state.Counter.loading;
        },
        isHomeLink() {
            return ['/newThemeRouter', '/homePage', '/liveBroadcast', '/favorites', '/apply'].includes(this.activeIndex)
        }
    },
    methods: {
        ...mapMutations([
			'setClosePlay',
        ]),
        enterDetails() {
            if(this.keyword) {
                this.$router.push({
                    path: '/movieDetails',
                    query: {
                        title: this.keyword
                    }
                })
            }
        },
        showThisBox() {
            console.log(this.getClosePlay)
            if(this.getClosePlay) {
                this.setClosePlay(false)
            }
        },
        closeWin(type) {
            if(this.max&&type === 'max') {
                type = 'unmax'
                this.max = false;
            }
            if(type === 'max' && !this.max) {
                this.max = true;
            }
            ipc.send(type);
        },
        setActive(index) {
            this.activeIndex = this.menus[index].link;
            this.$router.push(this.menus[index].link)
        },
        goHome() {
            console.log('newThemeRouter')
            this.$router.push('/newThemeRouter')
        },
        closePlayHandler() {
            // this.closePlay = true;
            this.setClosePlay(true)
        }
    },
    created() {
        this.activeIndex = this.$route.fullPath;
        this.hiddenTop = (this.activeIndex != '/newThemeRouter');
        console.log('getPlayMovieUrl', this.getPlayMovieUrl)
    }
};
</script>

<style lang="scss" scoped>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        font-family: "Source Sans Pro", sans-serif;
    }
    .hiddenTop {
        // height: 0 !important;
        // line-height: 0 !important;
        box-shadow: none !important;
        background-color: white !important;
        // transition: all .3s;
    }
    #main-page {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        .closePlay {
            // display: none;
            bottom: 80px;
            right: 80px;
            border-radius: 50%;
            width: 80px !important;
            height: 80px !important;
            box-shadow: 1px 1px 1px #fff;
        }
        .play-box {
            position: fixed;
            z-index: 99999;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .6);
            overflow: hidden;
            &-header {
                position: absolute;
                top: 0px;
                left: 0;
                right: 0;
                background-color: rgba(0, 0, 0, .5);
                height: 40px;
                transition: all .3s;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                .close-play {
                    font-size: 25px;
                    color: white;
                    cursor: pointer;
                }
            }
            &:hover {
                .play-box-header {
                    top: 0;
                }
            }
        }
        .top .top_left .link .active {
            position: relative;
            color: white;
            background-color: #121212;
            border-radius: 15px;
        }
        .top {
            -webkit-app-region: drag;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6vh;
            padding: 0 10px;
            background-color: rgba(255, 255, 255, .4);
            overflow: hidden;
            z-index: 10000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: -80vw 1px 100px 1px #000000, 80vw 1px 100px 1px #000000;
            .top_left {
                display: flex;
                align-items: center;
                .logo {
                    width: 25px;
                    height: 25px;
                    -webkit-app-region: no-drag;
                }
                span, .el-input {
                    -webkit-app-region: no-drag;
                    font-size: 20px;
                    color: white;
                    cursor: pointer;
                    margin-left: 10px;
                }
                .link {
                    width: 650px;
                    span {
                        cursor: pointer;
                        display: inline-block;
                        color: #121212;
                        font-size: 16px;
                        padding: 5px 15px;
                    }
                }
            }
            .setting {
                margin: 0 10px;
                span {
                    -webkit-app-region: no-drag;
                }
            }
        }
        .section {
            width: 100%;
            min-width: 800px;
            height: 100vh;
            overflow: hidden;
            position: relative;
            .content {
                position: absolute;
                top: 0px;
                bottom: 0;
                left: 0;
                right: 0;
                // background-color: #1e1e20;
                overflow: auto;
                &::-webkit-scrollbar {
                    display: none;
                }
                .el-scrollbar {
                    height: 100%;
                }
            }
        }
        .view {
            transition: all .1s linear;
        }
    }
</style>
