
<template>
  <div>
    <mt-header title="实名认证" fiexd>
      <router-link to="/Comtainer/My" slot="left">
        <mt-button icon="back">上一页</mt-button>
      </router-link>
      <mt-button slot="right" @click="changeID">切换账号</mt-button>
    </mt-header>
    <p class="fg"></p>
    <div class="title">实名认证</div>
    <div class="inputArea">
      <mt-field label="真实姓名：" placeholder="请输入真实姓名" v-model="form.real_name"></mt-field>
      <mt-field label="身份证号：" placeholder="请输入身份证号" v-model="form.id_number"></mt-field>
    </div>
    <div class="btnArea" style="padding:.625rem;margin-top:.9375rem;" >
      <mt-button

        type="primary"
        class="mint-button mint-button--primary mint-button--large"
        @click="submit()"
      >提交</mt-button>
    </div>
  </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
import { mine } from '@/api/index.js'
export default {
  data () {
    return {
      startDate: new Date(),
      form: {
        real_name: '',
        id_number: '',
        agent_id: ''
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
    submit () {
      if (sessionStorage.getItem('agentmsg') === null) {
        this.$router.push('/')
      } else {
        this.form.agent_id = JSON.parse(sessionStorage.getItem('agentmsg')).id
        mine.certifiCation(this.form).then(res => {
          if (res.code === 200) {
            Toast(res.msg)
          } else {
            Toast(res.msg)
          }
          this.$router.push('/Comtainer/My')
        })
      }
    }
  },
  mounted () {}
}
</script>

<style scoped>


.inputArea{
  padding-left: .625rem;
  padding-right:.625rem;
}
.btnArea {
  text-align: center;
}
.title {
  text-align: center;
  font-size: 1.875rem;
  /* margin-bottom: 10px; */
  margin-top: .625rem;
  font-weight: 700;
  padding: 3%;
}
input[type="text"]{
font-size: 1rem;
}
</style>
