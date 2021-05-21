<template>
    <div class="liveBroadcast">
        <div class="live_content" id="video"></div>
        <div class="live_list">
            <div class="m-col-item live_item" v-for="(item, index) in getIptv" :key="index"  style="margin: 20px" @click="play(item)">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters , mapActions } from 'vuex'
export default {
    name: 'liveBroadcast',
    data: () => ({
        displayForm: true, // true: 卡片；false：列表
    }),
    computed: {
        ...mapGetters([
            'getIptv',
        ]),
	},
    methods: {
        ...mapActions([
			'getHomePageResourth',
        ]),
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        play(item) {
            console.log('-----item: ', item.url)
            this.livePlay(item.url)
			// const BrowserWindow = require('electron').remote.BrowserWindow
			// let win = new BrowserWindow({
			// 	width: 900,
			// 	height: 520,
			// 	frame: true,
			// 	webPreferences: {
			// 		webSecurity: false,
			// 		plugins: true
			// 	}
			// });
			// win.on('close', function () { win = null })
			// win.loadURL(window.location.origin + '/#/' + 'showMovies?url='+item.url)
			// win.show()
		},
        livePlay(url) {
            var videoObject = {
                container: '#video',//“#”代表容器的ID，“.”或“”代表容器的class
                variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
                autoplay: true,
                html5m3u8: true,
                video: url,//视频地址
                hlsjsConfig: {   // hlsjs和CDNBye的配置参数
                    debug: false,
                    // Other hlsjsConfig options provided by hls.js
                    p2pConfig: {
                        logLevel: true,
                        live: true, // 如果是直播设为true
                        // Other p2pConfig options provided by CDNBye
                        // https://github.com/cdnbye/hlsjs-p2p-engine/blob/master/docs/%E4%B8%AD%E6%96%87/API.md
                    }
                }
            };
            var player = new ckplayer(videoObject);
        }
    },
    created() {
        console.log('asdf', window.location.origin + '/#/')
    },
    mounted() {
        this.livePlay(this.getIptv[0].url)
    }
}
</script>

<style lang="scss" scoped>
.liveBroadcast {
    width: 100vw;
    height: 100vh;
    padding-top: 40px;
    // background-color: black;
    color: black;
    display: flex;
    justify-content: space-around;
    .m_col {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 300px);
    }
    .live_item {
        padding: 4px;
        border-bottom: 1px solid gray;
        cursor: pointer;
        &:hover {
            color: #409EFF;
        }
    }
    .live_content {
        width: 100%;
        height: 100%;
    }
    .live_list {
        width: 200px;
        max-width: 300px;
        border-left: 1px solid black;
        height: 100%;
        overflow: auto;
    }
}
</style>