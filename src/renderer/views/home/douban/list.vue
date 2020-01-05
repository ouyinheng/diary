<template>
	<div class="tv-play">
		<el-row>
			<el-radio-group v-model="video" size="small" @change="setChanges">
				<el-radio-button class="bg--color-primary" label="tv">电视剧</el-radio-button>
				<el-radio-button label="movie">电影</el-radio-button>
			</el-radio-group>
		</el-row>
		
		<el-row style="margin-top: 10px;">
			<el-radio-group v-model="tag" size="small" @change="setChange">
				<el-radio-button :label="item" v-for="(item, index) in tags" :key="index"></el-radio-button>
			</el-radio-group>
		</el-row>
		<el-row style="margin-top: 10px;">
			<mu-flex align-items="center" style="padding-bottom: 8px;">
				<mu-radio v-model="sortRule" style="margin-right: 16px;" label="热度" value="recommend" @change="setChange"></mu-radio>
				<mu-radio v-model="sortRule" style="margin-right: 16px;" label="时间" value="time" @change="setChange"></mu-radio>
				<mu-radio v-model="sortRule" style="margin-right: 16px;" label="评价" value="rank" @change="setChange"></mu-radio>
			</mu-flex>
		</el-row>
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

		<mu-flex justify-content="center" align-items="center" style="padding: 20px;">
			<mu-button full-width color="primary" v-loading="loading" @click="loadmore">加载更多</mu-button>
		</mu-flex>
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
			loading: false
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
		getList(bool=true) {
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
		this.getTag()
	}
}
</script>

<style lang="scss" scoped>
  .tv-play {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    .el-radio-button {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
</style>