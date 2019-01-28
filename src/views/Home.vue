<template>
  <div class="home" :style="{'height':fullHeight + 'px'}">
    <!-- 头部 -->
    <el-container>
      <el-header height='85px'>
        <h1 class="logo fl">
          <img src="../assets/images/index_logo.eb33ef4.png" alt="">
          定字网后台管理系统
        </h1>
        <span class="user fr">
					<router-link to="/Home/info/message"><i class="el-icon-message"></i></router-link>
					<el-dropdown>
						<span class="el-dropdown-link arrow" style="color: #fff">
							{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<router-link :to="{name:'ChangePassword'}">修改密码</router-link>
							</el-dropdown-item>
							<el-dropdown-item><a href="javascript:;" @click="logout">退出登录</a></el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</span>
      </el-header>
      <el-container>
        <el-aside width="230px">
          <el-menu :default-active="pathActive" :unique-opened='open' :router='true' class="el-menu-vertical-demo" @open="handleOpen"
                   @close="handleClose" background-color="#172A40" text-color="#fff" active-text-color="#ffd04b">
            <!-- <el-submenu index="user">
                            <template slot="title">
                                <i class="el-icon-mobile-phone"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item index="/Home/user/userIfo">用户信息</el-menu-item>
                            <el-menu-item index="/Home/user/role">角色管理</el-menu-item>
                            <el-menu-item index="/Home/user/department">部门管理</el-menu-item>
                            <el-menu-item index="/Home/user/subDepartment">二级部门</el-menu-item>
                        </el-submenu>
                        <el-submenu index="priceSystem">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>价格体系设置</span>
                            </template>
                            <el-menu-item index="/Home/priceSystem/productType">产品类型</el-menu-item>
                            <el-menu-item index="/Home/priceSystem/subProductType">产品类型子类型</el-menu-item>
                            <el-menu-item index="/Home/priceSystem/quotation">报价项管理</el-menu-item>
                            <el-menu-item index="/Home/priceSystem/handle">表面处理</el-menu-item>
                        </el-submenu>
                        <el-submenu index="order">
                            <template slot="title">
                                <i class="el-icon-tickets"></i>
                                <span>订单管理</span>
                            </template>
                            <el-menu-item index="/Home/order/examinePriceList">订单列表</el-menu-item>
                            <el-menu-item index="/Home/order/orderList">审核报价</el-menu-item>
                            <el-menu-item index="/Home/order/factoryDistributionList">工厂分配</el-menu-item>
                            <el-menu-item index="/Home/order/evaluate">评价管理</el-menu-item>
                            <el-menu-item index="/Home/order/refund">退款申请</el-menu-item>
                            <el-menu-item index="/Home/order/afterSale">售后申请</el-menu-item>
                        </el-submenu>
                        <el-submenu index="guest">
                            <template slot="title">
                                <i class="el-icon-service"></i>
                                <span>客户管理</span>
                            </template>
                            <el-menu-item index="/Home/guest/guestList">客户列表</el-menu-item>
                            <el-menu-item index="/Home/guest/gusetExamine">客户审核</el-menu-item>
                            <el-menu-item index="/Home/guest/GusetRegistration">客户信息登记</el-menu-item>
                        </el-submenu>
                        <el-submenu index="info">
                            <template slot="title">
                                <i class="el-icon-phone-outline"></i>
                                <span>信息咨询模块</span>
                            </template>
                            <el-menu-item index="/Home/info/message">短信消息</el-menu-item>
                            <el-menu-item index="/Home/info/notice">系统通知</el-menu-item>
                        </el-submenu>
                        <el-submenu index="client">
                            <template slot="title">
                                <i class="el-icon-goods"></i>
                                <span>客户端管理</span>
                            </template>
                            <el-menu-item index="/Home/client/productList">产品列表</el-menu-item>
                            <el-menu-item index="/Home/client/advertisement">弹窗广告</el-menu-item>
                        </el-submenu>
                        <el-submenu index="factory">
                            <template slot="title">
                                <i class="el-icon-rank"></i>
                                <span>工厂管理</span>
                            </template>
                            <el-menu-item index="/Home/factory/SetFactory">工厂列表</el-menu-item>
                        </el-submenu>
                        <el-submenu index="statistics">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>报表统计</span>
                            </template>
                            <el-menu-item index="/Home/statistics/GuestListTotal">客户统计</el-menu-item>
                            <el-menu-item index="/Home/statistics/ServiceList">客服统计</el-menu-item>
                            <el-menu-item index="/Home/statistics/SalesmanList">业务员统计</el-menu-item>
                            <el-menu-item index="/Home/statistics/FactoryList">工厂统计</el-menu-item>
                            <el-menu-item index="/Home/statistics/UserLoginList">客户登陆统计</el-menu-item>
                            <el-menu-item index="/Home/statistics/ProductTypeList">产品类型统计</el-menu-item>
                            <el-menu-item index="/Home/statistics/Overall">综合报表</el-menu-item>
                        </el-submenu>
                        <el-submenu index="dataDictionary">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>数据字典</span>
                            </template>
                            <el-menu-item index="/Home/dataDictionary/dataList">字典表格</el-menu-item>
                        </el-submenu> -->

            <!-- 动态菜单 -->
            <!-- <el-submenu index="dataDictionary" v-for="childrens of menuData">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>{{childrens.text}}</span>
                            </template>
                            <el-menu-item index="/Home/dataDictionary/dataList" v-for="children of childrens.children">{{children.text}}</el-menu-item>
                        </el-submenu> -->
                        <template  v-for="childrens of menuData">
                          <el-submenu :index="childrens.attributes.url">
              <template slot="title">
                <i :class="childrens.attributes.icon"></i>
                <span>{{childrens.text}}</span>
              </template>
              <template  v-for="children of childrens.children">
                <el-menu-item :index="children.attributes.url" id="children.id" @click="menuID(children.id)">{{children.text}}</el-menu-item>
              </template>
            </el-submenu>
                        </template>

          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {
  sysUser
} from '@/api/index.js'
let newVar = {
  watch: {
    $route (to, from) {
      this.pathActive = to.path
    }
  },
  mounted () {
    this.pathActive = this.$route.path
    // 请求接口返回menu菜单
    sysUser.getMenuTree().then(res => {
      console.log(res)
      this.menuData = res.data.children
    })
  },
  data () {
    return {
      pathActive: '',
      fullHeight: document.documentElement.clientHeight,
      open: true,
      userName: localStorage.getItem('userName'),
      menuData: {}
    }
  },
  methods: {
    logout () {
      sysUser.logout().then(res => {
        if (res.code === 0) {
          this.$cookie.delete('token')
          this.$router.push('/')
        } else {
          this.$router.push('/')
          this.$message.error(res.msg)
        }
      })
    },
    menuID (menuid) {
      sessionStorage.setItem('menuid', menuid)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
export default newVar
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;

  // min-width: 1600px;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }

  .el-container {
    height: 100%;
  }

  .el-aside {
    background-color: #172a40;
    height: 100%;

  .el-submenu__title * {
    font-size: 16px;
  }
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0092ff;

  h1 {
    color: #333;
    padding: 0 20px;
    font-weight: bold;
    font-size: 28px;

  img {
  //width: 60px;
    height: 60px;
    border-radius: 5%;
    margin-right: 15px;
  }
  }

  .user {
  i {
    color: #fff;
  }

  >a {
    margin-right: 30px;
    font-size: 22px;

  i {
    height: 35px;
    line-height: 35px;
  }
  }
  }
  }

  .el-main {
    padding: 0;
    position: relative;
  }
  }
</style>
<style lang="scss">
  .el-dropdown {
    color: #fff;
    cursor: pointer;
  }
</style>
