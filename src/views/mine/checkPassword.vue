
<template>
    <div>
        <mt-header title="更改密码" fixed>
            <router-link to="/Comtainer/Personal" slot="left">
                <mt-button icon="back">上一页</mt-button>
            </router-link>
            <mt-button  slot="right">切换账号</mt-button>
        </mt-header>
        <div class="inputArea" >
          <p class="fg"></p>
            <mt-field label="旧密码：" placeholder="请输入旧密码" v-model="form.old_pwd"  type='password'></mt-field>
            <mt-field label="新密码：" placeholder="请输入新密码" v-model="form.new_pwd" type='password' ></mt-field>
            <mt-field label="确认密码：" placeholder="请输入确认密码" v-model="form.again_new_pwd" type='password'></mt-field>

        </div>
        <div class="btnArea" style="margin: 1.25rem auto;">
            <mt-button type="primary" class="mint-button mint-button--primary mint-button--normal" @click="submit()">确认密码  </mt-button>
        </div>
    </div>

</template>

<script>
import { Toast } from 'mint-ui'
import { mine } from '@/api/index.js'
export default {

  data () {
    return {
      form: {
        id: '',
        again_new_pwd: '',
        new_pwd: '',
        old_pwd: ''
      }
    }
  },
  methods: {
    confirmPwd () {
      if (this.form.again_new_pwd === '' || this.form.new_pwd === '' || this.form.old_pwd === '') {
        Toast('密码不能为空！')
        return false
      } else {
        if (this.form.old_pwd !== this.form.new_pwd) {
          Toast('两次密码不一致！')
          return false
        } else {
          return true
        }
      }
    },
    submit () {
      // console.log(this.confirmPwd())
      if (sessionStorage.getItem('agentmsg') === null) {
        this.$router.push('/')
      } else {
        this.form.id = JSON.parse(sessionStorage.getItem('agentmsg')).id
        mine.changePwd(this.form).then(res => {
          if (res.code === 200) {
            Toast(res.msg + '请重新登录')
            this.$router.push('/')
          } else {
            Toast(res.msg)
          }
        })
      }
    }
  }
}

</script>

<style lang='stylus' scoped>
.fg {
  width: 100%;
  height: 50px;
  background-color: #f0f0f0;
}
    .titleArea
        text-align  center
        margin-top 1.25rem
        font-size 1.25rem
        font-weight bold
    .btnArea
        text-align center

</style>
