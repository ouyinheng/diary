<template>
    <div class="favorites-details-list infinite-list" v-infinite-scroll="load">
        <Stick
            :list="tableData"
            @onScrollEnd="load"
            :loadTriggerDistance="200"
        >
            <template slot-scope="scope">
                <el-card>
                    <img v-if="scope.data.logo" :src="scope.data.logo"/>
                    <h2>{{scope.data.name}}</h2>
                </el-card>
            </template>
        </Stick>
    </div>
</template>

<script>
import dbOption from "../../../../main/src/sql/getAllOption.js";

export default {
    name: 'favorites-details-list',
    props: {
        url: String
    },
    data: () => ({
        tableData: [],
        pageSize: 50,
        pageIndex: 0
    }),
    components: {
    },
    watch: {
        url() {
        }
    },
    methods: {
        async getTableData() {            
            await dbOption.init(this.url);
            dbOption.getData((db) => {
                this.tableData.push(...db.get("lives").splice(this.pageIndex, (this.pageIndex + 1) * this.pageSize).value());
                this.pageIndex += 1;
            });
        },
        load() {
            this.getTableData();
        },
        play(item) {
            console.log(item)
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
    },
    mounted() {
        this.getTableData();
    }
}
</script>

<style lang="scss" scoped>
.favorites-details-list {
    width: 100%;
    height: calc(100% - 50px);
    background-color: rgba(255, 255, 255, .1);
    padding: 10px 20px;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    .el-card.is-always-shadow {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3) !important;
    }
}
</style>