<template>
  <div class="userifo">
    <div class="titleTop">
      用户管理-用户信息
    </div>
    <div class="main">
      <div class="search">
        用户姓名<input v-model="queryPage.realName" placeholder="输入管理员姓名"> <button class="btn" @click="search" v-if="isBtnShow.selectBtn">查询</button>
      </div>
      <div class="table">
        <router-link :to="{name:'AddUserIfo'}" class="btn" v-if="isBtnShow.addBtn">添加</router-link>
        <el-table :data="tabData" border style="width: 100%">
          <el-table-column type="index" width="100px" label="序号">
          </el-table-column>
          <el-table-column prop="ownId" label="专属ID" width="100px">
          </el-table-column>
          <el-table-column prop="loginName" label="管理员账号" width="120px">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="60px">
            <template slot-scope="scope">
              {{ scope.row.status == 1 ? "禁用" : "正常" }}
            </template>
          </el-table-column>
          <el-table-column prop="roleName" label="所属角色" width="100px">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160px">
          </el-table-column>
          <el-table-column prop="deptName" label="所属部门">
          </el-table-column>
          <el-table-column prop="position" label="职位" width="60px">
          </el-table-column>
          <el-table-column prop="realName" label="姓名">
          </el-table-column>
          <el-table-column prop="belongAddress" label="籍贯">
          </el-table-column>
          <el-table-column prop="halfBodyPhoto" label="半身照">
            <template slot-scope="scope">
              <img class="idImg" :src="scope.row.halfBodyPhoto" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="idNumber" label="身份证号码" width="160px">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <router-link :to="{name:'EditUserIfo',params:scope.row}" v-if="isBtnShow.editBtn">编辑</router-link>
              <span v-if="isBtnShow.editBtn && isBtnShow.deleteBtn">|</span>
              <a @click="handleClick(scope.row)" href="javascript:;" v-if="isBtnShow.deleteBtn">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pages">
        <el-pagination background @current-change="handleCurrentChange" :page-size="queryPage.size" :total="queryPage.total"
                       layout="prev, pager, next, jumper">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import { sysUser, menuBtnControl } from '@/api/index.js'
  export default {
    data () {
      return {
        query: {
          input: null
        },
        tabData: [],
        queryPage: {
          realName: '',
          page: 1,
          size: 8
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
      // this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(
      handleClick (row) {
        console.log(row)
        this.$confirm('此操作将永久删除该信息，是否继续？', '提示', {
          confrimButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sysUser.delUser(row.id).then(res => {
            // console.log(res); 打印数据
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.initData()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(err => {
          console.log(err)
        })
      },
      handleCurrentChange (val) {
        this.queryPage.page = val
        this.initData()
      },
      initData () {
        sysUser.queryUser(this.queryPage).then(res => {
          if (res.code === 0) {
            this.tabData = res.data.rows
            this.queryPage.total = res.data.count
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      // 查询
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
    mounted () {
      let parentId = sessionStorage.getItem('menuid')
      this.btnControl(parentId)
      this.initData()
    }
  }

</script>

<style lang="scss" scoped>
  .userifo {
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
