<template>
    <div>
      <mt-header title="购买房卡" fixed>
            <router-link to="/" slot="left">
                <!-- <mt-button icon="back">上一页</mt-button> -->
            </router-link>
            <mt-button  slot="right" @click="changeID">切换账号</mt-button>
        </mt-header>

        <div class="number">
          <p class="fg"></p>
         <div style="margin-top: 1rem;">
           <img slot="icon" src="../../assets/images/drill.png" width="24" height="24">
            <span class="num">{{masonryNum}}</span>
         </div>

        </div>
        <mt-radio align="right" v-model="value" :options="options" @change="check"></mt-radio>
        <div class="Pay_c_btn">
            <button class="mint-button plank_btn mint-button--primary mint-button--small" @click="payTo">
                <label class="mint-button-text">支付宝</label>
            </button>
        </div>
        <div>
            <h3 class="prompt">提示：</h3>
            <p class="p1">1.您必须拥有支付账户;</p>
            <p class="p2">2.请充值前务必确认好您的充值金额，准确无误后再进行充值。如果因未仔细确认金额造成的充值问题，我们将一律不予处理此类退款申述。</p>
        </div>

        <form action="http://pay.ebkf.net" method="POST" id="postform">
          <input type="hidden" name="uid" :value="parseInt(postTopay.uid)">
          <input type="hidden" name="goodsname" :value="postTopay.goodsname">
          <input type="hidden" name="price" :value="parseFloat(postTopay.price)">
          <input type="hidden" name="istype" :value="parseInt(postTopay.istype)">
          <input type="hidden" name="notify_url" :value="postTopay.notify_url">
          <input type="hidden" name="return_url" :value="postTopay.return_url">
          <input type="hidden" name="orderid" :value="postTopay.orderid">
          <input type="hidden" name="orderuid" :value="postTopay.orderuid">
          <input type="hidden" name="key" :value="postTopay.key">
        </form>
    </div>
</template>
<script>
import { bill, findAgentCard } from '@/api/index.js'
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
    if (sessionStorage.getItem('agentmsg') === null) {
      this.$router.push('/')
    } else {
      let jsons = JSON.parse(sessionStorage.getItem('agentmsg'))
      this.masonryNum = jsons.card
      bill.buyBill({}).then(res => {
        this.dataTable = res.data
        res.data.forEach(item => {
          let option = {label: '', value: ''}
          option.label = '获得 ' + item.num + ' + ' + item.send_num + ' 颗钻, 价格 ' + item.price + ' 元'
          option.value = item.id.toString()
          this.options.push(option)
        })
        // this.value = this.options[0].value
        console.log(this.options)
      })
      findAgentCard({id: jsons.id}).then(res => {
        this.masonryNum = res.data.card
      })
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
    postpay () {
      console.log(document.getElementById('postform'))
      document.getElementById('postform').submit()
    },
    check () {
      console.log(this, this._data.value)
    },
    payTo () {
      // this.postpay()
      this.$router.push('qrCode')
    }
  },
  watch: {
    value (val) {
      console.log(val)
      this.$set(this.paymentInfo, 'agentId', JSON.parse(sessionStorage.getItem('agentmsg')).id)
      this.$set(this.paymentInfo, 'istype', 1)
      this.dataTable.forEach(item => {
        if (item.id == val) {
          this.$set(this.paymentInfo, 'cardId', item.id)
          this.$set(this.paymentInfo, 'price', item.price)
        }
      })
      bill.payTo(this.paymentInfo).then(res => {
        this.postTopay = res.data
        this.postTopay.price = 0.01
        console.log(this.postTopay.price)
        // 跳转
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
.number {
  /* margin-top: 2.5rem; */
  text-align: center;
}
.number img {
  vertical-align: middle;
  display: inline-block;
  float: none;
}
.mint-radiolist-label {
    display: block;
    padding: 0;
}
img {
  border: 0;
}
.number .num {
  font-size: 1.125rem;
  text-align: left;
}
.Pay_c_btn,
.return {
  text-align: center;
}
.Pay_c_btn .mint-button {
  margin: .3125rem;
  width: 45%;
  height: 2.5625rem;
  text-align: center;
  /* font-size: 1.125rem; */
}
.mint-button--normal,
.mint-button--small {
  display: inline-block;
  padding: 0 .75rem;
}
.prompt {
  text-align: left;
  margin-top: .625rem;
  margin-bottom: .625rem;
  padding-left: .625rem;
  font-size: 1rem;
}
.p1,
.p2 {
  padding-left: .625rem;
  font-size: .8125rem;
  text-align: left;
  color: rgb(146, 144, 144);
  line-height: 1.25rem;
  width: 92%;
}
.p2 {
  left: .3125rem;
}

</style>
