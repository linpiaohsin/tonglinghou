<template>
  <div class="factoryList">
    <div class="titleTop">
      报表统计-工厂统计
    </div>
    <div class="main">
      <!-- 搜索 -->
      <div class="search">
        <span>工厂名称<input
          v-model="queryPage.factoryName"
          placeholder="输入工厂名称"
        ></span>
        <!-- <el-table-column
          prop="productTypeName"
          label="产品类型"
        >
        </el-table-column>
        <el-table-column
          prop="productTypeSubName"
          label="产品子类型"
        >
        </el-table-column> -->
      <!--  <span>公司部门
          <el-select v-model="query.region" placeholder="公司部门">
            <el-option label="全部" value="1"></el-option>
            <el-option label="xxx工厂" value="2"></el-option>
            <el-option label="xxx工厂" value="3"></el-option>
          </el-select>
        </span>-->
      </div>
      <div>
         <!--<span class="timeSelect">时间&nbsp;&nbsp;-->

               <!--<el-date-picker-->
                 <!--v-model="time"-->
                 <!--type="datetimerange"-->
                 <!--:picker-options="pickerOptions"-->
                 <!--range-separator="至"-->
                 <!--start-placeholder="开始日期"-->
                 <!--end-placeholder="结束日期"-->
                 <!--align="right">-->
               <!--</el-date-picker>-->
        <!--</span>-->
        <button class="btnMin" @click="initData" v-if="isBtnShow.selectBtn">查询</button>
      </div>

      <!-- 列表 -->
      <div class="table">
        <div class="tableTop">
          <button @click="outExe" class="btn" v-if="isBtnShow.exportBtn">导出</button>
          <span class="fr">总金额：{{tableData.totalPrice}} 元</span>
          <span class="fr">总单数：{{tableData.orderNum}}单</span>
        </div>
        <el-table
          :data="tableData"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="50px"
          >
          </el-table-column>
          <el-table-column
            prop="factoryName"
            label="工厂名称"
          >
          </el-table-column>
          <el-table-column
            prop="turnover"
            label="成交金额"
             width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="orderQuantity"
            label="下单数量"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="产品类型"
          >
          </el-table-column>
          <el-table-column
            prop="grossArae"
            label="总面积(㎡)"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80"
            v-if="isBtnShow.viewOrderBtn"
          >
            <template slot-scope="scope">
              <router-link :to="{name:'FactoryOrderStatisticsList',params:scope.row}">查看订单</router-link>
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

import {statistics, menuBtnControl} from '@/api/index.js'

export default {
  data () {
    return {
      query: {
        input: null,
        region: '',
        time: ''
      },
      orderNum: '',
      totalPrice: '',
      tableData: [
        {
          grossOrder: '',
          grossMoney: ''
        }
      ],
      select: {
        itemValue: [],
        itemList: [],
        props: {
          value: 'id',
          label: 'name'
        }
      },
      options: [],

      queryPage: {
        factoryName: '',
        startTime: null,
        endTime: null,
        page: 1,
        size: 8
      },
      time: '',

      total: {
        grossMoney: '',
        grossOrder: ''
      },

      // 时间快捷选项
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
        exportBtn: false,
        viewOrderBtn: false
      }
    }
  },
  mounted () {
    let parentId = sessionStorage.getItem('menuid')
    this.btnControl(parentId)
    this.initData()
    this.productTreeQuery()
  },
  methods: {
    // 产品类型树形下拉列表
    productTreeQuery () {
      statistics.productTreeQuery(this.queryPage).then(res => {
        if (res.code === 0) {
          this.select.itemList = res.data
          console.log('888888888888888->', res)
          //   this.$message.success(res.msg)
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 查询 工厂统计
    initData () {
      this.queryPage.startTime = this.time[0]
      this.queryPage.endTime = this.time[1]
      // if ( !== []){
      //
      // }
      statistics.factory(this.queryPage).then(res => {
        if (res.code === 0) {
          // this.queryDialogVisible = false
          // this.total.grossMoney = res.data.rows.grossMoney
          // console.log('0000000000000000000000:', res.data.rows.grossMoney)
          this.tableData = res.data.rows
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].idx = i + 1
          }
          this.queryPage.total = res.data.count
          //   this.$message.success(res.msg)
          console.log('--->', res.data.rows)
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    // 导出订单数据生成excel表格
    outExe () {
      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.export2Excel()
        })
    },
    export2Excel () {
      require.ensure([], () => {
        const { exportJsonToexcel } = require('@/assets/vendor/Export2Excel') // 这里必须使用绝对路径
        const tHeader = ['序号', '工厂名称', '成交金额', '下单数量', '产品类型', '总面积(㎡)'] // 导出的表头名
        const filterVal = ['idx', 'factoryName', 'turnover', 'orderQuantity', 'typeName', 'grossArae'] // 导出的表头字段名
        const list = this.tableData // 你要导出的数据
        const data = this.formatJson(filterVal, list)
        exportJsonToexcel(tHeader, data, '工厂统计') // 导出的表格名称，根据需要自己命名
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
    // 按钮权限控制
    btnControl (parentId) {
      menuBtnControl({'parentId': parentId}).then(res => {
        console.log(res)
        res.data.forEach(item => {
          switch (item.text) {
            case '查询':
              this.isBtnShow.selectBtn = item.checked
              break
            case '导出':
              this.isBtnShow.exportBtn = item.checked
              break
            case '查看订单':
              this.isBtnShow.viewOrderBtn = item.checked
              break
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.factoryList {
  .main {
    .search {
      height: 100px;
      line-height: 100px;
      span{
        margin-right: 20px;
        input{
            margin-left: 10px;
        }
      }
    }
    .timeSelect{
      margin-bottom: 30px;
    }
    .btnMin{
      margin-left: 40px;
    }
    // 表格
    .table {
      margin-top: 60px;
      .tableTop{
        height: 50px;
        line-height: 50px;
        span{
          margin-left: 50px;
        }
      }
    }
  }
}
</style>
