<template>
  <div id="app">
    <router-view></router-view>
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
      -webkit-app-region: no-drag
  }
</style>
