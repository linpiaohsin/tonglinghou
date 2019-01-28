<template>
  <div class="orderDraftDetails">
    <div class="titleTop">
      订单管理-订单列表-详情
    </div>
    <div class="main3">
      <!-- 订单详情 -->
      <div class="detail">
        <h4>订单号：{{clientData.orderNo}} <em> </em></h4>
        <!-- 订单详情 -->
        <div class="describe">
          <div >
            <img
              class="idImg"
              :src= "clientData.picUrl"
            >
          </div>
          <span>
            <ul>
              <li>产品类型：{{clientData.productTypeName}}</li>
              <li>订单金额：<em>{{clientData.totalPrice}}</em></li>
              <li>表面处理：{{clientData.specialProcessInfo}}</li>
              <li>订单数量：{{clientData.orderNum}}</li>
              <li>订单总面积：{{clientData.totalArea}}</li>
            </ul>
          </span>
          <span>
            <ul>
              <li><h5></h5></li>
              <li>客户地址：{{clientData.receiverAddress}}</li>
              <li>联系人：{{clientData.totalArea}}</li>
              <li>电话：{{clientData.totalArea}}</li>
            </ul>
          </span>
        </div>
      </div>

<!--
     &lt;!&ndash; 产品类型 &ndash;&gt;
      <div class="goodType">
        <div class="g_type">
          <span>产品类型 </span>
          <img src="" alt="">
          <span class="img2">
            <img src="" alt="">
            <i></i>
          </span>
        </div>
        <div class="g_select">
            <span>灯光颜色
              <el-select v-model="form.region" placeholder="冷白">
                <el-option label="冷白" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </span>
            <span>字面颜色
              <el-select v-model="form.region" placeholder="冷白">
                <el-option label="冷白" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </span>
            <span>字边颜色
              <el-select v-model="form.region" placeholder="冷白">
                <el-option label="冷白" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </span>
            <span>固定方式
              <el-select v-model="form.region" placeholder="冷白">
                <el-option label="冷白" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </span>
            <span>是否淋雨
              <el-select v-model="form.region" placeholder="是">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </span>
            <span>生产日期
              <el-select v-model="form.region" placeholder="两天">
                <el-option label="两天" value="1"></el-option>
                <el-option label="三天" value="2"></el-option>
                <el-option label="四天" value="2"></el-option>
              </el-select>
            </span>
        </div>
      </div>
      <div class="tool">
        <button class="btn">下载cdr文件</button>
        <button class="btn" @click="examine">审核通过</button>
        <router-link :to="{name:'ChangePrice'}" class="btn">修改报价</router-link>
      </div>

      -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clientData: {},
      form: {
        name: null,
        region: null
      }
    }
  },

  mounted () {
    this.clientData = this.$route.params
    this.clientData['specialProcessInfo'] = JSON.parse(this.clientData['specialProcessInfo']).join(', ')
  },

  methods: {

    // 审核
    examine () {}
  }
}
</script>

<style lang="scss" scoped>
.orderDraftDetails {
  // 产品类型
  .goodType{
    .g_type{
      margin: 30px 10px;
      .img2{
        display: inline-block;
        width: 160px;
        height: 100px;
        line-height: 100px;
        background-color: #f2f2ee;
        margin-left: 30px;
        position: relative;
        i{
          position: absolute;
          left: -30px;
          top: 40px;
          border-width: 15px;
          border-style: solid;
          border-color: transparenT #f2f2ee transparent transparent;
        }
      }
    }
    .g_select{
      width: 1000px;
      background-color: #f2f2ee;
      display: flex;
      flex-wrap:wrap;
      justify-content: space-around;
      padding-bottom: 20px;
      margin-left: 10px;
      span{
        margin-top: 20px;
        .el-select{
          margin-left: 5px;
        }
      }
    }
  }
  // 操作
  .tool{
    position: absolute;
    bottom: 50px;
    left: 50px;
    .btn{
      margin: 0 20px;
    }
  }
  .idImg {
    width: 350px;
    height: 150px;
    left: 5px;
  }
}
</style>
