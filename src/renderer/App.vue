<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "diary",
  created() {
    this.$themeSetup("theme_0");
  }
};
</script>

<style>
/* CSS */
body {
  -webkit-app-region: drag;
}
#app {
  -webkit-app-region: no-drag;
}
::selection {
  color: white;
  background-color: rgb(4, 224, 231);
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
  overflow-y: auto;
}
</style>
