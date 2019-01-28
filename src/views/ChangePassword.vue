<template>
	<div class="changePassword">
		<div class="titleTop">
			设置-修改密码
		</div>
		<div class="main">
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="当前密码">
					<el-input v-model="form.oldPassWord" placeholder="输入当前密码"></el-input>
				</el-form-item>
				<el-form-item label="新密码">
					<el-input v-model="form.newPassWord" placeholder="输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码">
					<el-input v-model="form.reNewPassWord" placeholder="输入确认新密码"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<button class="btn" @click="onSubmit">确认修改</button>
	</div>
</template>

<script>
import {
  sysUser
} from '@/api/index.js'
export default {
  data () {
    return {
      form: {
        newPassWord: '',
        oldPassWord: '',
        reNewPassWord: ''
      }
    }
  },
  methods: {
    onSubmit () {
      sysUser.changePassword(this.form).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.$router.push('/')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.changePassword {
		.main {
			padding-top: 30px;
		}

		.btn {
			margin-left: 50px;
			margin-top: 50px;
		}
	}
</style>
