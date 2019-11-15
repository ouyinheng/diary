<template>
  <div class="layout-left">
    <div class="portrait"></div>
    <el-row class="tac">
      <el-col :span="24">
        <el-scrollbar>
          <!-- <el-menu
            :default-active="active"
            class="el-menu-vertical-demo"
            :router="true"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="/">
              <i class="el-icon-thumb"></i>
              <span slot="title">推荐</span>
            </el-menu-item>
            <el-menu-item index="/tv">
              <i class="el-icon-s-data"></i>
              <span slot="title">豆瓣排行</span>
            </el-menu-item>
            <el-menu-item index="/movie">
              <i class="el-icon-stopwatch"></i>
              <span slot="title">历史记录</span>
            </el-menu-item>
          </el-menu> -->
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
  background-color: #171718;
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
      &:hover {
        background: rgba(255, 255, 255, .1);
      }
      &>i {
        font-weight: bold;
        margin-right: 2px;
      }
    }
    .active {
      color: white;
      background: linear-gradient(to right, #1FD4AE , #1ECC94);
      &:hover{
        background: linear-gradient(to right, #1FD4AE , #1ECC94);
      }
    }
  }
}
</style>