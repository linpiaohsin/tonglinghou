<template>
  <div class="productList">
    <div class="titleTop">
      客户端管理-产品列表
    </div>
    <div class="main">
      <div class="search">
        产品名称<input
          v-model="queryPage.name"
          placeholder="请输入产品名称"
        > <button class="btn" @click="initData" v-if="isBtnShow.selectBtn">查询</button>
      </div>
      <div class="table">
        <router-link
          :to="{name:'EditProduct'}"
          class="btn"
          v-if="isBtnShow.addBtn"
        >添加</router-link>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50px"
          >
          </el-table-column>
          <el-table-column
            prop="productTypeName"
            label="产品类型"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="产品名称"
          >
          </el-table-column>
          <el-table-column
            prop="pic_url"
            label="产品图片"
          >
            <template slot-scope="scope">
              <img
                class="idImg"
                :src="scope.row.pic_url"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            width="60px"
          >
          </el-table-column>
          <el-table-column
            prop="detail"
            label="产品详情"
          >

          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180"
            v-if="isBtnShow.editBtn || isBtnShow.deleteBtn"
          >
            <template slot-scope="scope">
              <router-link :to="{name:'EditProduct',query:scope.row}" v-if="isBtnShow.editBtn">编辑</router-link>
              <span v-if="isBtnShow.editBtn && isBtnShow.deleteBtn">|</span>
              <a
                @click="handleClick(scope.row.id)"
                href="javascript:;"
                v-if="isBtnShow.deleteBtn"
              >删除</a>
              <!--<router-link :to="{name:'EditProductDetail',query:scope.row}">详情编辑</router-link>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="queryPage.page"
          :page-size="queryPage.size"
          layout="prev, pager, next, jumper"
          :total="queryPage.count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { client, menuBtnControl } from '@/api/index.js'
export default {
  data () {
    return {
      query: {
        input: null
      },
      tableData: [],
      queryPage: {
        pName: '',
        page: 1,
        size: 8,
        count: null
      },
      isBtnShow: {
        selectBtn: false,
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

    initData () {
      client.queryPage(this.queryPage).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.rows
          this.queryPage.count = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 删除用户
    handleClick (id) {
      console.log(id)

      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        client.deleteProduct({'id': id }).then(res => {
      	  if (res.code === 0) {
      			this.$message.success('删除成功')
      	    this.initData()
      	  } else {
      	    this.$message.error(res.msg)
      	  }
      	}, () => {
      	this.$message({
      		type: 'info',
      		message: '已取消删除'
      	})
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 分页
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.queryPage.page = val
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
.productList {
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
      > .btn {
        margin: 30px 0;
      }
      .idImg {
        width: 45px;
        height: 45px;
      }
    //   产品详细
    .text{
        width: 150px;
    }
    }
  }
}
</style>
