<template>
  <div class="advertisement">
    <div class="titleTop">
      客户端管理-弹窗设置
    </div>
    <div class="main">
      <div class="table">
        <router-link :to="{name:'EditAdvertisement'}" class="btn" v-if="isBtnShow.addBtn">添加</router-link>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50px">
          </el-table-column>
          <el-table-column prop="name" label="弹窗名称">
          </el-table-column>
          <el-table-column prop="picUrl" label="产品图片">
            <template slot-scope="scope">
              <img class="idImg" :src="scope.row.picUrl" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="detail" label="产品详情">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <a href="javascript:;" @click="changeUseStatus(scope.row.id,scope.row.isUse)" v-if="isBtnShow.isUserBtn">{{scope.row.isUse == 0?'启用':'不启用'}}

              </a>
              <span v-if="isBtnShow.isUserBtn && isBtnShow.editBtn">|</span>
              <router-link :to="{name:'EditAdvertisement',query:scope.row}" v-if="isBtnShow.editBtn">编辑</router-link>
              <span v-if="isBtnShow.editBtn && isBtnShow.deleteBtn">|</span>
              <a @click="handleClick(scope.row.id)" href="javascript:;" v-if="isBtnShow.deleteBtn">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="queryPage.page"
                       :page-size="queryPage.size"
                       layout="prev, pager, next, jumper" :total="queryPage.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {client, menuBtnControl} from '@/api/index.js'

export default {
  data () {
    return {
      query: {
        input: null
      },
      tableData: [],
      queryPage: {
        name: '',
        page: 1,
        size: 8,
        count: null
      },
      isBtnShow: {
        addBtn: false,
        isUserBtn: false,
        editBtn: false,
        deleteBtn: false
      }
    }
  },
  mounted () {
    let parentId = sessionStorage.getItem('menuid')
    this.btnControl(parentId)
    this.initData()
  },

  methods: {
    changeUseStatus (id, status) {
      client.selectUseStatus({
        'id': id,
        'isUse': !status
      }).then((res) => {
        if (res.code == 0) {
          this.initData()
          console.log(res)
        }
      })
    },
    initData () {
      client.queryPageAd(this.queryPage).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.rows
          console.log(this.tableData)
          this.queryPage.count = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加
    add () {
      if (this.form.name === '' || this.form.contactPhone === '' || this.form.contacts === '' || this.form.address === '') {
        // error 错误
        // success 成功
        this.$message.error('您输入的工厂名称或联系电话或联系人或工厂地址为空')
        return
      }

      client.add(this.form).then(res => {
        // 打印数据
        if (res.code === 0) {
          this.addDialogVisible = false
          this.$message.success(res.msg)

          this.initData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    // 删除用户
    handleClick (id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        client.popupAddelete({'id': id}).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.initData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
        console.log(res)
        res.data.forEach(item => {
          switch (item.text) {
            case '添加':
              this.isBtnShow.addBtn = item.checked
              break
            case '启用' || '不启用':
              // this.isBtnShow.isUserBtn = item.checked
              this.isBtnShow.isUserBtn = true
              break
            case '编辑':
              this.isBtnShow.editBtn = item.checked
              break
            case '删除':
              this.isBtnShow.deleteBtn = item.checked
              break
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .advertisement {
    .main {

      // 表格
      .table {
        > .btn {
          margin: 30px 0;
        }

        .idImg {
          width: 45px;
          height: 45px;
        }

        //   产品详细
        .text {
          width: 150px;
        }
      }
    }
  }
</style>
