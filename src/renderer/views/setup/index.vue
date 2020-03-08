<template>
    <div class="setup">
        <mu-appbar style="width: 100%; -webkit-app-region: drag;" color="#1E1E20">
            <mu-button icon slot="left" @click="goback" style="-webkit-app-region: no-drag;">
                <span class="el-icon-arrow-down"></span>
            </mu-button>
            设置
            <!-- <mu-button flat slot="right" @click="goHome">LOGIN</mu-button> -->
            <template slot="right">
                <div class="toolbar flex">
                    <span class="el-icon-minus" @click.native="closeWin('min')"></span>
                    <span class="el-icon-full-screen" @click="closeWin('max')"></span>
                    <span class="el-icon-close" @click="closeWin('close')"></span>
                </div>
            </template>
        </mu-appbar>
        <section class="section">
            <mu-list class="mu-list">
                <mu-list-item :ripple="false">
                    <mu-list-item-title class="mu-list-item-title hover-dom">解析地址</mu-list-item-title>
                </mu-list-item>
            </mu-list>
            <div class="right-setup-content">
                <component :is="currentView"></component>
            </div>
        </section>
    </div>
</template>

<script>
    const {ipcRenderer: ipc} = require('electron');
    export default {
        name: 'setup',
        data() {
            return {
                currentView: 'parsing-address'
            }
        },
        components: {
            'parsing-address': resolve => {
                require(["./components/parsingAddress.vue"], resolve);
            }
        },
        methods: {
            goback() {
                this.$router.push('/')
                // this.$router.back()
            },
            goHome() {
                this.$router.push('/')
            },
            closeWin(type) {
                ipc.send(type);
            },
        },
        created() {

        }
    }
</script>

.<style lang="scss" scoped>
.setup {
    width: 100%;
    height: 100vh;
    background:#1E1E20;
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
    .section {
        width: 90%;
        display: flex;
        margin: 0 auto;
        .mu-list {
            width: 300px;
            .mu-list-item-title {
                text-align: center;
                color: white;
            }
        }
        .right-setup-content {
            width: 100%;
            padding: 20px;
        }
    }
}
</style>

