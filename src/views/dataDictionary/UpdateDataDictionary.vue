<template>
  <div class="editDataDictionary">
    <div class="titleTop">
      数据字典-字典表格-编辑
    </div>
    <div class="main">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="标签名" required="">
          <el-input
            v-model="form.name"
            placeholder="单行输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据值" required="">
          <el-input
            v-model="form.value"
            placeholder="单行输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型(编码)" required="">
          <el-input
            v-model="form.code"
            placeholder="单行输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" required="">
          <el-input
            v-model="form.description"
            placeholder="单行输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" required="">
          <el-input
            v-model="form.remark"
            placeholder="单行输入"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <button
      class="btn"
      @click="onSubmit"
    >确定</button>
  </div>
</template>

<script>

import {dictionaries} from '@/api/index.js'

export default {
  data () {
    return {
      form: {
        id: '',
        name: '',
        value: '',
        code: '',
        description: '',
        remark: ''
      }
    }
  },

  mounted () {
    this.form = this.$route.params
    this.form.id = this.$route.params.id
    // console.log()
  },

  methods: {
    onSubmit () {
      dictionaries.update(this.form).then(res => {
        // 打印数据
        if (res.code === 0) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
        this.$router.push({name: 'DataList'})
        console.log(res)
      }).catch(err => {
		  console.log(err)
	  })
    }
  }
}

</script>

<style lang="scss" scoped>
.editDataDictionary {
    .main{
        padding-top: 30px;
    }
    .btn {
        margin-left: 50px;
        margin-top: 50px;
    }
}
</style>
