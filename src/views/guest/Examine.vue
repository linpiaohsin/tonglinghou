<template>
  <div class="examine">
    <div class="titleTop">
      客户管理-客户审核-详情
    </div>
    <div class="main">
      <div class="ifo">
        <ul>
          <li><span>客户名称：</span>{{clientData.enterpriseName}}</li>
          <li>
            <span>法人身份证上传：</span>
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
              :src="clientData.businessLicenseUrl"
              alt=""
            >
          </li>
          <li><span>联系人：</span>{{clientData.legalName}}</li>
          <li><span>联系电话：</span>{{clientData.mobie}}</li>
          <li><span>公司地址：</span>{{clientData.address}}</li>
          <li><span>客户行业：</span>{{clientData.name}}</li>
          <li><span>专属业务员ID：</span>{{clientData.ownId}}</li>
        </ul>
      </div>
      <div class="btn" @click="onSubmit">通过</div>
    </div>
  </div>
</template>

<script>

import {guest} from '@/api/index.js'

export default {
  data () {
    return {
      clientData: {}
    }
  },

  mounted () {
    this.clientData = this.$route.query
    console.log('----->>>',this.$route.query)
  },
  methods: {
    onSubmit: function (obj) {
      obj.status = 1
      obj.id = this.clientData.id
      guest.cusUserUpdateStatus(obj).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.$router.push('GusetExamine')
          // this.tableData = res.data.rows
        } else {
          this.$message.error(res.msg)
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.examine {
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
  .btn{
      margin-left: 20px;
      margin-top: 60px;
  }
}
</style>
