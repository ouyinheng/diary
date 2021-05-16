<template>
    <div class="typeDetails" ref="load_group">
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
                <el-row class="select_item">
                    <div :class="{tag: true, active_tag: tag == item}" @click="tagChange(item)" v-for="(item, index) in tags" :key="index">{{item}}</div>
                </el-row>
                <el-dropdown trigger="hover" @command="handleCommand" style="width: 85px;">
					<span class="el-dropdown-link hover-dom">
						{{video === 'tv' ? '电视剧' : '电影'}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="tv"><span :class="{active_video: video === 'tv'}">电视剧</span></el-dropdown-item>
						<el-dropdown-item command="movie"><span :class="{active_video: video === 'movie'}">电影</span></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
            </div>
            <el-row style="margin-top: 10px;">
                <div class="title-2" style="float: left;">精选</div>
                <div style="padding-bottom: 8px;float:right;line-height: 48px;">
                    <span :class="{sortRule:true, active_sortRule: sortRule == 'recommend'}" @click="sortRuleChange('recommend')" style="margin-right: 16px;">热度</span>
                    <span :class="{sortRule:true, active_sortRule: sortRule == 'time'}" @click="sortRuleChange('time')" style="margin-right: 16px;">时间</span>
                    <span :class="{sortRule:true, active_sortRule: sortRule == 'rank'}" @click="sortRuleChange('rank')" style="margin-right: 16px;">评价</span>
                </div>
            </el-row>
            <div class="m_col" >
                <div class="m-col-item" v-for="(item, index) in infos"  style="margin: 20px" :key="index" @click="toInfo(item)">
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
            </div>
            <div>
                <div class="more" @click="loadData">加载更多</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
	name: 'TvPlay',
	data() {
		return {
            keyWord:'',
			tags: [],
			tag: '',
			video: 'tv',
			sortRule: 'recommend',
			start: 0,
			limit: 20,
			infos: [],
			refreshing: false,
			loading: false,
			e_col: 4
		}
	},
	watch: {
		e_col(val) {
			console.log(val);
		}
	},
	methods: {
        backUp(item) {
            this.$router.back();
        },
		getTag() {
			this.$http.get(`https://movie.douban.com/j/search_tags?type=${this.video}&source=`).then((res)=>{
				this.tags = res.data.tags;
				this.tag = this.tags[0]
				this.getList();
			}).catch(err=>{
			})
		},
		resetData() {
			this.start = 0;
		},
		getList(bool=true) {
			this.loading = true;
			this.$http.get(`https://movie.douban.com/j/search_subjects?type=${this.video}&tag=${this.tag}&sort=${this.sortRule}&page_limit=${this.limit}&page_start=${this.start}`).then((res) => {
				if(bool) {
					this.infos.push(...res.data.subjects)
				} else {
					this.infos = res.data.subjects;
				}
				this.start += 20;
				this.loading = false;
			}).catch(err=>{
				this.loading = false;
			})
		},
        loadData() {
            this.getList(true);
        },
		// 切换电影电视剧
		handleCommand(command) {
			this.video = command;
			this.start = 0;
			this.infos= [];
			this.resetData();
			this.getList(false);
		},
		// 切换tag时
		tagChange(item) {
			this.tag = item;
			this.start = 0;
			this.scrollTop();
			this.getList(false);
		},
		// 设置排序规则
		sortRuleChange(item) {
			this.sortRule = item;
			this.start = 0;
			this.getList(false);
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
		scrollTop() {
			this.$refs.load_group.scrollIntoView();
		}
	},
	created() {
		this.getTag()
	},
	mounted() {
		// let m_col = this.$refs.m_col;
		// window.addEventListener('resize', (e) => {
		// 	this.e_col = parseInt(24/(m_col.$el.clientWidth/270))
		// 	if(this.e_col<3) {
		// 		this.e_col = 3;
		// 	}
		// 	if(this.e_col >= 5) {
		// 		this.e_col = 5;
		// 	}
		// })
	}
}
</script>

<style lang="scss">
.el-input--small .el-input__inner {
    border-radius: 50px;
}
</style>

<style lang="scss" scoped>
.typeDetails {
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
        .m_col {
            display: grid;
            justify-content: space-between;
            grid-template-columns: repeat(auto-fill, 310px);
        }
        // .header {
        //     display:flex;
        //     justify-content: space-between;
        //     align-items: center;
        //     padding: 0 15px 0 0;
        // }
        .el-radio-button {
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .tag {
            font-size: 16px;
            color: #1E1E20;
            padding: 2px 0;
            margin: 0 50px 10px 0;
            cursor: pointer;
            &:hover {
                color: #1FD4AE;
            }
        }
        .active_tag {
            color: #1FD4AE;
            border-bottom: 2px solid #1FD4AE;
        }
        .sortRule {
            font-size: 14px;
            color: #1E1E20;
            padding: 2px 0;
            margin: 0 50px 0 0;
            cursor: pointer;
            &:hover {
                color: #1FD4AE;
            }
        }
        .active_sortRule {
            color: #1FD4AE;
        }
        .select_item {
            width: 100%;
            display:flex;
            flex-wrap: wrap;
            position: sticky;
            top: 0;
            margin-top: 10px;
            z-index: 100;
        }
    }
    .more {
        display: block;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 14px;
        background: #f7f7f7;
        color: #37a;
        cursor: pointer;
    }
    .m_col {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 300px);
    }
}
</style>