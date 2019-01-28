<template>
  <div class="userifo">
    <div class="titleTop">
      订单管理-评价管理
    </div>
    <div class="main">
      <!-- 搜索 -->
      <div class="search">
        <span>订单号<input v-model="query.orderNo" placeholder="输入订单号"></span>
        <span>客户名称<input v-model="query.customerName" placeholder="输入客户名称"></span>
        <span>生产工厂
					<el-select v-model="query.factoryName" placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="item in factoryList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</span>
      </div>
      <div class="timeSelect">
				<span>时间&nbsp;&nbsp;
					<el-date-picker v-model="query.createTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</span>
      </div>
      <div class="score">
				<span>评分查询&nbsp;&nbsp;
					<el-select v-model="query.gradeType" placeholder="全部">
						<el-option label="评分从高到低" value="1"></el-option>
						<el-option label="评分从低到高" value="2"></el-option>
						<el-option label="1-2分" value="3"></el-option>
						<el-option label="2-3分" value="4"></el-option>
						<el-option label="3-4分" value="5"></el-option>
						<el-option label="4-5分" value="6"></el-option>
					</el-select>
				</span>
      </div>
      <button class="btnMin" @click="initData" v-if="isBtnShow.selectBtn">查询</button>

      <!-- 列表 -->
      <div class="table">
        <el-table :data="tableData" border>
          <!-- <el-table-column prop="id" label="ID" width="300px">
                    </el-table-column> -->
          <el-table-column prop="score" label="订单评分" width="80px">
          </el-table-column>
          <el-table-column prop="orderNo" label="订单号" width="250px">
          </el-table-column>
          <el-table-column prop="customerName" label="客户名称">
          </el-table-column>
          <el-table-column prop="remark" label="备注信息" width="140px">
          </el-table-column>
          <el-table-column prop="scoreDate" label="订单生成时间">
          </el-table-column>
          <el-table-column prop="factoryName" label="生产工厂">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="60" v-if="isBtnShow.viewBtn">
            <template slot-scope="scope">
              <router-link :to="{name:'EvaluateDetail',params:scope.row}">查看</router-link>
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
    order, factory, menuBtnControl } from '@/api/index.js'
  export default {
    data () {
      return {
        query: {
          input: null,
          region: '',
          time: ''
        },
        factoryList: [],
        tableData: [],
        queryPage: {
          name: '',
          page: 1,
          size: 20
        },
        isBtnShow: {
          selectBtn: false,
          viewBtn: false
        }
      }
    },

    mounted () {
      let parentId = sessionStorage.getItem('menuid')
      this.btnControl(parentId)
      this.initData()
      this.getFactoryList()
    },

    methods: {
      // 查询
      initData () {
        if (this.query.createTime != undefined) {
          this.query.beginDate = this.query.createTime[0]
          this.query.endDate = this.query.createTime[1]
        } else {
          this.query.beginDate = ''
          this.query.endDate = ''
        }
        this.query.size = 20
        order.evaluatePage(this.query).then(res => {
          if (res.code === 0) {
            this.tableData = res.data.rows
            this.queryPage.total = res.data.count
            console.log(res)
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      getFactoryList () {
        factory.factoryList(this.query).then(res => {
          if (res.code === 0) {
            this.factoryList = res.data
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
              case '查看':
                this.isBtnShow.viewBtn = item.checked
                break
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .userifo {
  .main {
  .search {
    width: 800px;
    height: 100px;
    line-height: 100px;
    display: flex;
    justify-content: space-between;

  span input {
    margin-left: 15px;
  }
  }

  .timeSelect {
    margin-bottom: 30px;
  }

  .btnMin {
    margin-top: 40px;
  }

  // 表格
     .table {
       margin-top: 20px;

  .idImg {
    width: 45px;
    height: 45px;
  }
  }
  }
  }
</style>
