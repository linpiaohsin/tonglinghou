<template>
  <div class="refundDetail">
    <div class="titleTop">
      订单管理--售后申请--详情
    </div>
    <div class="main2">
      <!-- 订单详情 -->
      <div class="detail">
      	<h4>订单号：{{clientData.orderNo}} <em></em></h4>
      	<!-- 订单详情 -->
      	<div class="describe">
      		<span class="oImg">
      			<img class="idImg" style="width: 400px" :src="clientData.picUrl">
      		</span>
      		<span>
      			<ul>
      				<li>产品类型：{{clientData. productTypeName}}-{{clientData.productTypeSubName}}</li>
      				<li>订单金额：<em>￥{{clientData.totalPrice}}元</em></li>
      				<li>交货日期：{{clientData.createTime}}</li>

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
							<li>{{clientData.address}}</li>
      				<li>联系人：{{clientData.receiver}}</li>
      				<li>电话：{{clientData.mobie}}</li>
      			</ul>
      		</span>
      	</div>
      </div>
      <!-- 退款详情 -->
      <div class="details">
				<div v-for="(item,index) in clientData.saleAfterApplyImg" :key="index">
          <img :src="item" alt="" style="width: 150px">
								 <!-- {{item}} -->
				</div>
        <ul>
					<!-- <li v-for="(item,index) in clientData.saleAfterApplyImg" :key="index">
							 	<img :src="item" alt="">
								 {{item}}
					</li> -->
          <li>售后类型：{{orderinfo.type}}</li>
          <li>售后说明：{{orderinfo.cause}}</li>
        </ul>
      </div>
      <button class="btn"  @click="addDialogVisable = true">处理</button>
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
          <button class="btn" @click="afterSale">保存</button>
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
		data() {
			return {
        addDialogVisable: false,
				clientData: {},
				orderinfo: [],
				form: {
					name: null,
					region: null
				},
        remark: ''
			}
		},
		mounted() {
			this.orderinfo = this.$route.params;
			this.getOrderByOrderNo();
		},
		methods: {
			getOrderByOrderNo() {
				let searchParam = {};
				searchParam.orderNo = this.orderinfo.orderNo;
				order.getOrderByOrderNo(searchParam).then(res => {
					if (res.code === 0) {
						this.clientData = res.data;
						this.clientData['saleAfterApplyImg'] = JSON.parse(res.data['saleAfterApplyImg']);
						// let imgArray = []
						// // StringArray = this.clientData.saleAfterApplyImg.slice()
						// let str = this.clientData.saleAfterApplyImg.length
						// for(let i=0;i<str.length;i++){
						// 	if(str.charAt(i)=='"'){

						// 	}
						// }
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			afterSale() {
				let searchParam = {};
        searchParam.agreeInfo  = this.remark
				searchParam.id = this.clientData.saleAfterApplyId;
				searchParam.status = 1;
				order.afterSale(searchParam).then(res => {
					if (res.code == 0) {
						this.$message.success('售后处理成功');
						this.$router.push('/Home/order/afterSale')
					} else {
						this.$message.error(res.msg);
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.refundDetail {
    // 退款申请
    .details{
      width: 500px;
      margin: 20px;
      background-color: #ffeeee;
      border: 1px solid #ccc;
      padding: 10px 20px;
      img{margin-right: 30px;}
      li{
        margin: 12px 0;
        color: #333;
      }
      li:first-child{
        margin-bottom: 20px;
      }
    }
    .btn{
      margin-left: 20px;
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

}
</style>
