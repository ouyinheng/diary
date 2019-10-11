<template>
  <div class="home">
	<div style="height: 500px;overflow:hidden">
        <div v-if="list.length==0" class="el-table__empty-block">
            <span class="el-table__empty-text">暂无数据</span>
        </div>
		<el-scrollbar v-else style="height: 100%;" :native="false">
            <el-checkbox-group v-model="checkList">
                <div v-for="(item, index) in list" :key="index">
                    <li>
                        <el-checkbox :label="item.key">{{item.tip}}</el-checkbox>
                    </li>
                </div>
            </el-checkbox-group>
		</el-scrollbar>
	</div>
	<div class="index flex -center">
		<div style="width: 100%;">
			<div class="drag"></div>
			<input type="text" v-model="tip" placeholder="请输入待办项" @keyup.enter="setList">
			<div class="drag"></div>
		</div>
		<el-button class="btn " icon="el-icon-setting" circle></el-button>
	</div>
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
			ipcRenderer.send('asynchronous-message', 'winSize', 30*len);
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
            this.$http.get('https://github.com/ouyinheng/diary/blob/master/README.md').then(res => {
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