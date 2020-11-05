<template>
	<div
		class="recommend"
		:class="{
			'app-region': drag,
		}"
		
	>
		<el-carousel
			height="100vh"
			direction="vertical"
			:autoplay="false"
			v-if="detailsList.length > 0"
		>
			<el-carousel-item
				@mousedown.native="setDragName('drag')"
				@mouseup.native="cancelDragName('')"
				class="background_img"
				v-for="item in detailsList"
				:key="item.id"
				:style="{
					'background-image':
						'url(' + item.payload.background_img + ')',
				}"
			>
				<h3 class="title">《{{ item.subject.title }}》</h3>
				<div class="view">观看</div>
				<!-- <img :src="item.payload.background_img" alt="img" class="background_img"> -->
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
import { getRecommList, getDetailsList } from "./getRecommSourth";
export default {
	name: "recommend",
	data() {
		return {
			movieList: [],
			detailsList: [],
			drag: "",
		};
	},
	methods: {
		async getDetailsList() {
			await this.movieList.forEach(async (item, index) => {
				let datas = await getDetailsList(item.index);
				this.detailsList.push(datas);
				localStorage.setItem(
					"detailsList",
					JSON.stringify(this.detailsList)
				);
			});
		},
		setDragName(name) {
			setTimeout(() => {
				this.drag = name;
			}, 1000);
		},
		cancelDragName() {
			this.drag = "";
		},
	},
	async created() {
		let updateTime = new Date().getTime(); // 更新时间
		if (
			localStorage.updateTime &&
			updateTime - localStorage.updateTime <= 1000000 * 3600
		) {
			this.detailsList = JSON.parse(localStorage.detailsList);
			console.log(this.detailsList);
		} else {
			this.movieList = await getRecommList();
			this.getDetailsList();
		}
	},
};
</script>

<style lang="scss" scoped>
.recommend {
	position: relative;
	.title {
		position: absolute;
		bottom: 120px;
		left: 100px;
		color: white;
		font-size: 50px;
	}
	.view {
		position: absolute;
		bottom: 80px;
		left: 100px;
		background-color: white;
		font-size: 30px;
		padding: 2px 20px;
		text-spacing: 18px;
		cursor: pointer;
		border-radius: 10px;
	}
	.background_img {
		// -webkit-app-region: drag;
		width: 100vw;
		height: 100vh;
		background-color: #1e1e20;
		// object-fit: cover;
		background-size: cover;
	}
	.app-region {
		-webkit-app-region: drag;
	}
}
</style>