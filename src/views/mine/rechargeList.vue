
<template>
    <div>
        <mt-header title="充值记录" fixed>
            <router-link to="rechargeRecord" slot="left">
                <mt-button icon="back">上一页</mt-button>
            </router-link>
            <mt-button  slot="right">切换账号</mt-button>
        </mt-header>
        <p class="fg"></p>
        <div class="tableArea" style="width:100%">
            <div class="record_buy">

                <div class="table">
                    <a class="mint-cell topTitle">
                        <div class="mint-cell-left"></div>
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text"></span>
                            </div>
                            <div class="mint-cell-value">
                                <span>代理商ID</span>
                                <span>购买数量</span>
                                <span>购买时间</span>
                            </div>
                        </div>
                        <div class="mint-cell-right"></div>
                    </a>

                    <a class="mint-cell"  v-for='item in rechargeList' :key="item.id">
                        <div class="mint-cell-left"></div>
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text"></span>
                            </div>
                            <div class="mint-cell-value">
                                <span>{{item.id}}</span>
                                <span>{{item.card}}</span>
                                <span>{{item.times}}</span>
                            </div>
                        </div>
                        <div class="mint-cell-right"></div>
                    </a>

                </div>

            </div>

        </div>

    </div>

</template>

<script>
import { Toast } from 'mint-ui'
import { mine } from '@/api/index.js'
export default {

  data () {
    return {
      rechargeList: []
    }
  },
  methods: {

  },
  mounted () {
    mine.myAgentRecord(this.$route.query).then(res => {
      console.log(res)
      if (res.code === 200) {
        this.rechargeList = res.data
      } else {
        Toast(res.msg)
      }
    })
  }
}

</script>

<style lang='stylus' scoped>
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
  width: 30%;
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
