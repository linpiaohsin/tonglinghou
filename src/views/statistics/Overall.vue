<template>
  <div class="overall">
    <div class="titleTop">
      报表统计-综合报表
    </div>
    <div class="main">
      <!-- 搜索 -->
      <!--<div style="margin-top:20px">-->
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

        <!--<button class="btnMin"  @click="initData" v-if="isBtnShow.selectBtn">查询</button>-->

      <!--</div>-->

      <!-- 工厂排名module -->
      <div style="margin-top:50px">
        <el-tabs
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane   label="工厂业绩排名" v-if="isBtnShow.label1">
          <!-- 列表 1-->
          <div class="table">
            <button @click="outExe" class="btn" v-if="isBtnShow.exportBtn1">导出</button>
            <el-table
              :data="FactoryRankList"
              border
              style="width: 600px"
              :default-sort = "{prop: 'a', order: 'descending'}"
            >

              <!-- <el-table-column
                label="排行顺序"
                type="index"
                sortable

                width="120">
              </el-table-column> -->
              <el-table-column label="序号 ">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column
                prop="factoryName"
                label="工厂名称"

              >
              </el-table-column>
              <el-table-column
                prop="orderNums"
                label="下单数量"
                width="120px"
              >
              </el-table-column>
              <el-table-column
                prop="totalAreas"
                label="总面积(㎡)"
              >
              </el-table-column>
              <el-table-column
                prop="totalPrices"
                label="成交金额"
              >
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
        </el-tab-pane>
        <!-- yewuyuan -->
        <el-tab-pane   label="业务员业绩排名" v-if="isBtnShow.label2">
          <!-- 列表2 -->
          <div class="table2">
            <button @click="outExe" class="btn" v-if="isBtnShow.exportBtn2">导出</button>
            <el-table
              :data="FactoryRankList"
              border
              style="width: 600px"
              :default-sort = "{prop: 'a', order: 'descending'}"
            >
              <el-table-column
                label="序号"
                type="index"
                sortable
                width="120">
              </el-table-column>
              <el-table-column
                prop="realName"
                label="业务员名称"
              >
              </el-table-column>
              <el-table-column
                prop="orderNums"
                label="下单数量"
                width="120px"
              >
              </el-table-column>
              <el-table-column
                prop="totalAreas"
                label="总面积(㎡)"
              >
              </el-table-column>
              <el-table-column
                prop="totalPrices"
                label="成交金额"
              >
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
        </el-tab-pane>
        <!-- kefu -->
        <el-tab-pane   label="客服业绩排名" v-if="isBtnShow.label3">
          <!-- 列表3  -->
          <div class="table">
            <button @click="outExe" class="btn" v-if="isBtnShow.exportBtn3">导出</button>
            <el-table
              :data="FactoryRankList"
              border
              style="width: 600px"
              :default-sort = "{prop: 'a', order: 'descending'}"
            >
              <el-table-column
                label="序号"
                type="index"
                sortable
                width="120">
              </el-table-column>
              <el-table-column
                prop="realName"
                label="客服名称"
              >
              </el-table-column>
              <el-table-column
                prop="orderNums"
                label="下单数量"
                width="120px"
              >
              </el-table-column>
              <el-table-column
                prop="totalAreas"
                label="总面积(㎡)"
              >
              </el-table-column>
              <el-table-column
                prop="totalPrices"
                label="成交金额"
              >
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
        </el-tab-pane>

        <el-tab-pane   label="产品类型销量排名" v-if="isBtnShow.label4">
          <!-- 列表4    -->
          <div class="table">
            <button @click="outExe" class="btn" v-if="isBtnShow.exportBtn4">导出</button>
            <el-table
              :data="FactoryRankList"
              border
              style="width: 600px"
              :default-sort = "{prop: 'a', order: 'descending'}"
            >

              <el-table-column
                label="序号"
                type="index"
                sortable
                width="120">
              </el-table-column>
              <el-table-column
                prop="productTypeName"
                label="产品类型"
              >
              </el-table-column>
              <el-table-column
                prop="orderNums"
                label="下单数量"
                width="120px"
              >
              </el-table-column>
              <el-table-column
                prop="totalAreas"
                label="总面积(㎡)"
              >
              </el-table-column>
              <el-table-column
                prop="totalPrices"
                label="成交金额"
              >
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
        </el-tab-pane>

      </el-tabs>
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
      FactoryRankList: [],
      queryPage: {
        page: 1,
        rankType: 1,
        size: 30 // 一页30个

      },
      index: '0',
      time: '',

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
        exportBtn1: false,
        exportBtn2: false,
        exportBtn3: false,
        exportBtn4: false,
        label1: false,
        label2: false,
        label3: false,
        label4: false
      }
    }
  },

  mounted () {
    let parentId = sessionStorage.getItem('menuid')
    this.btnControl(parentId)
    this.initData()
  },
  methods: {

    // 查询
    searchFactory (index) {
      this.queryPage.rankType = index
      statistics.ConsolidatedStatementQuery(this.queryPage).then(res => {
        if (res.code == 0) {
          this.FactoryRankList = res.data.rows
          for (let i = 0; i < this.FactoryRankList.length; i++) {
            this.FactoryRankList[i]['idx'] = i + 1
          }
          // console.log('工厂返回数据' + this.FactoryRankList)
          this.queryPage.total = res.data.count
        }
      }
      ).catch(err => {
        console.log(err)
      })
    },
    initData () {
      this.queryPage.startTime = this.time[0]
      this.queryPage.endTime = this.time[1]
      this.searchFactory(1)
    },

    // 导出订单数据生成excel表格
    outExe () {
      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.export2Excel()
      })
    },
    export2Excel () {
      require.ensure([], () => {
        const { exportJsonToexcel } = require('@/assets/vendor/Export2Excel') // 这里必须使用绝对路径
        let tHeader, filterVal
        switch (this.index) {
          case '0' : tHeader = ['序号', '工厂名称', '下单数量', '总面积(㎡)', '成交金额 ']
            filterVal = ['idx', 'factoryName', 'orderNums', 'totalAreas', 'totalPrices']
            break
          case '1' : tHeader = ['序号', '业务员名称', '下单数量', '总面积(㎡)', '成交金额']
            filterVal = ['idx', 'Name', 'orderNums', 'totalAreas', 'totalPrices']
            break
          case '2' : tHeader = ['序号', '客服名称', '下单数量', '总面积(㎡)', '成交金额']
            filterVal = ['idx', 'Name', 'orderNums', 'totalAreas', 'totalPrices']
            break
          case '3' : tHeader = ['序号', '产品类型', '下单数量', '总面积(㎡)', '成交金额 ']
            filterVal = ['idx', 'nn', 'orderNums', 'totalAreas', 'totalPrices']
            break
          default : break
        }
        console.log(this.index)
        // const tHeader = ['日期', '姓名', '地址'] // 导出的表头名
        // const filterVal = ['totalPrices', 'orderNums', 'totalAreas'] // 导出的表头字段名

        const list = this.FactoryRankList // 你要导出的数据
        const data = this.formatJson(filterVal, list)
        // console.log(data);

        exportJsonToexcel(tHeader, data, '综合报表') // 导出的表格名称，根据需要自己命名
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleClick (tab, event) {
      // console.log(tab, event)
      // console.log(tab.index)
      this.index = tab.index
      this.searchFactory(Number(tab.index) + 1)
      // console.log(this.FactoryRankList.name+' '+this.FactoryRankList.Date+' '+this.FactoryRankList.address)
    },
    // 分页
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.queryPage.page = val
      this.initData()
    },
    // 按钮权限控制
    btnControl (parentId) {
      menuBtnControl({'parentId': parentId}).then(res => {
        res.data.forEach(item => {
          switch (item.text) {
            case '查询':
              this.isBtnShow.selectBtn = item.checked
              break
            case '工厂业绩导出':
              this.isBtnShow.exportBtn1 = item.checked
              break
            case '业务员业绩导出':
              this.isBtnShow.exportBtn2 = item.checked
              break
            case '客服业绩导出':
              this.isBtnShow.exportBtn3 = item.checked
              break
            case '产品类型销量导出':
              this.isBtnShow.exportBtn4 = item.checked
              break
            case '工厂业绩排名':
              this.isBtnShow.label1 = item.checked
              break
            case '业务员业绩排名':
              this.isBtnShow.label2 = item.checked
              break
            case '客服业绩排名':
              this.isBtnShow.label3 = item.checked
              break
            case '产品类型销量排名':
              this.isBtnShow.label4 = item.checked
              break
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.overall {
  .main {
    .timeSelect {
      margin-bottom: 30px;
      margin: 50px 0 80px;
      .minBtn {
        margin-left: 40px;
      }
    }
    // 表格
    .table {
      margin-top: 30px;
      .btn {
        margin-bottom: 20px;
      }
    }
    .pages{
      text-align: left;
    }
  }
}
</style>
