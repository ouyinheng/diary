<template>
  <div class="movie">
    <webview :src="'https://660e.com/?url='+url" plugins></webview>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  data() {
      return {
          url: ''
      }
  },
  created() {
      this.url = this.$route.query.url
      console.log(this.url)
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
}
</style>