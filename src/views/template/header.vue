<template>
<!--     <header class="aui-bar aui-bar-nav header">
    <div class="aui-title">{{this.title}}</div>
    <a class="aui-pull-right aui-btn" @click="changeID">
        切换账号
    </a>
</header> -->
  <mt-header fixed :title="this.title">
  <mt-button slot="right" @click="changeID">切换账号</mt-button>
  </mt-header>

</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      title: '首页'
      // dialogVisible: false
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
  }
}
</script>
<style>
</style>
