<template>
  <div class="index">
      <p @click="setWinSize">index</p>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {
      setWinSize() {
        ipcRenderer.send('asynchronous-message', 'winSize');
      }
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 80px;
  height: 80px;
  color: white;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .4);
  p {
      padding: 10px;
      background-color: lightblue;
  }
}
</style>