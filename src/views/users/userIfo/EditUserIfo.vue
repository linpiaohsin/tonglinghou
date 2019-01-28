<template>
  <div class="userifo">
    <div class="titleTop">
      用户管理-用户信息-编辑
    </div>
    <div class="main userifoMain">
      <el-form
        ref="form"
        :model="form"
        label-width="200px"
      >
        <!--<el-form-item label="管理员账号" required="">-->
          <!--<el-input-->
            <!--v-model="form.loginName"-->
            <!--placeholder="请输入账号"-->
          <!--&gt;</el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="状态" required="">
          <el-select
            v-model="form.status"
            placeholder="有效"
          >
            <el-option v-for="(item,index) in optionStatus" :key="index" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" required="">
          <el-input
            v-model="form.realName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="半身照" required="">
          <el-upload
            class="avatar-uploader"
            action="http://47.106.243.1:2018/web/api/common/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.halfBodyPhoto" :src="form.halfBodyPhoto" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        :model="form"
        label-width="200px"
      >
        <el-form-item label="管理员密码" required="">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="所属部门" required="">
          <el-cascader
            :options="optionsDept"
            v-model="form.deptIdArr"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="主管">
          <el-select v-model="form.isDepartment" placeholder="请选择">
            <el-option
              label="是"
              value="1">
            </el-option>
            <el-option
              label="否"
              value="0">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号码" required="">
          <el-input
            v-model="form.idNumber"
            placeholder="请输入身份证号码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        :model="form"
        label-width="200px"
      >
        <el-form-item label="所属角色" required="">
          <el-select
            v-model="form.roleId"
            placeholder="请选择所属角色"
          >
            <el-option v-for="(item,index) in optionsRole" :key="index" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" required="">
          <el-input
            v-model="form.position"
            placeholder="请输入职位"
          ></el-input>
        </el-form-item>
        <el-form-item label="籍贯" required="">
          <el-input
            v-model="form.belongAddress"
            placeholder="请输入籍贯"
          ></el-input>
        </el-form-item>
        <el-form-item label="专属ID">
          <el-input
            v-model="form.ownId"
            placeholder="请输入专属业务员id"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <button
      style="margin-left:200px"
      class="btn"
      @click="onSubmit"
    >保存</button>
     <button
      class="btn"
      @click="returnBefore"
    >返回</button>

  </div>
</template>

<script>
  import { sysUser } from "@/api/index.js"
  export default {
    data () {
      return {
        // 添加
        form: {
          id: '',
          belongAddress: '',
          halfBodyPhoto: '',
          idNumber: '',
          loginName: '',
          password: '',
          position: '',
          realName: '',
          roleId: '',
          deptIdArr: [],
          ownId: '',
          status: '',
          isDepartment: ''
        },
        selectedOptions3: ['051b1887befa46279e86f7dada16bb99', '3b8876becc634ab4931504649443ee6f'],
        // 选择角色
        optionsRole: [],
        // 选择部门
        optionsDept: [],
        selectedOptions: [

        ],
        // 状态
        optionStatus: [
          {key: 0, value: '有效'},
          {key: 1, value: '无效'}
        ]

      }
    },
    methods: {
      //返回按钮
      returnBefore(){
          this.$router.go(-1)
      },
      // 选择部门改变
      handleChange (value) {
        console.log(value)
        this.form.deptId = value[1]
      },
      handleAvatarSuccess (res, file) {
        // this.form.halfBodyPhoto = URL.createObjectURL(file.raw)
        this.form.halfBodyPhoto = JSON.parse(res.data.fileUrlJsonString).fileUrl
      },
      beforeAvatarUpload (file) {
        // const isJPG = file.type === 'image/jpeg'
        // const isLt2M = file.size / 1024 / 1024 < 2
        //
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!')
        // }
        // return isJPG && isLt2M
      },
      // 一级部门下拉列表查询
      dictData () {
        sysUser.queryRoleList().then(res => {
          if (res.code == 0) {
            this.optionsRole = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
        sysUser.queryDeptList().then(res => {
          this.optionsDept = res.data
          console.log(this.optionsDept)
        })
      },
      // 编辑
      onSubmit () {
        if (this.form.belongAddress == '') {
          // error 错误
          // success 成功
          this.$message.error('请填写籍贯')
          return
        }
        if (this.form.halfBodyPhoto == '') {
          // error 错误
          // success 成功
          this.$message.error('请上传半身照')
          return
        }
        if (this.form.deptId == '') {
          // error 错误
          // success 成功
          this.$message.error('请选择部门')
          return
        }
        if (this.form.idNumber == '') {
          // error 错误
          // success 成功
          this.$message.error('请填写身份证')
          return
        }
        // if (this.form.loginName == '') {
        //   // error 错误
        //   // success 成功
        //   this.$message.error('请填写管理员账号')
        //   return
        // }
        if (this.form.password == '') {
          // error 错误
          // success 成功
          this.$message.error('请填写密码')
          return
        }
        if (this.form.position == '') {
          // error 错误
          // success 成功
          this.$message.error('请填写职位')
          return
        }
        if (this.form.realName == '') {
          // error 错误
          // success 成功
          this.$message.error('请填写真实姓名')
          return
        }
        if (this.form.roleId == '') {
          // error 错误
          // success 成功
          this.$message.error('请选择角色')
          return
        }
        if (this.form.status == null) {
          // error 错误
          // success 成功
          this.$message.error('请选择账号状态')
          return
        }
        sysUser.updUser(this.form).then(res => {
          // console.log(res); 打印数据
          if (res.code == 0) {
            this.$router.push('/Home/user/userIfo')
          } else {
            this.$message.error(res.msg)
          }
          console.log(res)
        })
      }
    },
    mounted () {
      // 查看传递数据
      this.dictData()
      this.form = this.$route.params
      this.form['isDepartment'] = String(this.$route.params['isDepartment'])
      this.form['roleId'] = String(this.$route.params['roleId'])
      this.form['deptIdArr'] = []
      this.form['deptIdArr'].push(this.$route.params['deptId'])
      this.form['deptIdArr'].push(this.$route.params['detpParentId'])

    }
  }
</script>

<style lang="scss" scoped>
  .userifo {
  .userifoMain {
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    width: 1200px;
  }
  .btn {
    margin-left: 50px;
    margin-top: 50px;
  }
  }
</style>
