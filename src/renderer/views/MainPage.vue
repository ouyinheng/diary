<template>
  <div id="main-page">
    <div class="nav">
      <layout-left></layout-left>
    </div>
    <div class="section">
      <layout-top></layout-top>
      <div class="content" v-loading="loading">
        <el-scrollbar :native="false">
          <router-view></router-view>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import layoutTop from "./layout/layoutTop.vue";
import LayoutLeft from "./layout/layoutLeft.vue";
export default {
  name: "MainPage",
  components: {
    "layout-top": layoutTop,
    "layout-left": LayoutLeft
  },
  computed: {
    loading() {
      return this.$store.state.Counter.loading;
    }
  },
  created() {
    console.log(this.$store.state);
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Source Sans Pro", sans-serif;
}
#main-page {
  width: 100%;
  height: 100%;
  display: flex;
  .nav {
    width: 250px;
    min-width: 250px;
    height: 100vh;
    background-color: #f1f1f1;
    overflow: hidden;
  }
  .section {
    width: 100%;
    min-width: 800px;
    height: 100vh;
    position: relative;
    .content {
      position: absolute;
      top: 60px;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #1e1e20;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .el-scrollbar {
        height: 100%;
      }
    }
  }
}
</style>
