<template>
    <div class="movieDes header_box">
        <el-row>
            <el-col>
                <el-button type="text" @click="$router.back()"><i class="el-icon-arrow-left"></i> 返回</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
.movieDes {
    width: 1000px;
    margin: 0 auto;
}
</style>