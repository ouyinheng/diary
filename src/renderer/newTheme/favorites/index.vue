<template>
    <div class="favorites">
        <header>
            <div>
                <!-- <el-button icon="el-icon-arrow-left"></el-button> -->
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
        </header>
        <div class="right" v-if="showFolder">
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
                <el-col v-for="(item, index) in officialList" :key="index" :span="6" style="padding: 5px 20px; box-sizing: border-box;">
                    <movie-item-card :item="item" @showDetails="showDetails"></movie-item-card>
                </el-col>
                <el-col :span="6" style="padding: 5px 20px; box-sizing: border-box;">
                    <el-card class="mx-auto addBtn" max-width="350" shadow="always" style="height: 187.5px;width: 100%" @click.native="showAdd">
                        <div class="iconfont icon-add addFile"></div>
                    </el-card>
                </el-col>
                <!-- <div class="m-col-item" v-for="(item, index) in movieList.lives" :key="index"  style="margin: 20px" @click="play(item)">
                    
                </div> -->
            </el-row>
        </div>
        <list v-else :url="folderUrl"></list>
        <add v-model="visible"></add>
    </div>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
import dbOption from "../../../main/src/sql/favoritedb.js";
import movieItemCard from '../components/movieItemCard'
import add from './add'
import list from './list'
const path = require('path');
function getPath(path) {
    return path.join(__dirname, path);
}
export default {
    name: 'favorites',
    components: {
        movieItemCard, add, list
    },
    data: () => ({
        showFolder: true, // 收藏夹
        folderUrl: '', // 收藏夹中的路径
        movieList: [],
        keyWord: '',
        visible: false,
        officialList: [],
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
        },
        getOfficialList() {
            dbOption.getData((db) => {
                this.officialList = db.get("posts").value();
                // this.showDetails(this.officialList[0]);
            })
        },
        showDetails(item) {
            this.folderUrl = item.url;
            this.showFolder = false;
        }
    },
    created() {
        console.log('adsf')
        this.getOfficialList()
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
        justify-content: space-between;
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