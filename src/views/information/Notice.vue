<template>
  <div class="notice">
    <div class="titleTop">
      信息咨询-系统通知
    </div>
    <div class="main">
      <!-- 搜索 -->
      <div class="time">
        <span class="timeSelect">时间&nbsp;&nbsp;
          <el-date-picker
            v-model="queryPage.beginDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始日期时间">
          </el-date-picker>
          <el-date-picker
            v-model="queryPage.endDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束日期时间">placeholder="结束日期"
            >
          </el-date-picker>
        </span>
        <button class="btnMin" @click="search" v-if="isBtnShow.selectBtn">查询</button>
      </div>

      <!-- 列表 -->
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
         <!-- <el-table-column
            prop="id"
            label="客服ID"
            width="80px"
          > -->
          <el-table-column
           label="序号"
           width="80px"
           type="index"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="发送时间"
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="消息内容"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="消息类型"
          >
          <!-- <template slot-scope="scope">
            系统消息
          </template> -->
          </el-table-column>
          <el-table-column
            prop="sendObject"
            label="客户名称"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120px"
            v-if="isBtnShow.msgDetailBtn"
          >
            <template slot-scope="scope">
              <router-link :to="{name:'NoticeDetail',params:{obj:scope.row}}">消息详情</router-link>
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
import { information, menuBtnControl } from '@/api/index.js'
export default {

  data () {
    return {
      query: {
        input: null,
        region: '',
        time: ''
      },
      tableData: [],
      queryPage: {
        name: '',
        page: 1,
        size: 8,
        beginDate: '',
        endDate: '',
        msgType: 2
      },
      isBtnShow: {
        selectBtn: false,
        msgDetailBtn: false
      }
    }
  },
  mounted () {
    let parentId = sessionStorage.getItem('menuid')
    this.btnControl(parentId)
    this.initData()
  },
  methods: {
    initData () {
      information.queryPage(this.queryPage).then(res => {
        if (res.code === 0) {
          // let arr = []
          this.tableData = res.data.rows
          this.queryPage.total = res.data.count
          // this.tableData.forEach((el) => {
          //   if (el.type === 2) {
          //     arr.push(el)
          //   }
          // })
          // this.tableData = arr
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
    },
    search () {
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
            case '消息详情':
              this.isBtnShow.msgDetailBtn = item.checked
              break
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.notice {
  .main {
    .time{
      margin: 30px 0;
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
    }
  }
}
</style>
