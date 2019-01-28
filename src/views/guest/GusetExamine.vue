<template>
  <div class="gusetExamine">
    <div class="titleTop">
      客户管理-客户审核
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
            label="提交时间"
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
            prop="mobie"
            label="联系电话"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80"
          >
            <template slot-scope="scope" v-if="isBtnShow.reviewBtn">
              <router-link  :to="{name:'Examine',query:scope.row}">审核</router-link>
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

import {guest, menuBtnControl} from '@/api/index.js'

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
          id: '',
          createTime: '',
          idPositiveUrl: '',
          enterpriseName: '',
          legalName: '',
          mobie: ''
        }
      ],
      queryPage: {
        enterpriseName: '',
        legalName: '',
        page: 1,
        size: 8
      },
	    isBtnShow: {
        selectBtn: false,
        reviewBtn: false
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
      guest.cusUserQueryPageNoPass(this.queryPage).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.rows
          this.queryPage.total = res.data.count
          //   this.$message.success(res.msg)
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
    // 按钮权限控制
    btnControl (parentId) {
      menuBtnControl({'parentId': parentId}).then(res => {
        console.log(res)
        res.data.forEach(item => {
          switch (item.text) {
            case '查询':
              this.isBtnShow.selectBtn = item.checked
              break
            case '审核':
              this.isBtnShow.reviewBtn = item.checked
              break
          }
        })
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.gusetExamine {
  .main {
    .search {
      height: 100px;
      line-height: 100px;
      span{
        margin-right: 20px;
      }
    }
    .btnMin{
      margin-left: 30px;
    }
    // 表格
    .table {
      margin-top: 40px;
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
