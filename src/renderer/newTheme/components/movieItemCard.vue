<template>
	<mu-card style="width: 100%; max-width: 375px; max-height: 187.5px;margin: 0 auto;" @click="showDetails">
        <mu-card-media :title="item.title">
            <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
        </mu-card-media>
	</mu-card>
</template>

<script>
export default {
	name: "movie-item",
	props: {
		item: {
			type: Object,
			default() {
				return {
					title: "",
					logo: "",
				};
			},
		},
    },
    methods: {
        showDetails() {
            this.$emit('showDetails', this.item)
        }
    }
};
</script>