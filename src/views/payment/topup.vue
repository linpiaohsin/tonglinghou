<template >
<div>
  <mt-header title="充值" fixed>
            <router-link to="/" slot="left">
                <!-- <mt-button icon="back">上一页</mt-button> -->
            </router-link>
            <mt-button  slot="right" @click="changeID">切换账号</mt-button>
        </mt-header>
      <p class=fg></p>
    <!-- <mt-navbar v-model="selected">
  <mt-tab-item id="ordinaryRecharge">普通充值</mt-tab-item>
  <mt-tab-item id="friendRechange" disabled>好友圈充值</mt-tab-item> -->
<!-- </mt-navbar> -->

<!-- tab-container -->

<mt-tab-container v-model="selected" style="margin-bottom:3rem">
  <mt-tab-container-item id="ordinaryRecharge" >
      <div class="amount">
          <div class="cardt">房卡数 : {{masonryNum}}</div>
      </div>
    <mt-field label="玩家ID：" placeholder="请输入玩家ID" v-model="id"></mt-field>
    <div style="padding:.625rem;">
        <mt-button type="primary" class="btn" @click="toCheck()" size="large">查询</mt-button>
    </div>
    <div style="text-align:center" v-if="isshow">
            <mt-cell-swipe title="历史充值记录">

            </mt-cell-swipe>
            <a class="mint-cell toplist" v-for="item of NewItems" @click="setId(item.player_id)">
              <div class="mint-cell-wrapper">
                <div class="mint-cell-title"></div>
                <div class="mint-cell-value">{{item.player_id}}</div>
              </div>
            </a>
            <!-- <mt-cell v-for="item of NewItems" @click="setId(item.id)" class="toplist">{{item.id}}</mt-cell> -->
    </div>
  </mt-tab-container-item>
</mt-tab-container>
</div>
</template>

<script>
import { pay, findAgentCard } from '@/api/index.js'
import { MessageBox, Toast } from 'mint-ui'
import { watch } from 'fs'
export default {
  data () {
    return {
      selected: 'ordinaryRecharge',
      id: '',
      agentid: '',
      tableData: [],
      masonryNum: '',
      isshow: true
    }
  },
  methods: {
    checkByID () {
      // 页面跳转
    },
    setId (id) {
      this.id = id
      this.isshow = !this.isshow
    },
    changeID () {
      MessageBox.confirm('确认切换账号?').then(res => {
        // 跳转页面到
        this.$router.push('/')
        sessionStorage.removeItem('agentmsg')
        sessionStorage.removeItem('tabar')
      })
    },
    toCheck () {
      // this.$router.push('Recharge')
      if (this.id === '') {
        Toast('请输入玩家ID')
      } else {
        if (sessionStorage.getItem('agentmsg') === null) {
          this.$router.push('/')
        } else {
          pay.isexit({id: this.id}).then(res => {
            if (res.code === 200) {
              this.$router.push({path: '/Comtainer/Recharge', query: res.data})
            } else {
              Toast(res.msg)
            }
          })
        }
      }
    },
    isNull: function () {
      if (this.id === '') {
        this.isshow = true
      }
    }
  },
  mounted () {
    // 代理商ID
    if (sessionStorage.getItem('agentmsg') === null) {
      this.$router.push('/')
    } else {
      let json = JSON.parse(sessionStorage.getItem('agentmsg'))
      this.agentid = json.id
      // this.masonryNum = json.card
      pay.player({agent_id: this.agentid}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
      findAgentCard({id: this.agentid}).then(res => {
        console.log(res)
        this.masonryNum = res.data.card
      })
    }
  },
  computed: {// 模糊查询
    NewItems () {
      var _this = this
      var NewItems = []
      this.tableData.map(function (item) {
        if (String(item.player_id).search(_this.id) !== -1) {
          NewItems.push(item)
        }
      })
      return NewItems
    }
  },
  watch: {
    'id': 'isNull'
  }
}
</script>
<style scoped>
.fg{
    width: 100%;
    height: 40px;
    background-color: #f0f0f0;

}
.amount{
    font-size: 1rem;
    text-align: left;

}
.cardt{
    color: #da5839;
    padding-top: 1.25rem;
    padding-left: 35%;

}
.mint-navbar .mint-tab-item{
  color: inherit
}

.toplist .mint-cell-value {
    flex: 1;
}
.mint-cell-value {
    vertical-align: middle;
}

</style>
