<template>
  <div class="guestListTotal">
    <div class="titleTop">
      报表统计-客户统计
    </div>
    <div class="main">
      <!-- 搜索 -->
      <div class="search">
        <span>客户名称<input
          v-model="queryPage.enterpriseName"
          placeholder="输入客户名称"
        ></span>
        <!--<span>客户地区-->
          <!--<el-cascader-->
            <!--:options="options"-->
            <!--v-model="area"-->
            <!--:props="props"-->
          <!--&gt;</el-cascader>-->
        <!--</span>-->
      </div>
      <div >
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
        <button class="btnMin" @click="initData"  v-if="isBtnShow.selectBtn">查询</button>
      </div>
      <!-- 列表 -->
      <div class="table">
          <button @click="outExe" class="btn"  v-if="isBtnShow.exportBtn">导出</button>
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
            prop="enterpriseName"
            label="客户名称"
          >
          </el-table-column>
          <el-table-column
            prop="sumPrice"
            label="客户下单金额"
             width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="countOrder"
            label="下单数量"
          >
          <template slot-scope="scope">
            <div v-if='scope.row.countOrder>0'>
                 {{scope.row.countOrder}}
            </div>
            <div v-if='scope.row.countOrder==0'>
                 0
            </div>
          </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="客户地址"
          >
          </el-table-column>

          <el-table-column
            prop="ownName"
            label="专属业务员"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="ownId"
            label="专属业务员ID"
            width="140px"
          >
          </el-table-column>
          <el-table-column
            prop="registerTime"
            label="注册时间"
            width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="sumArea"
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
              <router-link :to="{name:'OrderStatisticsList',params:scope.row}">查看订单</router-link>
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
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

import {statistics, menuBtnControl} from '@/api/index.js'

export default {
  data: function () {
    return {

      options: [],
      area: [],
      props: {
        value: 'id',
        children: 'sub',
        label: 'name'
      },

      queryPage: {
        enterpriseName: null,
        page: 1,
        size: 8,
        startTime: null,
        endTime: null,
        province: null,
        district: null,
        city: null
      },
      time: '',
      tableData: [
        // {
        //   id: '',
        //   enterpriseName: '',
        //   sumPrice: '',
        //   countOrder: '',
        //   province: '',
        //   city: '',
        //   district: '',
        //   ownName: '',
        //   ownId: '',
        //   registerTime: '',
        //   sumArea: ''
        // }
      ],

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
    // this.clientData = this.$route.params
    // console.log(this.$route.params)
    let parentId = sessionStorage.getItem('menuid')
    this.btnControl(parentId)
    this.initData()
    this.addressRegion()
  },
  methods: {
    // 查询
    initData () {
      this.queryPage.startTime = this.time[0]
      this.queryPage.endTime = this.time[1]
      if (this.area !== []) {
        this.queryPage.province = this.area[0]
        this.queryPage.city = this.area[1]
        this.queryPage.district = this.area[2]
      }
      statistics.statisticsCustomer(this.queryPage).then(res => {
        if (res.code === 0) {
          // this.queryDialogVisible = false
          this.tableData = res.data.rows
          this.queryPage.total = res.data.count
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].idx = i + 1
          }
          //   this.$message.success(res.msg)
          console.log('--->', res.data.rows)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 省市区
    addressRegion () {
      statistics.addressRegion().then(res => {
        if (res.code === 0) {
          this.options = res.data
          this.test(this.options)
          console.log('--->', res.data.rows)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 省市区 递归 删除为空的地区
    test (data) {
      for (var i = 0; i < data.length; i++) {
        // if (data[i].sub.length <= 0) {
        if (data[i].sub === null) {
          delete data[i]['sub']
        }
        if (data.length !== 0 && data[i].sub !== undefined) {
          this.test(data[i].sub)
        }
      }
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
        const tHeader = ['ID', '客户名称 ', '客户下单金额', '下单数量', '地区 ', '专属业务员', '专属业务员ID ', '注册时间 ', '总面积(㎡)'] // 导出的表头名
        const filterVal = ['idx', 'enterpriseName', 'sumPrice', 'countOrder', 'address', 'ownName', 'ownId', 'registerTime', 'sumArea'] // 导出的表头字段名
        const list = this.tableData // 你要导出的数据
        console.log(list)
        const data = this.formatJson(filterVal, list)
        exportJsonToexcel(tHeader, data, '客户统计') // 导出的表格名称，根据需要自己命名
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
.guestListTotal {
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
      .btn{
          margin-bottom: 15px;
      }
    }
  }
}
</style>
