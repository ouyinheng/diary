<template>
	<div id="app">
		<el-scrollbar :native="false">
			<transition :name="transition">
				<keep-alive>
					<router-view class="view"></router-view>
				</keep-alive>
			</transition>
		</el-scrollbar>
	</div>
</template>

<script>
export default {
	name: "diary",
	data() {
		return {
			transition: "",
			pageName: ["Homepage", "picture"],
		};
	},
	watch: {
		$route(to, from) {
			if (to.name === "setup") {
				this.transition = "bottom-to-top";
			} else if (from.name === "setup") {
				this.transition = "top-to-bottom";
			}
		},
	},
	created() {
		this.$themeSetup("theme_0");
	},
};
</script>

<style>
/* CSS */
html,
body {
	-webkit-app-region: drag;
	color: #d1d1d1;
    font-family: 'element-icon';
    letter-spacing: 3px;
}
#app {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	-webkit-app-region: no-drag;
}
::selection {
	color: white;
	background-color: rgb(4, 224, 231);
}
::-webkit-scrollbar {
	display: none;
}
.el-scrollbar {
	height: 100%;
}
.el-scrollbar__wrap {
	overflow-x: hidden !important;
	overflow-y: auto;
}
.view {
	transition: all 0.3s linear;
}
</style>
