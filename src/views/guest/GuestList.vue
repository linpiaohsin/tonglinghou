<template>
  <div class="guestList">
    <div class="titleTop">
      客户管理-客户列表
    </div>
    <div class="main">
      <!-- 搜索 -->
      <div class="search">
        <span>客户名称 &nbsp;&nbsp;<input
          v-model="queryPage.enterpriseName"
          placeholder="输入客户名称"
        ></span>
        <span>联系人 &nbsp;&nbsp;<input
          v-model="queryPage.legalName"
          placeholder="输入联系人"
        ></span>
      </div>
      <div >
        <span class="timeSelect">审核时间&nbsp;&nbsp;
          <el-date-picker
            v-model="queryPage.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始日期时间">
          </el-date-picker>
          <el-date-picker
            v-model="queryPage.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束日期时间">
          </el-date-picker>
        </span>

        <button class="btnMin" @click="initData" v-if="isBtnShow.selectBtn">查询</button>
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
            label="序号"
            width="50px"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="审核时间"
            width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="idPositiveUrl"
            label="法人身份证"
          >
            <template slot-scope="scope">
              <img
                class="idImg"
                :src="scope.row.idPositiveUrl"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="enterpriseName"
            label="客户名称"
          >
          </el-table-column>
          <el-table-column
            prop="legalName"
            label="联系人"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="isFrozen"
            label="状态"
            width="80px"
          >
            <template slot-scope="scope">
              {{scope.row.is_frozen == 0 ? "正常":"已冻结"}}
            </template>
          </el-table-column>
          <el-table-column
            prop="mobie"
            label="联系电话"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="所属行业"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <a
                @click="handleClick(scope.row)"
                href="javascript:;"
                v-if="isBtnShow.freezeBtn"
              >{{scope.row.is_frozen == 0 ? "冻结":"解冻"}}</a> |
              <router-link :to="{name:'GuestDetails',query:scope.row}" v-if="isBtnShow.detailBtn">详情</router-link>
            </template>
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

  import {guest, menuBtnControl} from '@/api/index.js'

  export default {
    data () {
      return {
        queryDialogVisible: false,
        query: {
          input: null,
          region: '',
          time: ''
        },
        tableData: [
          {
            id: '',
            updateTime: '',
            idPositiveUrl: '',
            businessLicenseUrl: '',
            enterpriseName: '',
            legalName: '',
            status: '',
            mobie: '',
            industry: ''
          }
        ],
        queryPage: {
          enterpriseName: '',
          legalName: '',
          page: 1,
          size: 8,
          startTime: '',
          endTime: ''
        },
        isBtnShow: {
          selectBtn: false,
          freezeBtn: false,
          detailBtn: false
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
        guest.cusUserQueryPage(this.queryPage).then(res => {
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

      /* 冻结 解冻 */
      handleClick (obj) {
        // 传的参数，如解冻 传0 ， ，，相反数据
        obj.is_frozen = obj.is_frozen == 0 ? 1 : 0
        // console.log(obj.is_frozen);

        obj.isFrozen = obj.is_frozen
        guest.cusUserUpdateIsFrozen(obj).then(res => {
          if (res.code === 0) {
            // this.queryDialogVisible = false
            this.$message.success(res.msg)
            this.initData()
          } else {
            this.$message.error(res.msg)
          }
        })
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
              case '冻结' || '解冻':
                this.isBtnShow.freezeBtn = item.checked
                break
              case '详情' :
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
  .guestList {
  .main {
  .search {
    height: 100px;
    line-height: 100px;

  span {
    margin-right: 20px;
  }
  }

  .time {
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
