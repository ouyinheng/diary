<template>
    <div class="liveBroadcast">
        <header>
            <el-switch
                v-model="displayForm"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </header>
        <div class="m_col" v-if="displayForm">
            <div class="m-col-item" v-for="(item, index) in getIptv" :key="index"  style="margin: 20px" @click="play(item)">
                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                    <div style="overflow:hidden;">
                        <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" :title="item.name">
                            <div slot="placeholder" class="image-slot">
                                加载中<span class="dot">...</span>
                            </div>
                        </el-image>
                    </div>
                    <div style="padding: 4px;">
                        <p style="color:#37a;text-align:center;font-size:16px;">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
        </div>
        <mu-list v-else textline="two-line">
            <mu-list-item avatar :ripple="false" button v-for="(item, index) in getIptv" :key="index"  style="margin: 20px" @click="play(item)">
                <mu-list-item-content>
                    <mu-list-item-title>{{item.name}}</mu-list-item-title>
                    <mu-list-item-sub-title>{{item.group}}</mu-list-item-sub-title>
                </mu-list-item-content>
                <mu-list-item-action >
                    <mu-list-item-after-text></mu-list-item-after-text>
                    <!-- <mu-checkbox color="yellow700" v-model="selects" value="value1" uncheck-icon="star_border" checked-icon="star"></mu-checkbox> -->
                </mu-list-item-action>
            </mu-list-item>
            <mu-divider></mu-divider>
        </mu-list>
    </div>
</template>

<script>
import { mapGetters , mapActions } from 'vuex'
export default {
    name: 'liveBroadcast',
    data: () => ({
        displayForm: true, // true: 卡片；false：列表
    }),
    computed: {
        ...mapGetters([
            'getIptv',
        ]),
	},
    methods: {
        ...mapActions([
			'getHomePageResourth',
        ]),
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        play(item) {
			const BrowserWindow = require('electron').remote.BrowserWindow
			let win = new BrowserWindow({
				width: 900,
				height: 520,
				frame: true,
				webPreferences: {
					webSecurity: false,
					plugins: true
				}
			});
			win.on('close', function () { win = null })
			win.loadURL(window.location.origin + '/#/' + 'showMovies?url='+item.url)
			win.show()
		},
    },
    created() {
        console.log('asdf', window.location.origin + '/#/')
    }
}
</script>

<style lang="scss" scoped>
.liveBroadcast {
    width: 100vw;
    height: 100vh;
    padding-top: 40px;
    // background-color: black;
    color: black;
    .m_col {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 300px);
    }
}
</style>