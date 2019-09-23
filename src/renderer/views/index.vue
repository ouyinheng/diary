<template>
  <div class="home">
    <div class="calendar">
      <header>
        <div class="select"></div>
        <div class="week">
          <div v-for="(item, index) in week" :key="index">{{item}}</div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
export default {
  name: "index",
  data() {
    return {
      week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    };
  },
  methods: {
    setWinSize() {
      ipcRenderer.send("asynchronous-message", "winSize");
    },
    goList(p) {
      console.log(p);
    },
  },
  mounted() {
    // ipcRenderer.send('run-shell', 'ls');
  },
  created() {
    this.$http.get("https://www.jianshu.com/p/42f29f269b78").then(res => {
      //   this.html = res
    });
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .calendar {
    width: 100%;
    box-shadow: 0 3px 15px rgba(0,0,0,.2), 0 -2px 6px rgba(0,0,0,.2);
    header {
      background-color: #2196f3;
      color: white;
      .select {
        height: 60px;
      }
      .week {
        width: 100%;
        height: 60px;
        display: flex;
        div {
          width: 100%;
          line-height: 60px;
          text-align: center;
        }
      }
    }
    
  }
//   color: black;
}
</style>