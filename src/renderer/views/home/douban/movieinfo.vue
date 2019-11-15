<template>
  <div class="movie-info">
    <el-row>
      <mu-button flat color="primary" @click="$router.back()">返回</mu-button>
    </el-row>
    <el-row>
      <el-radio-group v-model="sourth" size="small" @change="setChanges">
        <el-radio-button label="qq">腾讯</el-radio-button>
        <el-radio-button label="mg">芒果</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row v-for="(item, index) in infos" :key="index" style="margin: 20px 0;">
      <el-col :span="6">
        <el-image :src="item.cover" style="width: 200px;"></el-image>
      </el-col>
      <el-col :span="18">
        <p>
          <span style="font-size:16px;font-weight:bold;">{{item.introduce.title.pri}}</span>
          <span class="sub">{{item.introduce.title.sub}}</span>
          <!-- 
          <span class="type">{{item.introduce.title.type}}</span> -->
        </p>
        <p class="info_item" style="margin-top: 10px;">
          <span>导演：</span>
          <span class="content">{{item.introduce.info_item_odd}}</span>
        </p>
        <p class="info_item" style="margin: 10px 0;">
          <span>主演：</span>
          <span class="content">{{item.introduce.info_item_even}}</span>
        </p>
        <p>
          <span>简介：</span>
          <span class="content">{{item.introduce.info_item_desc}}</span>
        </p>
        <p>
          <mu-button color="primary" v-for="(Item, Index) in item.list" :key="Index" @click="play(Item.url)" v-if="!gj.includes(Item.title)">{{Item.title}}</mu-button>
          <mu-button color="primary" v-if="item.list.length==0" @click="play(item.href)">立即播放</mu-button>
        </p>
      </el-col>
    </el-row>
    <el-row v-if="infos.length==0">
      暂无数据
    </el-row>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
const path = require('path')
export default {
  name: 'MovieInfo',
  data() {
    return {
      infos: [],
      gj: ['收起', '展开'],
      sourth: 'qq',
      title: ''
    }
  },
  methods: {
    ...mapActions([
      'SET_LOADING_FALSE',
      'SET_LOADING_TURE'
    ]),
    getInfos(title) {
      this.SET_LOADING_TURE();
      this.$http.get(`${this.$url}/movie/sourth?sourth=${this.sourth}&moviename=${title}`).then((res)=>{
        this.infos = res.data.result;
        this.SET_LOADING_FALSE();
      }).catch(()=>{
        this.SET_LOADING_FALSE();
      })
    },
    play(url) {
      const BrowserWindow = require('electron').remote.BrowserWindow
      let win = new BrowserWindow({ 
        width: 900,
        height: 520,
        webPreferences: {
          plugins: true
        }
      })
      win.on('close', function () { win = null })
      // https://beaacc.com/api.php?url=
      // http://jqaaa.com/jx.php?url=
      // http://jx.618g.com/?url=
      // https://www.pohaier.com/kuku/index.php?url=
    //   win.loadURL('http://jqaaa.com/jx.php?url='+url)
      win.loadURL('http://localhost:9080/#/showmovie?url='+url)
      win.show()
      this.$http.get(`${this.$url}/real?url=${url}`)
    },
    setChanges() {
      this.getInfos(this.title)
    }
  },
  watch: {
    '$route.query'(val) {
      this.getInfos(val.title);
    }
  },
  created() {
    this.title = this.$route.query.title
    this.getInfos(this.title);
  }
}
</script>

<style lang="scss" scoped>
  .movie-info {
    width: 1000px;
    margin: 30px auto;
    .sub {
      color: #828282;
      font-size: 14px;
    }
    .type {
      color: #999;
      font-size: 12px;
    }
    .info_item {
        zoom: 1;
        max-width: 100%;
        margin-top: 10px;
        overflow: hidden;
        color: #999;
        font-size: 12px;
        letter-spacing: normal;
        line-height: 22px;
        text-overflow: ellipsis;
        vertical-align: top;
        white-space: nowrap;
        word-break: break-all;
    }
    .content {
      color: #2a2a2a;
    }
    .mu-raised-button {
      min-width: 50px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
</style>