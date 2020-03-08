<template>
    <div>
        <el-input
            placeholder="请输入内容"
            v-model="input"
            class="parsing"
            clearable>
        </el-input>
    </div>
</template>
<script>
export default {
    data () {
        return {
            labelPosition: 'left',
                input: '',
        }
    }
};
</script>
<style lang="scss">
.mu-demo-form {
    width: 100%;
    max-width: 460px;
    color: white;
}
.parsing {
    width: 400px;
    .el-input {
        &__inner {
            border-color: black;
            background-color: black;
            color: white;
        }
    }
}
</style>
