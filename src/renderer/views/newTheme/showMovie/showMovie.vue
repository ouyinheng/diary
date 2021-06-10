<template>
	<div class="movie">
        <!-- https://api.yueliangjx.com/?url= -->
        <!-- https://660e.com/?url= -->
        <!-- https://jsap.attakids.com/?url=https://v.qq.com/x/cover/tk3l27paq7sqr0z/p0036mrfj8h.html -->
        <!-- https://17kyun.com/jx.php?url=https://v.qq.com/x/cover/tk3l27paq7sqr0z/p0036mrfj8h.html -->
		<webview v-if="type === 'webview'" :src="'https://jsap.attakids.com/?url=' + url" plugins></webview>
        <xgplayer style="height: 100vh" v-else-if="type === 'html'" :options="playerOptions"></xgplayer>
	</div>
</template>
<script>
export default {
	name: "Movie",
	props: {
		playUrl: String,
        type: {
            type: String,
            default: 'webview' // webview html m3u8
        }
	},
	watch: {
		valueUrl() {
			this.show = false;
			this.$nextTick(() => {
				this.show = true;
			});
		},
	},
	data() {
		return {
			url: "",
			valueUrl: "",
			options: [],
			show: false,
            playerOptions: {}
		};
	},
	methods: {},
	created() {
		this.url = this.$route.query.url || this.playUrl;
        this.playerOptions = {
            url: this.url,
            height: '100vh',
            width: '100%' // Depends on its wrapper element.
        }
	},
    mounted() {
    }
};
</script>

<style lang="scss">
.movie {
	width: 100vw;
	height: 100vh;
    .vue-xgplayer {
        height: 100vh !important;
    }
	webview {
		width: 100%;
		height: 100%;
	}
	video {
		width: 500px;
		height: 300px;
	}
}
</style>