<template>
    <div class="picture">
        <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in beautyList" :key="index">
            <img :src="'http://hbimg.huabanimg.com/'+item.file.key" class="image">
            <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                    <time class="time">{{ item.created_at }}</time>
                <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'pictures',
    data() {
        return {
            beautyList: [],
            max: '',
            limit: 20,
            wfl: 1
        }
    },
    methods: {
        getBeauty() {
            this.$http('https://huaban.com/favorite/beauty').then(res => {
                this.parseHtml(res.data);
            })
        },
        parseHtml(html) {
            let filestr = html.split('app.page["pins"] = ')[1];
            filestr = filestr.split(';')[0];
            this.beautyList = JSON.parse(filestr);
            // const div = document.createElement('div');
            // div.innerHTML = html;
            console.log(this.beautyList)
            this.loadmore()
        },
        loadmore() {
            const url = `https://huaban.com/favorite/beauty?k3a5a1ht&max=${this.beautyList[this.beautyList.length-1]['pin_id']}&limit=${this.limit}&wfl=${this.wfl}`;
            this.$http.get(url).then(res => {
                console.log('res', res)
            })
        }
    },
    created() {
        this.getBeauty();
    }
}

</script>

<style lang="scss">
.picture {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .el-card {
        margin: 10px 0 10px 0;
    }
    img {
        width: 300px;
    }
}
</style>