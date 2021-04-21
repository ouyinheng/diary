<template>
    <el-card :body-style="{ padding: '0px'}" shadow="hover">
        <div style="overflow:hidden;">
            <el-image :src="item.logo" :title="item.name">
                <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                </div>
            </el-image>
        </div>
        <div style="padding: 4px;">
            <p style="color:#37a;text-align:center;font-size:16px;">{{item.name}}</p>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'movie-item',
    props: {
        item: {
            type: Object,
            default() {
                return {
                    name: '',
                    logo: ''
                }
            }
        }
    }
}
</script>