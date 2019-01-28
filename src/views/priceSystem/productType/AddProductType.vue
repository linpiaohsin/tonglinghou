<template>
  <div class="editProductType">
    <div class="titleTop">
      价格体系设置-产品类型-添加
    </div>
    <div class="main">
      <div class="text">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item label="类型名称" required="" >
            <el-input
              v-model="form.name"
              placeholder="请输入类型名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item label="类型图片" required="">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="form.picUrl"
                :src="form.picUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item label="类型详情" required="">
            <el-input
              type="textarea"
              v-model="form.detail"
              style="resize:none;"
              placeholder="输入产品类型详情"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <button class="btn" @click="onSubmit">添加</button>
      <button class="btn" @click="goback">返回</button>
    </div>
  </div>
</template>

<script>
import { priceSystem } from '@/api/index.js'
import axios from 'axios'
export default {
  data () {
    return {
      // 添加
      form: {
        picUrl: '',
        name: null,
        detail: null
      },
      action: axios.defaults.baseURL + 'common/upload'
    }
  },
  methods: {
    goback(){
        this.$router.go(-1)
    },
    handleAvatarSuccess (res, file) {
      this.form.picUrl = URL.createObjectURL(file.raw)
      console.log(res.data)
      this.form.picUrl = JSON.parse(res.data.fileUrlJsonString).fileUrl
    },
    // beforeAvatarUpload (file) {
    //   const isJPG = file.type === 'image/jpeg'
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //
    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!')
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!')
    //   }
    //   return isJPG && isLt2M
    // },
    onSubmit () {
      if (this.form.name === '') {
        // error 错误
        // success 成功
        this.$message.error('请输入产品类型名称')
        return
      }
      if (this.form.detail === '') {
        // error 错误
        // success 成功
        this.$message.error('请输入产品详情信息')
        return
      }
      if (this.form.picUrl === '') {
        // error 错误
        // success 成功
        this.$message.error('请上传图片')
        return
      }
      priceSystem.productTypeAdd(this.form).then(res => {
        // console.log(res); 打印数据
        if (res.code === 0) {
          this.$router.push('/Home/priceSystem/productType')
        } else {
          this.$message.error(res.msg)
        }
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editProductType {
  .text {
    padding-top: 40px;
    display: flex;
    width: 800px;
    justify-content: space-between;
  }
  .btn{
    margin-top: 100px;
  }

  // 上传图片
  .avatar-uploader .el-upload {
    border: none;
  }
  .avatar-uploader-icon {
    width: 50px;
    height: 50px;
    line-height: 50px;
    color: #333;
  }
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
