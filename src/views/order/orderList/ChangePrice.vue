<template>
	<div class="userifo">
		<div class="titleTop">
			订单管理-审核报价-修改报价
		</div>
		<div class="main">
			<img class="idImg" :src="clientData.picUrl">
			<div class="goodType">
				<div class="g_type">
					<span>产品类型 </span>
					<img :src="clientData.productTypeSubPic" alt="">
					<span class="img2">
						<img :src="clientData.productTypeSubPic" alt="">
						<i></i>
					</span>
				</div>
				<div class="g_select">
					<span>灯光颜色
						<el-select v-model="denghuanpropertiesModel" placeholder="请选择" disabled>
							<el-option v-for="item in denghuanproperties" :key="item.id" :label="item.value" :value="item.id">
							</el-option>
						</el-select>
					</span>
					<span>字面颜色
						<el-select v-model="zimianyanshepropertiesModel" placeholder="请选择" disabled>
							<el-option v-for="item in zimianyansheproperties" :key="item.id" :label="item.value" :value="item.id"></el-option>
						</el-select>
					</span>
					<span>字边颜色
						<el-select v-model="zibianyanshepropertiesModel" placeholder="请选择" disabled>
							<el-option v-for="item in zibianyansheproperties" :key="item.id" :label="item.value" :value="item.id"></el-option>
						</el-select>
					</span>
					<span>固定方式
						<el-select v-model="gudianfangshipropertiesModel" placeholder="请选择" disabled>
							<el-option v-for="item in gudianfangshiproperties" :key="item.id" :label="item.value" :value="item.id"></el-option>
						</el-select>
					</span>
					<span>是否淋雨
						<el-select v-model="shifouliyupropertiesModel" placeholder="请选择" disabled>
							<el-option v-for="item in shifouliyuproperties" :key="item.id" :label="item.value" :value="item.id"></el-option>
						</el-select>
					</span>
					<span>生产日期
						<el-select v-model="shengchanyiqipropertiesModel" placeholder="请选择" disabled>
							<el-option v-for="item in shengchanyiqiproperties" :key="item.id" :label="item.value" :value="item.id"></el-option>
						</el-select>
					</span>
				</div>
				<div style="margin-top: 20px;">
					<el-form :inline="true" :model="form" class="demo-form-inline">
						<el-form-item label="收货地址">
							<el-input v-model="form.receiverAddress" placeholder="收货地址"></el-input>
						</el-form-item>
						<el-form-item label="收货人">
							<el-input v-model="form.receiver" placeholder="收货人"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input v-model="form.receiverPhone" placeholder="联系电话"></el-input>
						</el-form-item>
					</el-form>
					<el-form :inline="true" :model="form" class="demo-form-inline">
						<el-form-item label="修改订单金额">
							<el-input v-model="money" placeholder="修改订单金额"></el-input>
						</el-form-item>
						<el-form-item label="订单套数">
						  <el-input-number v-model="num"  :min="1" label="订单套数"></el-input-number>
						</el-form-item>
						<el-form-item label="         ">
						 <el-button type="primary" size="small">确认</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="tool">
					<button class="btn">下载cdr文件</button>
					<button class="btn" @click="submitToPass">保存</button>
				</div>
			</div>
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
				clientData: {},
				denghuanpropertiesModel: '',
				zimianyanshepropertiesModel: '',
				zibianyanshepropertiesModel: '',
				gudianfangshipropertiesModel: '',
				shifouliyupropertiesModel: '',
				shengchanyiqipropertiesModel: '',
				denghuanproperties: [],
				zimianyansheproperties: {},
				zibianyansheproperties: {},
				gudianfangshiproperties: {},
				shifouliyuproperties: {},
				shengchanyiqiproperties: {},
				getData: {},
				money:0,
				num:0,
				form: {

				},
				orderStatus: {}
			}
		},
		mounted() {
			this.clientData = this.$route.params;
			let properties = JSON.parse(this.clientData.productItemInfo);
			this.denghuanproperties = properties[4].children;
			this.denghuanpropertiesModel = properties[4].selectId;
			this.zimianyansheproperties = properties[2].children;
			this.zimianyanshepropertiesModel = properties[2].selectId;
			this.zibianyansheproperties = properties[1].children;
			this.zibianyanshepropertiesModel = properties[1].selectId;
			this.gudianfangshiproperties = properties[0].children;
			this.gudianfangshipropertiesModel = properties[0].selectId;
			this.shifouliyuproperties = properties[3].children;
			this.shifouliyupropertiesModel = properties[3].selectId;
			this.shengchanyiqiproperties = properties[5].children;
			this.shengchanyiqipropertiesModel = properties[5].selectId;
		},
		methods: {
			submitToPass() {
				this.form.id = this.clientData.id;
				this.form.totalPrice=this.money;
				this.form.orderNum=this.num;
				order.changePrice(this.form).then(res => {
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
	.goodType {

		.g_select {
			width: 1000px;
			background-color: #f2f2ee;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding-bottom: 20px;
			margin-left: 10px;

			span {
				margin-top: 20px;

				.el-select {
					margin-left: 5px;
				}
			}
		}

		.g_type {
			margin: 30px 10px;

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

				i {
					position: absolute;
					left: -30px;
					top: 40px;
					border-width: 15px;
					border-style: solid;
					border-color: transparenT #f2f2ee transparent transparent;
				}
			}
		}
	}

	.idImg {
		width: 800px;
		height: 230px;
	}
</style>
