<template>
  <div class="department">
    <div class="titleTop">
      价格体系设置-表面处理
    </div>
    <div class="main">
      <div class="table">
        <button
          @click="addDialogVisible = true"
          class="btn"
          v-if="isBtnShow.addBtn"
        >添加</button>
        <el-table
          :data="tableData"
          border
          style="width: 600px"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="表面处理类型"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格系数"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
          >
            <template slot-scope="scope">
              <a  herf="javascript:;" @click="update(scope.row)" v-if="isBtnShow.editBtn">编辑</a>
              <span v-if="isBtnShow.editBtn && isBtnShow.deleteBtn">|</span>
              <a
                @click="handleClick(scope.row)"
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

    <!-- 添加部门 -->
    <div class="dialog">
      <el-dialog
        title="表面处理-添加"
        :visible.sync="addDialogVisible"
        width="400px"
        center
      >
        <el-form
          ref="form"
          :model="form"
          label-width="130px"
        >
          <el-form-item label="表面处理名称" required="">
            <el-input v-model="form.name" placeholder="输入表面处理名称"></el-input>
          </el-form-item>
          <el-form-item label="价格系数" required="">
            <el-input v-model="form.price" placeholder="输入价格系数"></el-input>
          </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <button class="btn" @click="addSpecialProcess">确定</button>
   
          </div>
      </el-dialog>
    </div>
    <!-- 编辑部门 -->
    <div class="dialog">
      <el-dialog
        title="表面处理-编辑"
        :visible.sync="updateDialogVisible"
        width="400px"
        center
      >
        <el-form
          ref="updateForm"
          :model="updateForm"
          label-width="130px"
        >
          <el-form-item label="特色工艺名称" required="">
            <el-input v-model="updateForm.name" placeholder="输入特色工艺名称"></el-input>
          </el-form-item>
          <el-form-item label="价格系数" required="">
            <el-input v-model="updateForm.price" placeholder="输入价格系数"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <button class="btn" @click="updateSpecialProcess">确定</button>

        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { priceSystem, menuBtnControl } from '@/api/index.js'
export default {
  data () {
    return {
      addDialogVisible: false,
      updateDialogVisible: false,
      query: {
        input: null
      },
      tableData: [],
      queryPage: {
        page: 1,
        size: 10
      },
      // 编辑
      updateForm: {
        name: '',
        price: ''
      },
      // 添加
      form: {
        name: '',
        price: ''
      },
      isBtnShow: {
        addBtn: false,
        editBtn: false,
        deleteBtn: false
      }
    }
  },
  methods: {
    goback(){
      this.addDialogVisible = false
      this.updateDialogVisible = false
    },
    // 删除用户
    handleClick (row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
      	confirmButtonText: '确定',
      	cancelButtonText: '取消',
      	type: 'warning'
      }).then(() => {
      	priceSystem.specialProcessDelete(row.id).then(res => {
      	  if (res.code == 0) {
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
      priceSystem.specialProcessQuery(this.queryPage).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.rows
          this.queryPage.total = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加表面处理
    addSpecialProcess () {
      if (this.form.name == '') {
        // error 错误
        // success 成功
        this.$message.error('请输入表面处理名称')
        return
      }
      if (this.form.price == '') {
        this.$message.error('请输入价格系数')
        return
      }
      priceSystem.specialProcessAdd(this.form).then(res => {
        // console.log(res); 打印数据
        if (res.code == 0) {
          this.addDialogVisible = false
          this.initData()
        } else {
          this.$message.error(res.msg)
        }
        console.log(res)
      })
    },
    // 修改表面处理
    updateSpecialProcess () {
      if (this.updateForm.name == '') {
        // error 错误
        // success 成功
        this.$message.error('请输入特殊工艺名称')
        return
      }
      if (this.updateForm.price == '') {
        this.$message.error('请输入价格系数')
        return
      }
      priceSystem.specialProcessUpdate(this.updateForm).then(res => {
        // console.log(res); 打印数据
        if (res.code == 0) {
          this.updateDialogVisible = false
          this.initData()
        } else {
          this.$message.error(res.msg)
        }
        console.log(res)
      })
    },
    update (row) {
      this.updateDialogVisible = true
      this.$set(this.updateForm, 'name', row.name)
      this.$set(this.updateForm, 'id', row.id)
      this.$set(this.updateForm, 'price', row.price)
      console.log(row)
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
      > .btn {
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
