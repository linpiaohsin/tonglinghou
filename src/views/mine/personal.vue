
<template>
  <div>
    <mt-header title="个人信息" fixed>
      <router-link to="/Comtainer/My" slot="left">
        <mt-button icon="back">上一页</mt-button>
      </router-link>
      <mt-button slot="right" @click="changeID">切换账号</mt-button>
    </mt-header>
    <div class="inputArea">
      <p class="fg"></p>
      <mt-field label="代理商ID：" placeholder="" v-model="form.id" disabled></mt-field>
      <mt-field label="游戏ID：" placeholder="" v-model="form.play_id" disabled></mt-field>
      <mt-field label="微信号：" placeholder="" v-model="form.wechat_number" disabled></mt-field>
      <mt-field label="手机号：" placeholder="" v-model="form.phone" disabled></mt-field>
      <mt-field label="加入时间：" placeholder="" v-model="form.create_time" disabled></mt-field>
      <mt-field label="房卡：" placeholder="" v-model="form.card" disabled></mt-field>
    </div>
    <div class="Pay_c_btn" style="text-align: center; margin: 20px auto;">
      <mt-button
        class="mint-button mint-button--primary mint-button--normal"

        @click="changePwd()"
      >更改密码</mt-button>
    </div>
  </div>
</template>

<script>
import { mine } from '@/api/index.js'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      startDate: new Date(),
      form: {
        id: '',
        create_time: '',
        card: '',
        phone: '',
        wechat_number: '',
        play_id: ''
      }
    }
  },
  methods: {
    changeID () {
      MessageBox.confirm('确认切换账号?').then(res => {
        // 跳转页面到
        this.$router.push('/')
        sessionStorage.removeItem('agentmsg')
        sessionStorage.removeItem('tabar')
      })
    },
    init () {
      if (sessionStorage.getItem('agentmsg') === null) {
        this.$router.push('/')
      } else {
        let id = JSON.parse(sessionStorage.getItem('agentmsg')).id
        mine.personInfo({ id: id }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.form = res.data
          }
        })
      }
    },
    changePwd () {
      this.$router.push('/Comtainer/checkPassword')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

/* 灰线 */
.fg {
  width: 100%;
  height: 50px;
  background-color: #f0f0f0;
}

</style>
