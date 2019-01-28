<template>
	<div class="changeStatus">
		<div class="titleTop">
			订单管理-审核报价-修改状态
		</div>
		<div class="main2">
			<!-- 订单详情 -->
			<div class="detail">
				<h4>订单号：{{clientData.orderNo}} <em>（{{clientData.orderStatus | statusFilters}}）</em></h4>
				<!-- 订单详情 -->
				<div class="describe">
					<span class="oImg">
						<img :src="clientData.picUrl" alt="" class="idImg">
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
			</div>
			<!-- 修改 -->
			<div class="change">
				<span>订单状态&nbsp;&nbsp;
					<el-select v-model="form.orderStatus" placeholder="生产中">
						<el-option label="未支付" value="1"></el-option>
						<el-option label="下单成功" value="2"></el-option>
						<el-option label="生产中" value="3"></el-option>
						<el-option label="已发货" value="4"></el-option>
						<el-option label="完成收货" value="5"></el-option>
						<el-option label="订单完成" value="6"></el-option>
					</el-select>
				</span>
				<p><button class="btnMin" @click="onSubmit">确定</button></p>
			</div>
		</div>
	</div>
</template>

<script>
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
		data() {
			return {
				clientData: {},
				form: {
					name: null,
					orderStatus: ""
				}
			}
		},
		mounted() {
			this.clientData = this.$route.params;
		},
		methods: {
			onSubmit() {
				this.form.id = this.clientData.id;
				order.updateOrderStatus(this.form).then(res => {
					if (res.code === 0) {
						this.$message.success(res.msg);
					} else {
						this.$message.error(res.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.changeStatus {
		.change {
			margin: 30px;

			p {
				margin-top: 60px;
			}
		}
	}

	.idImg {
		width: 550px;
		height: 200px;
	}
</style>
