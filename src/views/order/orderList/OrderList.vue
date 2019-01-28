<template>
  <div class="orderList">
    <div class="titleTop">
      订单管理-订单列表
    </div>
    <div class="main">
      <!-- 搜索 -->
      <div class="search">
        <span>订单号<input v-model="query.orderNo" placeholder="输入订单号" class="ipt" clearable></span>
        <span>客户名称<input v-model="query.enterpriseName" placeholder="输入客户名称" class="ipt" clearable></span>
        <span>订单状态
					<el-select v-model="query.orderStatus" placeholder="请选择" >
						<el-option label="全部" ></el-option>
						<el-option label="审核中" value="0"></el-option>
						<el-option label="未支付" value="1"></el-option>
						<el-option label="下单成功" value="2"></el-option>
						<el-option label="生产中" value="3"></el-option>
						<el-option label="已发货" value="4"></el-option>
						<el-option label="订单完成" value="5"></el-option>
					</el-select>
				</span>
        <span>所属业务员ID<input v-model="query.ownId" placeholder="输入客户名称" class="ipt"></span>
      </div>
      <div class="searchB">
        <span>关键词 &nbsp;&nbsp;<input v-model="query.keywords" placeholder="输入关键词" class="ipt"></span>
        <span>产品类型&nbsp;&nbsp;
					<el-select v-model="query.productTypeId" placeholder="请选择产品类型" @change="getSecondLevel(query.productTypeId)" >
						<el-option label="请选择产品类型"></el-option>
            <el-option v-for="item in productTypeList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
          <el-select placeholder="请选择子产品类型"  v-model="query.productTypeSubId">
					   <el-option label="请选择子产品类型"></el-option>
             <el-option  v-for="item in secondLevelQuery" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <!-- <el-select v-model="query.productTypeId" placeholder="请选择产品类型" @change="getSecondLevel(query.productTypeId)">
                                  <el-option v-for="item of productTypeList" :key="item.index" :label="item.name" :value="item.id"></el-option>
                              </el-select>
                              <el-select v-model="query.productSubTypeId" placeholder="请选择产品子类型" >
                                  <el-option v-for="item of secondLevelQuery" :key="item.index" :label="item.name" :value="item.id"></el-option>
                              </el-select> -->
				</span>
      </div>
      <div class="timeSelect">
				<span>时间&nbsp;&nbsp;
					<el-date-picker v-model="query.createTime" type="daterange" align="right" unlink-panels range-separator="至"
                          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
					</el-date-picker>
				</span>
        <button class="btnMin" @click="initData" v-if="isBtnShow.selectBtn">查询</button>
      </div>

      <!-- 列表 -->
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80px">
          </el-table-column>
          <el-table-column prop="remark" label="备注信息" width="80px">
            <template slot-scope="scope">
              <p class="text">{{scope.row.remark}}</p>
            </template>
          </el-table-column>
          <el-table-column  prop="productTypeName" label="产品类型 " width="80px">
          </el-table-column>
          <el-table-column  prop="productTypeSubName" label="产品子类型 " width="100px">
          </el-table-column>
          <el-table-column prop="orderStatus" label="订单状态" width="80px"   >
            <template slot-scope="scope">
              <div v-if="scope.row.orderStatus==0">
                审核中
              </div>
              <div v-if="scope.row.orderStatus==1">
                未支付
              </div>
              <div v-if="scope.row.orderStatus==2">
                下单成功
              </div>
              <div v-if="scope.row.orderStatus==3">
                生产中
              </div>
              <div v-if="scope.row.orderStatus==4">
                已发货
              </div>
              <div v-if="scope.row.orderStatus==5">
                完成收货
              </div>
              <div v-if="scope.row.orderStatus==6">
                订单完成
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="订单号">
          </el-table-column>
          <el-table-column prop="enterpriseName" label="客户名称">
          </el-table-column>
          <el-table-column prop="ownId" label="所属业务员ID">
          </el-table-column>
          <el-table-column prop="legalName" label="联系人" width="80px">
          </el-table-column>
          <el-table-column prop="createTime" label="订单生产时间" width="110px">
          </el-table-column>
          <el-table-column prop="orderNum" label="数量" width="60px">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120px" v-if="isBtnShow.detailBtn">
            <template slot-scope="scope">
              <router-link :to="{name:'OrderListDetails',query:scope.row}">详情</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pages">
        <el-pagination background @current-change="handleCurrentChange" :page-size="queryPage.size" :total="queryPage.total"
                       layout="prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    client,order, menuBtnControl
  } from '@/api/index.js'

  export default {
    data () {
      return {
        status: '0',
        secondLevelQuery:{},
        query: {
          input: null,
          region: '',
          time: ''
        },
        producType: [],
        tableData: [],
        queryPage: {
          name: '',
          page: 1,
          size: 20
        },
        productType: {
          page: 1,
          size: 1000
        },
        productTypeList: [],
        // 时间快捷选择
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        isBtnShow: {
          selectBtn: false,
          detailBtn: false
        }
      }
    },
    mounted () {
      let parentId = sessionStorage.getItem('menuid')
      this.btnControl(parentId)
      this.initData()
      this.producTypeList()
    },
    methods: {
      //获取子类型
      getSecondLevel(id){
        client.secondLevelQuery({'id': id}).then(res => {
          this.secondLevelQuery = res.data
          this.$set(this.query, 'productTypeSubId', '')
        })
      },
      // 查询
      initData () {
        console.log(this.status)

        if (this.query.createTime != undefined) {
          this.query.thisMonth = this.query.createTime[0]
          this.query.threeMonths = this.query.createTime[1]
        } else {
          this.query.thisMonth = ''
          this.query.threeMonths = ''
        }
        this.query.size = 20
        order.orderListPage(this.query).then(res => {
          if (res.code === 0) {
            this.tableData = res.data.rows
            this.queryPage.total = res.data.count
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      producTypeList () {
        order.productType(this.productType).then(res => {
          if (res.code === 0) {
            this.productTypeList = res.data.rows
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      // 分页
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.query.page = val
        this.initData()
      },
      // 按钮权限控制
      btnControl (parentId) {
        menuBtnControl({'parentId': parentId}).then(res => {
          console.log(res)
          res.data.forEach(item => {
            switch (item.text) {
              case '查询':
                this.isBtnShow.selectBtn = item.checked
                break
              case '详情':
                this.isBtnShow.detailBtn = item.checked
                break
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .orderList {
  .main {
  .search {
    width: 1000px;
    height: 100px;
    line-height: 100px;
    display: flex;
    justify-content: space-between;

  span input {
    margin-left: 15px;
  }
  }

  .searchB {
    margin-bottom: 30px;

  span {
    margin-right: 15px;
  }
  }

  .timeSelect {
    margin-bottom: 30px;
  }

  .btnMin {
    margin-left: 30px;
  }

  // 表格
     .table {
       margin-top: 60px;

  .idImg {
    width: 45px;
    height: 45px;
  }

  // 文字溢出
     .text {
       width: 60px;
       overflow: hidden;
       white-space: nowrap;
       text-overflow: ellipsis;
     }
  }
  }
  }
</style>
