<template>
  <div class="home">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link" class="banner-item" @click="seeInfo($event,item.link)">
          <h3 class="medium">{{ item.title }}</h3>
          <img :src="item.picUrl" />
        </a>
      </el-carousel-item>
    </el-carousel>
    <section>
		<el-row>
			<el-col :span="24" class="tag-list">
				<span class="tags" v-for="(item, index) in tagList" :key="index" @click="setTags(item)">{{item.label}}</span>
			</el-col>
		</el-row>
    </section>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
export default {
  	name: 'HomePage',
	data() {
		return {
			banner: [],
			tagList: [{
				label: '电视剧',
				value: 'tv'
			}, {
				label: '电影',
				value: 'movie'
			}]
		}
	},
	computed: {
		...mapState([
			'loading'
		]),
	},
	methods: {
		...mapActions([
			'SET_LOADING_FALSE',
			'SET_LOADING_TURE'
		]),
		getHomeData() {
			this.SET_LOADING_TURE()
			this.$http.get(`${this.$url}/movie/qqrecomm`).then((res) => {
				this.banner = res.data.result;
				this.SET_LOADING_FALSE()
			}).catch(err=>{
				this.SET_LOADING_FALSE()
			})
		},
		seeInfo(e,link) {
			e.preventDefault();
		},
		setChanges() {

		},
		setTags(item) {
			this.$router.push({
				path: '/tv',
				query: {
					video: item.value
				}
			})
		}
	},
	created() {
		this.getHomeData();
	}
}
</script>

<style lang="scss" scoped>
.home {
	box-sizing: border-box;
	padding: 20px;
    color: #D1D1D1;
	.tag-list {
		display: flex;
		background-color: rgb(48, 48, 49);
		margin-top: 10px;
		padding: 20px;
		border-radius: 50px;
	}
	.tags {
		cursor: pointer;
		display: block;
		color: white;
		margin-left: 10px;
		&:hover {
			color: rgb(30, 204, 148);
		}
	}
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.banner-item {
  position: relative;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  h3 {
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 10;
    font-size: 26px;
    width: 100%;
    display: block;
    padding: 10px;
    background-color: rgba(0,0,0,.3);
  }
}
</style>
