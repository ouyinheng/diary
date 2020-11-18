<template>
  <div class="tv-play">
    <el-row class="tag-group">
        <el-col :span="20">
            <span :class="{ tag: true, active: item == tag }" v-for="(item, index) in tags" :key="index" @click="setTag(item)">{{item}}</span>
        </el-col>
        <el-col :span="4">
            <el-dropdown trigger="click" @command="setSortRule">
                <span class="el-dropdown-link">
                    {{sortMenu[sortRule].label}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, index) in sortMenu" :key="index" :command="index">
                        <span :class="{sortActive: index == sortRule}">{{item.label}}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
    <transition name="el-fade-in-linear">
        <div style="display: flex;justify-content:space-around;flex-wrap:wrap;margin-top: 25px;" v-if="changeTag" v-infinite-scroll="loadmore">
            <div class="items" :span="4" v-for="(item, index) in infos" :key="index" style="margin: 10px;" @click="toInfo(item.title)">
                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                    <div style="height:400px;overflow:hidden;min-width: 270px;">
                        <el-image :src="item.cover" :title="item.title"></el-image>
                    </div>
                    <div style="padding: 14px;">
                        <p style="color:#37a;text-align:center;font-size:16px;">{{item.title}}</p>
                        <div class="bottom clearfix" style="color:#e09015;text-align:center;">
                            {{item.rate}}分
                        </div>
                    </div>
                </el-card>
            </div>
            <div :span="4"></div>
            <div :span="4"></div>
            <div :span="4"></div>
            <div :span="4"></div>
        </div>
    </transition>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: 'TvPlay',
    data() {
        return {
            tags: [],
            tag: '',
            changeTag: false,
            video: 'tv',
            sortRule: 0,
            start: 0,
            limit: 20,
            infos: [],
            loading: false,
            sortMenu: [{
                label: '热度',
                value: 'recommend'
            }, {
                label: '时间',
                value: 'time'
            }, {
                label: '评价',
                value: 'rank'
            }]
        }
    },
    methods: {
        ...mapActions([
            'SET_LOADING_FALSE',
            'SET_LOADING_TURE'
        ]),
        getTag() {
            this.SET_LOADING_TURE();
            this.$http.get(`${this.$url}/douban/tag?video=${this.video}`).then((res)=>{
                this.tags = res.data.result;
                this.tag = this.tags[0]
                this.getList();
            }).catch(err=>{
                this.SET_LOADING_FALSE();
            })
        },
        getList(bool=true) {
            this.$http.get(`${this.$url}/douban/taginfo?video=${this.video}&tag=${this.tag}&sort=${this.sortMenu[this.sortRule].value}&start=${this.start}&limit=${this.limit}`).then((res) => {
                if(bool) {
                    this.infos.push(...res.data.result)
                } else {
                    this.infos = res.data.result;
                }
                this.start += 20;
                this.SET_LOADING_FALSE();
                this.loading = false;
                this.changeTag = true;
            }).catch(err=>{
                this.changeTag = true;
                this.loading = false;
                this.SET_LOADING_FALSE();
            })
        },
        loadmore() {
            this.loading = true;
            this.getList();
        },
        setChanges() {
            this.start = 0;
            this.infos= [];
            this.SET_LOADING_TURE();
            this.getTag();
        },
        setChange() {
            this.start = 0;
            this.SET_LOADING_TURE();
            this.getList(false);
        },
        setTag(item) {
            this.changeTag = false;
            this.tag = item;
            this.setChange();
        },
        // 切换排序规则
        setSortRule(index) {
            console.log(index)
            this.sortRule = index;
            this.setChange();
        },
        toInfo(title) {
            this.$router.push({
                path: '/movieinfo',
                query: {
                    title: title
                }
            })
        }
    },
    created() {
        this.video = this.$route.query.video;
        this.getTag()
    }
}
</script>

<style lang="scss" scoped>
.sortActive {
    color: rgb(30, 204, 148);
}
.el-dropdown-link {
    color: white;
    cursor: pointer;
    &:hover {
        color: rgb(30, 204, 148);
    }
}
.tv-play {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
    .el-radio-button {
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .tag-group {
        margin: 10px 0 20px 10px;
        position: fixed;
        top: 50px;
        left: 250px;
        right: 0;
        background-color: #1E1E20;
        z-index: 100;
        .el-col {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
        .tag {
            cursor: pointer;
            display: block;
            padding: 0 5px 5px;
            margin: 0 5px 10px 20px;
            color: white;
            &:hover {
                color: rgb(30, 204, 148);
            }
        }
        .active {
            position: relative;
            color: rgb(30, 204, 148);
            &::after {
                content: '';
                background-color: rgb(30, 204, 148);
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 2px;
                z-index: 10;
            }
        }
    }
    .items {
        transition: all .3s;
        cursor: pointer;
        &:hover {
            transform: scale(1.03);
        }
    }
}
</style>