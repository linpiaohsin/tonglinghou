<template>
  <div class="userLoginList">
    <div class="titleTop">
      报表统计-客户登录统计
    </div>
    <div class="main">
      <!-- 搜索 -->
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
        <button class="btnMin"  @click="initData" v-if="isBtnShow.selectBtn">查询</button>
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
            prop="mobie"
            label="联系电话"
             width="140px"
          >
          </el-table-column>
          <el-table-column
            prop="legalName"
            label="联系人"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="loginTime"
            label="登陆时间"
          >
          </el-table-column>
          <el-table-column
            prop="realName"
            label="专属业务员"
          >
          </el-table-column>
          <el-table-column
            prop="ownId"
            label="专属业务员ID"
          >
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          background
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
      tableData: [
        {
          a: '1',
          b: '陈霞',
          c: '1522',
          d: '15',
          e: '铝制无边字',
          I: '385',
          h: '123232'
        }
      ],
      queryPage: {
        // name: '',
        page: 1,
        size: 8,
        startTime: null,
        endTime: null
      },
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
        exportBtn: false
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
    initData () {
      this.queryPage.startTime = this.time[0]
      this.queryPage.endTime = this.time[1]
      // this.queryPage['salesmanId'] = this.$route.params.ownId

      statistics.sysLogincount(this.queryPage).then(res => {
        if (res.code === 0) {
          // this.queryDialogVisible = false
          this.tableData = res.data.rows
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].idx = i + 1
          }
          //   this.$message.success(res.msg)
          this.queryPage.total = res.data.count
          console.log(res)
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
        const tHeader = ['ID', '客户名称', '联系电话', '联系人', '登陆时间', '专属业务员', '专属业务员ID '] // 导出的表头名
        const filterVal = ['idx', 'enterpriseName', 'mobie', 'legalName', 'loginTime', 'realName', 'ownId'] // 导出的表头字段名
        const list = this.tableData // 你要导出的数据
        const data = this.formatJson(filterVal, list)
        exportJsonToexcel(tHeader, data, '客户登陆统计') // 导出的表格名称，根据需要自己命名
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
.userLoginList {
  .main {
    .timeSelect{
      margin-bottom: 30px;
      margin: 30px 0;
    }
    .btnMin{
      margin-left: 40px;
    }
    // 表格
    .table {
      margin-top: 60px;
      .btn{
        margin-bottom: 20px;
      }
    }
  }
}
</style>
