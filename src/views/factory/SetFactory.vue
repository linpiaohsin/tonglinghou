<template>
  <div class="department">
    <div class="titleTop">
      工厂管理-工厂列表
    </div>
    <div class="main">
      <div class="search">
        工厂名称<input
        v-model="queryPage.name"
        placeholder="请输入工厂名称"
      >
        <button class="btn" @click="initData" v-if="isBtnShow.selectBtn">查询</button>
      </div>
      <div class="table">
        <button
          @click="addDialogVisible = true"
          class="btn"
          v-if="isBtnShow.addBtn"
        >添加工厂
        </button>
        <el-table
          :data="tableData"
          border
          style="width: 1000px"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="工厂名称"
          >
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="联系方式"
            width="140px"
          >
          </el-table-column>
          <el-table-column
            prop="contacts"
            label="联系人"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="工厂地址"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
          >
            <template slot-scope="scope">
              <a herf="javascript:;" @click="addDialogVisible1 = true; form1=scope.row" v-if="isBtnShow.editBtn">编辑</a>
              |
              <a
                @click="handleClick(scope.row.id)"
                href="javascript:;"
                v-if="isBtnShow.deleteBtn"
              >删除</a>
            </template>
          </el-table-column>
        </el-table>
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

    <!-- 添加工厂 -->
    <div class="dialog">
      <el-dialog
        title="添加工厂"
        :visible.sync="addDialogVisible"
        width="500px"
        center
      >
        <el-form
          ref="form"
          :model="form"
          label-width="150px"
        >
          <el-form-item label="工厂名称" required="">
            <el-input v-model="form.name" placeholder="请输入工厂名称"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" required="">
            <el-input v-model="form.contactPhone" placeholder="请输入工厂联系方式"></el-input>
          </el-form-item>
          <el-form-item label="联系人" required="">
            <el-input v-model="form.contacts" placeholder="请输入工厂联系人"></el-input>
          </el-form-item>
          <el-form-item label="工厂地址" required="">
            <el-input v-model="form.address" placeholder="请输入工厂地址"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <button class="btn" @click="addDepartment">新增</button>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑工厂 -->
    <div class="dialog">
      <el-dialog
        title="编辑工厂"
        :visible.sync="addDialogVisible1"
        width="500px"
        center
      >
        <el-form
          ref="form1"
          :model="form1"
          label-width="150px"
        >
          <el-form-item label="工厂名称" required="">
            <el-input v-model="form1.name" placeholder="请输入工厂名称"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" required="">
            <el-input v-model="form1.contactPhone" placeholder="请输入工厂联系方式"></el-input>
          </el-form-item>
          <el-form-item label="联系人" required="">
            <el-input v-model="form1.contacts" placeholder="请输入工厂联系人"></el-input>
          </el-form-item>
          <el-form-item label="工厂地址" required="">
            <el-input v-model="form1.address" placeholder="请输入工厂地址"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <button class="btn" @click="editDepartment">修改</button>
        </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { factory, menuBtnControl } from '@/api/index.js'

export default {
  data () {
    return {
      name: '',
      addDialogVisible: false,
      addDialogVisible1: false,
      tableData: [],
      queryPage: {
        name: '',
        page: 1,
        size: 8
      },
      // 添加部门
      form: {
        name: '',
        contactPhone: '',
        contacts: '',
        address: ''
      },
      // 编辑 部门
      form1: {
        id: '',
        name: '',
        contactPhone: '',
        contacts: '',
        address: ''
      },
      isBtnShow: {
        addBtn: false,
        selectBtn: false,
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
    // 删除用户
    handleClick: function (id) {
      if (id === '') {
        this.$message.error('您输入的 id不能为空！')
        return
      }
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        factory.factoryDelete({'id': id}).then(res => {
				  if (res.code === 0) {
				    this.addDialogVisible = false
				    this.$message.success(res.msg)
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
    // 查询
    initData () {
      factory.factoryQueryPage(this.queryPage).then(res => {
        if (res.code === 0) {
          this.addDialogVisible = false
          this.tableData = res.data.rows
          this.queryPage.total = res.data.count
          // this.$message.success(res.msg)
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
    // 添加部门
    addDepartment () {
      if (this.form.name === '' || this.form.contactPhone === '' || this.form.contacts === '' || this.form.address === '') {
        // error 错误
        // success 成功
        this.$message.error('您输入的工厂名称或联系电话或联系人或工厂地址为空')
        return
      }

      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(this.form.contactPhone)) {
        this.$message.error('手机号码格式不正确！')
        return
      }

      factory.factoryAdd(this.form).then(res => {
        // 打印数据
        if (res.code === 0) {
          this.addDialogVisible = false
          this.$message.success(res.msg)

          this.initData()
        } else {
          this.$message.error(res.msg)
        }
        console.log(res)
      })
    },
    // 编辑
    editDepartment () {

      if (this.form1.name === '' || this.form1.contactPhone === '' || this.form1.contacts === '' || this.form1.address === '') {
        // error 错误
        // success 成功
        this.$message.error('您输入的工厂名称或联系电话或联系人或工厂地址为空')
        return
      }

      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(this.form1.contactPhone)) {
        this.$message.error('手机号码格式不正确！')
        return
      }

      factory.factoryUpdate(this.form1).then(res => {
        if (res.code === 0) {
          this.addDialogVisible1 = false
          this.initData()
          this.$message.success(res.msg)
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
            case '添加工厂':
              this.isBtnShow.addBtn = item.checked
              break
            case '查询':
              this.isBtnShow.selectBtn = item.checked
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
  .department {
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
        //   width: 600px;
        > .btn {
          margin: 30px 0;
        }

        .idImg {
          width: 45px;
          height: 45px;
        }
      }

      // 对话框
      .dialog {
        p {
          text-align: center;
        }
      }
    }
  }
</style>
