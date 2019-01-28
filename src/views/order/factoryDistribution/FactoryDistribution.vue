<template>
   <div class="factoryDistribution">
		<div class="titleTop">
			订单管理-分配工厂
		</div>
		<div class="main2">
			<!-- 订单详情 -->
			<div class="detail">
				<h4>订单号：{{clientData.orderNo}} </h4>
				<!-- 订单详情 -->
				<div class="describe">
					<span class="oImg">
						<img :src="clientData.picUrl" alt="" width="100%">
					</span>
					<span>
						<ul>
							<li>产品类型：{{clientData.productTypeName}}</li>
							<li>订单金额：<em>￥{{clientData.totalPrice}}元</em></li>
							<li>交货日期：{{clientData.totalPrice}}</li>
							<li>表面处理：{{clientData.totalPrice}}</li>
							<li>订单数量：{{clientData.orderNum}}套</li>
							<li>订单总面积：{{clientData.totalArea}}㎡</li>
						</ul>
					</span>
					<span>
						<ul>
							<li>
								<h5>客户信息</h5>
							</li>
							<li>客户名称：{{clientData.enterpriseName}}</li>
							<li>客户地址：{{clientData.address}}</li>
							<li>联系人：{{clientData.legalName}}</li>
							<li>电话：{{clientData.address}}</li>
						</ul>
					</span>
				</div>
        <div>
          <el-row>
            <el-col :span="12" :offset="12"><em>{{clientData.orderStatus | statusFilters}}</em></el-col>
          </el-row>

        </div>
			</div>
			<!-- 修改 -->
			<div class="change">
				<span>分配工厂&nbsp;&nbsp;
					<el-select v-model="factoryModel" placeholder="请选择">
						<el-option v-for="item in factoryList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</span>
				<p><button class="btnMin" @click="submitToFactory">确定</button></p>
			</div>
		</div>
	</div>
</template>

<script>
import {
  factory
} from '@/api/index.js'
import {
  order
} from '@/api/index.js'
export default {
  filters: {
    statusFilters: function (value) {
      if (value === 0) {
        return '审核中'
      } else if (value === 1) {
        return '未支付'
      } else if (value === 2) {
        return '下单成功'
      } else if (value === 3) {
        return '生成中'
      } else if (value === 4) {
        return '已发货'
      } else if (value === 5) {
        return '完成收货'
      } else if (value === 6) {
        return '订单完成'
      }
    }
  },
  data () {
    return {
      param: {},
      clientData: {},
      factoryList: [],
      factoryModel: ''
    }
  },
  mounted () {
    this.clientData = this.$route.query
    console.log(this.clientData)
    this.getFactoryList()
  },
  methods: {
    getFactoryList () {
      console.log(this.query)
      factory.factoryList(this.query).then(res => {
        if (res.code === 0) {
          this.factoryList = res.data
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    submitToFactory () {
      if (this.factoryModel === '') {
        this.$message.error('请选择工厂！')
        return
      }
      this.param.orderNo = this.clientData.orderNo
      console.log('--->>>', this.clientData)
      // this.param.orderStatus = this.clientData.orderStatus;
      this.param.factoryId = this.factoryModel
      for (var i = 0; i < this.factoryList.length; i++) {
        if (this.factoryList[i].id == this.param.factoryId) {
          this.param.factoryName = this.factoryList[i].name
          break
        }
      }
      order.orderUpdFactory(this.param).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
      setTimeout(() => {
        this.$router.push({name: 'FactoryDistributionList'})
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
	.factoryDistribution {
		.change {
			margin: 30px;

			p {
				margin-top: 60px;
			}
		}
	}
</style>
