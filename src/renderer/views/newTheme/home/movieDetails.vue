<template>
    <div class="header_box movie-info">
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
					<!--  -->
					<mu-badge
						v-for="(Item, Index) in item.list"
						:key="Index"
						v-if="!gj.includes(Item.title)"
						:content="Item.type == 2 ? '预告' : ''"
						color="secondary"
						class="mr-2">
						<mu-button color="primary" @click="btnHandle(Item, item)">
							{{Item.title}}
						</mu-button>
					</mu-badge>
					<!-- <mu-button
						color="primary"
						v-for="(Item, Index) in item.list"
						:key="Index"
						v-if="!gj.includes(Item.title)"
						@click="btnHandle(Item, item)">
						{{Item.title}}
					</mu-button> -->
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
import getDetailsList from './getDetailsList'
import getQQMovieInfo from '../../../utils/mixins/getQQMovieInfo'
export default {
    name: 'movieDetails',
    data() {
        return {
            title: '',
            gj: ['收起', '展开'],
        }
    },
    mixins: [getQQMovieInfo],
    methods: {
        play(url) {
            console.log(window.location.href + ':' + window.location.port)
			const BrowserWindow = require('electron').remote.BrowserWindow
			let win = new BrowserWindow({
				width: 900,
				height: 520,
				frame: true,
				webPreferences: {
					webSecurity: false,
					plugins: true
				}
			});
			win.on('close', function () { win = null })
			// https://beaacc.com/api.php?url=
			// http://jqaaa.com/jx.php?url=
			// http://jx.618g.com/?url=
			// https://www.pohaier.com/kuku/index.php?url=
			//   win.loadURL('http://jqaaa.com/jx.php?url='+url)
			win.loadURL( `${window.location.origin}/#/playMovie?url=${url}`)
			win.show()
			// this.$http.get(`${this.$url}/real?url=${url}`)
		},
        btnHandle(Item, item) {
			if(Item.title === '...') {
				this.getMoreList(Item, item)
			} else {
				this.play(Item.url)
			}
		},
        getMoreList(row, item) {
			this.$http.get(`https://s.video.qq.com/get_playsource?id=${item.id}&plat=2&type=4&range=0-1&data_type=2&video_type=2&plname=qq&otype=json&callback=getMoreList&_t=${new Date().getTime()}`).then(res => {
				let result = JSON.parse(res.data.substring(12, res.data.length-1));
				console.log(item, result)
				item.list = result.PlaylistItem.videoPlayList.map(row => {
					return {
						title: row.title,
						url: row.playUrl,
						type: row.type
					}
				})
			})
		},
    },
    created() {
        this.title = this.$route.query.title
        // getDetailsList.init(this.title)
        this.getInfo(this.title)
    }
}
</script>

<style lang="scss" scoped>
	.movie-info {
		width: 1000px;
		margin: 30px auto;
		color: black;
		.header {
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 15px 0 0;
		}
		.sub {
			color: rgba(0, 0, 0, .7);
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
			color: rgba(0, 0, 0, .7);
			font-size: 12px;
			letter-spacing: normal;
			line-height: 22px;
			text-overflow: ellipsis;
			vertical-align: top;
			white-space: nowrap;
			word-break: break-all;
		}
		.content {
			color: rgba(0, 0, 0, .5);
		}
		.mu-raised-button {
			min-width: 50px;
			margin-right: 10px;
			margin-bottom: 10px;
		}
	}
</style>