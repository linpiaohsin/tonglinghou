<template>
  <div class="editProductType">
    <div class="titleTop">
      价格体系设置-产品类型-编辑
    </div>
    <div class="main">
      <div class="text">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="类型名称" required="">
            <el-input v-model="form.name" placeholder="请输入类型名称"></el-input>
          </el-form-item>

          <el-form-item label="类型图片" required="">
            <el-upload class="avatar-uploader" action="http://47.106.243.1:2018/web/api/common/upload"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess" >
              <img v-if="form.picUrl" :src="form.picUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型详情" required="">
            <el-input type="textarea" v-model="form.detail" style="resize:none;" placeholder="输入产品类型详情"></el-input>
          </el-form-item>

          <el-form-item label="上级分类" required="">
            <el-select v-model="form.parentId" placeholder="">
              <el-option v-for="item in productList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableForm">
        <table class="gridtable">
          <tr>
            <th>字形</th>
            <th>规格（cm）</th>
            <th>价格（元）</th>
          </tr>
          <template v-for="(item, index) in form.enFormatPriceInfo">
            <tr v-if="index < 10">
              <td>英文/数字</td>
              <td>
                <input type="text" class="iptMIni" disabled v-model="item.min" :placeholder="item.min"> -
                <input type="text" class="iptMIni" disabled v-model="item.max" placeholder="item.max"></td>
              <td>
                <input type="text" class="iptMedium" v-model="item.price"> 元
              </td>
            </tr>
            <tr v-else>
              <td>英文/数字</td>
              <td>一米以上</td>
              <td><input type="text" class="iptMedium" v-model="item.price"> 元/m²</td>
              </td>
            </tr>
          </template>
        </table>
        <table class="gridtable">
          <tr>
            <th>字形</th>
            <th>规格（cm）</th>
            <th>价格（元）</th>
          </tr>
          <template v-for="(item, index) in form.cnFormatPriceInfo">
            <tr v-if="index < 10">
              <td>中文/图型</td>
              <td>
                <input type="text" class="iptMIni" disabled v-model="item.min" :placeholder="item.min"> -
                <input type="text" class="iptMIni" disabled v-model="item.max" placeholder="item.max"></td>
              <td>
                <input type="text" class="iptMedium" v-model="item.price"> 元
              </td>
            </tr>
            <tr v-else>
              <td>中文/图型</td>
              <td>一米以上</td>
              <td><input type="text" class="iptMedium" v-model="item.price"> 元/m²</td>
              </td>
            </tr>
          </template>
        </table>
        <table class="gridtable">
          <tr>
            <th>短边</th>
            <th>情景</th>
            <th>长条单价</th>
          </tr>
          <template v-for="item in form.ctFormatPriceInfo">
            <tr>
              <td>{{item.min}}cm&lt;短边≤{{item.max}}cm</td>
              <td>{{item.font}}</td>
              <td><input type="text" class="iptMedium" placeholder="" v-model="item.price"> 元</td>
            </tr>
          </template>
        </table>
      </div>
      <div class="choseBox">
        <div class="cB" v-for="(item,index) in form.priceItemInfo2">
          <h5>{{item.name}}：</h5>
          <div style="display: flex; flex-wrap: wrap">
            <template v-for="itemChild in item.children">
              <el-checkbox :label="itemChild.id" v-model="itemChild.checked">{{itemChild.value}}</el-checkbox>
            </template>
          </div>
        </div>
      </div>
      <button class="btn" @click="onSubmit">确定</button>
      <button class="btn" @click="goback">返回</button>
    </div>
  </div>
</template>

