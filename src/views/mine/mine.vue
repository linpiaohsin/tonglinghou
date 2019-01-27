<template>

    <div>
        <mt-header title="我的" fixed>
            <router-link to="/" slot="left">
                <!-- <mt-button icon="back">上一页</mt-button> -->
            </router-link>
            <mt-button  slot="right" @click="changeID">切换账号</mt-button>
        </mt-header>
        <div class="cell">
            <p class="fg"></p>
             <mt-cell title="充值记录" to="Comtainer/rechargeRecord" is-link>
            <img slot="icon" src="../../assets/images/my1.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="获钻记录" to="Comtainer/drillRecord" is-link>
            <img slot="icon" src="../../assets/images/my2.png" width="24" height="24">
        </mt-cell>
        <!-- <mt-cell title="创建好友圈" to="Comtainer/createFriends" is-link>
            <img slot="icon" src="../../assets/images/my3.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="我的好友圈" to="" is-link>
            <img slot="icon" src="../../assets/images/my4.png" width="24" height="24">
        </mt-cell> -->
        <mt-cell title="合作协议" to="Comtainer/Agreement" is-link>
            <img slot="icon" src="../../assets/images/my5.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="行为规范" to="Comtainer/Specification" is-link>
            <img slot="icon" src="../../assets/images/my6.png" width="24" height="24">
        </mt-cell>
        <p data-v-9f797e1c="" class="fg"></p>
        <mt-cell title="个人信息" to="Comtainer/Personal" is-link value="修改用户名密码">
            <img slot="icon" src="../../assets/images/my7.png" width="24" height="24">
        </mt-cell>
        <p data-v-9f797e1c="" class="fg"></p>
        <mt-cell title="实名认证" to="Comtainer/Identify" is-link v-model="status" v-if="!isShow">
            <img slot="icon" src="../../assets/images/my8.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="实名认证" v-model="status" v-if="isShow">
            <img slot="icon" src="../../assets/images/my8.png" width="24" height="24">
        </mt-cell>
        <a class="mint-cell" @click="quit">
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <img data-v-14f7c465="" src="../../assets/images/my9.png" width="24" height="24">
                    <span class="mint-cell-text">退出登录</span>
                </div>
                <i class="mint-cell-allow-right"></i>
            </div>
        </a>
        </div>

    </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { mine } from '@/api/index.js'
export default {
  data () {
    return {
      options: [],
      masonryNum: '',
      status: '',
      state: ['未认证', '审核通过', '审核未通过', '审核中'], // 0 表示还在审核 1 表示审核通过 2 表示审核未通过 3审核中
      isShow: true
    }
  },
  mounted () {
    if (sessionStorage.getItem('agentmsg') === null) {
      this.$router.push('/')
    } else {
      let id = JSON.parse(sessionStorage.getItem('agentmsg')).id
      console.log(id)
      mine.certifiCationStatus({agent_id: id}).then(res => {
        console.log(res)
        this.status = this.state[res.data.isStatus]
        if (res.data.isStatus !== 0 && res.data.isStatus !== 1) {
          this.isShow = false
        }
      })
    }
  },
  methods: {
    changeID (id) {
      MessageBox.confirm('确认切换账号?').then(res => {
        // 跳转页面到
        this.$router.push('/')
        sessionStorage.removeItem('agentmsg')
        sessionStorage.removeItem('tabar')
      })
    },
    quit () {
      MessageBox.confirm('是否退出登录?').then(res => {
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
.fg{
    width: 100%;
    height: 50px;
    background-color: #f0f0f0;
}
img {
    vertical-align: middle;
    display: inline-block;
}
.fg[data-v-9f797e1c] {
    width: 100%;
    height: .625rem;
    background-color: #f0f0f0;
}
</style>
