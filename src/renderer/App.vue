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
html, body {
    -webkit-app-region: drag;
    color: #D1D1D1;
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
