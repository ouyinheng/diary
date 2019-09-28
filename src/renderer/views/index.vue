<template>
	<div class="home">
		<div class="calendar">
			<header>
				<div class="select flex -around -center">
					<i class="el-icon-d-arrow-left"></i>
					<i class="el-icon-arrow-left"></i>
						{{nowDate}}
					<i class="el-icon-arrow-right"></i>
					<i class="el-icon-d-arrow-right"></i>
				</div>
				<div class="week">
					<div v-for="(item, index) in week" :key="index">{{item}}</div>
				</div>
			</header>
		</div>
	</div>
</template>

<script>
const { ipcRenderer } = require("electron");
import diary from './diary'
export default {
	name: "index",
	mixins: [diary],
	computed: {
		nowDate() {
			return this.$moment(new Date()).format('YYYY-MM-DD');
		}
	},
	data() {
		return {
			week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
		};
	},
	methods: {
		setWinSize() {
			ipcRenderer.send("asynchronous-message", "winSize");
		},
		goList(p) {
			console.log(p);
		},
	},
	mounted() {
		// ipcRenderer.send('run-shell', 'ls');
	},
	created() {
		console.log(this.getData())
		// console.log(this.$moment(new Date()).date(1));
		this.$http.get("https://www.jianshu.com/p/42f29f269b78").then(res => {
		//   this.html = res
		});
	}
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .calendar {
    width: 100%;
    box-shadow: 0 3px 15px rgba(0,0,0,.2), 0 -2px 6px rgba(0,0,0,.2);
    header {
      background-color: #2196f3;
      color: white;
      -webkit-app-region: drag;
      &:hover {
        cursor: move;
      }
      .select {
        height: 60px;
      }
      .week {
        width: 100%;
        height: 60px;
        display: flex;
        div {
          width: 100%;
          line-height: 60px;
          text-align: center;
        }
      }
    }
  }
}
</style>