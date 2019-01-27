<template>
    <div>
        <mt-header title="行为规范" fixed>
            <router-link to="/Comtainer/My" slot="left">
                <mt-button icon="back">上一页</mt-button>
            </router-link>
            <mt-button  slot="right" @click="changeID">切换账号</mt-button>
        </mt-header>
        <p class="fg"></p>
        <div class="article">
            <div style="font-size: 1.125rem; text-align: center; padding: .625rem;">代理商行为规范</div>
            <div style="padding: .3125rem;">
                <pre></pre>
            </div>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      startDate: new Date()
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
    }
  },
  mounted () {

  }
}
</script>
<style scoped>
.fg{
    width: 100%;
    height: 40px;
    background-color: #f0f0f0;
}
.article {
    height: 35.625rem;
 
}

</style>
