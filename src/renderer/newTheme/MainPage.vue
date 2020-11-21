<template>
    <div id="main-page">
        <div class="top" :class="{ hiddenTop: hiddenTop}">
            <div class="top_left">
                <mu-avatar :size="20">
                    <img src="../assets/images/logo_icon.png">
                </mu-avatar>
                <div class="link">
                    <span v-for="(item, index) in menus" :key="index" :class="{
                        active: item.link===activeIndex
                    }" @click="setActive(index)">{{item.name}}</span>
                </div>
                <el-input v-model="keyword" size="mini" placeholder="请输入内容"></el-input>
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
                        <router-view class="view"></router-view>
                    </transition>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
    export default {
        name: "MainPage",
        components: {
            
        },
        data() {
            return {
                pageName: ['Homepage', 'picture'],
                transition: 'el-fade-in',
                max: false,
                activeIndex: 0,
                keyword: '',
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
                }]
            }
        },
        watch: {
            $route (to, from ) {
                if(this.pageName.includes(to.name)) {
                    this.transition = 'page-transfer'
                }
            },
            '$route.fullPath'(path) {
                this.activeIndex = path;
                this.hiddenTop = (this.activeIndex != '/newThemeRouter');
            }
        },
        computed: {
            loading() {
                return this.$store.state.Counter.loading;
            }
        },
        methods: {
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
            }
        },
        created() {
            console.log(this.$route);
            this.activeIndex = this.$route.fullPath;
            this.hiddenTop = (this.activeIndex != '/newThemeRouter');
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
        // box-shadow: none !important;
        // background-color: white !important;
        // transition: all .3s;
    }
    #main-page {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
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

                }
                span, .el-input {
                    -webkit-app-region: no-drag;
                    font-size: 20px;
                    color: white;
                    cursor: pointer;
                    margin-left: 10px;
                }
                .link {
                    width: 550px;
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
                span {
                    -webkit-app-region: no-drag;
                }
            }
        }
        .section {
            width: 100%;
            min-width: 800px;
            height: 100vh;
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
