<template>
    <div class="header_box movie-info">
        <el-row v-for="(item, index) in dbList" :key="index" style="margin: 20px 0;" @click.native="toDetails(item)">
			<el-col :span="6">
				<el-image :src="item.cover" class="cover_image"></el-image>
			</el-col>
			<el-col :span="18">
                {{item.title}}
			</el-col>
		</el-row>
		<el-row v-if="dbList.length==0">
			暂无数据
		</el-row>
    </div>
</template>

<script>
import getQQMovieInfo from '../../../utils/mixins/getQQMovieInfo'
import { mapGetters, mapMutations } from 'vuex'
const {ipcRenderer: ipc} = require('electron');
export default {
    name: 'movieDetails',
    data() {
        return {
            title: '',
        }
    },
    mixins: [getQQMovieInfo],
    computed: {
        ...mapGetters([
            'getSelectSourch', 'getQqList', 'getYkList'
        ]),
    },
    methods: {
        ...mapMutations([
            'setPlayMovieUrl', 'setClosePlay', 'setSelectSourch', 'setSearchKeyWord', 'setVideoType'
        ]),
        toDetails({title, id}) {
            console.log('title', title, id)
            this.$router.push({
                path: '/doubanInfo',
                query: {
                    title,
                    id
                }
            })
        }
    },
    created() {
        this.title = this.$route.query.title
        this.setSearchKeyWord(this.title)
        this.getInfo(this.title)
    },
    mounted() {
        
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
			// color: rgba(0, 0, 0, .7);
			// font-size: 14px;
            display: inline-block;
            vertical-align: top;
            padding: 2px 5px;
            margin: 6px 5px 0 0;
            font-size: 12px;
            line-height: 1;
            color: #666;
            border: 1px solid #ececec;
            border-radius: 2px;
            background-color: #f8f8f8;
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