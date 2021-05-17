<template>
	<div class="movie">
        <!-- https://api.yueliangjx.com/?url= -->
        <!-- https://660e.com/?url= -->
		<webview v-if="type === 'webview'" :src="'https://660e.com/?url=' + url" plugins></webview>
        <xgplayer v-else-if="type === 'html'" :options="playerOptions"></xgplayer>
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