<script>
  import {priceSystem} from '@/api/index.js'

  export default {
    data () {
      return {
        productList: [],
        productTypeTree: [],
        form: {
          checkList: [],
          cnFormatPriceInfo: [],
          ctFormatPriceInfo: [],
          enFormatPriceInfo: [],
          name: '',
          parentId: '',
          picUrl: '',
          priceItemInfo2: []
        }
      }
    },
    mounted () {
      this.initData()
      this.initProductTypeSelect()
    },
    methods: {
      goback(){
      this.$router.go(-1)

      },
      handleAvatarSuccess (res, file) {
        this.form.picUrl = JSON.parse(res.data.fileUrlJsonString).fileUrl
      },
      initData () {
        var _this = this;
        priceSystem.productTypeSubQueryDetail({id: this.$route.query.id}).then(res => {
          // this.form = res.data
          this.form.name = res.data.name
          this.form.id = res.data.id
          this.form.parentId = res.data.parentId
          this.form.picUrl = res.data.picUrl
          this.form.detail = res.data.detail
          this.form.level = res.data.level
          this.form.cnFormatPriceInfo = JSON.parse(res.data.cnFormatPriceInfo)
          this.form.ctFormatPriceInfo = JSON.parse(res.data.ctFormatPriceInfo)
          this.form.enFormatPriceInfo = JSON.parse(res.data.enFormatPriceInfo)
          var productTypeTree = JSON.parse(res.data.priceItemInfo)

          priceSystem.productTypeTree(this.queryPage).then(resChildren => {
            if (resChildren.code === 0) {
              _this.form.priceItemInfo2 = resChildren.data
              for (let i=0; i<this.form.priceItemInfo2.length; i++) {
                if (this.form.priceItemInfo2[i]['children']) {
                  for (let j=0; j<this.form.priceItemInfo2[i]['children'].length; j++) {
                    if (this.form.priceItemInfo2[i]['children'][j]['checked'] == "true") {
                      this.form.priceItemInfo2[i]['children'][j]['checked'] = true
                    }else {
                      this.form.priceItemInfo2[i]['children'][j]['checked'] = false
                    }
                  }
                }
              }
              let len = _this.form.priceItemInfo2.length;
              let data = _this.form.priceItemInfo2;

              for (let i=0; i<len; i++) {
                if (!data[i]['children']) {
                  continue;
                }

                for (let j=0; j<productTypeTree.length; j++) {
                  for (let q=0; q<productTypeTree[j]['children'].length; q++) {
                    if (productTypeTree[j]['children'][q]['priceItemId'] == data[i]['id']) {
                      _this.$set(_this.form.priceItemInfo2[i]['children'][q], 'checked', true)
                    }
                  }
                }

              }
            } else {
              _this.$message.error(resChildren.msg)
            }
          })

        })
      },
      initProductTypeSelect () {
        priceSystem.productTypeAll(this.queryPage).then(res => {
          if (res.code === 0) {
            this.productList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      initProductTypeTree () {

      },
      onSubmit () {

        for (let i = 0; i<this.form.enFormatPriceInfo.length; i++) {
          if (this.form.enFormatPriceInfo[i].price == null) {

            this.$message.error("英文/数字价格全部不能为空！")
            return;
          }
        }

        for (let i = 0; i<this.form.cnFormatPriceInfo.length; i++) {
          if (this.form.cnFormatPriceInfo[i].price == null) {
            this.$message.error("中文/图型价格全部不能为空！")
            return;
          }
        }

        for (let i = 0; i<this.form.ctFormatPriceInfo.length; i++) {
          if (this.form.ctFormatPriceInfo[i].price == null) {
            this.$message.error("长条价格全部不能为空！")
            return;
          }
        }

        var priceItemInfo2 = []
        var priceItemInfoList = []
        for (let i=0; i<this.form.priceItemInfo2.length; i++) {
          if (this.form.priceItemInfo2[i]['children']) {
            priceItemInfoList.push(JSON.parse(JSON.stringify(this.form.priceItemInfo2[i])))
            priceItemInfoList[priceItemInfoList.length-1]['children'] = []
            for (let j=0; j<this.form.priceItemInfo2[i]['children'].length; j++) {
              if (this.form.priceItemInfo2[i]['children'][j]['checked']) {
                priceItemInfo2.push(JSON.parse(JSON.stringify(this.form.priceItemInfo2[i]['children'][j])))
              }
            }
          }
        }

        for (let i=priceItemInfoList.length-1; i>=0; i--) {
          for (let j=0; j<priceItemInfo2.length; j++) {
            if (priceItemInfoList[i]['id'] == priceItemInfo2[j]['priceItemId']) {
              priceItemInfoList[i]['children'].push(priceItemInfo2[j])
            }
          }
          if (priceItemInfoList[i]['children'].length <= 0) {
            priceItemInfoList.splice(i, 1)
          }
        }
        this.form.priceItemInfo = priceItemInfoList

        // this.form.priceItemInfo2 = priceItemInfo2List2
        priceSystem.productTypeSubUpdate(this.form).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push('/Home/priceSystem/subProductType')
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editProductType {
  .text {
    padding-top: 40px;
    display: flex;
    width: 1100px;
    justify-content: space-between;
  }

  // 表格
     .tableForm {
       display: flex;
       flex-wrap: wrap;

  table:nth-child(2) {
    margin-bottom: 30px;
    margin-left: 50px;
  }
  }
  .el-checkbox+.el-checkbox {

  }
  // 选项框
     .choseBox {
       margin-top: 30px;
       display: flex;
       flex-wrap: wrap;
       width: 1000px;

  > div:nth-child(n+4) {
    height: 100px;
  }

  .cB {
    margin-right: 30px;
    width: 300px;
    height: 140px;
    padding: 15px;
    margin-top: 20px;
    background-color: #F2F2EE;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

  h5 {
    font-size: 16px;
  }
  }
  }

  .btn {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  // 上传图片
     .avatar-uploader .el-upload {
       border: none;
     }

  .avatar-uploader-icon {
    width: 50px;
    height: 50px;
    line-height: 50px;
    color: #333;
  }

  .avatar {
    width: 50px;
    height: 50px;
  }
  }
</style>
