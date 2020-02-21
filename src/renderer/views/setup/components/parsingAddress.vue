<template>
    <div>
        <el-input
            placeholder="请输入内容"
            v-model="input"
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
<style>
.mu-demo-form {
    width: 100%;
    max-width: 460px;
    color: white;
}
</style>