<template>
  <div class="editProduct">
    <div class="titleTop">
      公司产品-产品列表-{{this.navStatus}}
    </div>

    <div class="main-content">


					<!-- row1 -->
				  <el-row    >

				    <el-col :span='10' >
							<div class="inner">
								<span><span style="color:red">*</span>产品类型</span>
								<el-select v-model="form.productTypeId" placeholder="请选择产品类型" @change="getSecondLevel(form.productTypeId)">
									<el-option v-for="item of oneLevelQuery" :key="item.index" :label="item.name" :value="item.id"></el-option>
								</el-select>
								<el-select v-model="form.productSubTypeId" placeholder="请选择产品子类型" @change="getPriceInfo(form.productSubTypeId)">
									<el-option v-for="item of secondLevelQuery" :key="item.index" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</div>

				    </el-col>
						<el-col :span='8'>
								<div class="inner">
									<span><span style="color:red">*</span>产品名称</span>
									<el-input
										v-model="form.name"
										placeholder="请输入产品名称"
									>
									</el-input>
								</div>
						</el-col>

						<el-col :span='6'>
									<div class="inner">
										<span class="productImg"><span style="color:red">*</span>产品图片</span>
										<el-upload
										class="avatar-uploader"
										:action="action"
										:show-file-list="false"
										:on-success="handleAvatarSuccess">
											<img
												v-if="form.pic_url"
												:src="form.pic_url"
												class="avatar">
											<i
												v-else
												class="el-icon-plus avatar-uploader-icon">
											</i>
										</el-upload>
									</div>
					  </el-col>

					</el-row>
					<!-- row2 -->
				  <el-row>
						<el-col :span="2">
						<div class="inner">
							<span ><span style="color:red">*</span>产品简介</span>
						</div>

						</el-col>
						<el-col :span="8">
							<el-input
										type="textarea"
										v-model="form.detail"
										style="resize:none;"
										placeholder="输入产品简介"
									></el-input>
						</el-col>
						<el-col :span="8">
							<div class="inner">
								<span><span style="color:red">*</span>排序序号</span>
								<el-input
									v-model.number="form.sort"
									type='number'
									style="resize:none;"
									placeholder="输入产品序号"
								>
								</el-input>
							</div>
						</el-col>
				  </el-row>

					<br/>

			<!-- <el-select v-model="value" placeholder="请选择">
				<el-option :value="2" label="22222" >
				</el-option>
				<el-option :value="3" label="3333333" >
				</el-option>
			</el-select> -->
					<!-- row3 -->
					<el-row>
						<div class="choseBox" v-if="this.form.productSubTypeId">
							<el-form
								label-width="120px"
								:inline="true"
							>
							  <template  v-for="items in tree">
                  <el-form-item  :label="items.name" :key="items.id" required="">
                    <el-select v-model="items.selectId">
                      <el-option v-for="item in items.children" :key="item.id" :label="item.value" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
							</el-form>
						</div>
					</el-row>
					<button class="btn" @click="onSubmit">确定</button>
				</div>

  </div>
</template>

<script>
import { client } from '@/api/index.js'
import axios from 'axios'
export default {
  data () {
    return {
	
			navStatus:'',
      form: {
        name: '',
        detail: '',
        pic_url: '',
        sort: '',
        productTypeId: '',
        productSubTypeId: '',
        priceItemInfo: '',

      },
      priceItemInfo: {},
      price_item_value: [],
      price_item: {},
      action: axios.defaults.baseURL + 'common/upload',
      tree: {},
      oneLevelQuery: [],
      secondLevelQuery: []
    }
  },
  methods: {
    init () {
			console.log(this.priceItemInfo)
      // console.log(this.$route.query)
			if(this.$route.query.id){
					this.form  = this.$route.query
					this.navStatus = '编辑'
			}else{
					this.navStatus = '添加'
			}
      client.oneLevelQuery({}).then(res => {
        this.oneLevelQuery = res.data
			})
			client.secondLevelQuery({'id': this.form.productTypeId}).then(res=>{
				this.secondLevelQuery = res.data
			})

      this.tree = JSON.parse(this.$route.query.priceItemInfo)
			this.priceItemInfo  = this.tree 

    },
    handleAvatarSuccess (res, file) {
      // console.log('pic_url>>>>>', res)
      this.form.pic_url = JSON.parse(res.data.fileUrlJsonString).fileUrl
      // this.form.pic_url = URL.createObjectURL(file.raw)
    },

    onSubmit () {
      // console.log(this.$route.query)
			// console.log(this.priceItemInfo)

			this.form.priceItemInfo = JSON.stringify(this.priceItemInfo)
			console.log('--->>>>',this.form.priceItemInfo)
      if (!this.$route.query.id) { // 新增
        client.prodectItemAdd(this.form).then(res => {
					if(res.code==0){
						this.$router.push({name:'ProductList'})
						this.$message.success(res.msg)
					}else{
						this.$message.error(res.msg)

					}
					console.log(res)
        }).catch(err=>{
					console.log(err);

				})

      } else {

        client.prodectItemUpdate(this.form).then(res => {
      	// console.log(res)
          if (res.code == 0) {
            this.$router.push('/Home/client/productList')
            this.$message.success("修改成功！")
          }
        })
      }
    },
    getSecondLevel (firstLevelID) {
      client.secondLevelQuery({'id': firstLevelID}).then(res => {
        this.secondLevelQuery = res.data
      })
		},
		//屎黄色区域
    getPriceInfo (secondLevelID) {
			// this.idNow = secondLevelID
      client.getProductItemValuesTree({id: secondLevelID}).then(res => {
				this.tree = res.data;
				this.priceItemInfo  = this.tree
			
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.editProduct {
  .main-content{
    width:1500px;
    padding-top: 40px;
    .choseBox{
			margin-top: 80px;
			background: lightgoldenrodyellow;
			width: 1000px;
			/* margin: 0 auto; */
			//padding-top: 20px;
			text-align: left;
			margin-left: 20px;
		}
    .inner{
			margin-left: 20px;

			.productImg{
				float: left;
			}
		}
  }
  .btn{
		margin-top: 100px;
		margin-left: 50px;
  }

  // 上传图片
  .avatar-uploader .el-upload {
    border: none;
  }
  .avatar-uploader-icon {
    width: 50px;
    height: 50px;
    line-height: 50px;
    color: #333;
  }
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
