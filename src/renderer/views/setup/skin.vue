<template>
    <div class="skin">
        <span class="body__text--color">skin</span>
    </div>
</template>

<script>
export default {
    name: 'skin',
    data() {
        return {

        }
    },
    created() {
        this.$themeSetup("theme_1")
    }
}
</script>

<style lang="scss" scoped>
.skin {
}
</style>