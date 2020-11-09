<template>
    <div id="main-page">
        <div class="top">
            <div class="logo">
                &nbsp;
            </div>
            <div class="link">
                <span v-for="(item, index) in menus" :key="index" :class="{
                    active: item.link===activeIndex
                }" @click="setActive(index)">{{item.name}}</span>
            </div>
            <div class="setting">
                <span class="iconfont icon-minus" @click="closeWin('min')"></span>
                <span class="iconfont icon-fullscreen-expand" @click="closeWin('max')"></span>
                <span class="iconfont icon-error" @click="closeWin('close')"></span>
            </div>
            <!-- <layout-left></layout-left> -->
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
    #main-page {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        .top .link .active {
            position: relative;
            color: lightcoral;
            &::before {
                position: absolute;
                background-color: lightcoral;
                bottom: 1px;
                left: 0;
                right: 0;
                width: 100%;
                height: 2px;
                border-radius: 5px;
            }
        }
        .top {
            -webkit-app-region: drag;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5vh;
            line-height: 5vh;
            padding: 0 10px;
            background-color: rgba(0, 0, 0, .2);
            overflow: hidden;
            z-index: 10000;
            display: flex;
            justify-content: space-between;
            box-shadow: -80vw 1px 100px 1px #000000, 80vw 1px 100px 1px #000000;
            span {
                -webkit-app-region: no-drag;
                font-size: 20px;
                color: white;
                cursor: pointer;
                margin-left: 10px;
            }
            .link {
                span {
                    font-size: 16px;
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
            padding: 5vh 10px 10px;
        }
    }
</style>
