<template>
  <div class="guestDetails">
    <div class="titleTop">
      客户管理-客户列表-详情
    </div>
    <div class="main">
      <div class="ifo">
        <ul>
          <li><span>客户名称：</span>{{clientData.enterpriseName}}
            <span>纳税人识别号：</span>{{clientData.taxpayer_no}}</li>
          <li>
            <span>法人身份证：</span>
              <img
                class="idImg"
                :src= "clientData.idPositiveUrl"
                alt=""
              >
            <img
              class="idImg"
              :src= "clientData.idNegativeUrl"
              alt=""
            >
          </li>
          <li>
            <span>营业执照：</span>
            <img
              class="idImg"
              :src= "clientData.businessLicenseUrl"
              alt=""
            >
          </li>
          <li><span>法人代表：</span>{{clientData.legalName}}<span>联系电话：</span>{{clientData.mobie}}</li>
          <li><span>注册时间：</span>{{clientData.create_time}}</li> <!-- 注册时间，还没有，先用创建时间 -->
          <li><span>公司地址：</span> {{clientData.address}}</li>
        </ul>
        <div class="adress fr">
          <h5>默认地址：</h5>
          <p>联系人：{{clientData.legalName}}</p>
          <p>电话：{{clientData.mobie}}</p>
          <p>联系地址：{{clientData.provinceName}}{{clientData.cityName}}{{clientData.districtName}}{{clientData.address}}</p>
        </div>
      </div>
      <div class="orderList">
        <h4>保存订单：</h4>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="ID"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop= "remark"
            label="备注信息"
            width="80px"
          >
          </el-table-column>
      <!--    <el-table-column
            prop="orderStatus"
            label="订单状态"
            width="80px"
          >
            <template slot-scope="scope">
              {{scope.row.orderStatus | statusFilters }}
            </template>
          </el-table-column>  -->

          <el-table-column
            prop="orderNo"
            label="订单号"
            width="140px"
          >
          </el-table-column>
          <el-table-column
            prop= "enterpriseName"
            label="客户名称"
          >
          </el-table-column>
          <el-table-column
            prop="ownId"
            label="所属业务员ID"
          >
          </el-table-column>
          <el-table-column
            prop="receiver"
            label="联系人"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="订单生成时间"
            width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="数量"
            width="60px"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80px"
          >
            <template slot-scope="scope">
              <router-link :to="{name:'OrderDraftDetails',params:scope.row}">详情</router-link>
            </template>
          </el-table-column>
        </el-table>
      <!-- 分页 -->
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
  </div>
</template>

<script>

import {guest} from '@/api/index.js'

export default {
  filters: {
    statusFilters: function (value) {
      if (value === 0) {
        return '审核中'
      } else if (value === 1) {
        return '未支付'
      } else if (value === 2) {
        return '下单成功'
      } else if (value === 3) {
        return '生成中'
      } else if (value === 4) {
        return '已发货'
      } else if (value === 5) {
        return '完成收货'
      } else if (value === 6) {
        return '订单完成'
      }
    }
  },
  data () {
    return {
      clientData: {},
      tableData: [
        {
          userId: '',
          remark: '',
          orderNo: '',
          enterpriseName: '',
          ownId: '',
          receiver: '',
          createTime: '',
          orderNum: ''
        }
      ],
      queryPage: {
        name: '',
        page: 1,
        size: 8,
        cusUserId: ''
      }
    }
  },
  mounted () {
    this.clientData = this.$route.query
    if(this.clientData.provinceName==this.clientData.cityName){
      this.clientData.provinceName = ''
    }
    this.queryPage.cusUserId = this.$route.query.id
    console.log(this.clientData)
    this.initData()
  },

  methods: {
    // 保存的订单
    initData () {
      guest.orderDraftQueryPage(this.queryPage).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.rows
          this.queryPage.total = res.data.count
          // this.$message.success(res.msg)
          console.log(res)
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
      console.log(`当前页: ${val}`)
      this.queryPage.page = val
      this.initData()
    },

    onSubmit () {
      this.params = this.$route.params
      // this.params = router-link;
    }

  }
}
</script>

<style lang="scss" scoped>
.guestDetails {
  .main{
    padding: 20px;
  }
  .ifo{
    display: flex;
    ul{
      li{
        padding: 10px 0;
        span{
          display: inline-block;
          width: 130px;
          text-align: right;
          margin-right: 5px;
        }
      }
    }
    img{
      width: 200px;
      height: 120px;
    }
  }
  .adress{
    padding: 20px;
    background-color: #f2f2ee;
    width: 450px;
    height: 180px;
    margin-left: 20px;
    margin-top: 20px;
    h5{
      font-size: 20px;
      font-weight: bold;
    }
    p{
      margin: 10px 0;
    }
  }
  .orderList{
    margin-top: 30px;
    h4{
      font-weight: bold;
      font-size: 18px;
      color: #222;
      margin-bottom: 10px;
    }
  }
  .idImg {
    width: 45px;
    height: 45px;
  }

}
</style>
