<template>
  <div class="movie">
    <webview :src="'https://660e.com/?url='+url" plugins></webview>
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