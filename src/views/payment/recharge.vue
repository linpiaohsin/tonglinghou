<template>
    <div>
        <div class="recharge">
            <mt-header title="普通充值" fixed>
            <router-link to="/Comtainer/Topup" slot="left">
                <mt-button icon="back">上一页</mt-button>
            </router-link>
            <mt-button  slot="right" @click="changeID">切换账号</mt-button>
        </mt-header>
        <p class="fg"></p>
            <!-- <div style="height: 50px; opacity: 0;"></div> -->
            <div class="amount">
                <div class="card">房卡数 : {{masonryNum}}</div>
            </div>
            <div class="container">
                <div class="left">
                    <a class="mint-cell comPay">
                        <div class="mint-cell-left"></div>
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text"></span>
                            </div>
                            <div class="mint-cell-value">
                                <span>玩&nbsp;&nbsp;家&nbsp;&nbsp;ID：</span>
                                <span>{{form.id}}</span>
                            </div>
                        </div>
                        <div class="mint-cell-right"></div>
                    </a>
                    <a class="mint-cell comPay">
                        <div class="mint-cell-left"></div>
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text"></span>
                            </div>
                            <div class="mint-cell-value">
                                <span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                                <span>{{form.nickname}}</span>
                            </div>
                        </div>
                        <div class="mint-cell-right"></div>
                    </a>
                    <a class="mint-cell comPay">
                        <div class="mint-cell-left"></div>
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text"></span>
                            </div>
                            <div class="mint-cell-value">
                                <span>剩余房卡 ：</span>
                                <span>{{form.card}}</span>
                            </div>
                        </div>
                        <div class="mint-cell-right"></div>
                    </a>
                </div>
                <div class="right">
                    <img
                        :src="form.head"
                        class="headImg"
                    >
                </div>
            </div>
            <div>
                <mt-field label="充值数量" placeholder="请输入充值数量" type="number" v-model="saveParmas.card"></mt-field>
            </div>
            <div class="btn" style="padding: .625rem;" id="btn">
                <mt-button size="large" type="primary" @click="handleButtonClick">普通充值</mt-button>
            </div>
            <div class="toplog">
                <a class="mint-cell topTitle">
                    <div class="mint-cell-left"></div>
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text"></span>
                        </div>
                        <div class="mint-cell-value">
                            <span>充值数量</span>
                            <span>充值时间</span>
                        </div>
                    </div>
                    <div class="mint-cell-right"></div>
                </a>
                <a class="mint-cell" v-for="item of dataTable">
                    <div class="mint-cell-left"></div>
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text"></span>
                        </div>
                        <div class="mint-cell-value">
                            <span>{{item.card}}</span>
                            <span>{{item.times}}</span>
                        </div>
                    </div>
                    <div class="mint-cell-right"></div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
import { pay, findAgentCard } from '@/api/index.js'
export default {
  data () {
    return {
      form: {
        card: 0,
        head: '',
        id: 0,
        nickname: ''
      },
      dataTable: {},
      parmas: {
        agent_id: '',
        player_id: ''
      },
      saveParmas: {
        agent_id: '',
        card: '',
        player_id: ''
      },
      masonryNum: ''
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
    handleButtonClick () {
      if (sessionStorage.getItem('agentmsg') === null) {
        this.$router.push('/')
      } else {
        let jsons = JSON.parse(sessionStorage.getItem('agentmsg'))
        this.saveParmas.agent_id = jsons.id
        this.saveParmas.player_id = this.$route.query.id
        pay.addAgentCards(this.saveParmas).then(res => {
          if (res.code === 200) {
            Toast(res.msg)
            findAgentCard({id: this.saveParmas.agent_id}).then(res => {
              this.masonryNum = res.data.card
            })
          } else {
            Toast(res.msg)
          }
        })
      }
    }

  },
  mounted () {
    this.form = this.$route.query
    this.parmas.player_id = this.$route.query.id
    // 获取历史充值记录
    if (sessionStorage.getItem('agentmsg') === null) {
      this.$router.push('/')
    } else {
      let jsons = JSON.parse(sessionStorage.getItem('agentmsg'))
      this.parmas.agent_id = jsons.id
      pay.findPlayer(this.parmas).then(res => {
        this.dataTable = res.data
      })
      findAgentCard({id: this.parmas.agent_id}).then(res => {
        this.masonryNum = res.data.card
      })
    }
  }
}

</script>
<style scoped>
.fg{
    width: 100%;
    height: 40px;
    background-color: #f0f0f0;
}
.recharge {
  text-align: center;
}
.amount {
  font-size: .9375rem;
}
.amount .card {
  color: #da5839;
  padding-top: .3125rem;
  padding-left: .375rem;
  padding-right: .375rem;
}

.amount .card {
  padding-top: 1.25rem;
}
.recharge .container {
  padding-top: .625rem;
  height: 9.1875rem;
}
.recharge .left,
.recharge .right {
  height: 100%;
  background-color: #fff;
}

.recharge .left {
  width: 60%;
  float: left;
  /* text-align: left; */
}
.mint-cell {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  min-height: 3rem;
  display: block;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}
.mint-cell-left {
  position: absolute;
  height: 100%;
  left: 0;
  transform: translate3d(-100%, 0, 0);
}
.mint-cell:first-child .mint-cell-wrapper {
  background-origin: border-box;
}

.mint-cell-wrapper {
  background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 0
  );
  background-size: 120% .0625rem;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-origin: content-box;
  -ms-flex-align: center;
  align-items: center;
  box-sizing: border-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 1rem;
  line-height: 1;
  min-height: inherit;
  overflow: hidden;
  padding: 0 .625rem;
  width: 100%;
}
.mint-cell.cluePay .mint-cell-wrapper .mint-cell-title,
.mint-cell.comPay .mint-cell-wrapper .mint-cell-title {
  -ms-flex: none;
  flex: none;
}
.toplog .mint-cell .mint-cell-wrapper .mint-cell-title {
    -ms-flex: 0;
    flex: 0;
    text-align: center;
}

.mint-cell-title {
  -ms-flex: 1;
  flex: 1;
}

.mint-cell-text {
  vertical-align: middle;
}
.mint-cell-right {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  transform: translate3d(100%, 0, 0);
}
.recharge .right {
  margin-left: 15%;
}

.recharge .left,
.recharge .right {
  height: 100%;
  background-color: #fff;
}
.recharge .right .headImg {
  margin-top: .625rem;
  width: 5.9375rem;
  border: thin solid #000;
}
.toplog {
    width: 100%;
    overflow: hidden;
}
.toplog .mint-cell.topTitle .mint-cell-wrapper .mint-cell-value {
    font-weight: 700!important;
}

.toplog .mint-cell .mint-cell-value {
    -ms-flex: 1;
    flex: 1;
}
.mint-cell-value {
    color: #888;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}
.toplog .mint-cell .mint-cell-value span {
    text-align: center;
    width: 40%;
    font-size: .875rem;
    display: block;
}

</style>
