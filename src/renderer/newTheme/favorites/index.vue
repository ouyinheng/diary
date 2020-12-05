<template>
    <div class="favorites">
        <div class="left">
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
        </div>
        <div class="right">
            <div class="m_col">
                <div class="m-col-item" v-for="(item, index) in movieList.lives" :key="index"  style="margin: 20px" @click="play(item)">
                    <el-card :body-style="{ padding: '0px'}" shadow="hover">
                        <div style="overflow:hidden;">
                            <el-image :src="item.logo" :title="item.name">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </div>
                        <div style="padding: 4px;">
                            <p style="color:#37a;text-align:center;font-size:16px;">{{item.name}}</p>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
export default {
    name: 'favorites',
    data: () => ({
        movieList: [],
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
            ipc.send("getFileData", item.url, function(event, arg) {
                // 这里的arg是从主线程请求的数据
                console.log("render+" + arg);
            });
            ipc.on('asynchronous-reply', (event, arg) => {
                // console.log("render+" + arg);
                this.movieList = JSON.parse(arg)
            })
        }
    },
    created() {
        console.log('adsf')
        this.testFile()
    }
}
</script>

<style lang="scss" scoped>
.favorites {
    width: 100vw;
    height: 100vh;
    padding-top: 6vh;
    color: black;
    display: flex;
    .left {
        width: 20%;
        max-width: 350px;
        height: 100%;
        overflow: auto;
    }
    .right {
        width: 100%;
        height: 100%;
        background-color: gainsboro;
    }
    .m_col {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 300px);
    }
}
</style>