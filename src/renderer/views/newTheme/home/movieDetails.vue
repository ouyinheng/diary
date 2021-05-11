<template>
    <div class="header_box movie-info">
        <el-row>
            <el-col style="display:flex; justify-content:space-between;align-items:center" :span="24">
                <el-button type="text" @click="$router.back()"><i class="el-icon-arrow-left"></i> 返回</el-button>
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{getSelectSourch}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="腾讯">腾讯</el-dropdown-item>
                        <el-dropdown-item command="优酷">优酷</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-col>
        </el-row>
        <el-row v-for="(item, index) in infos" :key="index" style="margin: 20px 0;">
			<el-col :span="6">
				<el-image :src="item.cover" class="cover_image"></el-image>
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
					<p class="content overflow-text-el" :title="item.introduce.info_item_desc">{{item.introduce.info_item_desc}}</p>
				</p>
				<p>
                    <!-- <el-link type="primary" @click="toMovieDesHandler(item)">查看详情<i class="el-icon-arrow-right"></i></el-link> -->
					
					<!-- <mu-badge
						v-for="(Item, Index) in item.list"
						:key="Index"
						v-if="!gj.includes(Item.title)"
						:content="Item.type == 2 ? '预告' : ''"
						color="secondary"
						class="mr-2">
						<mu-button color="primary" @click="btnHandle(Item, item)">
							{{Item.title}}
						</mu-button>
					</mu-badge> -->
                    
					<mu-button
						color="primary"
						v-for="(Item, Index) in item.list"
						:key="Index"
						v-if="!gj.includes(Item.title)"
						@click="btnHandle(Item, item)">
						{{Item.title}}
					</mu-button>
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
import { mapGetters, mapMutations } from 'vuex'
const {ipcRenderer: ipc} = require('electron');
export default {
    name: 'movieDetails',
    data() {
        return {
            title: '',
            gj: ['收起', '展开'],
        }
    },
    mixins: [getQQMovieInfo],
    computed: {
        ...mapGetters([
            'getSelectSourch', 'getQqList', 'getYkList'
        ]),
        infos() {
            const obj = {
                '腾讯': 'getQqList',
                '优酷': 'getYkList',
            }
            console.log(this[obj[this.getSelectSourch]])
            return this[obj[this.getSelectSourch]]
        }
    },
    methods: {
        ...mapMutations([
            'setPlayMovieUrl', 'setClosePlay', 'setSelectSourch', 'setSearchKeyWord'
        ]),
        handleCommand(command) {
            this.setSelectSourch(command)
            // if(this.title === this.getSearchKeyWord && this.infos.length > 0)return;
            this.getInfo(this.title)
        },
        play(url) {
            this.setPlayMovieUrl(url);
            this.setClosePlay(false);
            return;
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
        toMovieDesHandler(item) {
            this.$router.push({
                path: '/movieDescription'
            })
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
        console.log(this.title, this.getSearchKeyWord)
        // if(this.title === this.getSearchKeyWord && this.infos.length > 0)return;
        this.setSearchKeyWord(this.title)
        this.getInfo(this.title)
    }
}
</script>

<style lang="scss" scoped>
	.movie-info {
		width: 1000px;
		margin: 0 auto;
		color: black;
        .cover_image {
            width: 160px;
            border-radius: 5px;
            background: #ebebeb;
        }
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