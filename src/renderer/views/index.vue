<template>
  <div class="home">
	
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');
export default {
	name: "index",
	data() {
		return {
			tip: '',
            list: [],
            checkList: []
		};
	},
	methods: {
		setWinSize(len) {
			// ipcRenderer.send('asynchronous-message', 'winSize', 30*len);
		},
		setList() {
			this.list.push({
                tip: this.tip,
                key: new Date().getTime()
			}),
			this.tip = '';
			// this.setWinSize(this.list.length);
			console.log(this.list)
        },
        getData() {
            this.$http.get('https://huaban.com/favorite/beauty').then(res => {
                ipcRenderer.send('saveFile', 'name.html', res.data);
                console.log(res)
            })
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="scss">
.home {
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}
</style>
<style lang="scss" scoped>
.home {
	width: 100%;
	height: 100%;
	overflow: hidden;
	.index {
		width: 100%;
		height: 60px;
		color: white;
		box-sizing: border-box;
		border-bottom: 1px solid gainsboro;
		.drag {
			width: 100%;
			height: 10px;
			cursor: pointer;
			-webkit-app-region: drag;
		}
		input {
			width: 100%;
			height: 40px;
			font-size: 16px;
			padding: 0 10px;
		}
		.btn {
			width: 50px;
			min-width: 50px;
			height: 50px;
			margin: 0 10px;
			border-radius: 50%;
			font-size: 20px;
			background-color: black;
			text-align: center;
			color: white;
		}
	}
	li {
		width: 100%;
		height: 20px;
		padding: 10px 0;
	}
}

</style>