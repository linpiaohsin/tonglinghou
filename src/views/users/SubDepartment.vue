<template>
	<div class="department">
		<div class="titleTop">
			用户管理-部门管理
		</div>
		<div class="main">
			<div class="search">
				部门名称<input v-model="queryPage.name" placeholder="输入部门名称"> <button class="btn" @click="search" v-if="isBtnShow.selectBtn">查询</button>
			</div>
			<div class="table">
				<button @click="dictData" class="btn" v-if="isBtnShow.addBtn">添加</button>
				<el-table :data="tableData" border style="width: 600px">
					<el-table-column type="index" label="序号" width="100px">
					</el-table-column>
					<el-table-column prop="defaultLevel" label="部门级别">
					</el-table-column>
					<el-table-column prop="name" label="部门名称">
					</el-table-column>
					<el-table-column prop="pName" label="所属部门">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="160">
						<template slot-scope="scope">
							<a herf="javascript:;" @click="update(scope.row)" v-if="isBtnShow.editBtn">编辑</a>
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

		<!-- 添加部门 -->
		<div class="dialog">
			<el-dialog title="添加部门" :visible.sync="addDialogVisible" width="400px" center>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="所属部门" required="" label-width="100px">
						<el-select v-model="form.parentId" placeholder="请选择上级部门" >
							<el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="部门名称" required="" label-width="100px">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<button class="btn" @click="addDepartment">保存</button>
			
				</div>
			</el-dialog>
		</div>
		<!-- 编辑部门 -->
		<div class="dialog">
			<el-dialog title="编辑部门" :visible.sync="updateDialogVisible" width="400px" center>
				<el-form ref="form" :model="updateForm" label-width="80px">
					<el-form-item label="所属部门" required="" label-width="100px">
						<el-select v-model="updateForm.parentId" placeholder="请选择上级部门" >
							<el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="部门名称" required="" label-width="100px">
						<el-input v-model="updateForm.name"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<button class="btn" @click="updateDepartment">保存</button>
			
				</div>
			</el-dialog>
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
      // 添加页面显示
      addDialogVisible: false,
      // 编辑页面显示
      updateDialogVisible: false,
      query: {
        input: null
      },
      // 编辑
      updateForm: {
        name: '',
        parentId: ''
      },
      // 分页
      tableData: [],
      queryPage: {
        name: '',
        page: 1,
        size: 10
      },
      // 添加部门
      form: {
        name: '',
        parentId: ''
      },
      // 选择部门
	  options: [],
      isBtnShow: {
        selectBtn: false,
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
        sysUser.delDeptSub(row.id).then(res => {
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
    update (row) {
      this.updateDialogVisible = true
      this.$set(this.updateForm, 'name', row.name)
      this.$set(this.updateForm, 'parentId', row.parentId)
      this.$set(this.updateForm, 'id', row.id)
      sysUser.queryDept().then(res => {
        if (res.code == 0) {
          this.options = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      console.log(row)
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
    // 添加部门
    addDepartment () {
      if (this.form.name == '') {
        // error 错误
        // success 成功
        this.$message.error('请输入部门名称')
        return
      }
      sysUser.addDeptPageSub(this.form).then(res => {
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
    // 查詢
    search () {
      this.initData()
    },
    // 初始化数据
    initData () {
      sysUser.queryDeptPageSub(this.queryPage).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.rows
          // this.tableData['defaultLevel'] = '二級'
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i]['defaultLevel'] = '二級'
          }
          this.queryPage.total = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 一级部门下拉列表查询
    dictData () {
      this.addDialogVisible = true
      sysUser.queryDept().then(res => {
        if (res.code == 0) {
          this.options = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 编辑保存
    updateDepartment () {
      if (this.updateForm.name == '') {
        // error 错误
        // success 成功
        this.$message.error('部门名称不能为空')
        return
      }
      sysUser.updDeptPageSub(this.updateForm).then(res => {
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
