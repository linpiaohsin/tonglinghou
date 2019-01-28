<template>
  <div class="department">
    <div class="titleTop">
      价格体系设置-报价项管理
    </div>
    <div class="main">
      <div class="table">
        <button @click="addData" class="btn" v-if="isBtnShow.addBtn">添加</button>
        <el-table :data="tableData" border style="width: 600px">
          <el-table-column type="index" label="序号" width="100px">
          </el-table-column>
          <el-table-column label="所属类目" prop="name">
          </el-table-column>
          <el-table-column label="报价项名称" prop="value">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <a @click="update(scope.row)" v-if="isBtnShow.editBtn">编辑</a>
              <span v-if="isBtnShow.editBtn && isBtnShow.deleteBtn">|</span>
              <a @click="deleted(scope.row)" href="javascript:;" v-if="isBtnShow.deleteBtn">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <div class="pages">
          <el-pagination :current-page.sync="queryPage.page" :page-size="queryPage.size" :total="queryPage.total"
                         @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 添加部门 -->
    <div class="dialog">
      <el-dialog :visible.sync="addDialogVisible" center :title="title" width="600px">
        <el-form :model="form" label-width="90px" ref="form">
          <el-form-item label="类目名称">
            <el-input placeholder="输入类目名称" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="类目选项 I">
            <el-tag :disable-transitions="false" :key="tag.index" @close="handleClose(tag)" closable v-for="tag in dynamicTags">
              {{tag}}
            </el-tag>
            <el-input @blur="handleInputConfirm" @keyup.enter.native="handleInputConfirm" closable class="input-new-tag" ref="saveTagInput"
                      size="small" v-if="inputVisible" v-model="inputValue">
            </el-input>
            <el-button @click="showInput" class="button-new-tag el-icon-plus" size="small" v-else></el-button>
          </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
          <button class="btn" @click="submitToSave">确定</button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import {
  priceSystem, menuBtnControl
} from '@/api/index.js'
export default {
  data () {
    return {
      addDialogVisible: false,
      query: {
        input: null
      },
      tableData: [],
      queryPage: {
        page: 1,
        size: 10
      },
      // 添加部门
      form: {
        name: ''
      },
      // 选择部门
      options: [],
      // 类目名称I
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      title: '',
      isBtnShow: {
        addBtn: true,
        editBtn: true,
        deleteBtn: true
      }
    }
  },
  methods: {
    addData () {
      this.addDialogVisible = true
      this.form = {}
      this.dynamicTags = []
      this.title = '报价项管理-添加'
    },
    update (row) {
      this.title = '报价项管理-编辑'
      this.dynamicTags = []
      this.form = row
      this.addDialogVisible = true
      priceSystem.productItemQuery({id: this.form.id}).then(res => {
        if (res.data.rows.length > 0) {
          for (let i of res.data.rows) {
            this.dynamicTags.push(i.value)
          }
        }
      })
    },
    // 删除
    deleted (row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        priceSystem.productItemDelete({id: row.subId}).then(res => {
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
      priceSystem.productItemQuery(this.queryPage).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.rows
          console.log(this.tableData)
          this.queryPage.total = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加部门
    addDepartment () {},
    // 添加类目名称I
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    submitToSave () {
      this.form.values = this.dynamicTags
      if (this.form.id === undefined) {
        console.log(111)
        priceSystem.productItemAdd(this.form).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.addDialogVisible = !this.addDialogVisible
            this.initData()
            this.form = {}
            this.dynamicTags = []
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        console.log(this.form)
        priceSystem.productItemUpdate(this.form).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.addDialogVisible = !this.addDialogVisible
            this.initData()
            this.form = {}
            this.dynamicTags = []
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
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
  .department {
  .main {

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
<style>
  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
