<template>
  <div class="orderList">
    <div class="titleTop">
      报表统计-订单列表
    </div>
    <div class="main">
      <!-- 搜索 -->
      <div class="time">
        <div class="searchB" style="margin-bottom: 20px">
          <span>产品类型&nbsp;&nbsp;
            <el-select v-model="queryPage.productTypeId" placeholder="请选择产品类型" @change="getSecondLevel(queryPage.productTypeId)">
              <el-option label="全部"></el-option>
              <el-option v-for="item in productTypeList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-select placeholder="选择产品子类型"  v-model="queryPage.productTypeSubId">
               <el-option label="全部"></el-option>
               <el-option  v-for="item in secondLevelQuery" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </span>
        </div>
        <span class="timeSelect">时间&nbsp;&nbsp;
               <el-date-picker
                 v-model="time"
                 type="datetimerange"
                 :picker-options="pickerOptions"
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期"
                 align="right">
               </el-date-picker>
        </span>

        <button class="btnMin"  @click="initData" >查询</button>
      </div>

      <!-- 列表 -->
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="ID"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注信息"
            width="80px"
          >
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

          <!-- <el-table-column
            prop="orderStatus"
            label="订单状态"
             width="80px"
          >
            <template slot-scope="scope">
              {{scope.row.orderStatus == 0 ? "已完成":"未完成"}}
            </template>
          </el-table-column> -->
          <el-table-column
            prop="orderNo"
            label="订单号"
          >
          </el-table-column>
          <el-table-column
            prop="enterpriseName"
            label="客户名称"
          >
          </el-table-column>
          <el-table-column
            prop="ownId"
            label="所属业务员ID"
          >
          </el-table-column>
          <el-table-column
            prop="receiver"
            label="联系人"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="订单生成时间"
            width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="productTypeName"
            label="产品类型"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="productTypeSubName"
            label="产品子类型"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="totalArea"
            label="订单总面积"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80px"
          >
            <template slot-scope="scope">
              <router-link :to="{name:'EvaluateDetail',params:scope.row}">查看详情</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="queryPage.page"
          :page-size="queryPage.size"
          layout="prev, pager, next, jumper"
          :total="queryPage.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

import {statistics, client, order} from '@/api/index.js'

export default {
  data () {
    return {
      select: {
        itemValue: [],
        itemList: [],
        props: {
          value: 'id',
          label: 'name'
        }
      },
      options: [],
      waiterId: {},
      productTypeList: [],
      productType: {
        page: 1,
        size: 20
      },
      secondLevelQuery: [],
      query: {
        input: null,
        region: '',
        time: '',
        productTypeId: '',
        productTypeSubId: ''
      },
      tableData: [
        // {
        //   a: '1',
        //   b: '麻烦加急赶工...',
        //   c: '审核中',
        //   d: '12345678',
        //   e: '1234343',
        //   f: '张晓晨',
        //   h: '2018-10-19 08:25:11',
        //   I: '1',
        //   g: '东莞市清奇光电科技有限公司'
        // }
      ],
      queryPage: {
        waiterId: '',
        name: '',
        page: 1,
        size: 8,
        startTime: null,
        endTime: null,
        productTypeId: '',
        productTypeSubId: ''
      },

      productTypeId: '',
      time: '',

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
      }
    }
  },

  mounted () {
    this.productTreeQuery()
    this.initData()
    this.producTypeList()
  },

  methods: {
    producTypeList () {
      order.productType(this.productType).then(res => {
        if (res.code === 0) {
          this.productTypeList = res.data.rows
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getSecondLevel(id){
      client.secondLevelQuery({'id': id}).then(res => {
        this.secondLevelQuery = res.data
        this.$set(this.queryPage, 'productTypeSubId', '')
      })
    },
    // 查询   查看订单
    initData () {
      this.queryPage.startTime = this.time[0]
      this.queryPage.endTime = this.time[1]

      this.queryPage['waiterId'] = this.$route.params.ownId

      statistics.queryCusOrderPage(this.queryPage).then(res => {
        if (res.code === 0) {
          // this.queryDialogVisible = false
          this.tableData = res.data.rows
          //   this.$message.success(res.msg)
          this.queryPage.total = res.data.count
          console.log(res)
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
      console.log(`当前页: ${val}`)
      this.queryPage.page = val
      this.initData()
    },

    // 产品类型树形下拉列表
    productTreeQuery () {
      statistics.productTreeQuery(this.queryPage).then(res => {
        if (res.code === 0) {
          this.select.itemList = res.data
          //   this.$message.success(res.msg)
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.orderList {
  .main {
    .time{
      margin: 30px 0;
      span{
          margin-right: 30px;
      }
    }
    .btnMin{
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
      .text{
        width: 60px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
