<template>
  <div class="layout-left layout-left__bg---color">
    <div class="portrait"></div>
    <el-row class="tac">
      <el-col :span="24">
        <el-scrollbar>
          <ul class="left-menu">
            <li 
              v-for="(item, index) in menuList"
              :key="index" 
              :class="{
                active: active == item.link
              }"
              @click="pickerMenu(item.link)">
              <i :class="[item.icon]"></i>
              <span slot="title">{{item.title}}</span>
            </li>
          </ul>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LayoutLeft',
  data() {
    return {
      active: '/',
      menuList: [{
        title: '推荐',
        icon: 'el-icon-thumb',
        link: '/'
      }, {
        title: '豆瓣排行',
        icon: 'el-icon-s-data',
        link: '/tv'
      }, {
        title: '历史记录',
        icon: 'el-icon-stopwatch',
        link: '/movie'
      }, {
        title: '花瓣',
        icon: 'el-icon-picture-outline',
        link: '/picture'
      }]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    pickerMenu(link) {
      this.active = link;
      this.$router.push(link);
    }
  },
  created() {
    this.active = this.$route.path
  }
}
</script>

<style lang="scss">
li {
  list-style: none;
}
.layout-left {
  overflow-x: hidden;
  overflow-y: auto;
  .portrait {
    width: 100%;
    height: 50px;
  }
  .el-menu-vertical-demo,.el-submenu, .el-menu-item, .el-menu-item-group__title {
    background-color: #171718;
    color: #D1D1D1;
  }
  .el-row {
    overflow: hidden;
  }
  .el-scrollbar {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .left-menu {
    font-size: 16px;
    color: #D1D1D1;
    li {
      cursor: pointer;
      padding: 10px;
      margin: 0 20px 10px -10px;
      border-radius: 3px;
      &>i {
        font-weight: bold;
        margin-right: 2px;
      }
    }
  }
}
</style>