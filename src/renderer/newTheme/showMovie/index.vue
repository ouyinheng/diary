<template>
  <div class="movie">
    <div id="video" style="width: 100%; height: 100%;width: 100%;"></div>
  </div>
</template>

<script>
export default {
	  name: 'Movie',
	  watch: {
		  valueUrl() {
			  this.show = false;
			  this.$nextTick(() => {
				  this.show = true;
			  })
		  }
	  },
	  data() {
		  return {
			  url: '',
			  valueUrl: '',
			  options: [],
			  show: false
		  }
	  },
  	methods: {
		
	  },
	created() {
		this.url = this.$route.query.url
		console.log(this.url)
    },
    mounted() {
         var videoObject = {
            container: '#video',//“#”代表容器的ID，“.”或“”代表容器的class
            variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
            autoplay:true,
            html5m3u8:true,
            video: 'http://112.50.243.8/PLTV/88888888/224/3221225922/1.m3u8',//视频地址
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
}
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
