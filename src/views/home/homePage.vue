
<template>
  <div class="content">
    <mt-header style="z-index:2;" title="首页" fixed >
      <router-link to="/" slot="left">
        <!-- <mt-button icon="back">上一页</mt-button> -->
      </router-link>
      <mt-button slot="right" @click="changeID">切换账号</mt-button>
    </mt-header>
   <p class="fg"></p>
   <div style="padding:.3125rem;">
     <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide>
        <img src="../../assets/images/1.jpg" style="width:100%;">
      </swiper-slide>
      <swiper-slide>
        <img src="../../assets/images/1.jpg" style="width:100%;">
      </swiper-slide>
      <!-- <swiper-slide> <img src="../../assets/images/1.jpg" style="width:100%;"></swiper-slide> -->
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
   </div>

      <div class="content-text">根据我国相关法律法规和有关规定，特此严正声明：
      <br>
      <br>本游戏仅供休闲娱乐充实闲暇时光，不得用作任何非法用途，各位代理商及玩家务必严格遵守法律法规和相关规定，共同营造良好健康的游戏环境。
      <br>欢迎广大代理商互相监督！
      <br>
      <br><h1 style="text-align:center">春节活动</h1>
      <br>
      <table border="1">
        <tr>
          <th>套餐</th>
          <th>充值数量</th>
          <th>单价</th>
          <th>平台单价</th>
          <th style="color:red">活动价</th>
        </tr>
        <tr>
          <td>套餐一</td>
          <td>500房卡</td>
          <td>2元/张</td>
          <td rowspan =3>3元/张</td>
          <td>1元/张</td>
        </tr>
        <tr>
          <td>套餐二</td>
          <td>1000房卡</td>
          <td>1.8元/张</td>
          <td>0.9元/张</td>
        </tr>
        <tr>
          <td>套餐三</td>
          <td>2000房卡</td>
          <td>1.5元/张</td>
          <td>0.75元/张</td>
        </tr>
      </table>
      <br>代理商可享受购买量的30%赠送钻石。
      <br>公司对乱价行为零容忍，欢迎广大代理共同监督举报，切勿挑战规则红线！潮娱公司将会及时处理乱价行为，并对存在争议的问题有最终解释权。
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        slidesPeView: 1
      }
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

<style scoped>
.fg{
    width: 100%;
    height: 40px;
    background-color: #f0f0f0;

}
.content-text{
      font-size: .9375rem;
      padding: .3125rem;
}
.content {
  word-wrap: break-word;
  text-align: left;
  margin-bottom: 3rem;
  /* padding: .3125rem; */
}

/* 轮播小圆点 */
.swiper-pagination-bullet-active {
  background: #bebebe;
  opacity: 0.3;
}
/* 虚线 */
.Dotted-linebox {
  margin-top: 0.625rem;
}
.Dotted-line {
  width: 100%;
  height: 0;
  border-top: 0.0625rem black dashed;
}
/* 双虚线 */
.Double-dotted-line {
  width: 100%;
  max-height: 2.5rem;
  overflow: hidden;
}
table{
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  border-collapse: collapse;
}
table th{
  width: 20%
}
table td{
  width: 20%
}
table td:last-child{
  color: red
}
</style>
