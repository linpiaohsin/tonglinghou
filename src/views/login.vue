<template>
  <div class="login">
    <!-- <img src="@/assets/images/bg.jpg" alt=""> -->
    <h1>定字网后台管理系统</h1>
    <div class="loginBox">
      <h2>登录</h2>
      <el-form label-position="left" ref="form" :model="form" label-width="70px">
        <el-form-item label="账 号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密 码" class="password">
          <el-input v-model="form.passWord" type="password"></el-input>
        </el-form-item>
      </el-form>
      <p><el-checkbox v-model="checked">记住密码</el-checkbox></p>
      <div class="btn" @click="submit">登 录</div>
    </div>
  </div>
</template>

<script>
  import { sysUser } from '@/api/index.js'
  export default {
    data () {
      return {
        checked: '',
        form: {
          account: '',
          passWord: ''
        }
      }
    },
    methods: {
      submit () {
        if (this.form.account === '' || this.form.passWord === '') {
          // error 错误
          // success 成功
          this.$message.error('您输入的账号或密码为空')
          return
        }
        sysUser.login(this.form).then(res => {
          console.log(res)
          if (res.code === 0) {
            if(this.checked == true){
              this.$cookie.set('username',this.form.account)
              this.$cookie.set('password',this.form.passWord)
              this.$cookie.set('checkboxStatus',this.checked)
              console.log('设置cookie成功！');
              
            }else{
              this.$cookie.delete('username')
              this.$cookie.delete('password')
              console.log('销毁cookie成功！');

            }
            this.$cookie.set('token', res.data.userName)
            localStorage.setItem('userName',res.data.userName)
            this.$router.push('/Home/user/defaut')
          } else {
            this.$message.error(res.msg)
          }
          console.log(res)
        })
      },
      getCookies(){
        if(this.$cookie.get('username') && this.$cookie.get('password')){
            this.form.account=this.$cookie.get('username')
            this.form.passWord = this.$cookie.get('password')
            this.checked = true
            // console.log('=====check value======'+this.checked);

        }
        
        
      }
    },
    mounted () {
      // this.$router.push({ path: '/Home/user/editUserIfo' })
      this.getCookies()

    }
  }
</script>

<style lang="scss" scoped>
  .login{
  // overflow: hidden;
    background: url('../assets/images/bg.jpg');
    min-height: 1080px;
    min-width: 1360px;
    text-align: center;
    border: 1px solid transparent;
  h1{
    font-size: 48px;
    color: #fff;
    margin: 200px 0 30px;
  }
  .loginBox{
    display: inline-block;
    background-color: #fff;
    padding: 20px 50px;
    border-radius:4px;
    text-align: left;
  h2{
    text-align: center;
    margin-bottom: 25px;
  }
  .btn{
    width: 100%;
    line-height: 30px;
    margin: 40px 0;
    height: 40px;
    line-height: 40px;
  }
  }
  }
</style>
<style lang="scss">
  .login{
  .el-input{
    width: 275px;
  }
  .el-form-item__label{
    color: #000;
  }
  }
</style>
