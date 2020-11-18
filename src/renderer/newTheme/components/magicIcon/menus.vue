<template>
	<div class="icon-oyh-menus">
		<div
			class="menus inner-header-icon"
			:class="[menusClass]"
			@click="setMenusClass"
		>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
</template>

<script>
export default {
    name: 'icon-oyh-menus',
    data: () => ({
        menusClass: 'inner-header-icon-out'
    }),
    methods: {
        setMenusClass() {
            if(this.menusClass === 'inner-header-icon-out') {
                this.menusClass = 'inner-header-icon-click'
            } else {
                this.menusClass = 'inner-header-icon-out'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.icon-oyh-menus {
	.inner-header {
		background-color: rgba(0, 0, 0, 1);
		width: 100%;
		height: 50px;
		position: absolute;
		top: 0px;
		left: 0px;
	}
	.inner-header-icon {
		color: #ffffff;
		height: 50px;
		font-size: 25px;
		text-align: center;
		float: right;
		width: 50px;
		position: relative;
		-webkit-transition: background 0.5s;
		-moz-transition: background 0.5s;
		-o-transition: background 0.5s;
		transition: background 0.5s;
	}
	.inner-header-icon:hover {
		background-color: rgba(255, 255, 255, 0.2);
		cursor: pointer;
	}
	.inner-header-icon span {
		position: absolute;
		left: calc((100% - 25px) / 2);
		top: calc((100% - 1px) / 2);
		width: 25px;
		height: 1px;
		background-color: rgba(255, 255, 255, 1);
	}
	.inner-header-icon span:nth-child(1) {
		transform: translateY(4px) rotate(0deg);
	}

	.inner-header-icon span:nth-child(2) {
		opacity: 0;
	}

	.inner-header-icon span:nth-child(3) {
		transform: translateY(-4px) rotate(0deg);
	}

	.inner-header-icon-click span:nth-child(1) {
		animation-duration: 0.5s;
		animation-fill-mode: both;
		animation-name: clickfirst;
	}

	.inner-header-icon-click span:nth-child(2) {
		animation-duration: 0.5s;
		animation-fill-mode: both;
		animation-name: clicksecond;
	}

	.inner-header-icon-click span:nth-child(3) {
		animation-duration: 0.5s;
		animation-fill-mode: both;
		animation-name: clickthird;
	}

	/*第一条线旋转动画*/
	@keyframes clickfirst {
		0% {
			transform: translateY(4px) rotate(0deg);
		}

		100% {
			transform: translateY(0) rotate(45deg);
		}
	}
	/*第二条线淡入淡出动画动画*/
	@keyframes clicksecond {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	/*第三条线旋转动画*/
	@keyframes clickthird {
		0% {
			transform: translateY(-4px) rotate(0deg);
		}

		100% {
			transform: translateY(0) rotate(-45deg);
		}
	}

	.inner-header-icon-out span:nth-child(1) {
		animation-duration: 0.5s;
		animation-fill-mode: both;
		animation-name: outfirst;
	}

	.inner-header-icon-out span:nth-child(2) {
		animation-duration: 0.5s;
		animation-fill-mode: both;
		animation-name: outsecond;
	}
	.inner-header-icon-out span:nth-child(3) {
		animation-duration: 0.5s;
		animation-fill-mode: both;
		animation-name: outthird;
	}

	@keyframes outfirst {
		0% {
			transform: translateY(0) rotate(-45deg);
		}

		100% {
			transform: translateY(-4px) rotate(0deg);
		}
	}

	@keyframes outsecond {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes outthird {
		0% {
			transform: translateY(0) rotate(45deg);
		}

		100% {
			transform: translateY(4px) rotate(0deg);
		}
	}
}
</style>