<template>
  <div class="movie">
	  <el-select v-model="valueUrl" placeholder="请选择">
			<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
    <!-- <webview :src="'https://660e.com/?url='+url" plugins></webview> -->
	<video v-if="show" :src="valueUrl" controls></video>
  </div>
</template>

<script>
import func from '@/utils/mixins/getVideoUrl.js'
export default {
  name: 'Movie',
  watch: {
	  valueUrl() {
		  this.show = false;
		  this.$nextTick(() => {
			  this.show = true;
		  })
	  }
  },
  data() {
      return {
		  url: '',
		  valueUrl: '',
		  options: [],
		  show: false
      }
  },
  methods: {
	jsonParse (str) {
		str = str.replace(/\s+/g, '');
		str = str.replace(/\"+/g, '');
		str = str.replace(/\'+/g, '');
		str = str.substr(1, str.length -1);
		var arr = str.split(',');
		var result = {}, temp;
		for (var i = 0, len = arr.length; i < len; i++) {
			temp = arr[i].split(':');
			result[temp[0]] = temp[1];
		}
		return result;
	},
	getUrl(body) {
		
		function formatParams (para) {
			var result = [];
			var vi = para && para.vl && para.vl.vi || [];
			for (var i = 0, len = vi.length; i < len; i ++) {
				var fileName = vi[i].fn;
				var fvkey = vi[i].fvkey;
				var ui = vi[i].ul.ui;
				for (var j = 0; j < ui.length; j++) {
					result.push(ui[j].url + fileName + '?vkey=' + fvkey + '&sdtfrom=v1103');
				}
			}
			return result;
		}
		var videoInfoReg = /VIDEO_INFO = ({[^}]*})/;
		var listInfoReg = /LIST_INFO = ({[^}]*})/;
		var videoMatch = body.match(videoInfoReg) && body.match(videoInfoReg)[1] || '{}';
		var listMatch = body.match(listInfoReg) && body.match(listInfoReg)[1] || '{}';
		var videoInfo = JSON.parse(videoMatch.trim()) || {};
		var listInfo = JSON.parse(listMatch+'}'.trim()) || {};
		var params = {
			'isHLS': false,
			'charge': 0,
			'vid': videoInfo.vid,
			'defaultfmt': 'auto',
			'defn': 'shd',
			'defnpayver': 1,
			'otype': 'json',
			'platform': 11001,
			'sdtfrom': 'v1103',
			'host': 'v.qq.com'
		};
		var baseUrl = 'http://h5vv.video.qq.com/getinfo?callback=formatParams&';
		var paramsArr = [];
		for (var key in params) {
			paramsArr.push('' + key + '=' + params[key]);
		}
		var paramsStr = paramsArr.join('&');
		this.$http.get(baseUrl + paramsStr).then(res=>{
			var urlList = eval(res.data);
			console.log(urlList)
			this.options = urlList.map((item, index) => {
				return {
					value: item,
					label: index+1
				}
			});
		});
	}
  },
	created() {
		this.url = this.$route.query.url
		console.log(this.url, func)
		this.$http.get(this.url).then(res => {
			this.getUrl(res.data)
		})
	}
}
</script>

<style lang="scss">
.movie {
    width: 100vw;
    height: 100vh;
    webview {
        width: 100%;
        height: 100%;
    }
	video {
		width: 500px;
		height: 300px;

	}
}
</style>