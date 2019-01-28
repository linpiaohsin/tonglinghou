<template>
	<div class="evaluateDetail">
		<div class="titleTop">
			订单管理-评价管理-详情
		</div>
		<div class="main2">
			<!-- 订单详情 -->
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
							<li>产品类型：{{clientData.productTypeName}}-{{clientData.productTypeSubName}}</li>
							<li>订单金额：<em>￥{{clientData.totalPrice}}元</em></li>
							<li>下单时间：{{clientData.createTime}}</li>

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
			<!-- 评分 -->
			<div class="grade">
				<ul>
					<li><span>质量评分</span>
						<!--qualityEvaluate-->
						<!--value3-->
						<el-rate v-model="clientData.qualityEvaluate" disabled disabled-void-color="#888">
						</el-rate>
					</li>
					<li><span>工期评分</span> <!-- spellTimeEvaluate -->
						<el-rate v-model="clientData.spellTimeEvaluate" disabled disabled-void-color="#888">
						</el-rate>
					</li>
					<li><span>物流评分</span>
						<!--logisticEvaluate-->
						<el-rate v-model="clientData.logisticEvaluate" disabled disabled-void-color="#888">
						</el-rate>
					</li>
					<li><span>服务评分</span> <!-- serviceEvaluate -->
						<el-rate v-model="clientData.serviceEvaluate" disabled disabled-void-color="#888">
						</el-rate>
					</li>
					<li><span>评价详情 :</span> {{clientData.detail}}</li>
					<li><span>用户：{{clientData.receiver}}</span><span>时间：{{clientData.updateTime}}</span></li>
				</ul>
			</div>
		</div>
		<!-- 备注信息 -->
		<!--      <div class="remarks">
         <span>备注信息</span>
          <el-input type="textarea"></el-input>
        <button class="btnMin">确定</button>
      </div>-->

	</div>

</template>

<script>
	import {
		order
	} from '@/api/index.js'


	export default {
		data() {
			return {
				clientData: [],
				orderinfo: [],
				form: {
					name: null,
					region: null
				},
				value3: 4
			}
		},

		mounted() {
			this.orderinfo = this.$route.params;
			this.getOrderByOrderNo(this.orderinfo.orderNo);
			//this.clientData['specialProcessInfo'] = JSON.parse(this.clientData['specialProcessInfo']).join(', ');
		},
		methods: {
			getOrderByOrderNo(orderNo) {
				let searchParam = {};
				searchParam.orderNo = orderNo;
				order.getOrderByOrderNo(searchParam).then(res => {
					if (res.code === 0) {
						this.clientData = res.data;
					} else {
						this.$message.error(res.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.evaluateDetail {

		// 评分
		.grade {
			background-color: #fbf1f1;
			width: 455px;
			margin-left: 20px;
			padding: 20px 0 0 30px;

			li {
				display: flex;
				height: 40px;

				span {
					margin-right: 10px;
				}
			}

			li:nth-child(5) {
				margin-top: 20px;
			}

			li:nth-child(6) {
				span {
					margin-left: 5px;
				}
			}
		}

		.remarks {
			margin: 30px;
			width: 500px;
			display: flex;
			line-height: 50px;

			span {
				width: 100px;
				color: #333;
			}

			.el-textarea {
				width: 230px;
				margin-right: 20px;
			}

			button {
				margin-top: 10px;
			}
		}

		.idImg {
			width: 350px;
			height: 150px;
			left: 5px;
		}
	}
</style>
