<template>
  <div class="role">
    <div class="titleTop">
      用户管理-角色管理
    </div>
    <div class="main">
      <div class="search">
        角色名称<input v-model="queryPage.roleName" placeholder="输入角色名称"> <button class="btn" @click="search" v-if="isBtnShow.selectBtn">查询</button>
      </div>
      <div class="table">
        <router-link :to="{name:'AddRole'}" class="btn" v-if="isBtnShow.addBtn">添加</router-link>
        <el-table :data="tableData" border style="width: 600px">
          <el-table-column type="index" label="序号" width="100px">
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <router-link :to="{name:'EditRole',query:scope.row}" v-if="isBtnShow.editBtn">编辑</router-link>
              <span v-if="isBtnShow.editBtn && isBtnShow.deleteBtn">|</span>
              <a @click="handleClick(scope.row)" href="javascript:;" v-if="isBtnShow.deleteBtn">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <div class="pages">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryPage.page"
                         :page-size="queryPage.size" layout="prev, pager, next, jumper" :total="queryPage.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  sysUser, menuBtnControl
} from '@/api/index.js'
export default {
  data () {
    return {
      query: {
        input: null
      },
      tableData: [],
      queryPage: {
        roleName: '',
        page: 1,
        size: 10
      },
      isBtnShow: {
        selectBtn: false,
        addBtn: false,
        editBtn: false,
        deleteBtn: false
      }
    }
  },
  methods: {
    // 删除用户
    handleClick (row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sysUser.delRole(row.id).then(res => {
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
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryPage.page = val
      this.initData()
    },
    // 初始化数据
    initData () {
      sysUser.queryRole(this.queryPage).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.rows
          this.queryPage.total = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      })
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
            case '添加':
              this.isBtnShow.addBtn = item.checked
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
  },
  // 查询接口

  mounted () {
    let parentId = sessionStorage.getItem('menuid')
    this.btnControl(parentId)
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
  .role {
  .main {
  .search {
    height: 100px;
    line-height: 100px;

  input {
    margin: 0 20px;
  }
  }

  // 表格
     .table {
       width: 600px;

  >.btn {
    margin: 30px 0;
  }

  .idImg {
    width: 45px;
    height: 45px;
  }
  }
  }
  }
</style>
