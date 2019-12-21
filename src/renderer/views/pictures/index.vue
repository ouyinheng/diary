<template>
    <div class="picture" ref="picture" v-infinite-scroll="loadmore">
        <el-image 
            class="showImg"
            lazy
            v-for="(item, index) in beautyList" :key="index"
            :style="item.Style"
            :src="'http://hbimg.huabanimg.com/'+item.file.key"
            :preview-src-list="srcList">
            <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
            </div>
             <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
            </div>
        </el-image>
        <!-- <img v-for="(item, index) in beautyList" :key="index" class="showImg" :style="item.Style" :src="'http://hbimg.huabanimg.com/'+item.file.key"> -->
    </div>
</template>

<script>
export default {
    name: 'pictures',
    data() {
        return {
            beautyList: [],
            max: '',
            limit: 40,
            wfl: 1,
            heightArray: [],
            srcList: []
        }
    },
    methods: {
        getBeauty() {
            console.log('getBeauty')
            this.$http('https://huaban.com/explore/shoujisheying').then(res => {
                this.parseHtml(res.data);
            })
        },
        parseHtml(html) {
            let filestr = html.split('app.page["pins"] = ')[1];
            filestr = filestr.split(';')[0];
            let imgList = JSON.parse(filestr)
            this.beautyList.push(...imgList);
            imgList.forEach(item => {
                this.srcList.push('http://hbimg.huabanimg.com/'+item.file.key)
            })
            this.$nextTick(() => {
                this.setImgPosition(imgList)
            })
        },
        loadmore() {
            console.log('loadmore')
            if(this.beautyList.length == 0) {
                return;
            }
            const url = `https://huaban.com/explore/shoujisheying?k47wco49&max=${this.beautyList[this.beautyList.length-1]['pin_id']}&limit=${this.limit}&wfl=${this.wfl}`;
            // `https://huaban.com/explore/shoujisheying?k47vxbps&max=2874516543&limit=20&wfl=1`
            this.$http.get(url).then(res => {
                this.parseHtml(res.data);
            })
        },
        setImgPosition(list) {
            const divWidth = this.$refs.picture.clientWidth;
            const column = Math.floor(divWidth/300);
            const marginWidth = (divWidth-column*300)/column;
            list.forEach((item) => {
                const heightArray = this.heightArray;
                const index = heightArray.indexOf(Math.min.apply(Math, heightArray));
                const height = (300/item.file.width) * item.file.height
                const Style = {
                    top: heightArray[index] + 30 + 'px',
                    left: index * 300 + 'px',
                    height: height + 'px',
                    right: marginWidth + 'px'
                }
                heightArray[index] += height
                item.Style = Style;
            })
            this.beautyList.splice(0, 0);
        }
    },
    created() {
    },
    mounted() {
        const divWidth = this.$refs.picture.clientWidth;
        const column = Math.floor(divWidth/300);
        for( let i = 0; i < column; i++ ){
            this.heightArray.push(0);
        }
        this.getBeauty();
    }
}

</script>

<style lang="scss">
.picture {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgb(134, 128, 128);
    .el-card {
        margin: 10px 0 10px 0;
    }
    .showImg {
        display: block;
        width: 300px;
        max-width: 300px;
        position: absolute;
        transition: all .3s;
    }
}
</style>