<template>
	<div id="app">
		<transition :name="transition">
			<keep-alive>
				<router-view class="view"></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
export default {
	name: "diary",
	data() {
		return {
			transition: ''
		}
	},
	watch: {
        $route (to, from ) {
			if(to.name === 'setup') {
                this.transition = 'bottom-to-top'
			} else if(from.name === 'setup') {
                this.transition = 'top-to-bottom'
			}
			console.log(to, from)
        }
    },
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
.view {
	transition: all .3s linear;
}
</style>
