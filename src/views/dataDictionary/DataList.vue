<template>
	<div class="advertisement">
		<div class="titleTop">
			数据字典-字典表格
		</div>
		<div class="main">
			<div class="table">
				<router-link :to="{name:'EditDataDictionary'}" class="btn" v-if="isBtnShow.addBtn">添加</router-link>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column type="index" label="ID" width="50px">
					</el-table-column>
					<el-table-column prop="name" label="标签名">
					</el-table-column>
					<el-table-column prop="value" label="数据值">
					</el-table-column>
					<el-table-column prop="code" label="类型(编码)">
					</el-table-column>
					<el-table-column prop="description" label="描述">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="140">
						<template slot-scope="scope">
							<router-link :to="{name:'UpdateDataDictionary',params:scope.row}" v-if="isBtnShow.editBtn">编辑</router-link>
              <span v-if="isBtnShow.editBtn && isBtnShow.deleteBtn">|</span>
							<a @click="handleClick(scope.row.id)" href="javascript:;" v-if="isBtnShow.deleteBtn">删除</a>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pages">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryPage.page"
				 :page-size="queryPage.size" layout="prev, pager, next, jumper" :total="queryPage.total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import {
  dictionaries, menuBtnControl
} from '@/api/index.js'

export default {
  data () {
    return {
      query: {
        input: null
      },
      tableData: [{

      }],
      queryPage: {
        page: 1,
        size: 8
      },
      isBtnShow: {
        addBtn: false,
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
    // 查询
    initData () {
      dictionaries.sysDictQueryPage(this.queryPage).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.rows
          this.queryPage.total = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },

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
        dictionaries.sysDictDelete({
          'id': id
        }).then(res => {
          if (res.code === 0) {
            // this.addDialogVisible = false
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
  }
}
</script>

<style lang="scss" scoped>
	.advertisement {
		.main {

			// 表格
			.table {
				>.btn {
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
