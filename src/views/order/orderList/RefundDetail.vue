<template>
	<div class="refundDetail">
		<div class="titleTop">
			订单管理--退款申请--详情
		</div>
		<div class="main2">
			<!-- 订单详情 -->
			<div class="detail">
				<h4>订单号：{{clientData.orderNo}} <em></em></h4>
				<!-- 订单详情 -->
				<div class="describe">
					<span class="oImg">
						<img class="idImg" :src="clientData.picUrl">
					</span>
					<span>
						<ul>
							<li>产品类型：{{clientData.productTypeSubName}}</li>
							<li>订单金额：<em>￥{{clientData.totalPrice}}元</em></li>
							<!--<li>交货日期：{{clientData.deliveryDate}}</li>-->
							<li>表面处理：{{clientData.specialProcessInfo}}</li>
							<li>订单数量：{{clientData.orderNum}}</li>
							<li>订单总面积：{{clientData.totalArea}}</li>
						</ul>
					</span>
					<span>
						<ul>
							<li>
								<h5>客户信息</h5>
							</li>
							<li>客户名称：{{clientData.enterpriseName}}</li>
							<li>客户地址：{{clientData.receiverAddress}}</li>
							<li>	{{clientData.address}}</li>
							<li>联系人：{{clientData.receiver}}</li>
							<li>电话：{{clientData.mobie}}</li>
						</ul>
					</span>
				</div>
			</div>
			<!-- 退款详情 -->
			<div class="details">
				<ul>
					<li class="goodType">
            <template v-for="item in clientData.refundApplyImg">
              <img :src="item" style="width: 150px" alt=""/>
            </template>
          </li>
					<el-row>
							<el-col :span='12'>申请退款：<span class="font">{{orderinfo.money}}元</span></el-col>
							<el-col :span="12">申请原因：<span class="font">{{orderinfo.type}}</span></el-col>
					</el-row>
					<el-row>
							<el-col :span='12'>申请类型：<span class="font">{{orderinfo.type}}</span></el-col>
							<el-col :span="12">退款理由：<span class="font">{{orderinfo.reasonDetail}}</span></el-col>
					</el-row>
				</ul>
			</div>

			<button class="btn" @click="saveMessage">退款</button>
		</div>

		 <div class="dialog">
      <el-dialog
        title="请输入备注信息："
        :visible.sync="addDialogVisable"
        width="500px"
        center
      >
        <el-form
          label-width="150px"
        >
          <el-form-item label="备注">
            <el-input  v-model="remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <button class="btn" @click="gotoFund">保存</button>
        </div>
   	 </el-dialog>
    </div>

	</div>
</template>

<script>
import {
  order
} from '@/api/index.js'

export default {
  data () {
    return {
			remark:'',
			addDialogVisable:false,
      clientData: {},
      orderinfo: [],
      form: {
        name: null,
        region: null
      }
    }
  },
  mounted () {
    this.orderinfo = this.$route.query
    this.getOrderByOrderNo()
  },
  methods: {
		//保存备注信息
		saveMessage(){
      this.addDialogVisable = true
		},
    getOrderByOrderNo () {
      let searchParam = {}
	  	searchParam.orderNo = this.orderinfo.orderNo
      order.getOrderByOrderNo(searchParam).then(res => {
        if (res.code === 0) {
          this.clientData = res.data
          this.clientData.refundApplyImg = JSON.parse(res.data.refundApplyImg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    gotoFund () {
			this.clientData.agreeInfo  = this.remark
			// order.orderUpdatePrice(this.clientData)
			this.saveMessage()
      let searchParam = {}
      searchParam.id = this.orderinfo.raId
      searchParam.status = '1'
      searchParam.agreeInfo = this.remark
      order.refundMoney(searchParam).then(res => {
        if (res.code === 0) {
					this.$message.success('退款成功')
					setTimeout(()=>{
							this.$router.push({name:'Refund'})
					},0.5*1000)
        } else {
          this.$message.error(res.msg)
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
	.refundDetail {

		// 退款申请
		.details {
			width: 500px;
			margin: 20px;
			background-color: #ffeeee;
			border: 1px solid #ccc;
			padding: 10px 20px;
			.font{
				font-size: 20px;
			}
			img {
				margin-right: 30px;
			}

			li {
				margin: 12px 0;
				color: #333;
			}

			li:first-child {
				margin-bottom: 20px;
			}
		}

		.goodType {
			img {
				margin-left: 20px;
				width: 88px;
			}

			.img2 {
				display: inline-block;
				width: 160px;
				height: 100px;
				line-height: 100px;
				background-color: #f2f2ee;
				margin-left: 30px;
				position: relative;
			}
		}

		.btn {
			margin-left: 20px;
		}

		.idImg {
			width: 350px;
			height: 150px;
			left: 5px;
		}
	}
</style>
