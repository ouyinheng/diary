<template>
    <div id="app">
        <el-scrollbar style="height: 600px;overflow-x: hidden;" :native="false">
            <router-view></router-view>
        </el-scrollbar>
    </div>
</template>

<script>
  export default {
    name: 'diary'
  }
</script>

<style>
  /* CSS */
  body {
    -webkit-app-region: drag;
  }
  #app {
      -webkit-app-region: no-drag;
  }
  .el-scrollbar__wrap {
      overflow-x: hidden!important;
  }
</style>
