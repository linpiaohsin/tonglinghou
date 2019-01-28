<template>
	<div class="productType">
		<div class="titleTop">
			价格体系设置-产品类型
		</div>
		<div class="main">
			<div class="table">
				<router-link :to="{name:'AddProductType'}" class="btn" v-if="isBtnShow.addBtn">添加</router-link>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column type="index" label="序号" width="50px">
					</el-table-column>
					<el-table-column prop="name" label="类型名称" width="220px">
					</el-table-column>
					<el-table-column prop="defaultLevel" label="分类级别" width="100px">
					</el-table-column>
					<el-table-column prop="picUrl" label="类型图片" width="140px">
						<template slot-scope="scope">
							<img class="idImg" :src="scope.row.picUrl" alt="">
						</template>
					</el-table-column>
					<el-table-column prop="detail" label="类型详情">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="scope">
							<router-link :to="{name:'EditProductType',query:scope.row}" v-if="isBtnShow.editBtn">编辑</router-link>
              <span v-if="isBtnShow.editBtn && isBtnShow.deleteBtn">|</span>
							<a @click="handleClick(scope.row)" href="javascript:;" v-if="isBtnShow.deleteBtn">删除</a>
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
  priceSystem, menuBtnControl
} from '@/api/index.js'
export default {
  data () {
    return {
      query: {
        input: null
      },
      tableData: [],
      queryPage: {
        page: 1,
        size: 10
      },
      isBtnShow: {
        addBtn: true,
        editBtn: true,
        deleteBtn: true
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
        priceSystem.productTypeDelete(row.id).then(res => {
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
      priceSystem.productTypeQuery(this.queryPage).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.rows
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i]['defaultLevel'] = '一級'
          }
          this.queryPage.total = res.data.count
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
	.productType {
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
			}
		}
	}
</style>
