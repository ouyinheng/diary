<template>
	<div class="movie-info">
		<el-row>
			<div class="header">
				<div class="title">{{title}}</div>
				<el-dropdown trigger="hover" @command="handleCommand">
					<span class="el-dropdown-link hover-dom">
						{{sourth === 'qq' ? '腾讯' : '芒果'}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="qq"><span :class="{active_sourth: sourth === 'qq'}">腾讯</span></el-dropdown-item>
						<el-dropdown-item command="mg"><span :class="{active_sourth: sourth === 'mg'}">芒果</span></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-row>
		<el-row v-for="(item, index) in infos" :key="index" style="margin: 20px 0;">
			<el-col :span="6">
				<el-image :src="item.cover" style="width: 200px;"></el-image>
			</el-col>
			<el-col :span="18">
				<p>
					<span style="font-size:16px;font-weight:bold;">{{item.introduce.title.pri}}</span>
					<span class="sub">{{item.introduce.title.sub}}</span>
					<!-- 
					<span class="type">{{item.introduce.title.type}}</span> -->
				</p>
				<p class="info_item" style="margin-top: 10px;">
					<span>导演：</span>
					<span class="content">{{item.introduce.info_item_odd}}</span>
				</p>
				<p class="info_item" style="margin: 10px 0;">
					<span>主演：</span>
					<span class="content">{{item.introduce.info_item_even}}</span>
				</p>
				<p>
					<span>简介：</span>
					<span class="content">{{item.introduce.info_item_desc}}</span>
				</p>
				<p>
					<mu-button color="primary" v-for="(Item, Index) in item.list" :key="Index" @click="play(Item.url)" v-if="!gj.includes(Item.title)">{{Item.title}}</mu-button>
					<mu-button color="primary" v-if="item.list.length==0" @click="play(item.href)">立即播放</mu-button>
				</p>
			</el-col>
		</el-row>
		<el-row v-if="infos.length==0">
			暂无数据
		</el-row>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import getQQMovieInfo from '@/utils/mixins/getQQMovieInfo.js'
import func from '@/utils/mixins/getVideoUrl.js'
const path = require('path')
export default {
	name: 'MovieInfo',
	mixins: [getQQMovieInfo],
	data() {
		return {
			infos: [],
			gj: ['收起', '展开'],
			sourth: 'qq',
			title: ''
		}
	},
	methods: {
		...mapActions([
			'SET_LOADING_FALSE',
			'SET_LOADING_TURE'
		]),
		// getInfos(title) {
		//   this.SET_LOADING_TURE();
		//   this.$http.get(`${this.$url}/movie/sourth?sourth=${this.sourth}&moviename=${title}`).then((res)=>{
		//     this.infos = res.data.result;
		//     this.SET_LOADING_FALSE();
		//   }).catch(()=>{
		//     this.SET_LOADING_FALSE();
		//   })
		// },
		play(url) {
			const BrowserWindow = require('electron').remote.BrowserWindow
			let win = new BrowserWindow({ 
				width: 900,
				height: 520,
				frame: false,
				webPreferences: {
					webSecurity: false,
					plugins: true
				}
			})
			win.on('close', function () { win = null })
			// https://beaacc.com/api.php?url=
			// http://jqaaa.com/jx.php?url=
			// http://jx.618g.com/?url=
			// https://www.pohaier.com/kuku/index.php?url=
			//   win.loadURL('http://jqaaa.com/jx.php?url='+url)
			win.loadURL('http://localhost:9080/#/showmovie?url='+url)
			win.show()
			this.$http.get(`${this.$url}/real?url=${url}`)
		},
		handleCommand(sourth) {
			this.sourth = sourth;
			this.getInfo(this.title)
		}
	},
	watch: {
		// '$route.query'(val) {
		// 	this.getInfo(val.title);
		// }
	},
	created() {
		this.title = this.$route.query.title
		this.getInfo(this.title)
		// this.getInfos(this.title);
	}
}
</script>

<style lang="scss">
	.active_video {
		color: #1FD4AE;
	}
</style>
<style lang="scss" scoped>
	.movie-info {
		width: 1000px;
		margin: 30px auto;
		color: white;
		.header {
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 15px 0 0;
		}
		.sub {
			color: #828282;
			font-size: 14px;
		}
		.type {
			color: #999;
			font-size: 12px;
		}
		.info_item {
			zoom: 1;
			max-width: 100%;
			margin-top: 10px;
			overflow: hidden;
			color: #999;
			font-size: 12px;
			letter-spacing: normal;
			line-height: 22px;
			text-overflow: ellipsis;
			vertical-align: top;
			white-space: nowrap;
			word-break: break-all;
		}
		.content {
			color: #D1D1D1;
		}
		.mu-raised-button {
			min-width: 50px;
			margin-right: 10px;
			margin-bottom: 10px;
		}
	}
</style>