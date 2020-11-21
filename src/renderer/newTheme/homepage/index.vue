<template>
	<div class="homepage">
		<!-- <div class="left">
			<icon-oyh-menus></icon-oyh-menus>
		</div> -->
		<div class="right">
            <header class="header"></header>
            <section class="section">
                <div class="input-placeholder">Input</div>
                <div class="now_showing">
                    <div class="between p-2">
                        <div class="title">Now Showing</div>
                        <div class="title">More</div>
                    </div>
                    <!-- <div class="list">
                        <div class="item-list">
                            <img class="cover" src="https://uploadfile.bizhizu.cn/up/ec/85/b6/ec85b6d07d9f2c2d8d1062aa03d9b322.jpg" alt="jpg">
                            <div class="title">迪丽热巴</div>
                        </div>
                    </div> -->
                    <div class="m_col" >
                        <div class="m-col-item" v-for="(item, index) in infos"  style="margin: 20px" :key="index" @click="toInfo(item.title)">
                            <el-card :body-style="{ padding: '0px'}" shadow="hover">
                                <div style="height:250px;overflow:hidden;min-width: 270px;">
                                    <el-image :src="item.cover" :title="item.title"></el-image>
                                </div>
                                <div style="padding: 14px;">
                                    <p style="color:#37a;text-align:center;font-size:16px;">{{item.title}}</p>
                                    <div class="bottom clearfix" style="color:#e09015;text-align:center;">
                                        {{item.rate}}分
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
	</div>
</template>

<script>
import iconOyhMenus from '../components/magicIcon/menus'
export default {
    name: 'homepage',
    components: {
        iconOyhMenus
    },
    data: () => ({
        infos: [{
            cover: 'https://uploadfile.bizhizu.cn/up/ec/85/b6/ec85b6d07d9f2c2d8d1062aa03d9b322.jpg',
            title: '迪丽热巴',
            rate: '8.9'
        }, {
            cover: 'https://uploadfile.bizhizu.cn/up/ec/85/b6/ec85b6d07d9f2c2d8d1062aa03d9b322.jpg',
            title: '迪丽热巴',
            rate: '8.9'
        }, {
            cover: 'https://uploadfile.bizhizu.cn/up/ec/85/b6/ec85b6d07d9f2c2d8d1062aa03d9b322.jpg',
            title: '迪丽热巴',
            rate: '8.9'
        }, {
            cover: 'https://uploadfile.bizhizu.cn/up/ec/85/b6/ec85b6d07d9f2c2d8d1062aa03d9b322.jpg',
            title: '迪丽热巴',
            rate: '8.9'
        }],
    }),
    methods: {
        toInfo(item) {

        }
    }
}
</script>

<style lang="scss" scoped>
.homepage {
	width: 100vw;
	height: 100vh;
	// background-color: white;
	color: white;
	// padding: 5vh 10px 10px;
	box-sizing: border-box;
	box-shadow: inset 1px 1px 100px 1px rgba(60, 10, 140, 0.3);
	display: flex;
	.left {
		width: 20%;
		max-width: 100px;
		border-right: 1px solid white;
		padding: 10px;
		.menus {
			position: relative;
			cursor: pointer;
		}
	}
	.right {
		width: 100%;
        .header {
            height: 50px;
            border-bottom: 1px solid white;
        }
        .section {
            .input-placeholder {
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid white;
            }
            .m_col {
                display: grid;
                justify-content: space-between;
                grid-template-columns: repeat(auto-fill, 310px);
            }
            .list {
                .item-list {
                    .cover {
                        width: 250px;
                        height: 150px;
                        object-fit: cover;
                        border-radius: 20px;
                    }
                    .title {
                        
                    }
                }
            }
        }
	}
}
</style>