<template>
	<v-app>
		<v-dialog class="v-dialog-playlist" :persistent="true" v-model="dialog" width="374">
			<v-card :loading="loading" class="mx-auto my-card" max-width="374">
				<template slot="progress">
					<v-progress-linear
						color="deep-purple"
						height="10"
						indeterminate
					></v-progress-linear>
				</template>
				<v-img
					height="250"
					:src="playRRListInfo.coverUrl"
				></v-img>
				<v-card-title>{{playRRListInfo.title}}<span style="font-size: 12px;color: gainsboro">{{playRRListInfo.plots}}.{{playRRListInfo.playDateInfo}}.{{playRRListInfo.score.toFixed(2)}}</span></v-card-title>
				<v-card-text>
					<div class="over-3-tips">
						{{playRRListInfo.desc}}
					</div>
				</v-card-text>
				<v-divider class="mx-4"></v-divider>
				<v-card-title>播放列表</v-card-title>
				<v-card-text>
					<v-chip-group
						v-model="selection"
						active-class="deep-purple accent-4 white--text"
						column
					>
						<v-chip v-for="(item, index) in playRRListInfo.episodes" :key="index" @click="parseUrl(item.key)">{{item.episodeNo}}</v-chip>
					</v-chip-group>
				</v-card-text>
				<v-card-actions>
					<v-btn color="deep-purple lighten-2" text @click="closeDialog">
						关闭
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-app>
</template>

<script>
import rrParse from "./rrParse";
import { mapGetters, mapMutations } from 'vuex'
export default {
	mixins: [rrParse],
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		movieName: String,
		selectItem: Object,
	},
	data() {
		return {
			loading: false,
            selection: 0,
			dialog: false,
			model: null,
			signKey: "", //人人播放key
			sourthList: [
				{
					name: "人人",
				},
				{
					name: "腾讯",
				},
				{
					name: "爱奇艺",
				},
			],
		};
	},
	watch: {
		value() {
			this.dialog = this.value;
		},
		dialog() {
			if (!this.dialog) {
				this.$emit("input", false);
			}
		},
	},
	methods: {
        ...mapMutations([
            'setPlayMovieUrl', 'setClosePlay', 'setVideoType', 'setShowTheMovieBox'
        ]),
		closeDialog() {
			this.dialog = false;
			this.$emit("input", false);
		},
		getSignKey() {},
        reserve () {
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        },
	},
	created() {
		this.dialog = this.value;
		console.log("selectItem", this.selectItem);
		if (this.selectItem.laiyuan === "人人") {
			this.getList(this.selectItem.id);
		}
	},
};
</script>

<style lang="scss" scoped>
.my-card {
    height: 75%;
}
.over-3-tips {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor:pointer;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.v-dialog-playlist {
    background-color: white;
    height: 75vh;
    .image {
        width: 160px;
    }
    .shrink {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>