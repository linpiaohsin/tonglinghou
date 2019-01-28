<template>
	<div class="userifo">
		<div class="titleTop">
			订单管理-售后申请
		</div>
		<div class="main">
			<div class="search">
				<span>订单号<input v-model="query.orderNo" placeholder="输入订单号"></span>
				<span>客户名称<input v-model="query.companyName" placeholder="输入客户名称"></span>
				<span>
					<button class="btnMin" @click="initData" v-if="isBtnShow.selectBtn">查询</button>
				</span>
			</div>
			<div class="table">
				<el-table :data="tableData" border>
					<!-- <el-table-column
           prop="id"
           label="ID"
           width="50px"
         > -->
					</el-table-column>
					<el-table-column prop="type" label="申请类型" width="80px">
					</el-table-column>
					<el-table-column prop="orderNo" label="订单号" width="250px">
					</el-table-column>
					<el-table-column prop="companyName" label="客户名称">
					</el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{scope.row.status == '1' ? '已处理' : '未处理'}}
            </template>
          </el-table-column>
					<el-table-column prop="cause" label="备注信息" width="140px">
					</el-table-column>
					<el-table-column prop="orderCreateTime" label="订单生成时间">
					</el-table-column>
					<el-table-column prop="factory" label="生产工厂">
					</el-table-column>
          <el-table-column
            prop="agreeInfo"
            label="客服备注"
          >
          </el-table-column>
					<el-table-column fixed="right" label="操作" width="60" v-if="isBtnShow.viewBtn">
						<template slot-scope="scope">
							<router-link :to="{name:'AfterSaleDetail',params:scope.row}">查看</router-link>
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
import {
  order, menuBtnControl
} from '@/api/index.js'

export default {
  data () {
    return {
      query: {
        input: null,
        region: ''
      },
      tableData: [],
      queryPage: {
        name: '',
        page: 1,
        size: 8
	  },
	  isBtnShow: {
        selectBtn: false,
        viewBtn: false
      }
    }
  },
  mounted () {
    let parentId = sessionStorage.getItem('menuid')
    this.btnControl(parentId)
    this.initData()
  },
  methods: {
    initData () {
      order.afterSalePage(this.query).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.rows
          this.queryPage.total = res.data.count
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
      this.query.page = val
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
            case '查看':
              this.isBtnShow.viewBtn = item.checked
              break
          }
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
	.userifo {
		.main {

			.search {
				width: 800px;
				height: 100px;
				line-height: 100px;
				display: flex;
				justify-content: space-between;

				span input {
					margin-left: 15px;
				}
			}

			// 表格
			.table {
				margin-top: 60px;

				.idImg {
					width: 45px;
					height: 45px;
				}
			}
		}
	}
</style>
