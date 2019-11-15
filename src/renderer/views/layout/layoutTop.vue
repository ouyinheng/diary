<template>
  <div class="layoutTop between">
    <div></div>
    <div class="flex" style="width: 800px;">
      <div style="-webkit-app-region: no-drag;width: 100%;">
        <el-autocomplete
          class="search-input"
          style="background: #343436;"
          :trigger-on-focus="false"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </div>
    </div>
    <div class="toolbar flex">
        <span class="el-icon-s-tools" @click="toSkin"></span>
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
      restaurants: ''
    }
  },
  methods: {
    closeWin(type) {
      ipc.send(type);
    },
    querySearchAsync(queryString, cb) {
      if(!queryString)return;
      this.$http.get(`${this.$url}/movie/getAuto?moviename=${queryString}`).then((res) => {
        res.data.result.forEach((item, index) => {
          item.value = item.word;
        })
        this.restaurants = res.data.result;
        cb(this.restaurants);
      }).catch(err=>{
        console.log(err)
      })
    },
    handleSelect(item) {
      this.$router.push({
        path: '/movieinfo',
        query: {
          title: item.value
        }
      })
    },
    toSkin() {
        this.$router.push('/skin')
    }
  },
  created() {
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