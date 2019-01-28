<template>
  <div class="editProductType">
    <div class="titleTop">
      价格体系设置-产品类型-添加
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
      <div class="choseBox" >
        <div class="cB" v-for="(item,index) in form.priceItemInfoList2" v-model="item.id">
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
          cnFormatPriceInfo: [
            {
              max: 10,
              min: 0,
              price: null
            },
            {
              max: 20,
              min: 10,
              price: null
            },
            {
              max: 30,
              min: 20,
              price: null
            },
            {
              max: 40,
              min: 30,
              price: null
            },
            {
              max: 50,
              min: 40,
              price: null
            },
            {
              max: 60,
              min: 50,
              price: null
            },
            {
              max: 70,
              min: 60,
              price: null
            },
            {
              max: 80,
              min: 70,
              price: null
            },
            {
              max: 90,
              min: 80,
              price: null
            },
            {
              max: 100,
              min: 90,
              price: null
            },
            {
              max: 1000,
              min: 101,
              price: null
            }
          ],
          ctFormatPriceInfo: [
            {
              max: 5,
              min: 0,
              price: null,
              font: '长的一边比短的一边长5-10倍'
            },
            {
              max: 5,
              min: 0,
              price: null,
              font: '长的一边比短的一边长10倍以上'
            },
            {
              max: 10,
              min: 5,
              price: null,
              font: '长的一边比短的一边长5-10倍'
            },
            {
              max: 10,
              min: 5,
              price: null,
              font: '长的一边比短的一边长10倍以上'
            },
            {
              max: 20,
              min: 10,
              price: null,
              font: '长的一边比短的一边长5-10倍'
            },
            {
              max: 20,
              min: 10,
              price: null,
              font: '长的一边比短的一边长10倍以上'
            }
          ],
          enFormatPriceInfo: [
            {
              max: 10,
              min: 0,
              price: null
            },
            {
              max: 20,
              min: 10,
              price: null
            },
            {
              max: 30,
              min: 20,
              price: null
            },
            {
              max: 40,
              min: 30,
              price: null
            },
            {
              max: 50,
              min: 40,
              price: null
            },
            {
              max: 60,
              min: 50,
              price: null
            },
            {
              max: 70,
              min: 60,
              price: null
            },
            {
              max: 80,
              min: 70,
              price: null
            },
            {
              max: 90,
              min: 80,
              price: null
            },
            {
              max: 100,
              min: 90,
              price: null
            },
            {
              max: 1000,
              min: 101,
              price: null
            }
          ],
          name: '',
          parentId: '',
          picUrl: '',
          priceItemInfoList2: []
        }
      }
    },
    mounted () {
      this.initData()
      this.initProductTypeSelect()
      this.initProductTypeTree()
    },
    methods: {
      goback(){
       this.$router.go(-1)

      },
      handleAvatarSuccess (res, file) {
        this.form.picUrl = JSON.parse(res.data.fileUrlJsonString).fileUrl
      },
      initData () {
        priceSystem.getPriceItemInfoById({}).then(res => {
          this.form.priceItemInfoList2 = res.data
          for (let i=0; i<this.form.priceItemInfoList2.length; i++) {
            if (this.form.priceItemInfoList2[i]['children']) {
              for (let j=0; j<this.form.priceItemInfoList2[i]['children'].length; j++) {
                if (this.form.priceItemInfoList2[i]['children'][j]['checked'] == "true") {
                  this.form.priceItemInfoList2[i]['children'][j]['checked'] = true
                }else {
                  this.form.priceItemInfoList2[i]['children'][j]['checked'] = false
                }
              }
            }
          }
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
        priceSystem.productTypeTree(this.queryPage).then(res => {
          if (res.code === 0) {
            this.productTypeTree = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
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

        var priceItemInfoList2 = []
        var priceItemInfoList = []
        for (let i=0; i<this.form.priceItemInfoList2.length; i++) {
          if (this.form.priceItemInfoList2[i]['children']) {
            priceItemInfoList.push(JSON.parse(JSON.stringify(this.form.priceItemInfoList2[i])))
            priceItemInfoList[priceItemInfoList.length-1]['children'] = []
            for (let j=0; j<this.form.priceItemInfoList2[i]['children'].length; j++) {
              if (this.form.priceItemInfoList2[i]['children'][j]['checked']) {
                priceItemInfoList2.push(JSON.parse(JSON.stringify(this.form.priceItemInfoList2[i]['children'][j])))
              }
            }
          }
        }

        for (let i=priceItemInfoList.length-1; i>=0; i--) {
          for (let j=0; j<priceItemInfoList2.length; j++) {
            if (priceItemInfoList[i]['id'] == priceItemInfoList2[j]['priceItemId']) {
              priceItemInfoList[i]['children'].push(priceItemInfoList2[j])
            }
          }
          if (priceItemInfoList[i]['children'].length <= 0) {
            priceItemInfoList.splice(i, 1)
          }
        }

        this.form.priceItemInfoList = priceItemInfoList

        priceSystem.productTypeSubAdd(this.form).then(res => {
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
