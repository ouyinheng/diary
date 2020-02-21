<template>
	<div class="tv-play" ref="load_group">
		<el-row>
			<div class="header">
				<div class="title">豆瓣排行</div>
				<el-dropdown trigger="hover" @command="handleCommand">
					<span class="el-dropdown-link hover-dom">
						{{video === 'tv' ? '电视剧' : '电影'}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="tv"><span :class="{active_video: video === 'tv'}">电视剧</span></el-dropdown-item>
						<el-dropdown-item command="movie"><span :class="{active_video: video === 'movie'}">电影</span></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-row>
		<el-row class="select_item">
			<div :class="{tag: true, active_tag: tag == item}" @click="tagChange(item)" v-for="(item, index) in tags" :key="index">{{item}}</div>
		</el-row>
		<el-row style="margin-top: 10px;">
			<div class="title-2" style="float: left;">精选</div>
			<div style="padding-bottom: 8px;float:right;line-height: 48px;">
				<span :class="{sortRule:true, active_sortRule: sortRule == 'recommend'}" @click="sortRuleChange('recommend')" style="margin-right: 16px;">热度</span>
				<span :class="{sortRule:true, active_sortRule: sortRule == 'time'}" @click="sortRuleChange('time')" style="margin-right: 16px;">时间</span>
				<span :class="{sortRule:true, active_sortRule: sortRule == 'rank'}" @click="sortRuleChange('rank')" style="margin-right: 16px;">评价</span>
			</div>
		</el-row>
		<mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="getList">
			<div style="display: flex;justify-content:space-around;flex-wrap:wrap;">
				<div :span="4" v-for="(item, index) in infos" :key="index" style="margin: 10px;" @click="toInfo(item.title)">
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
		</mu-load-more>
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
			video: 'tv',
			sortRule: 'recommend',
			start: 0,
			limit: 20,
			infos: [],
			refreshing: false,
			loading: false,
		}
	},
	methods: {
		...mapActions([
			'SET_LOADING_FALSE',
			'SET_LOADING_TURE'
		]),
		getTag() {
			this.SET_LOADING_TURE();
			this.$http.get(`https://movie.douban.com/j/search_tags?type=${this.video}&source=`).then((res)=>{
				this.tags = res.data.tags;
				this.tag = this.tags[0]
				this.getList();
			}).catch(err=>{
				this.SET_LOADING_FALSE();
			})
		},
		refresh() {},
		getList(bool=true) {
			this.loading = true;
			this.$http.get(`https://movie.douban.com/j/search_subjects?type=${this.video}&tag=${this.tag}&sort=${this.sortRule}&page_limit=${this.limit}&page_start=${this.start}`).then((res) => {
				if(bool) {
					this.infos.push(...res.data.subjects)
				} else {
					this.infos = res.data.subjects;
				}
				this.start += 20;
				this.SET_LOADING_FALSE();
				this.loading = false;
			}).catch(err=>{
				this.loading = false;
				this.SET_LOADING_FALSE();
			})
		},
		loadmore() {
			this.loading = true;
			this.getList();
		},
		// 切换电影电视剧
		handleCommand(command) {
			this.video = command;
			this.start = 0;
			this.infos= [];
			this.SET_LOADING_TURE();
			this.getTag();
		},
		// 切换tag时
		tagChange(item) {
			this.tag = item;
			this.scrollTop();
			this.getList(false);
		},
		// 设置排序规则
		sortRuleChange(item) {
			this.sortRule = item;
			this.getList(false);
		},
		toInfo(title) {
			this.$router.push({
				path: '/movieinfo',
				query: {
					title
				}
			})
		},
		scrollTop() {
			this.$refs.load_group.scrollIntoView();
		}
	},
	created() {
		this.getTag()
	}
}
</script>
<style lang="scss">
.mu-infinite-scroll-text {
	color: white;
}
.mu-circle {
	border-color: #1FD4AE !important;
}
.active_video {
	color: #1FD4AE;
}
</style>
<style lang="scss" scoped>
  .tv-play {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
	padding: 10px;
	.header {
		display:flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px 0 0;
	}
    .el-radio-button {
      margin-right: 10px;
      margin-bottom: 10px;
	}
	.tag {
		font-size: 16px;
		color: white;
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
		color: white;
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
		top: 0px;
		background: #1E1E20;
		margin-top: 10px;
		z-index: 100;
	}
  }
</style>