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
				<button @click="addDialogVisible = true" class="btn" v-if="isBtnShow.addBtn">添加</button>
				<el-table :data="tabData" border style="width: 600px">
					<el-table-column type="index" label="序号" width="100px">
					</el-table-column>
					<!--<el-table-column-->
					<!--prop="name"-->
					<!--label="部门名称"-->
					<!--&gt;-->
					<!--</el-table-column>-->
					<el-table-column prop="name" label="部门名称">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="240">
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
			<el-dialog title="添加部门" :visible.sync="addDialogVisible" width="320px" center>
				<p><span style="color:red">*</span>部门名称 <input v-model="form.name" type="text" placeholder="输入部门名称"></p>
				<span slot="footer" class="dialog-footer">
					<button class="btn" @click="addDepartment" >保存</button>

				</span>
			</el-dialog>
		</div>

		<!-- 修改部门 -->
		<div class="dialog">
			<el-dialog title="编辑部门" :visible.sync="updateDialogVisible" width="320px" center>
				<p><span style="color:red">*</span>部门名称 <input v-model="updateForm.name" type="text" placeholder="输入部门名称"></p>
				<span slot="footer" class="dialog-footer">
          <button class="btn" @click="addDepartment">保存</button>
		
				</span>
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
      addDialogVisible: false,
      updateDialogVisible: false,
      query: {
        input: null
      },
      updateForm: {
        name: ''
      },
      tabData: [],
      queryPage: {
        name: '',
        page: 1,
        size: 10
      },
      // 添加部门
      form: {
        name: ''
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
    goback(){
      this.addDialogVisible =  false
      this.updateDialogVisible = false
    },
    // 删除用户
    handleClick (row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sysUser.delDept(row.id).then(res => {
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
      this.$set(this.updateForm, 'id', row.id)
      console.log(row)
    },
    // 查询数据
    search () {
      this.initData()
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
    initData () {
      sysUser.queryDeptPage(this.queryPage).then(res => {
        if (res.code === 0) {
          this.tabData = res.data.rows
          this.queryPage.total = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加部门
    addDepartment: function () {
      if (this.form.name === '') {
        // error 错误
        // success 成功
        this.$message.error('请输入部门名称')
        return
      }
      sysUser.addDeptPage(this.form).then(res => {
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
    updateDepartment () {
      if (this.updateForm.name === '') {
        // error 错误
        // success 成功
        this.$message.error('部门名称不能为空')
        return
      }
      sysUser.updDeptPage(this.updateForm).then(res => {
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

			// 对话框
			.dialog {
				p {
					text-align: center;
				}
			}
		}
	}
</style>
