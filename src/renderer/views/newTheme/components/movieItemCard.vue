<template>
    <v-card style="width: 100%; max-width: 375px; max-height: 187.5px;margin: 0 auto;" @click="showDetails">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" >
            <v-card-title v-text="item.title" style="margin-top: 150px;color: white;margin-left: 40px;"></v-card-title>
        </v-img>
    </v-card>
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