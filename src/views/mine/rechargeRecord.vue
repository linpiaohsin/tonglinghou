<template>
    <div>
        <mt-header title="充值记录" fixed>
            <router-link to="/Comtainer/My" slot="left">
                <mt-button icon="back">上一页</mt-button>
            </router-link>
            <mt-button  slot="right" @click="changeID">切换账号</mt-button>
        </mt-header>
        <div>
            <p class="fg"></p>
            <mt-field label="起始时间：" placeholder="请输入日期" type="date" v-model="form.startDate"></mt-field>
            <mt-field label="结束时间：" placeholder="请输入日期" type="date" v-model="form.endDate"></mt-field>
        </div>
        <div class="Pay_c_btn">
            <button class="mint-button mint-button--primary mint-button--small" @click="toGeneral()">
                <label class="mint-button-text" >普通钻</label>
            </button>
            <button class="mint-button mint-button--primary mint-button--small">
                <label class="mint-button-text">好友圈钻</label>
            </button>
        </div>
    </div>

</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
export default {
  data () {
    return {
      form: {
        startDate: this.getCurrentMonthFirst(new Date()),
        endDate: this.formatDateTime(new Date()),
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
    toGeneral () {
      console.log(this.form)
      // this.$router.push({name: '', params: this.form})
      if (sessionStorage.getItem('agentmsg') === null) {
        this.$router.push('/')
      } else {
        this.form.agent_id = JSON.parse(sessionStorage.getItem('agentmsg')).id
        this.$router.push({path: 'rechargeList', query: this.form})
      }
    },
    formatDateTime (date) {
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    getCurrentMonthFirst (date) {
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    }
  },
  mounted () {

  }
}
</script>
<style scoped>
.fg{
    width: 100%;
    height: 50px;
    background-color: #f0f0f0;
}
.record-pat .Pay_c_btn {
    text-align: center;
}
.Pay_c_btn .mint-button {
    margin: .3125rem;
    width: 45%;
    height: 2.5625rem;
    text-align: center;
}
.Pay_c_btn, .return {
    text-align: center;
}
.mint-button--small {
    font-size: .875rem;
}
.mint-button--normal, .mint-button--small {
    display: inline-block;
    padding: 0 .75rem;
}
.mint-button--primary {
    color: #fff;
    background-color: #26a2ff;
}
.mint-button {
    appearance: none;
    border-radius: .25rem;
    border: 0;
    box-sizing: border-box;
    outline: 0;
    overflow: hidden;
    position: relative;
}
</style>
