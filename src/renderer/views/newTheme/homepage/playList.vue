<template>
	<v-app>
		<v-dialog v-model="dialog" width="700">
			<!-- <v-card>
				<v-sheet class="mx-auto" elevation="8" max-width="800">
					<v-slide-group v-model="model" class="pa-4" show-arrows>
						<v-slide-item
							v-for="(item, index) in playRRListInfo"
							:key="index"
						>
                            <el-card :body-style="{ padding: '0px' }">
                                <img :src="item.cover" class="image">
                                <div style="padding: 14px;">
                                    <span>{{item.title}}</span>
                                </div>
                            </el-card>
						</v-slide-item>
					</v-slide-group>
				</v-sheet>
			</v-card> -->
			<v-card>
				<v-row align="center">
					<v-item-group
						v-model="window"
						class="shrink"
						mandatory
						tag="v-flex"
					>
						<v-item
							v-for="item in sourthList"
							:key="item.name"
							v-slot="{ active, toggle }"
						>
							<div>
								<v-btn
									:input-value="active"
									icon
									@click="toggle"
								>
                                    {{item.name}}
								</v-btn>
							</div>
						</v-item>
					</v-item-group>

					<v-col>
						<v-window v-model="window" class="elevation-1" vertical>
							<v-window-item v-for="item in sourthList" :key="item.name">
								<v-card flat>
									<v-card-text>
										<v-row class="mb-4" align="center">
											<v-avatar
												color="grey"
												class="mr-4"
											></v-avatar>
											<strong class="text-h6"
												>{{ item.name }}</strong
											>
											<v-spacer></v-spacer>
											<v-btn icon>
												<v-icon>mdi-account</v-icon>
											</v-btn>
										</v-row>

										<p>
											Lorem ipsum dolor sit amet,
											consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore
											et dolore magna aliqua. Ut enim ad
											minim veniam, quis nostrud
											exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
											Duis aute irure dolor in
											reprehenderit in voluptate velit
											esse cillum dolore eu fugiat nulla
											pariatur. Excepteur sint occaecat
											cupidatat non proident, sunt in
											culpa qui officia deserunt mollit
											anim id est laborum.
										</p>

										<p>
											Lorem ipsum dolor sit amet,
											consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore
											et dolore magna aliqua. Ut enim ad
											minim veniam, quis nostrud
											exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
											Duis aute irure dolor in
											reprehenderit in voluptate velit
											esse cillum dolore eu fugiat nulla
											pariatur. Excepteur sint occaecat
											cupidatat non proident, sunt in
											culpa qui officia deserunt mollit
											anim id est laborum.
										</p>

										<p>
											Lorem ipsum dolor sit amet,
											consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore
											et dolore magna aliqua. Ut enim ad
											minim veniam, quis nostrud
											exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
											Duis aute irure dolor in
											reprehenderit in voluptate velit
											esse cillum dolore eu fugiat nulla
											pariatur. Excepteur sint occaecat
											cupidatat non proident, sunt in
											culpa qui officia deserunt mollit
											anim id est laborum.
										</p>
									</v-card-text>
								</v-card>
							</v-window-item>
						</v-window>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
	</v-app>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		movieName: String,
	},
	data() {
		return {
			length: 3,
			window: 0,
			dialog: false,
			playRRListInfo: [],
			model: null,
            sourthList: [{
                name: '人人',
            }, {
                name: '腾讯',
            }, {
                name: '爱奇艺',
            }]
		};
	},
	watch: {
		value() {
			this.dialog = this.value;
		},
	},
	methods: {
		closeDialog() {
			this.dialog = false;
			this.$emit("input", false);
		},
		getRRList(title) {
			// https://web-api.rr.tv/search/season_h5?keywords=%E8%87%B4%E5%91%BD%E5%A5%B3%E4%BA%BA%20%E7%AC%AC%E4%B8%80%E5%AD%A3&size=10&id=&sort=&5-16-21
			this.$http
				.get(
					`https://web-api.rr.tv/search/season_h5?keywords=${encodeURIComponent(
						title ? title : this.title
					)}`
				)
				.then((res) => {
					this.playRRListInfo = res.data.result;
				});
		},
	},
	created() {
		this.dialog = this.value;
		console.log("movieName", this.movieName);
		this.getRRList(this.movieName);
	},
};
</script>

<style lang="scss" scoped>
.image {
	width: 160px;
}
.shrink {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>