<template>
    <div class="agency">
      <mt-header title="推荐代理商" fixed>
            <router-link to="/" slot="left">
                <!-- <mt-button icon="back">上一页</mt-button> -->
            </router-link>
            <mt-button  slot="right" @click="changeID">切换账号</mt-button>
        </mt-header>
        <div>
          <p class="fg"></p>
            <mt-field label="游戏ID：" placeholder="请输入游戏ID" type="text" v-model="form.playId"></mt-field>
            <mt-field label="手机号：" placeholder="请输入手机号" type="tel" v-model="form.phone"></mt-field>
            <mt-field label="微信号：" placeholder="请输入微信号" type="text" v-model="form.wechatNumber"></mt-field>
            <!-- <mt-field label="详细地址：" placeholder="请输入详细地址" type="" v-model="address"></mt-field> -->
            <!-- <mt-field label="代理商id:" placeholder="请输入代理商id" type="" v-model="form.id"></mt-field> -->
            <mt-field label="真实姓名：" placeholder="请输入真实姓名" type="text" v-model="form.realName"></mt-field>
            <mt-field label="银行卡：" placeholder="请输入银行卡" type="text" v-model="form.bankCardNumber"></mt-field>
            <mt-field label="开户行：" placeholder="请输入开户行" type="text" v-model="form.openingBank"></mt-field>
        </div>
        <div class="agency_list_btn">
            <div>
                <mt-button type="primary" class="btn" @click="recommend()">推荐</mt-button>
            </div>
        </div>
        <div>
            <h3 class="prompt">提示：</h3>
            <p class="p1">1.推荐他人成为代理商, 可以享受优惠活动;</p>
            <p class="p2">2.推荐信息发送成功后, 请等待客服审核;</p>
            <p class="p2">3.审核中的代理商还不是您的下级。</p>
        </div>
        <div class="childs">
            <div class="title">
                <span>我的下级代理商</span>
                <span style="float: right;">
                    <a href="javascript:void(0)" @click="moreInfo()">更多内容&gt;</a>
                </span>
            </div>
            <div class="chlist">
                <a class="mint-cell topTitle">
                    <div class="mint-cell-left"></div>
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text"></span>
                        </div>
                        <div class="mint-cell-value">
                            <span>代理商ID</span>
                            <span>手机号</span>
                            <span>注册时间</span>
                        </div>
                    </div>
                    <div class="mint-cell-right"></div>
                </a>
                <a class="mint-cell" v-for="item of agentData">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-value">
                            <span>{{item.id}}</span>
                            <span>{{item.phone}}</span>
                            <span>{{item.create_time}}</span>
                        </div>
                    </div>
                    <div class="mint-cell-right"></div>
                </a>
                <div class="details" v-if="isshow"><a href="javascript:void(0)" @click="getMore()">{{message}}</a></div>
            </div>
        </div>
    </div>
</template>
<script>
import { agent } from '@/api/index.js'
import { MessageBox, Toast } from 'mint-ui'
export default {
  data () {
    return {
      form: {
        agentName: '',
        bankCardNumber: '',
        id: '',
        openingBank: '',
        phone: '',
        playId: '',
        realName: '',
        wechatNumber: ''
      },
      agentData: {
        create_time: '',
        id: '',
        phone: ''
      },
      moreagentData: [],
      isshow: true,
      message: '详情请点击更多内容'
    }
  },
  methods: {
    recommend () {
      agent.saveCusAgent(this.form).then(res => {
        Toast(res.msg)
        this.onload()
      })
    },
    onload () {
      agent.getByAgent({id: this.form.id, size: 1}).then(res => {
        if (res.data.length === 0) {
          this.message = '没有数据'
        } else {
          if (res.data.length <= 4) {
            this.isshow = !this.isshow
          }
          this.agentData = res.data.slice(0, 4)
          this.moreagentData = res.data.slice(4, res.data.length)
        }
      })
    },
    moreInfo () {
      this.$router.push('/Comtainer/Morecontent')
    },
    changeID () {
      MessageBox.confirm('确认切换账号?').then(res => {
        // 跳转页面到
        this.$router.push('/')
        sessionStorage.removeItem('agentmsg')
        sessionStorage.removeItem('tabar')
      })
    },
    getMore () {
      if (this.moreagentData.length > 0) {
        this.agentData = this.agentData.concat(this.moreagentData)
        this.isshow = !this.isshow
      }
    }
  },
  mounted () {
    this.agentData = {}
    if (sessionStorage.getItem('agentmsg') === null) {
      this.$router.push('/')
    } else {
      this.form.id = JSON.parse(sessionStorage.getItem('agentmsg')).id
      this.onload()
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
.agency_list_btn {
  padding: .625rem .625rem;
}
.prompt {
   text-align: left;
   margin-top: .625rem;
   margin-bottom: .625rem;
   padding-left: .625rem
}
.p1 {
   padding-left: .625rem;
   font-size: .8125rem;
   text-align: left;
   color: rgb(146, 144, 144);
   line-height: 1.25rem;
   width: 92%;
}
.p2 {
    padding-left: .625rem;
    font-size: .8125rem;
    text-align: left;
    color: rgb(146, 144, 144);
    line-height: 1.25rem;
    width: 92%;
    left: .3125rem;
}
.details {
    text-align: center; padding-top: .3125rem; padding-bottom: 3.75rem;
    font-size: 1rem;
}
.details a{
    color: black;
}
.btn {
  width: 100%;
}
.childs {
  padding-top: 1.25rem;
  margin-bottom: 3rem
}
.childs .title {
  font-size: .9375rem;
  padding-bottom: .625rem;
}
.title {
  text-align: center;
  font-size: 1.875rem;
  margin-bottom: .625rem;
  margin-top: .625rem;
}

.title {
  font-size: 1.125rem;
  font-weight: 700;
  padding: 3%;
  background: #fff;
}
/* 代理商id， 手机号，注册时间表下的样式 */
.chlist {
  width: 100%;
  overflow: hidden;
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
  /* background-size: 120% .0625rem; */
  background-repeat: no-repeat;
  background-position: 0 0;
  background-origin: content-box;
  -ms-flex-align: center;
  align-items: center;
  box-sizing: border-box;
  display: -ms-flexbox;
  display: flex;
  /* font-size: 1rem; */
  line-height: 1;
  min-height: inherit;
  overflow: hidden;
  padding: 0rem .625rem;
  width: 100%;
}
.chlist .mint-cell .mint-cell-wrapper .mint-cell-title {
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
.chlist .mint-cell.topTitle .mint-cell-wrapper .mint-cell-value {
  font-weight: 700 !important;
}
.chlist .mint-cell .mint-cell-value {
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
.mint-cell-right {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  transform: translate3d(100%, 0, 0);
}
.chlist .mint-cell .mint-cell-value span {
  text-align: left;
  width: 33.333%;
  font-size: .875rem;
  display: block;
}
</style>
