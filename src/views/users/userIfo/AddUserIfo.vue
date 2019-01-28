<template>
  <div class="userifo">
    <div class="titleTop">
      用户管理-用户信息-添加
    </div>
    <div class="main userifoMain">
      <el-form
        ref="form"
        :model="form"
        label-width="200px"
      >
        <el-form-item label="管理员账号"  required="">
          <el-input
            v-model="form.loginName"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
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
            :before-upload="beforeAvatarUpload">
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
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门" required="" >
          <el-cascader
            @change="handleChange"
            :options="optionsDept"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="主管" >
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
        <el-form-item 
        label="身份证号码" 
        required=""
        >
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
        <el-form-item label="专属ID" >
          <el-input
            v-model="form.ownId"
            placeholder="请输入专属业务员id"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- last Area Btn -->
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
          belongAddress: '',
          halfBodyPhoto: '',
          idNumber: '',
          loginName: '',
          password: '',
          position: '',
          realName: '',
          roleId: '',
          deptId: [],
          ownId: '',
          status: '',
          isDepartment: ''
        },
        // 选择角色
        optionsRole: [],
        // 选择部门
        optionsDept: [],
        // 状态
        optionStatus: [
          {key: 0, value: '有效'},
          {key: 1, value: '无效'}
        ]

      }
    },
    methods: {
      // 身份证件号校验
      validateIdCard (id, backInfo) {
      let info = {
        y: '1900',
        m: '01',
        d: '01',
        sex: 'male',
        valid: false,
        length: 0
      }
      if (typeof id !== 'string') return this.back(info, backInfo)
      // 18
      if (/^\d{17}[0-9x]$/i.test(id)) {
        if (!this.initDate(18, info, id)) return this.back(info, backInfo)
        id = id.toLowerCase().split('')
        let wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        let y = '10x98765432'.split('')
        let sum = 0
        for (let i = 0; i < 17; i++) sum += wi[i] * id[i]
        if (y[sum % 11] === id.pop().toLowerCase()) info.valid = true
        return this.back(info, backInfo)
      } else if (/^\d{15}$/.test(id)) { // 15
        if (this.initDate(15, info, id)) info.valid = true
        return this.back(info, backInfo)
      } else {
        return this.back(info, backInfo)
      }
      },
      back (info, backInfo) {
        return backInfo ? info : info.valid
      },
      initDate (length, info, id) {
        info.length = length
        let a
        a = (length === 15) ? 0 : 2 // 15:18
        let temp
        info.y = (a ? '' : '19') + id.substring(6, 8 + a)
        info.m = id.substring(8 + a, 10 + a)
        info.d = id.substring(10 + a, 12 + a)
        info.sex = id.substring(14, 15 + a) % 2 === 0 ? 'female' : 'male'
        temp = new Date(info.y, info.m - 1, info.d)
        return (temp.getFullYear() === info.y * 1) &&
              (temp.getMonth() + 1 === info.m * 1) &&
              (temp.getDate() === info.d * 1)
      },

      IdCardBlur () {
            if (this.validateIdCard(this.form.idNumber)) {
              // if (this.form.idNumber.length === 18) {
              //   let borthNumY = this.form.idNumber.substr(6, 4)
              //   let borthNumM = this.form.idNumber.substr(10, 2)
              //   let borthNumD = this.form.idNumber.substr(12, 2)
              //   let SexNum = this.form.idNumber.substr(16, 1)
              //   this.dataobj.birthday = borthNumY + '-' + borthNumM + '-' + borthNumD
              //   if (SexNum % 2 === 0) {
              //     this.dataobj.gender = '1'
              //   } else {
              //     this.dataobj.gender = '0'
              //   }
              // } else if (this.form.idNumber.length === 15) {
              //   let borthNumY = this.form.idNumber.substr(6, 2)
              //   let borthNumM = this.form.idNumber.substr(8, 2)
              //   let borthNumD = this.form.idNumber.substr(10, 2)
              //   let SexNum = this.form.idNumber.substr(14, 1)
              //   // this.dataobj.birthday = '19' + borthNumY + '-' + borthNumM + '-' + borthNumD
              //   if (SexNum % 2 === 0) {
              //     this.dataobj.gender = '1'
              //   } else {
              //     this.dataobj.gender = '0'
              //   }
              // }
              return true
            } else {
              // this.$message.error('请输入正确的身份证号')
              return  false
            }
      },
      //返回按钮
      returnBefore(){
          this.$router.go('-1')
      },
      // 选择部门改变
      handleChange (value) {
        // console.log(value[1])
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
        })
      },
      // 添加
      onSubmit () {
        if (this.form.loginName == '') {
          // error 错误
          // success 成功
          this.$message.error('请填写管理员账号')
          return
        }
        if (this.form.password == '') {
          // error 错误
          // success 成功
          this.$message.error('请填写密码')
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
        if (this.form.deptId == '') {
          // error 错误
          // success 成功
          this.$message.error('请选择部门')
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
        
        if (this.form.idNumber == '') {
          // error 错误
          // success 成功
          this.$message.error('请填写身份证')
          return
        }
        if(!this.IdCardBlur()){
          this.$message.error('请输入正确的身份证号')
          return
        }

        sysUser.addUser(this.form).then(res => {
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
