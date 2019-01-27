<template>
<div>
    <mt-header title="扫码加客服" fixed>
            <router-link to="/Comtainer/Buydrill" slot="left">
                <mt-button icon="back">上一页</mt-button>
            </router-link>
            <mt-button  slot="right" @click="changeID">切换账号</mt-button>
        </mt-header>
        <div class="code">
            <!-- <img src="../../assets/images/erweima.png" alt=""> -->
            <p>请联系客服</p>
        </div>
</div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      options: [],
      masonryNum: '',
      value: '',
      dataTable: {},
      paymentInfo: {},
      postTopay: {}
    }
  },
  mounted () {
  },
  methods: {
    changeID () {
      MessageBox.confirm('确认切换账号?').then(res => {
        // 跳转页面到
        this.$router.push('/')
        sessionStorage.removeItem('agentmsg')
        sessionStorage.removeItem('tabar')
      })
    }
  }
}
</script>
<style scoped>
.code{
    margin:12rem auto
}
.code img{
    margin: 0 auto
}
.code p{
    width: 100%;
    text-align: center;
    margin: 0 auto;
    font-size: 4rem;
}
</style>
