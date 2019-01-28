<template>
  <div class="messageDetail">
    <div class="titleTop">
      信息咨询-短信消息-详情
    </div>
    <div class="main">
      <ul>
        <li>
          <h5>交易完成！</h5>
          <p>{{obj.content}}用户已完成评价</p>
          <span class="fr">{{obj.updateTime}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { information } from '@/api/index.js'
export default {
  data () {
    return {
      obj: {}
    }
  },
  methods: {
    onSubmit () {}
    // initData () {
    //   information.queryPage(this.queryPage).then(res => {
    //     if (res.code === 0) {
    //       let arr = []
    //       this.tableData = res.data.rows
    //       this.queryPage.total = res.data.count
    //       this.tableData.forEach((el) => {
    //         if (el.type === 1) {
    //           arr.push(el)
    //         }
    //       })
    //       this.tableData = arr
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   })
    // }
  },
  mounted () {
    this.obj = this.$route.params.obj
    console.log(this.obj)
  }
}
</script>

<style lang="scss" scoped>
.messageDetail {
  li{
    border:1px solid #bbb;
    margin: 20px 0;
    padding: 10px 20px 30px;
    background-color: #fbfbfb;
    h5{
      margin-bottom: 10px;
      font-size: 18px;
    }
    span{
      margin-bottom: 10px;
    }

  }
}
</style>
