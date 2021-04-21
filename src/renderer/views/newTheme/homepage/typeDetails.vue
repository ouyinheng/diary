<template>
    <div class="favorites">
        <header>
            <div>
                <!-- <el-button icon="el-icon-arrow-left"></el-button> -->
                <mu-button icon color="primary" small @click="backUp">
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
            <Stick
                :list="tableData"
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
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const {ipcRenderer: ipc} = require('electron');
const path = require('path');
function getPath(path) {
    return path.join(__dirname, path);
}
export default {
    name: 'favorites',
    components: {
        
    },
    computed: {
        ...mapGetters({

        })
    },
    data: () => ({
        keyWord: '',
        tableData: [],
        cover: 'https://uploadfile.bizhizu.cn/up/ec/85/b6/ec85b6d07d9f2c2d8d1062aa03d9b322.jpg',
    }),
    methods: {
        ...mapActions([
            'getTypeDetailsActions'
		]),
        backUp(item) {
            this.$router.back();
        }
    },
    created() {
        this.getTypeDetailsActions(1)
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
    // padding-top: 6vh;
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
    }
    .m_col {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 300px);
    }
}
</style>