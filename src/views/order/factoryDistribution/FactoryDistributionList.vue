<template>
	<div class="userifo">
		<div class="titleTop">
			订单管理-工厂分配
		</div>
		<div class="main ">
			<div class="search">
				<span>订单号<input v-model="query.orderNo" placeholder="输入订单号"></span>
				<span>客户名称<input v-model="query.enterpriseName" placeholder="输入客户名称"></span>
        <span>
          分配状态
          <el-select v-model="query.distributed" placeholder="请选择">
            <el-option
              key="全部"
              label="全部"
              value="">
            </el-option>
            <el-option
              key="未分配"
              label="未分配"
              value="0">
            </el-option>
            <el-option
              key="已分配"
              label="已分配"
              value="1">
            </el-option>
          </el-select>
        </span>
        <span>
					<button class="btnMin" @click="initData" v-if="isBtnShow.selectBtn">查询</button>
				</span>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column type="index" label="序号" width="100px">
					</el-table-column>
					<el-table-column prop="orderStatus" label="分配状态" width="100px">
						<template slot-scope="scope">
							<div v-if="scope.row.factoryId != null">
								已分配
							</div>
              <div v-else>
								未分配
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="orderNo" label="订单号" width="250px">
					</el-table-column>
					<el-table-column prop="enterpriseName" label="客户名称" width="200px">
					</el-table-column>
					<el-table-column prop="legalName" label="联系人" width="120px">
					</el-table-column>
					<el-table-column prop="createTime" label="订单生成时间">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="80">
						<template slot-scope="scope">
							<router-link :to="{name:'FactoryDistribution',query:scope.row}" v-if="isBtnShow.factoryBtn">分配工厂</router-link>
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
        region: '',
        distributed: ''
      },
      tableData: [],
      queryPage: {
        name: '',
        page: 1,
        size: 20
      },
      isBtnShow: {
        selectBtn: false,
        factoryBtn: false
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
      order.factoryDistributionListPage(this.query).then(res => {
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
    // 按钮权限控制
    btnControl (parentId) {
      menuBtnControl({'parentId': parentId}).then(res => {
        console.log(res)
        res.data.forEach(item => {
          switch (item.text) {
            case '查询':
              this.isBtnShow.selectBtn = item.checked
              break
            case '分配工厂':
              this.isBtnShow.factoryBtn = item.checked
              break
          }
        })
      })
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.query.page = val
      this.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
	.userifo {
		.main {
			.search {
				/*width: 800px;*/
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
