<template>
    <div class="layoutTop between">
        <div></div>
        <div class="flex" style="width: 800px;">
            <div class="flex" style="-webkit-app-region: no-drag;width: 100%;">
				<div class="flex" style="-webkit-app-region: no-drag;">
					<el-button class="routers el-icon-arrow-left" @click.stop="goBack" type="text" :disabled="backDisabled"></el-button>
					<el-button class="routers el-icon-arrow-right" @click.stop="goPre" type="text" :disabled="!backDisabled"></el-button>
				</div>
				<el-autocomplete
					class="search-input"
					style="background: #343436;"
					:trigger-on-focus="false"
					:fetch-suggestions="querySearchAsync"
					:placeholder="placeholder"
					@select="handleSelect"
					v-model="searchValue">
					<template slot-scope="scoped">
						<span>{{scoped.item.tt}}</span>
						<span style="color: darkgray">{{scoped.item.class}}</span>
					</template>
				</el-autocomplete>
            </div>
        </div>
        <div class="toolbar flex">
            <span class="iconfont icon-pifu" @click="selectSkin"></span>
            <span class="el-icon-s-tools" @click="toSetup"></span>
            <span></span>
            <span class="el-icon-minus" @click="closeWin('min')"></span>
            <span class="el-icon-full-screen" @click="closeWin('max')"></span>
            <span class="el-icon-close" @click="closeWin('close')"></span>
        </div>
    </div>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
export default {
	name: 'layoutTop',
	data() {
		return {
			searchValue: '',
			restaurants: '',
			backDisabled: false,
			placeholder: '请输入内容'
		}
	},
	watch: {
		'$route.path'(val) {
			if(val === '/setup')return;
			if(this.$route.matched[1].path === '/') {
				this.backDisabled = true;
			} else {
				this.backDisabled = false;
			}
		},
		'$route.query'(val) {
			this.placeholder = val.title ? val.title : '请输入内容'
		}
	},
	methods: {
		closeWin(type) {
			ipc.send(type);
		},
		querySearchAsync(queryString, cb) {
			if(!queryString)return;
			this.$http.get(`https://s.video.qq.com/smartbox?callback=querySearchAsync&plat=2&ver=0&num=10&otype=json&query=${queryString}&_=${new Date().getTime()}`).then((res) => {
				let result = JSON.parse(res.data.substring(17, res.data.length-1));
				this.restaurants = result.item;
				cb(this.restaurants);
			}).catch(err=>{
				console.log(err)
			})
		},
		handleSelect(item) {
			if(this.$route.name === 'MovieInfo') {
				this.$router.replace({
					path: '/movieinfo',
					query: {
						title: item.tt
					}
				})
			} else {
				this.$router.push({
					path: '/movieinfo',
					query: {
						title: item.tt
					}
				})
			}
		},
		toSetup() {
			this.$router.push('/setup')
		},
		goBack() {
			if(this.$route.matched[1].path!=='/') {
				this.$router.back();
			}
		},
		goPre() {
			window.history.forward()
		},
		selectSkin() {
			console.log(this.$theme)
			this.$themeSetup('theme_1')
		}
	},
	created() {
		if(this.$route.matched[1].path === '/') {
			this.backDisabled = true;
		} else {
			this.backDisabled = false;
		}
		this.placeholder = this.$route.query.title ? this.$route.query.title : '请输入内容'
	}
}
</script>

<style lang="scss">
.layoutTop {
  -webkit-app-region: drag;
  width: 100%;
  height: 60px;
  background-color: #1E1E20;
  box-sizing: border-box;
  .el-input__inner {
    background-color :#343436;
    border: none;
  }
  .toolbar {
    -webkit-app-region: no-drag;
    span {
      display: block;
      padding: 0 10px;
      color: #8E8E8F;
      font-size: 16px;
      &:hover {
        color: #1ECC94;
        cursor: pointer;
      }
    }
  }
  .routers {
    display: block;
    padding:0 10px;
    height: 100%;
    font-size: 16px;
    color: white;
    margin-right: 10px;
    cursor: pointer;
  }
}
.flex {
  display: flex;
  align-items: center;
}
.between {
  @extend .flex;
  justify-content: space-between;
}
.around {
  @extend .flex;
  justify-content: space-around;
}
.between-column {
  @extend .between;
  flex-direction: column;
}
.around-column {
  @extend .around;
  flex-direction: column;
}
</style>
