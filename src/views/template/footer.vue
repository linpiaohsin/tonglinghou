<template>
   <!--  <footer class="footer">
        <div style="display: flex;flex-direction: row; justify-content:center;width: 100%">
    <a class="mint-tab-item" @click="changePage(1)">首页</a>
    <a class="mint-tab-item" @click="changePage(1)">充值</a>
    <a class="mint-tab-item" @click="changePage(1)">代理商</a>
    <a class="mint-tab-item" @click="changePage(1)">买钻</a>
    <a class="mint-tab-item" @click="changePage(1)">我的</a>
</div>
    </footer> -->
        <mt-tabbar v-model="selected" class="footer">
  <mt-tab-item id="homePage">
    <img slot="icon" src="../../assets/images/footer1.png" >
    首页
  </mt-tab-item>
  <mt-tab-item id="payment">
    <img slot="icon" src="../../assets/images/footer2.png">
    充值
  </mt-tab-item>
  <mt-tab-item id="agent">
    <img slot="icon" src="../../assets/images/footer3.png">
    代理商
  </mt-tab-item>
  <mt-tab-item id="buyDia">
    <img slot="icon" src="../../assets/images/footer4.png">
    房卡
  </mt-tab-item>
  <mt-tab-item id="mine">
    <img slot="icon" src="../../assets/images/footer5.png">
    我的
  </mt-tab-item>
</mt-tabbar>

</template>

<script>
export default {
  data () {
    return {
      title: '首页',
      selected: 'payment'
    }
  },
  watch: {
    selected: function (val, oldVal) {
      sessionStorage.setItem('tabar', val)
      // 这里就可以通过 val 的值变更来确定
      switch (val) {
        case 'homePage':
          this.$router.push('/Comtainer/HomePage')
          break
        case 'payment':
          this.$router.push('/Comtainer/Topup')
          break
        case 'agent':
          this.$router.push('/Comtainer/Agent')
          break
        case 'buyDia':
          this.$router.push('/Comtainer/Buydrill')
          break
        case 'mine':
          this.$router.push('/Comtainer/My')
          break
      }
    }
  },
  methods: {
    changePage (index) {
      console.log(index)
    }
  },
  mounted () {
    if (sessionStorage.getItem('tabar') !== null) {
      this.selected = sessionStorage.getItem('tabar')
    }
  }
}
</script>

<style>
/* .footer {
    background-color: #26a2ff
  }
  a.mint-tab-item{
      text-align:center;
      display: inline-block;
      width: 20%;
      color: white;
      font-size: 0.5rem;
  }
  .mint-tab-item-icon{
    width: 1rem;
    height: 1rem;
        margin: 0 auto .125rem;
  }
 .mint-tabbar > .mint-tab-item.is-selected{
    background-color:#256392!important
  } */

.footer {
    background-color: #26a2ff!important;
  }
  a.mint-tab-item{
      text-align:center;
      display: inline-block;
      width: 20%;
      color: white;
      font-size: 0.5rem;
  }
  .mint-tab-item-icon{
    width: 16px;
    height: 16px;
    margin: 0 auto .125rem;
  }
 .mint-tabbar > .mint-tab-item.is-selected{
    background-color:#256392!important;
    /* 新增 */
    color:white;
  }
</style>
