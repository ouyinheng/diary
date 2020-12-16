<template>
	<el-dialog
		title="提示"
		class="addDialog"
		:visible.sync="dialogVisible"
		width="30%"
	>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="文件名" prop="name">
				<el-input v-model="form.name" maxlength="8"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addFavorites">立即创建</el-button>
				<el-button @click="close">取消</el-button>
			</el-form-item>
		</el-form>
		<!-- <span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="addFavorites">确 定</el-button>
		</span> -->
	</el-dialog>
</template>

<script>
import fileOptions from "../../../main/src/file";
import dbOption from '../../../main/src/sql/80sdb'
export default {
	name: "add",
	props: {
		value: Boolean,
	},
	data: () => ({
		dialogVisible: false,
		form: {
			name: "",
		},
		rules: {
			name: [
				{ required: true, message: "请输入文件名称", trigger: "blur" },
				{
					min: 1,
					max: 8,
					message: "长度在 1 到 8 个字符",
					trigger: "blur",
				},
			],
		},
	}),
	watch: {
		value(val) {
			this.dialogVisible = val;
		},
	},
	methods: {
		close() {
			this.dialogVisible = false;
			this.$emit("input", this.dialogVisible);
		},
		addFavorites() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
                    dbOption.getData((db) => {
                       console.log(db.get('lives').splice(0,10).value())
                    })
					// fileOptions
					// 	.WhetherTheFileExists("diary\\input.txt", false)
					// 	.then((res) => {
					// 		fileOptions.saveFile("diary\\input.txt", "谢谢侬");
					// 	});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
	},
	created() {
		// this.dialogVisible = this.value;
	},
};
</script>

<style lang="scss" scoped>
.addDialog {
	z-index: 10000;
}
</style>