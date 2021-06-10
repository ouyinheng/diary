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
			:autoplay="true"
			:interval="100000"
			v-if="detailsList.length > 0"
		>
			<el-carousel-item
				@mousedown.native="setDragName('drag')"
				@mouseup.native="cancelDragName('')"
				class="background_img"
				v-for="item in detailsList"
				:key="item.id"
				:style="{
					'background-image': 'url(' + item.payload.background_img + ')',
				}">
					<div class="masking">
						<h3 class="section">
							<span class="title">《{{ item.subject.title || '' }}》</span>
							<span class="intro">—— {{parseTitle(item.payload.title)}}</span>
						</h3>
						<div class="view" @click="toDetailsHandler(item)">观看</div>
						<!-- <h5 class="description">{{item.payload.description}}</h5> -->
					</div>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
import { data } from 'cheerio/lib/api/attributes';
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
        parseTitle(title) {
            const year = localStorage.yearIndex;
            const yearList = JSON.parse(localStorage.yearList);
            if(!yearList.every(item => !title.includes(item))) {
                return title
            } else {
                return year + '年' + title;
            }
        },
        judgeShowMovie(datas) {
            let bool = false;
            if(datas.subjects && datas.subjects.length > 0 && datas.subject && datas.payload && datas.payload.background_img) {
                bool = true;
            } else if(datas.payload && datas.payload.widgets.length > 0 && datas.payload.widgets[0].subjects.length > 0) {
                bool = true;
            }
            return bool;
        },
		async getDetailsList() {
			try {
                await this.movieList.forEach(async (item, index) => {
                    let datas = await getDetailsList(item.index);
                    // 必须有标题和海报
                    if(datas.subjects && datas.subjects.length > 0 && datas.subject && datas.payload && datas.payload.background_img) {
                        this.detailsList.push({
                            payload: datas.payload,
                            subject: datas.subject,
                        });
                    } else if(datas.payload && datas.payload.widgets.length > 0 && datas.payload.widgets[0].subjects.length > 0) {
                        
                        const index = parseInt(datas.payload.widgets.length * Math.random())
                        this.detailsList.push({
                            payload: datas.payload.widgets[index].payload,
                            subject: datas.payload.widgets[index].subject,
                        });
                        // datas.payload.widgets[index].subjects.forEach(ele => {
                        //     this.detailsList.push({
                        //         // payload: datas.payload,
                        //         subject: ele,
                        //     });
                        // })
                    } else if(datas.subject && !datas.subjects && datas.payload && datas.payload.background_img) {
                        this.detailsList.push({
                            payload: datas.payload,
                            subject: datas.subject,
                        });
                    }
                    localStorage.setItem(
                        "detailsList",
                        JSON.stringify(this.detailsList)
                    );
                });
            } catch (error) {
                
            }
		},
		setDragName(name) {
			setTimeout(() => {
				this.drag = name;
			}, 1000);
		},
		cancelDragName() {
			this.drag = "";
		},
        toDetailsHandler(item) {
            this.$router.push({
                path: '/doubanInfo',
                query: {
                    title: item.subject.title,
                    id: item.subject.id
                }
            })
            return;
            this.$router.push({
                path: '/movieDetails',
                query: {
                    title
                }
            })
        }
	},
	async created() {
		let updateTime = new Date().getTime(); // 更新时间
		if (
			localStorage.updateTime &&
			updateTime - localStorage.updateTime <= (1000 * 1800)
		) {
			this.detailsList = JSON.parse(localStorage.detailsList).filter(item => item.subject);
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
	.background_img {
		width: 100vw;
		height: 100vh;
		background-color: #1e1e20;
		background-size: cover;
		.masking {
			width: 100vw;
			height: 100vh;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 10;
			background-color: rgba(0,0,0,0.2);
			.section {
				position: absolute;
				bottom: -550px;
				left: 100px;
				.title {
					color: white;
					font-size: 50px;
				}
				.intro {
					color: white;
					font-size: 22px;
				}
			}
			.view {
				position: absolute;
				bottom: 80px;
				right: 100px;
				width: 150px;
				background-color: white;
				font-size: 30px;
				padding: 2px 20px;
				text-spacing: 18px;
				cursor: pointer;
				border-radius: 10px;
				border: none;
				user-select: none;
			}
			.description {
				float: right;
				right: 20px;
				bottom: 50px;
				color: white;
				font-size: 25px;
			}
		}
	}
	.app-region {
		-webkit-app-region: drag;
	}
}
</style>