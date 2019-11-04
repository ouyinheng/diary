<template>
  <div class="home">
	<li v-for="index in 100" :key="index">{{index}}</li>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');
export default {
	name: "index",
	data() {
		return {
			tip: '',
			list: []
		};
	},
	methods: {
		setWinSize(len) {
			// ipcRenderer.send('asynchronous-message', 'winSize', 30*len);
		},
		setList() {
			
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	
}

</style>