<template>
  <div class="gusetRegistration">
    <div class="titleTop">
      客户管理-客户信息登记
    </div>
    <div class="main">
      <!-- 搜索 -->
      <div class="search">
        <span>客户名称 &nbsp;&nbsp;<input
          v-model="queryPage.enterpriseName"
          placeholder="输入客户名称"
        ></span>
        <span>联系人 &nbsp;&nbsp;<input
          v-model="queryPage.contacts"
          placeholder="输入联系人"
        ></span>
      </div>

      <div>
        <span class="timeSelect">时间&nbsp;&nbsp;
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
            prop="email"
            label="联系邮箱"
          >
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="联系电话"
          >
          </el-table-column>
          <el-table-column
            prop="enterpriseName"
            label="客户名称"
          >
          </el-table-column>
          <el-table-column
            prop="contacts"
            label="联系人"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="提交时间"
          >
          </el-table-column>
          <el-table-column
            prop="cooperateContent"
            label="合作意向(内容)"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              
   
              <a href="javascript:;"  @click="gouTong(scope.row)"  v-if="isBtnShow.isContactBtn">
                <span style="color:#333333" v-if="scope.row.isContact == 0"> {{scope.row.isContact == 0 ? "未沟通":"已沟通"}}</span>
                <span v-if="scope.row.isContact == 1"> {{scope.row.isContact == 0 ? "未沟通":"已沟通"}}</span>
              </a>
             <!-- <router-link :to="{name:'',params:scope.row.id}">沟通</router-link>-->
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
    <!-- 备注详情 -->
    <el-dialog title="备注详情" :visible.sync="dialogFormVisible" width="380px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="备注详情">
          <el-input type="textarea" v-model="form.remark" class="textarea"></el-input>
        </el-form-item>
        <el-form-item label="备注时间">
          <el-input v-model="form.remarkTime"></el-input>
        </el-form-item>
      </el-form>
      <p class="btnP">
        <button @click="remark"  class="btnMin">确 定</button>
      </p>
    </el-dialog>
  </div>
</template>

<script>

import {guest, menuBtnControl} from '@/api/index.js'

export default {
  data () {
    return {
      dialogFormVisible: false,
      query: {
        input: null,
        region: '',
        time: ''
      },
      tableData: [
        {
          id: '',
          email: '',
          contactPhone: '',
          enterpriseName: '',
          contacts: '',
          createTime: '',
          cooperateContent: ''
        }
      ],
      queryPage: {
        name: '',
        page: 1,
        size: 8
      },
      form: {
        remark: '',
        remarkTime: '',
        id: ''
      },
      goutong: {
        id: '',
        isContact: ''
      },
	    isBtnShow: {
        selectBtn: false,
        remarkBtn: false,
        isContactBtn: false
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
      guest.cusConsultQueryPage(this.queryPage).then(res => {
        if (res.code === 0) {
          // this.queryDialogVisible = false
          this.tableData = res.data.rows
          this.queryPage.total = res.data.count
          //   this.$message.success(res.msg)
          console.log('--->', res.data.rows)
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
    // 获取 备注 当前信息
    handleRemarks (obj) {
      this.dialogFormVisible = true
      this.form.remark = obj.remark
      this.form.remarkTime = obj.remarkTime
      this.form.id = obj.id
    },
    // 备注 修改
    remark () {
      this.form.isContact = 1
      guest.cusConsultUpdateRemark(this.form).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.dialogFormVisible = false
          this.initData()
          // this.tableData = res.data.rows
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    // 沟通 ，已沟通
    gouTong (obj) {
      this.goutong.id = obj.id
      guest.cusConsultUpdateRemark(this.goutong).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.initData()
          //  this.dialogFormVisible = false
          // this.tableData = res.data.rows

          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      })
      this.handleRemarks(obj)
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
            case '备注':
              this.isBtnShow.remarkBtn = item.checked
              break
            case '沟通' || '已沟通':
              this.isBtnShow.isContactBtn = item.checked
              break
          }
        })
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .gusetRegistration {
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

    .btnP {
      text-align: center;
    }
  }
</style>
<style>
  .el-textarea__inner {
    min-height: 120px !important;
  }
</style>
