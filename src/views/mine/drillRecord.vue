<template>
    <div class="record_buy" style="height: 75%;margin-bottom:3rem">
         <mt-header title="获钻记录" fixed>
            <router-link to="/Comtainer/My" slot="left">
                <mt-button icon="back">上一页</mt-button>
            </router-link>
            <mt-button  slot="right" @click="changeID">切换账号</mt-button>
        </mt-header>
        <div class="table">
          <p class="fg"></p>
            <a class="mint-cell topTitle">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text"></span>
                    </div>
                    <div class="mint-cell-value">
                        <span>时间</span>
                        <span>购买数量</span>
                        <span>获赠/返钻</span>
                        <span>售出(普/圈)</span>
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>
            <a class="mint-cell">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text"></span>
                    </div>
                    <div class="mint-cell-value">
                        <span>今天</span>
                        <span>{{form.currentDate.buy_room_cards}}</span>
                        <span>{{form.currentDate.card}}</span>
                        <span>{{form.currentDate.gift_room_cards}}</span>
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>
            <a class="mint-cell">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text"></span>
                    </div>
                    <div class="mint-cell-value">
                        <span>昨天</span>
                        <span>{{form.yesterdayData.buy_room_cards}}</span>
                        <span>{{form.yesterdayData.card}}</span>
                        <span>{{form.yesterdayData.gift_room_cards}}</span>
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>
            <a class="mint-cell">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text"></span>
                    </div>
                    <div class="mint-cell-value">
                        <span>上周</span>
                        <span>{{form.lastWeekData.buy_room_cards}}</span>
                        <span>{{form.lastWeekData.card}}</span>
                        <span>{{form.lastWeekData.gift_room_cards}}</span>
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>
        </div>
        <a class="mint-cell topTitle">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text"></span>
                    </div>
                    <div class="mint-cell-value">
                        <span>购买金额</span>
                        <span>房卡数量</span>
                        <span>赠送房卡</span>
                        <span>购买时间</span>
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>
        <a class="mint-cell" v-for="item of lastData">
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <span class="mint-cell-text"></span>
                </div>
                <div class="mint-cell-value">
                    <span>{{item.buy_money}}</span>
                    <span>{{item.buy_room_cards}}</span>
                    <span>{{item.gift_room_cards}}</span>
                    <span>{{item.create_time}}</span>
                </div>
            </div>
            <div class="mint-cell-right"></div>
        </a>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { mine } from '@/api/index.js'
export default {
  data () {
    return {
      startDate: new Date(),
      form: {
        currentDate: {
          buy_room_cards: 0,
          card: 0,
          gift_room_cards: 0
        },
        lastWeekData: {
          buy_room_cards: 0,
          card: 0,
          gift_room_cards: 0
        },
        yesterdayData: {
          buy_room_cards: 0,
          card: 0,
          gift_room_cards: 0
        }
      },
      lastData: []
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
    if (sessionStorage.getItem('agentmsg') === null) {
      this.$router.push('/')
    } else {
      let id = JSON.parse(sessionStorage.getItem('agentmsg')).id
      mine.topPath({agent_id: id}).then(res => {
        console.log(res)
        if (res.data[0] !== {}) {
          this.form.currentDate = res.data[0].currentDate
        }
        if (res.data[1] !== {}) {
          this.form.yesterdayData = res.data[1].yesterdayData
        }
        if (res.data[2] !== {}) {
          this.form.lastWeekData = res.data[2].lastWeekData
        }
      })
      mine.lastPath({agent_id: id}).then(res => {
        this.lastData = res.data
      })
    }
  }
}
</script>
<style scoped>
/* 灰线 */
.fg{
    width: 100%;
    height: 50px;
    background-color: #f0f0f0;
}
.record_buy {
  background: #fff;
  height: auto;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.record_buy .table {
  border-bottom: .125rem solid #26a2ff;
  margin-bottom: .625rem;

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

a {
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
.record_buy .mint-cell .mint-cell-wrapper .mint-cell-title {
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
.record_buy .mint-cell .mint-cell-value {
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
.record_buy .mint-cell .mint-cell-value span {
  text-align: center;
  width: 33.333%;
  font-size: .875rem;
  display: block;
}
.mint-cell-right {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
