<template>
  <div class="orderListDetails">
    <div class="titleTop">
      订单管理-订单列表-详情
    </div>
    <main class="container">
      <!--<div class="schedules">-->
      <!--<div class="schedule1-active">-->
      <!--上传图片-->
      <!--</div>-->
      <!--<div class="schedule1-item">-->
      <!--系统报价-->
      <!--</div>-->
      <!--<div class="schedule1-item">-->
      <!--上传设计图-->
      <!--</div>-->
      <!--<div class="schedule1-item">-->
      <!--发起订单-->
      <!--</div>-->
      <!--<div class="schedule1-item">-->
      <!--订单支付-->
      <!--</div>-->
      <!--<div class="schedule1-item">-->
      <!--生产进度-->
      <!--</div>-->
      <!--<div class="schedule1-item">-->
      <!--交易完成-->
      <!--</div>-->
      <!--</div>-->
      <div class="list">
        <div class="title">产品类型</div>
        <div class="list-content">
          <template v-for="(item, index) in resData.productType1">
            <div :class="[item.on == true ? 'item item-active' : 'item']" @click="setType1On(item, index)" >
              <img :src="item.picUrl" :title="item.name">
            </div>
          </template>
        </div>
      </div>
      <div class="list2">
        <i></i>
        <div class="list-content">
          <template v-for="(item, index) in resData.productType2">
            <div :class="[item.on ? 'item item-active' : 'item']" @click="chilrenToggle(item, index)">
              <img :src="item.picUrl" alt="">
              <span @click.stop="openDetail(index)">{{item.name}}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="order-upload">
        <div class="canvas-img">
          <canvas id="tutorial"></canvas>
        </div>
      </div>
      <div class="sku">
        <template v-for="item in resData.priceItemInfo">
          <div class="sku-item">
            <span>{{item.name}}</span>
            <div class="item-select">
              <el-select v-model="item.selectId" :placeholder="item.selectPla">
                <el-option
                  v-for="itemChild in item.children"
                  :key="itemChild.id"
                  :label="itemChild.value"
                  :value="itemChild.id">
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
      </div>
      <div class="order-address">
        <div class="row">
          <div class="item">
            <span>收货地址</span>
            <div class="input input-border">
              <input type="text" v-model="resData.receiverAddress" placeholder="请输入收货地址" >
            </div>
          </div>
          <div class="item">
            <span>收货人</span>
            <div class="input input-border">
              <input type="text" v-model="resData.receiver" placeholder="请输入收货人名称" >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <span>联系电话</span>
            <div class="input input-border">
              <input type="text" v-model="resData.receiverPhone" placeholder="请输入联系电话" >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item textarea-item">
            <span>备注</span>
            <div class="textarea textarea-border">
              <textarea name="" id="" v-model="resData.remark" placeholder="请输入备注信息"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="calculation">
            <span class="num">{{resData.calculationObj.computational}}</span>
            <span>=</span>
            <span class="red">￥{{resData.totalPrice * productNum}}</span>
            <span class="detail" @click="mask = true;calculation_eject = true;">查看计价详情></span>
          </div>
        </div>
        <div class="row">
          <div class="item item-price">
            <!--<div class="price">总价：￥{{resData.totalPrice}}</div>-->
            <div class="num-f">
              <span>订单套数</span>
              <div class="num">
                <span class="reduce" @click="reduce"></span>
                <input type="text" class="text" v-model="productNum" v-on:input="calculationFn" oninput='this.value=this.value.replace(/^[0]+[0-9]*$/gi,"")' value="1" >
                <span class="plus" @click="plus"></span>
              </div>
              <span class="font">套</span>
            </div>

          </div>

        </div>
        <div class="tool">
          <button class="toolBtn" @click="sendOrder">保存上述修改</button>
          <button class="toolBtn" @click="downLoadCFR">下载cdr文件</button>

        </div>
        <div style="background:#f8f8f8;padding-bottom:10px">请修改价格（当前价格）：<span style="color: red; font-size: 18px">￥{{updatePrice}}</span></div>
        <div class="price_input" style="background:#f8f8f8;padding-bottom:10px">
          <span>修改订单金额</span>
          <input type="text" v-model="totalPrice" style="margin: 0 20px;" />
          <div class="sendBtn toolBtn" @click="changePrice" style="text-align: center" >确定</div>
          <div class="change" style="margin-left:80px">
            订单状态：
            <el-select v-model="form.orderStatus" placeholder="请选择状态" >
              <el-option label="未支付" value="1"></el-option>
              <el-option label="下单成功" value="2"></el-option>
              <el-option label="生产中" value="3"></el-option>
              <el-option label="已发货" value="4"></el-option>
              <el-option label="完成收货" value="5"></el-option>
              <!--<el-option label="订单完成" value="6"></el-option>-->
            </el-select>
            <button class="toolBtn" style="margin: 0 20px" @click="onSubmit" >确定</button>
          </div>
        </div>
        <!--<div style="height: 30px"></div>-->
        <!--<div class="btn" @click="sendOrder">生成报价</div>-->
      </div>
    </main>

    <div class="mask" v-show="mask"></div>

    <div class="eject-productInfo" v-show="eject_productInfo">
      <div class="content">
        <div class="img">
          <img :src="eject_productInfoContent.picUrl" alt="">
        </div>
        <div class="right">
          <div class="title">{{eject_productInfoContent.name}}</div>
          <div class="des">
            {{eject_productInfoContent.detail}}
          </div>
        </div>
      </div>
      <div class="eject-btn" @click="productType2Active(eject_productInfoContent.productInfoIndex)">确定</div>
    </div>

    <div class="calculation-eject" v-show="calculation_eject">
      <div class="close" @click="mask = false;calculation_eject = false;" ></div>
      <div class="tabel">
        <div class="thead">
          <div class="row">编号</div>
          <div class="row">属性</div>
          <div class="row">长度</div>
          <div class="row">高度</div>
          <div class="row">表面处理</div>
          <div class="row">小计</div>
        </div>
        <div class="tbody">
          <template v-for="(item, index) in resData.calculationObj.priceDetailInfo">
            <div class="row">
              <div class="td">{{index + 1}}</div>
              <div class="td">{{item.picName}}</div>
              <div class="td">{{item.width}}cm</div>
              <div class="td">{{item.high}}cm</div>
              <div class="td">{{item.name}}</div>
              <div class="td">￥{{item.countPrice}}</div>
            </div>
          </template>
        </div>
        <div class="tfooter">
          总价：{{resData.productPrice}}*{{productNum}}={{resData.totalPrice * productNum}}元
        </div>
      </div>
    </div>

    <div class="eject">
      <div class="eject-set" v-show="eject_set">
        <div class="set-head">
          <canvas id="canvas-set"></canvas>
        </div>
        <div class="set-bottom">
          <div class="row input-inline">
            <div class="title">产品高度(cm)</div>
            <div class="input input-border">
              <input type="text" v-model="inputHeight" placeholder="请输入产品高度">
            </div>
          </div>
          <div class="row select-inline" >
            <div class="eject-select">
              <div class="label">表面处理</div>
              <div class="item-select">
                <el-select v-model="resData.specialProcess" placeholder="请选择表面处理">
                  <el-option
                    v-for="item in resData.specialProcessList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="eject-select">
              <div class="label">应用全局</div>
              <div class="item-select">
                <el-select v-model="resData.overallSituation" placeholder="请选择是否应用全局">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="btn btn-border" @click="mask = false, eject_set = false">取消</div>
            <div class="btn btn-default" @click="getWH">确定</div>
          </div>
        </div>
      </div>
    </div>

    <div class="spinner" v-show="spinner" >
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import {order} from '@/api/index.js'
  export default {
    data () {
      return {
        totalPrice: null,
        canvas_img: false,
        mask: false,
        spinner: false,
        eject_set: false,
        calculation_eject: false,
        eject_productInfo: false,
        eject_select_inline: false,
        calculation: false,
        imgDataInfo: [],
        eject_productInfoContent: {},
        productId: '',
        addressLists: [],
        parentProductIndex: {},
        specialProcessInfo: [],
        offset: {},
        WH: false,
        imgHeight: 0,
        inputHeight: "",
        picUrl: "",
        resData: {
          productType1: [],
          productType2: [],
          priceItemInfo: [],
          specialProcessList: [],
          overallSituation: '',
          specialProcess: '',
          specialProcessArr: [],
          receiverAddress: '',
          receiver: '',
          receiverPhone: '',
          productTypeSubId: '',
          kgTypeArray: [],
          calculationObj: {},
          totalPrice: 0,
          productPrice: 0,
          remark: ''
        },
        updatePrice: '',
        form: {
          name: null,
          orderStatus: ""
        },
        file: {},
        closeAdvertisementNum: 0,
        productNum: 1,
        initPage: {
          page: 1,
          size: 10,
          count: 0
        },
        imgOffset: []
      }
    },
    mounted () {
      var queryData = this.$route.query
      this.inputHeight = Number(JSON.parse(queryData.coordinate)[0].inputHeight)
      this.imgHeight = Number(JSON.parse(queryData.coordinate)[0].imgHeight)
      this.initData()
      // this.form.orderStatus = String(queryData.orderStatus) == '6' ? '5' : String(queryData.orderStatus)
      if (String(queryData.orderStatus) == '6') {
        this.form.orderStatus = '5'
      }else if (String(queryData.orderStatus) == '0') {
        this.form.orderStatus = '1'
      }else {
        this.form.orderStatus = String(queryData.orderStatus)
      }
    },
    // inject:['reload'],
    methods: {
      changePrice() {
        var queryData = this.$route.query
        order.orderUpdPrice({id: queryData.id, totalPrice: this.totalPrice / this.productNum}).then(res => {
          if (res.code == 0) {
            this.$message.success("价格修改成功")
            this.$router.push('OrderList')
          }

        })
        this.initData()
      },
      preventDefaultEvent (eventName) {
        document.addEventListener(eventName, function (e) {
          e.preventDefault();
        }, false)
      },
      onSubmit() {
        if(!this.form.orderStatus){
          this.$message.error('请选择状态')
        }
        this.form.id = this.$route.query.id;
        order.updateOrderStatus(this.form).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg);
            this.$router.push('/Home/order/orderList')
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      downLoadCFR() {
        var queryData = this.$route.query
        window.location.href = queryData.qiniuPic;
      },
      initData () {
        order.productTypeSub().then(res => {
          this.resData.productType1 = res.data;
          let len = this.resData.productType1.length;
          let data = this.resData.productType1;
          var queryData = this.$route.query
          this.resData.receiver = queryData.receiver
          this.resData.receiverAddress = queryData.receiverAddress
          this.resData.receiverPhone = queryData.receiverPhone
          this.resData.remark = queryData.remark
          this.productNum = queryData.orderNum
          this.updatePrice = queryData.totalFee

          this.resData.overallSituation = JSON.parse(queryData.coordinate)[0]['overallSituation']

          if (this.resData.overallSituation == '1') {
            this.resData.specialProcess = JSON.parse(queryData.coordinate)[0]['id']
          }

          this.imgDataInfo = JSON.parse(queryData.coordinate)
          this.picUrl = queryData.picUrl
          let pricingFormula = JSON.parse(queryData.pricingFormula)
          this.resData.calculationObj = pricingFormula;
          this.resData.totalPrice = parseFloat(pricingFormula.totalPrice).toFixed(2);
          this.resData.productPrice = parseFloat(pricingFormula.totalPrice).toFixed(2);

          var _this = this;
          for (let i=0; i<len; i++) {
            if (_this.resData.productType1[i]['id'] == queryData.productTypeId) {
              _this.$set(data[i], 'on', true)
              _this.parentItem = data[i];
              _this.resData.productType2 = data[i]['children']
              //默认选择第一个（产品类型，产品子类型，报价项）
              for (let j=0; j<data[i]['children'].length; j++) {
                if (data[i]['children'][j]['id'] == queryData.productTypeSubId) {
                  _this.eject_productInfoContent = data[i]['children'][j]
                  _this.$set(data[i]['children'][j], 'on', true)
                  _this.resData.productTypeSubId = data[i]['children'][j]['id'];
                  let priceItemInfo = JSON.parse(queryData['productItemInfo'])
                  _this.$set(_this.resData, 'priceItemInfo', JSON.parse(queryData['productItemInfo']))
                  this.$set(this.resData['priceItemInfo'][i], 'selectPla', '请选择'+this.resData['priceItemInfo'][i]['name'])
                }
              }
            }
          }
          order.specialProcessList().then(res => {
            this.$set(this.resData, 'specialProcessList', res.data)
            // this.resData.specialProcessList = res.data
          })
          this.drawImg()
        })
      },
      //发送订单生成报价
      sendOrder() {
        var data = {}
        if (!this.parentItem) {
          this.$message.error("请选择产品类型！")
          return;
        }
        if (!this.eject_productInfoContent) {
          this.$message.error("请选择产品子类型！")
          return;
        }
        if (this.picUrl == '') {
          this.$message.error("请上传图片！")
          return;
        }
        if (this.resData.kgTypeArray.length <= 0) {
          this.$message.error("请点击图片内的红框输入高度计算价格！")
          return;
        }
        for (let i=0; i<this.resData.priceItemInfo.length; i++) {
          if (!this.resData.priceItemInfo[i]['selectId']) {
            this.$message.error("产品类型参数必须全部选择！")
            return;
          }
        }
        if (this.resData.receiver == '' || this.resData.receiverAddress == '' || this.resData.receiverPhone == '') {
          this.$message.error("地址信息请填写完整！")
          return;
        }
        if (this.resData.calculationObj.priceDetailInfo == '') {
          this.$message.error("请计算价格后再提交！")
          return;
        }

        var queryData = this.$route.query

        // data['cusUserId'] = JSON.parse(localStorage.getItem('loginInfo')).cusUserId;
        data['id'] = queryData.id;
        data['orderNo'] = queryData.orderNo;
        data['orderNum'] = this.productNum;
        data['coordinate'] = JSON.stringify(this.resData.kgTypeArray);
        data['picUrl'] = this.picUrl;
        data['priceDetailInfo'] = this.resData.calculationObj.priceDetailInfo;
        data['productItemInfo'] = this.resData.priceItemInfo;
        data['productTypeDetail'] = this.parentItem.detail;
        data['productTypeId'] = this.parentItem.id;
        data['productTypeName'] = this.parentItem.name;
        data['productTypePic'] = this.parentItem.picUrl;
        data['productTypeSubDetail'] = this.eject_productInfoContent.detail;
        data['productTypeSubId'] = this.eject_productInfoContent.id;
        data['productTypeSubName'] = this.eject_productInfoContent.name;
        data['productTypeSubPic'] = this.eject_productInfoContent.picUrl;
        data['receiver'] = this.resData.receiver;
        data['receiverAddress'] = this.resData.receiverAddress;
        data['receiverPhone'] = this.resData.receiverPhone;
        data['remark'] = this.resData.remark;
        data['specialProcessInfo'] = [];
        var specialProcessInfo = this.specialProcessInfo.filter(item=>item);
        for (var j=0; j<specialProcessInfo.length; j++) {
          for (var i=0; i<this.resData.specialProcessList.length; i++) {
            if(String(this.resData.specialProcessList[i]['id']) == String(specialProcessInfo[j])) {
              data['specialProcessInfo'].push(this.resData.specialProcessList[i]['name'])
            }
          }
        }
        data['totalArea'] = this.resData.calculationObj.totalArea;
        data['totalPrice'] = this.resData.calculationObj.totalPrice;
        order.orderUpdatePrice(data).then(res => {
          if(res.code == 0) {
            this.$message.success(res.msg)
            // localStorage.setItem("orderNo", res.data['orderNo'])
            this.$router.push('/Home/order/orderList')
          }
        })
      },
      //订单套数（加）
      plus () {
        this.productNum = parseInt(this.productNum) + 1;
        let price = JSON.parse(JSON.stringify(this.resData.totalPrice))
        this.$set(this.resData, 'totalPrice', parseFloat(this.resData.productPrice * this.productNum).toFixed(2))
      },
      //输入后计算价格
      calculationFn () {
        this.$set(this.resData, 'totalPrice', parseFloat(this.resData.productPrice * this.productNum).toFixed(2))
      },
      //订单套数（减）
      reduce () {
        if(this.productNum > 1){
          this.productNum = parseInt(this.productNum) - 1;
          let price = JSON.parse(JSON.stringify(this.resData.totalPrice))
          this.$set(this.resData, 'totalPrice', parseFloat(this.resData.productPrice * this.productNum).toFixed(2))
        }
      },
      //产品类型选中 子产品类型赋值
      setType1On (itemData, index) {
        this.parentItem = itemData
        this.parentProductIndex = index;
        var len = this.resData.productType1.length;
        var data = this.resData.productType1;
        for (var i=0; i<len; i++) {
          this.$set(data[i], 'on', false)
        }
        this.$set(data[index], 'on', true)

        if (this.resData.productType1[index]['children'] == undefined) {
          this.resData.productType1[index]['children'] = ''
        }
        let childrenLen = this.resData.productType1[index]['children'].length;
        let childrenData = this.resData.productType1[index]['children'];
        if (childrenLen > 0) {
          this.resData.productTypeSubId = childrenData[0]['id']
          for (var i=0; i<childrenLen; i++) {
            childrenData[i]['on'] = false
          }
          childrenData[0]['on'] = true
          this.resData['priceItemInfo'] = JSON.parse(childrenData[0]['priceItemInfo'])
          for (var i=0; i<this.resData['priceItemInfo'].length; i++) {
            // this.$set(this.resData['priceItemInfo'][i], 'selectId', this.resData['priceItemInfo'][i]['children'][0]['id'])
            this.$set(this.resData['priceItemInfo'][i], 'selectPla', '请选择'+this.resData['priceItemInfo'][i]['name'])
          }
          this.resData.productType2 = childrenData
          this.eject_productInfoContent = this.resData.productType2[0]
        }

        if (this.resData.kgTypeArray.length > 0) {
          this.getWH()
        }

      },
      //打开子产品类型弹出框
      openDetail(index) {
        this.eject_productInfo = true;
        this.mask = true;
      },
      //子产品切换
      chilrenToggle(item, index) {
        let childrenLen = this.resData.productType2.length;
        let childrenData = this.resData.productType2;
        for (var i=0; i<childrenLen; i++) {
          childrenData[i]['on'] = false
        }
        childrenData[index]['on'] = true;
        item['productInfoIndex'] = index;
        this.eject_productInfoContent = item;
        this.resData.productTypeSubId = childrenData[index]['id']
        this.resData['priceItemInfo'] = JSON.parse(childrenData[index]['priceItemInfo'])
        for (var i = 0; i < this.resData['priceItemInfo'].length; i++) {
          // this.$set(this.resData['priceItemInfo'][i], 'selectId', this.resData['priceItemInfo'][i]['children'][0]['id'])
          this.$set(this.resData['priceItemInfo'][i], 'selectPla', '请选择'+this.resData['priceItemInfo'][i]['name'])
        }

        if (this.resData.kgTypeArray.length > 0) {
          this.getWH()
        }

      },
      //设置子产品类型选中
      productType2Active(index) {
        this.eject_productInfo = false;
        this.mask = false;
      },
      getWH () {
        if (!this.inputHeight) {
          alert("高度不能为空！");
          return;
        }

        if (this.resData.specialProcess != '' && this.resData.overallSituation == '') {
          this.$message.error("请选择应用范围！")
          return;
        }else if (this.resData.specialProcess == '' && this.resData.overallSituation != '') {
          this.$message.error("请选择表面处理！")
          return;
        }

        this.WH = true;
        this.eject_select_inline = true;
        this.eject_set = false;
        this.spinner = true;

        this.drawImg(this.event)

        this.specialProcessInfo.push(this.resData.specialProcess)

      },
      sort (arr, len) {
        for (var i = 0; i < len; i++) {
          for (var j = 0; j < len - 1 - i; j++) {
            if (Number(arr[j]['x1']) > Number(arr[j+1]['x1'])) {
              var temp = arr[j+1];
              arr[j+1] = arr[j];
              arr[j] = temp;
            }
          }
        }
      },
      //设置宽高
      setWH (ctx, x1, y1, x2, y2) {
        var width = x2 - x1;
        var height = y2 - y1;
        var inputHeight = this.inputHeight

        var imgWidth = Math.round((width / this.imgHeight) * inputHeight);
        var imgHeight =  Math.round((height / this.imgHeight) * inputHeight);

        //宽度
        ctx.font = "15pt Calibri";
        ctx.strokeStyle = "rgba(255, 0, 0, 1)";
        ctx.strokeRect ((x2 - x1) / 2 + Number(x1) - (ctx.measureText(imgWidth+"cm").width / 1.5), y1 - 15, ctx.measureText(imgWidth+"cm").width + 20, 30);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillRect ((x2 - x1) / 2 + Number(x1) - (ctx.measureText(imgWidth+"cm").width / 1.5), y1 - 15, ctx.measureText(imgWidth+"cm").width + 20, 30);
        ctx.fillStyle = "rgba(255, 0, 0, 1)";
        ctx.fillText (imgWidth+"cm", (x2 - x1) / 2 + Number(x1) - (ctx.measureText(imgWidth+"cm").width / 2), Number(y1) + 7.5);

        //高度
        ctx.font = "15pt Calibri";
        ctx.strokeStyle = "rgba(255, 0, 0, 1)";
        ctx.strokeRect (x1 - ctx.measureText(imgHeight+"cm").width / 1.3,(y2 - y1) / 2 + Number(y1) - 15, ctx.measureText(imgHeight+"cm").width + 20, 30);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillRect (x1 - ctx.measureText(imgHeight+"cm").width / 1.3, (y2 - y1) / 2 + Number(y1) - 15, ctx.measureText(imgHeight+"cm").width + 20, 30);
        ctx.fillStyle = "rgba(255, 0, 0, 1)";
        ctx.fillText (imgHeight+"cm", x1 - ctx.measureText(imgHeight+"cm").width / 2, (y2 - y1) / 2 + Number(y1)+7.5);
      },
      checkDrawImg(e) {
        if (!this.resData.productTypeSubId) {
          this.$message.error('请先选择产品类型');
          e.preventDefault();
          return;
        }
      },
      drawImg() {
        var _this = this;
        this.mask = true;
        this.spinner = true;
        this.ishowFile = true;

        var queryData = this.$route.query

        _this.resData.kgTypeArray = [];
        _this.mask = false;
        _this.spinner = false;
        var canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle  = "rgba(255, 0, 0, 1)";
        ctx.globalAlpha = 1;
        var data = {};
        data['data'] = JSON.parse(this.$route.query.coordinate)

        var img = new Image();
        img.onload = function(){
          canvas.height = img.height * (1200 / img.width);
          canvas.width = 1200;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          ctx.strokeStyle  = "rgba(255, 0, 0, 1)";
          ctx.font = "20pt Calibri";
          ctx.fillStyle = "rgba(255, 0, 0, 1)";
          var len = data.data.length;
          var arr = data.data;

          //排序
          _this.sort(arr, len)
          for (var i=0; i<len; i++) {
            ctx.fillText (i+1, data.data[i].x1,data.data[i].y1);
            ctx.strokeRect (data.data[i].x1, data.data[i].y1, data.data[i].x2 - data.data[i].x1, data.data[i].y2 - data.data[i].y1);
            data.data[i]['id'] = '';

            var width = data.data[i].x2 - data.data[i].x1;
            var height = data.data[i].y2 - data.data[i].y1;
            var inputHeight = _this.inputHeight
            var imgWidth = Math.round((width / _this.imgHeight) * inputHeight);
            var imgHeight =  Math.round((height / _this.imgHeight) * inputHeight);
            var kgTypeArray = {
              high: imgHeight,
              width: imgWidth,
              type: data.data[i].type,
              id: JSON.parse(queryData.coordinate)[i].id,
              overallSituation: JSON.parse(queryData.coordinate)[i].overallSituation,
              imgHeight: _this.imgHeight,
              inputHeight: inputHeight,
              x1: data.data[i].x1,
              x2: data.data[i].x2,
              y1: data.data[i].y1,
              y2: data.data[i].y2
            }
            _this.resData.kgTypeArray.push(kgTypeArray)

            _this.setWH(ctx, data.data[i].x1, data.data[i].y1, data.data[i].x2, data.data[i].y2)
          }

          if (_this.imgDataInfo.length >= 1) {
            // _this.imgDataInfo[_this.offset['num']['index']]['id'] = _this.resData.specialProcess
          }
          if (_this.resData.kgTypeArray.length >= 1 && _this.resData.overallSituation == '0') {
            _this.resData.specialProcessArr.push({
              index: _this.offset['num']['index'],
              id: _this.resData.specialProcess,
              overallSituation: _this.resData.overallSituation
            })
            let len = _this.resData.specialProcessArr.length;
            let data = _this.resData.specialProcessArr;
            for (let i=0; i<len; i++) {
              _this.resData.kgTypeArray[data[i]['index']]['id'] = data[i]['id'];
            }
            // _this.resData.kgTypeArray[_this.offset['num']['index']]['id'] = _this.resData.specialProcess;
          } else if (_this.resData.kgTypeArray.length >= 1 && _this.resData.overallSituation == '1') {
            let kgTypeArrayLen = _this.resData.kgTypeArray.length;
            for (var i = 0; i < kgTypeArrayLen; i++) {
              _this.resData.kgTypeArray[i]['id'] = _this.resData.specialProcess;
              _this.resData.kgTypeArray[i]['overallSituation'] = _this.resData.overallSituation
            }
          }

          order.productTypeValuation(_this.resData).then(res => {
            _this.calculation = true;
            _this.resData.calculationObj = res.data
            _this.resData.totalPrice = parseFloat(res.data.totalPrice).toFixed(2);
            _this.resData.productPrice = parseFloat(res.data.totalPrice).toFixed(2);
            _this.$message.success('计价成功！, 请点击查看')
          })

          canvas.addEventListener('click', function(e){
            for (var i=0; i<data.data.length; i++) {
              if (Number(data.data[i].x2) > e.layerX
                && e.layerX > Number(data.data[i].x1)
                && Number(data.data[i].y2) > e.layerY
                && e.layerY > Number(data.data[i].y1)) {
                _this.mask = true;
                _this.eject_set = true;
                _this.offset = data.data[i];
                _this.offset['num'] = { 'index': i, 'x1': data.data[i].x1, 'y1': data.data[i].y1 };
                _this.ejectDrawImg();
                return;
              }
            }
          }, false);
        }
        img.src = this.picUrl;
        console.log('qqqq----->', this.picUrl)
        _this.canvas_img = true;
      },
      ejectDrawImg() {
        var _this = this;
        var canvas = document.getElementById('canvas-set');
        if(!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle  = "rgba(255, 0, 0, 1)";
        ctx.globalAlpha = 1;
        var img = new Image();

        _this.$set(_this.resData, 'specialProcess', _this.imgDataInfo[_this.offset['num']['index']].id)

        img.onload = function() {
          canvas.height = img.height * (1200 / img.width);
          canvas.width = 1200;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          ctx.strokeStyle = "rgba(255, 0, 0, 1)";
          ctx.font = "20pt Calibri";
          ctx.fillStyle = "rgba(255, 0, 0, 1)";
          ctx.fillText (_this.offset['num']['index'] + 1, _this.offset['num']['x1'],_this.offset['num']['y1']);
          ctx.strokeRect (_this.offset.x1, _this.offset.y1, _this.offset.x2-_this.offset.x1, _this.offset.y2-_this.offset.y1);
          if (!_this.imgHeight) {
            _this.imgHeight = Number(_this.offset.y2) - Number(_this.offset.y1);
          }
          _this.setWH(ctx, _this.offset.x1, _this.offset.y1, _this.offset.x2, _this.offset.y2)
        }
        img.src = this.picUrl;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .price_input {
    display: flex;
    align-items: center;
  }
  img {
    width: 100%;
    height: 100%;
    vertical-align: text-top;
    object-fit: cover;
  }

  .tool {
    /*position: fixed;*/
    /*bottom: 20px;*/
    /*left: 0;*/
    /*width: 100%;*/
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }

  .toolBtn {
    background: #0092ff;
    color: #fff;
    border: navajowhite;
    width: 150px;
    line-height: 40px;
    height: 40px;
    border-radius: 5px;
    margin-right: 20px;
    cursor: pointer;
  }

  .toolBtn:last-child {
    margin-right: 0;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .input-default {
    background: rgba(0,0,0,0.05);
    width: 100%;
  }

  .input-default input::-webkit-input-placeholder {
    color: #C7C7C7;
    font-size: 18px;
  }

  .input input {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    outline: none;
    color: #333333;
    font-size: 18px;
  }

  .input-border, .textarea-border {
    border: 1px solid #D4D4D4;
  }

  .input {
    height: 50px;
    line-height: 50px;
    border-radius:6px;
    padding: 0 13px;
    box-sizing: border-box;
    margin-bottom: 24px;
  }

  .textarea textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    resize: none;
    padding: 20px;
    font-size: 16px;
    box-sizing: border-box;
  }

  .textarea textarea::-webkit-input-placeholder {
    font-size: 16px;
    color: #C7C7C7;
  }

  .codeDisable {
    filter: grayscale(100%);
    cursor: not-allowed !important;
  }

  .orderTab {
    background: #ffffff;
    height: 58px;
    line-height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius:4px;
  .item {
    font-size: 16px;
    color: #666666;
    padding: 0 15px;
    margin-right: 92px;
    cursor: pointer;
  }
  .item:last-child {
    margin-right: 0;
  }
  .item-active {
    color: #F08300;
    border-bottom: 1px solid #F08300;
  }
  }

  .page {
    border-top: 30px solid #F1F1F1;
    border-bottom: 30px solid #F1F1F1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  //上传图片
    .upload {
      width: 243px;
      height: 152px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #D4D4D4;
      cursor: pointer;
    }

  .btn {
    cursor: pointer;
  }

  .row-img {
    width: 40px;
    height: 40px;
  }

  .upload span {
    font-size: 16px;
    color: #C7C7C7;
    margin-top: 24px;
  }

  //加载动画

    .spinner {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 60px;
      text-align: center;
      font-size: 10px;
      z-index: 12;
    }

  .spinner > div {
    background-color: #67CF22;
    height: 100%;
    width: 6px;
    display: inline-block;

    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
  }

  @keyframes stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
         transform: scaleY(1.0);
         -webkit-transform: scaleY(1.0);
       }
  }

  //遮罩
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.5);
      z-index: 10;
    }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*//element样式修改*/
  .el-select .el-input.is-focus .el-input__inner, .el-select .el-input__inner:focus {
    border-color: #D4D4D4;
  }
  .el-input__inner {
    height: 50px;
    line-height: 50px;
    border:1px solid rgba(212,212,212,1);
    border-radius:4px;
  }
  .el-form-item__label {
    line-height: 50px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #F08300;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
    color: #ffffff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #F08300;
  }
  .order {
    background: #F1F1F1;
    min-height: calc(100vh - 60px);
  .order-upload {
    background: #ffffff;
    /*//height: 256px;*/
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 20px;
  }
  .order-upload img {
    width: auto;
    height: auto;
    object-fit: none;
  }
  .canvas-img {
    overflow: auto;
    height: 400px;
  }
  #tutorial2 {
    position: absolute;
    top: 0;
    left: 0;
  }
  canvas {
    background: transparent;
    /*overflow: auto;*/
  }
  .order-upload-img {
    width: 1200px;
    height: 256px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
  }
  .order-upload-img input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    /*//z-index: -2;*/
  }
  .order-upload-img img {
    width: 62px;
    height: 73px;
  }
  .schedules {
    display: flex;
    justify-content: center;
    margin: 30px 0;
  }
  .schedules > div {
    background: url("../../../assets/images/schedule2.png") no-repeat center center/100% 100%;
    width: 130px;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
    text-align: center;
    font-size: 16px;
    color: #ffffff;
  }
  .schedule1-active {
    background: url("../../../assets/images/schedule1.png") no-repeat center center/100% 100% !important;
  }
  .schedules > div:last-child {
    margin-right: 0;
  }
  .list {
    background: #ffffff;
    box-sizing: border-box;
    padding: 10px 50px;
    border-radius:4px;
    margin-bottom: 5px;
  .title {
    text-align: center;
    color: #333333;
    font-size: 16px;
    margin-bottom: 16px;
  }
  .list-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow-x: auto;
  }
  .item {
    opacity: .5;
    margin-right: 20px;
  }
  .item img {
    width: 160px;
    height: 130px;
  }
  .item:hover {
    opacity: 1;
    transition: .3s all ease;
  }
  .item:hover img {
    width: 196px;
    height: 155px;
    transition: .3s all ease;
  }
  .item-active {
    opacity: 1;
    border: 1px solid #eee;
  }
  .item-active img {
    width: 196px;
    height: 155px;
  }
  }

  .eject-productInfo {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
    width:580px;
    height:361px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    box-sizing: border-box;
    padding: 44px 30px;
  .content {
    display: flex;
    line-height: 1;
  }
  .right {
    width: 290px;
    margin-left: 20px;
  }
  .title {
    font-size: 16px;
    color: #333333;
    margin-bottom: 27px;
  }
  .des {
    font-size: 16px;
    color: #666666;
    line-height:21px;
  }
  .eject-btn {
    width:200px;
    height:50px;
    background:linear-gradient(90deg,rgba(240,131,0,1),rgba(230,0,18,1));
    border-radius:6px;
    font-size:20px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 64px auto 0;
    cursor: pointer;
  }
  .img {
    width: 200px;
    height: 162px;
  }
  }
  .calculation-eject {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
  .close {
    background: url("../../../assets/images/close.png") no-repeat center center/100% 100%;
    width: 30px;
    height: 30px;
    position: absolute;
    top: -35px;
    right: -35px;
    cursor: pointer;
  }
  .tabel {
    background: #fff;
    max-height: 500px;
    overflow: auto;
  }
  .thead {
    display: flex;
    background: #f4f4f4;
  .row {
    width: 120px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #333;
    border-right: 1px solid #E1E1E1;
    border-bottom: 1px solid #E1E1E1;
  }
  .row:last-child {
    border-right: none;
  }
  }
  .tbody {
  .row {
    display: flex;
  }
  .row .td {
    width: 120px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    font-size: 16px;
    border-right: 1px solid #E1E1E1;
    border-bottom: 1px solid #E1E1E1;
  }
  .row:nth-child(even){
    background: #f4f4f4;
  }
  .row .td:last-child {
    border-right: none;
  }
  .row:last-child .td {
    border-bottom: none;
  }
  }
  .tfooter {
    text-align: right;
    font-size: 18px;
    margin: 10px 10px 10px 0;
    color: red;
  }
  }
  .list2 {
  i {
    display: block;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    border-bottom: 15px solid rgba(240,131,0,.24);
    width: 0;
    margin: 0 auto;
  }
  .list-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:rgba(240,131,0,.24);
    padding: 10px 50px;
    border-radius:4px;
    box-sizing: border-box;
    overflow: auto;
  }
  .item img {
    width: 160px;
    height: 130px;
  }
  .item {
    display: flex;
    flex-direction: column;
    opacity: .7;
    cursor: pointer;
    margin-right: 20px;
  }
  .item:hover {
    opacity: 1;
    background: #ffffff;
    padding: 12px 11px;
    box-sizing: border-box;
    transition: .3s all ease;
  }
  .item:hover img {
    width: 196px;
    height: 155px;
    transition: .3s all ease;
  }
  .item span {
    text-align: center;
    margin-top: 16px;
  }
  .item-active {
    opacity: 1;
    background: #ffffff;
    padding: 12px 11px;
    box-sizing: border-box;
  }
  .item-active img {
    width: 196px;
    height: 155px;
  }
  }
  .adressList {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 400px;
    overflow: auto;
  .item {
    width: 580px;
    background: #fff;
    line-height: 1;
    padding: 40px 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    border: 1px solid #999;
  }
  .item-left {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
  .item-left span {
    margin-bottom: 25px;
  }
  .item-left span:last-child {
    margin-bottom: 0;
    line-height: 1.5;
  }
  .update {
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: block;
    border-radius:4px;
    font-size: 16px;
    color: #333333;
    border:1px solid rgba(102,102,102,1);
    cursor: pointer;
  }
  .delete {
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: block;
    border-radius:4px;
    font-size: 16px;
    color: #DE0014;
    border:1px solid #DE0014;
    cursor: pointer;
  }
  }
  .sku {
    margin-top: 30px;
    background: #ffffff;
    padding: 30px 75px 10px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  .select {
    width: 200px;
    margin-left: 20px;
  }
  .sku-item {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
  }
  .item-select {
    margin-left: 20px;
    width: 200px;
  }
  .select-down li {
    padding: 10px;
  }
  }
  .order-address {
    background: #ffffff;
    margin-top: 30px;
    line-height: 1;
    padding: 30px;
    box-sizing: border-box;
  .calculation {
    width:700px;
    height:56px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    line-height: 1;
  .num {
    font-size: 16px;
    color: #333333;
    /*@include row-hidden;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 280px;
    text-align: right;
  }
  .red {
    font-size: 18px;
    color: #E60012;
  }
  .detail {
    font-size: 16px;
    color: #F08300;
    margin-left: 30px;
    cursor: pointer;
  }
  }
  .row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .item {
    display: flex;
    align-items: center;
    margin-right: 40px;
  }
  .selectAddress {
    font-size: 16px;
    color: #E60012;
    cursor: pointer;
  }
  .item span {
    font-size: 16px;
    color: #333333;
    width: 64px;
    margin-right: 20px;
    text-align: right;
  }
  .input {
    margin-bottom: 0;
    width: 400px;
    font-size: 16px;
    color: #C7C7C7;
  }
  .textarea {
    width: 925px;
    height: 110px;
  }
  .textarea-item {
    align-items: flex-start;
  }
  .textarea-item span {
    margin-top: 17px;
  }
  .input input::-webkit-input-placeholder {
    color: #C7C7C7;
    font-size: 16px;
  }
  }
  .upload-btn {
    background: #fff;
    margin-top: 20px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #f08300;

    position: relative;
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
  }
  .item-price {
    display: flex;
    justify-content: center;
    width: 100%;
  .price {
    font-size: 16px;
    color: #E60012;
    margin-right: 50px;
  }
  .num-f {
    display: flex;
    align-items: center;
  }
  .num {
    display: flex;
    align-items: center;
  }
  .reduce {
    background: url("../../../assets/images/order_reduce.png") no-repeat center center/100% 100%;
    width: 16px !important;
    height: 16px;
    display: inline-block;
    margin-right: 14px;
  }
  .plus {
    background: url("../../../assets/images/order-plus.png") no-repeat center center/100% 100%;
    width: 16px !important;
    height: 16px;
    display: inline-block;
    margin-left: 14px;
    margin-right: 0;
  }
  .text {
    width: 80px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border:1px solid rgba(212,212,212,1);
    border-radius:4px;
    outline: none;
  }
  .font {
    width: auto !important;
  }
  }
  .btn {
    width: 400px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background:linear-gradient(90deg,rgba(240,131,0,1),rgba(230,0,18,1));
    border-radius:6px;
    font-size: 20px;
    color: #ffffff;
    margin: 60px auto 0;
  }
  .btn-success {
    background:linear-gradient(90deg,rgba(240,131,0,1),rgba(230,0,18,1));
    border-radius:6px;
    color: #ffffff;
    cursor: pointer;
  }
  .advertisement-img {
    width: 600px;
    height: 400px;
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }
  .close {
    text-align: right;
    width: 100%;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .close img {
    width: 18px;
    height: 18px;
  }
  .item-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 10;
  }
  .eject-set {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    background: #ffffff;
    width: 1200px;

  .input-inline {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-inline .title {
    font-size: 16px;
    color: #333333;
  }

  .set-head {
    overflow: auto;
    height: 400px;
  }

  .set-bottom {
    margin-top: 20px;
  }

  .row {
    display: flex;
    justify-content: center;
    /*//margin: 60px 0;*/
    margin-bottom: 60px;
  }

  .row:nth-child(1) {
    margin-bottom: 20px;
  }

  .eject-select {
    display: flex;
    align-items: center;
    margin-right: 27px;
  }

  .eject-select:last-child {
    margin-right: 0;
  }

  .eject-select .label {
    font-size: 16px;
    color: #333333;
    margin-right: 20px;
  }

  .eject-select .select {
    width: 200px;
    height: 50px;
    font-size: 16px;
    color: #333333;
  }

  .eject-select:last-child .select {
    width: 90px;
  }

  .btn {
    margin: 0 50px 0 0;
    width: 200px;
    height: 50px;
    cursor: pointer;
  }

  .btn:last-child {
    margin-right: 0;
  }

  .btn-border {
    border: 1px solid #E60012;
    font-size: 20px;
    color: #E60012;
    background: transparent;
  }

  .btn-default {
    background:linear-gradient(90deg,rgba(240,131,0,1),rgba(230,0,18,1));
    color: #ffffff;
  }

  .input input::-webkit-input-placeholder {
    color: #C7C7C7;
    font-size: 16px;
  }

  .input-inline .input {
    margin-bottom: 0;
    width: 400px;
    margin-left: 20px;
    color: #C7C7C7;
    font-size: 16px;
  }
  }
  }
</style>
