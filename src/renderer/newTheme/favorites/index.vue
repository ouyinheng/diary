<template>
    <div class="favorites">
        <!-- <div class="left">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <div v-for="(item, index) in menuList" :key="index">
                    <template v-if="item.isSubmenu">
                        <el-submenu :index="index">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group v-for="(ele, key) in item.submenu.menuItem" :key="key">
                                <el-menu-item :index="index+'-'+key" @click="setRightListData(ele)">{{ele.title}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="index">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{item.title}}</span>
                        </el-menu-item>
                    </template>
                </div>
            </el-menu>
        </div> -->
        <header>
            <div>
                <el-input
                    size="small"
                    class="header_search"
                    placeholder="请输入内容"
                    suffix-icon="el-icon-search"
                    v-model="keyWord">
                </el-input>
            </div>
        </header>
        <div class="right">
            <div class="header">
                <span class="header-title">全部项目</span>
                <el-dropdown :hide-on-click="true">
                    <span class="el-dropdown-link">
                        <span class="iconfont icon-elipsis" style="font-size: 20px;"></span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-row>
                <el-col :span="6" style="padding: 5px 20px; box-sizing: border-box;">
                    <movie-item-card></movie-item-card>
                </el-col>
                <el-col :span="6" style="padding: 5px 20px; box-sizing: border-box;">
                    <el-card class="mx-auto addBtn" max-width="350" shadow="always" style="height: 204px;width: 100%" @click.native="showAdd">
                        <div class="iconfont icon-add addFile"></div>
                    </el-card>
                </el-col>
                <!-- <div class="m-col-item" v-for="(item, index) in movieList.lives" :key="index"  style="margin: 20px" @click="play(item)">
                    
                </div> -->
            </el-row>
        </div>
        <add v-model="visible"></add>
    </div>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
import movieItemCard from '../components/movieItemCard'
import add from './add'
export default {
    name: 'favorites',
    components: {
        movieItemCard, add
    },
    data: () => ({
        movieList: [],
        keyWord: '',
        visible: false,
        menuList: [{
            isSubmenu: true,
            submenu: {
                title: '官方收藏',
                menuItem: [{
                    title: '80S',
                    url: '../renderer/lib/80S.json'
                }]
            }
        }, {
            isSubmenu: false,
            title: '官方收藏1', 
        }]
    }),
    methods: {
        showAdd() {
            this.visible = true;
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        testFile() {
            console.log('大师傅')
            ipc.send('saveFile', 'test01.txt', '啦啦啦啦');
        },
        setRightListData(item) {
            console.log(item)
            ipc.send("getFileStreamData", item.url);
            // ipc.on('asynchronous-reply', (event, arg) => {
            //     // console.log("render+" + arg);
            //     this.movieList = JSON.parse(arg)
            // })
        }
    },
    created() {
        console.log('adsf')
        this.testFile()
    }
}
</script>

<style lang="scss">
.el-input--small .el-input__inner {
    border-radius: 50px;
}
</style>

<style lang="scss" scoped>
.favorites {
    width: 100vw;
    height: 100vh;
    padding-top: 6vh;
    color: black;
    header {
        height: 50px;
        padding: 10px;
        background-color: white;
        display: flex;
        .header_search {
            width: 250px;
        }
    }
    // display: flex;
    .left {
        width: 20%;
        max-width: 350px;
        height: 100%;
        overflow: auto;
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
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            user-select: none;
            line-height: 20px;
            font-size: 16px;
            margin-bottom: 12px;
        }
        .addBtn {
            display: flex;
            justify-content: space-around;
            align-items: center;
            transition: all 0.3s cubic-bezier(0.44,0.9,0.6,0.94);
            cursor: pointer;
            &:hover {
                box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
                transform: translateY(-5px);
            }
            .addFile {
                font-size: 45px;
                font-weight: bold;
                color: gray;
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