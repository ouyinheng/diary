<template>
  <div class="movie">
    <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" >
      <source src="http://a.gbl.114s.com:20320/0351/吹哨人-2020_HD国语中英双字.mp4" type="application/x-mpegURL">
  </video>
    <!-- <webview src="https://660e.com/?url= https://v.qq.com/x/cover/mzc00200bqxuhqe/v0033qefwwd.html" plugins></webview> -->
  </div>
</template>

<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'
export default {
  name: 'Movie',
  created() {
  },
  mounted() {
    videojs('my-video', {
    bigPlayButton: false,
    textTrackDisplay: false,
    posterImage: true,
    errorDisplay: false,
    controlBar: true
}, function () {
    this.play()
})
  }
}
</script>

<style lang="scss">

</style>