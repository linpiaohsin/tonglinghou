<template>
  <div class="editProductDetail">
    <div class="titleTop">
      公司产品-产品列表-详情
    </div>
    <div class="main">
      <div class="text">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item label="产品名称">
            <el-input
              v-model="form.name"
              placeholder="请输入产品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品图片">
            <el-upload
              :action="action"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="form.imageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="产品正文">
            <el-input
              type="textarea"
              v-model="form.desc"
              style="resize:none;"
              placeholder="输入产品正文"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <button class="btn">确定</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        pic_url: '',
        name: '',
        detail: ''
      },
      action: axios.defaults.baseURL + 'common/upload'
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.form.imageUrl = file.url
      this.dialogVisible = true
    },
    onSubmit () {},
    initData(){
      if(this.$route.query){
        console.log('进入编辑状态。、。'+this.$route.query.name);
        this.form = this.$route.query
        
      }
    }
  },
  mounted(){
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
.editProductDetail {
  .text {
    padding-top: 40px;
    width: 600px;
  }
  .btn{
    margin-top: 100px;
  }
}
</style>
