<template>
  <div class="index">
      <p @click="setWinSize">index</p>
	  <div v-html="html"></div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');
export default {
	name: "index",
	data() {
		return {
			html: ''
		};
	},
	methods: {
		setWinSize() {
			ipcRenderer.send('asynchronous-message', 'winSize');
		}
	},
	mounted() {
		ipcRenderer.send('run-shell', 'ls');
	},
	created() {
		this.$http.get('https://www.jianshu.com/p/42f29f269b78').then(res => {
			//   this.html = res
		})
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