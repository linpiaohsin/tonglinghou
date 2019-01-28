<template>
  <div class="editAdvertisement">
    <div class="titleTop">
      客户端管理-弹窗设置-添加
    </div>
    <div class="main">
      <div class="formdata">
        <div class="text">
          <el-form
            ref="form"
            :model="form"
            label-width="100px"
          >
            <el-form-item label="弹窗名称" required="">
              <el-input
                v-model="form.name"
                placeholder="单行输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="弹窗详情" required="">
              <el-input
                type="textarea"
                v-model="form.detail"
                style="resize:none;"
                placeholder="输入弹窗详情"
              ></el-input>
            </el-form-item>
            <el-form-item label="添加图片" required="">
              <el-upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img
                  v-if="form.pic_url"
                  :src="form.pic_url"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <button class="btn" @click="onSubmit()">确定</button>
    </div>
  </div>
</template>

<script>
import {client} from '@/api/index.js'
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        pic_url: '',
        name: '',
        detail: '',
        cus_user_id: ''
      },
      loading2: false,
      customers: {},
      action: axios.defaults.baseURL + 'common/upload'
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.$set(this.form, 'pic_url', JSON.parse(res.data.fileUrlJsonString).fileUrl)
      // this.form.pic_url = JSON.parse(res.data.fileUrlJsonString).fileUrl
    },
    initData () {
      console.log('--->>>', this.$route.query)
      if (!this.$route.query.id) { // 新增

      } else { // 编辑
        this.form = this.$route.query
        this.$set(this.form, 'pic_url', this.$route.query.picUrl)
        // this.form.pic_url = this.$route.query.picUrl
      }
    },
    searchCategory () {
      // 目标客户获取
      client.customerQuery({enterpriseName:''}).then(res => {
      // client.queryPageAd().then(res => {
            if(res.code==0){
                this.customers = res.data
                console.log(this.customers);

            }
      })
    },
    onSubmit () {
      if (!this.$route.query.id) {
        // 新增操作
        // this.form.cus_user_id = this.customers.
        // console.log(this.form);
        client.addData(this.form).then(res => {
          if (res.code == 0) {
            this.$message.success('新增成功')
            this.$router.push({name: 'Advertisement'})
          } else {
            this.$message.console.error('新增失败')
          }
        })
      } else {
        // 编辑操作
        client.updateData(this.form).then(res => {
          if (res.code === 0) {
            this.$message.success('编辑成功')
            this.$router.push({name: 'Advertisement'})
          } else {
            this.$message.console.error('编辑失败')
          }
        })
      }
    }
  },
  mounted () {
    this.initData()
    // this.form = this.$route.query
  }
}
</script>

<style lang="scss" scoped>
.editAdvertisement {
  .formdata{
    display: flex;
    padding-top: 40px;
    .text {
      width: 400px;
      margin-right: 30px;
    }
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
    width: 180px;
    height: 180px;
  }
}
</style>
