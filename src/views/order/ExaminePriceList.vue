<template>
	<div class="examinePriceList">
		<div class="titleTop">
			订单管理-审核报价
		</div>
		<div class="main">
			<div class="search">
				<span>订单号<input v-model="query.orderNo" placeholder="输入订单号"></span>
				<span>客户名称<input v-model="query.enterpriseName" placeholder="输入客户名称"></span>
				<!-- <span>业务员客户
					<el-select v-model="query.region" placeholder="全部">
						<el-option label="全部" value="1"></el-option>
						<el-option label="已抢单" value="2"></el-option>
						<el-option label="未抢单" value="3"></el-option>
					</el-select>
				</span> -->
				<span>
					<button class="btnMin" @click="initData" v-if="isBtnShow.selectBtn">查询</button>
				</span>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column type='index' label="序号" width="80px">
					</el-table-column>
					<el-table-column prop="totalPrice" label="报价" width="100px">
					</el-table-column>
					<el-table-column prop="orderNo" label="订单号" width="250px">
					</el-table-column>
					<el-table-column prop="enterpriseName" label="客户名称">
					</el-table-column>
					<el-table-column prop="receiver" label="联系人" width="100px">
					</el-table-column>
					<el-table-column prop="createTime" label="订单生成时间">
					</el-table-column>
					<el-table-column prop="orderNum" label="数量" width="60px">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="80" v-if="isBtnShow.grabBtn">
						<template slot-scope="scope">
							<a @click="robUpdate(scope.row.id)" href="javascript:;">抢单</a>
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
      query: {},
      tableData: [],
      param: {},
      queryPage: {
        name: '',
        page: 1,
        size: 20
      },
      isBtnShow: {
        selectBtn: false,
        grabBtn: false
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
      this.query.size = 20
      order.examinePriceListPage(this.query).then(res => {
        if (res.code === 0) {
          // this.queryDialogVisible = false
          this.tableData = res.data.rows
          //   this.$message.success(res.msg)
          this.queryPage.total = res.data.count
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    robUpdate (id) {
      this.param.id = id
      order.robUpdate(this.param).then(res => {
        if (res.code === 0) {
          sessionStorage.setItem("menuid", "125")
          this.$message.success(res.msg)
          this.$router.push('/Home/order/orderList')
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
            case '抢单':
              this.isBtnShow.grabBtn = item.checked
              break
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.examinePriceList {
		.main {

			.search {
				width:800px;
				height: 100px;
				line-height: 100px;
				display: flex;
				justify-content: space-between;

				span input {
					margin-left: 15px;
				}
			}

			// 表格

			margin-top: 30px;

			.idImg {
				width: 45px;
				height: 45px;
			}

		}
	}
</style>
