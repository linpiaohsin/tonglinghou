<template>
  <div class="messageDetail">
    <div class="titleTop">
      信息咨询-系统通知-详情
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
export default {
  data () {
    return {
      obj: {}
    }
  },
  methods: {
    onSubmit () {}
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
