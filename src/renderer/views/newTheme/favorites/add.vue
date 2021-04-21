<template>
    <mu-dialog title="提示" width="300" :open.sync="dialogVisible">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="文件名" prop="name">
				<el-input v-model="form.name" maxlength="8"></el-input>
			</el-form-item>
		</el-form>
        <mu-button slot="actions" flat @click="close">关闭</mu-button>
        <mu-button slot="actions" flat color="primary" @click="addFavorites">确定</mu-button>
    </mu-dialog>
</template>

<script>
import fileOptions from "../../../../main/src/file";
import getAllOption from "../../../../main/src/sql/getAllOption";
import favoritedb from "../../../../main/src/sql/favoritedb";
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
            this.form.name = '';
			this.dialogVisible = false;
			this.$emit("input", this.dialogVisible);
		},
		addFavorites() {
			this.$refs["form"].validate((valid) => {
				if (valid) {
                    getAllOption.init(this.form.name+'.json')
                    favoritedb.getData(db => {
                        db.get('posts').push({
                            "title": this.form.name,
                            "url": `${this.form.name}.json`,
                            "canDelete": true
                        }).write();
                    })
                    this.close();
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