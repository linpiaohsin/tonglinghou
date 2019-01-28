import Vue from 'vue'
import Router from 'vue-router'

// 登录
import Login from '@/views/Login.vue'
// 修改密码
import ChangePassword from '@/views/ChangePassword.vue'
/* 主页 */
import Home from '@/views/Home.vue'
// 用户信息
import User from '@/views/users/User.vue'
import UserIfo from '@/views/users/userIfo/UserIfo.vue'
import EditUserIfo from '@/views/users/userIfo/EditUserIfo.vue'
import AddUserIfo from '@/views/users/userIfo/AddUserIfo.vue'
import Role from '@/views/users/role/Role.vue'
import AddRole from '@/views/users/role/AddRole.vue'
import EditRole from '@/views/users/role/EditRole.vue'
import Department from '@/views/users/Department.vue'
import SubDepartment from '@/views/users/SubDepartment.vue'
// 价格体系
import PriceSystem from '@/views/priceSystem/PriceSystem.vue'
import ProductType from '@/views/priceSystem/productType/ProductType.vue'
import EditProductType from '@/views/priceSystem/productType/EditProductType.vue'
import AddProductType from '@/views/priceSystem/productType/AddProductType.vue'
import SubProductType from '@/views/priceSystem/subProductType/SubProductType.vue'
import EditSubProductType from '@/views/priceSystem/subProductType/EditSubProductType.vue'
import AddSubProductType from '@/views/priceSystem/subProductType/AddSubProductType.vue'
import Quotation from '@/views/priceSystem/Quotation.vue'
import Handle from '@/views/priceSystem/Handle.vue'
// 订单管理
import Order from '@/views/order/Order.vue'
import OrderList from '@/views/order/orderList/OrderList.vue'
import OrderListDetails from '@/views/order/orderList/OrderListDetails.vue'
import ChangeStatus from '@/views/order/orderList/ChangeStatus.vue'
import EvaluateDetail from '@/views/order/orderList/EvaluateDetail.vue'
import AfterSaleDetail from '@/views/order/orderList/AfterSaleDetail.vue'
import RefundDetail from '@/views/order/orderList/RefundDetail.vue'
import ChangePrice from '@/views/order/orderList/ChangePrice.vue'
import ExaminePriceList from '@/views/order/ExaminePriceList.vue'
import FactoryDistributionList from '@/views/order/factoryDistribution/FactoryDistributionList.vue'
import FactoryDistribution from '@/views/order/factoryDistribution/FactoryDistribution.vue'
import Evaluate from '@/views/order/Evaluate.vue'
import AfterSale from '@/views/order/AfterSale.vue'
import Refund from '@/views/order/Refund.vue'
// 客户管理
import Guest from '@/views/guest/Guest.vue'
import GuestList from '@/views/guest/GuestList.vue'
import GuestDetails from '@/views/guest/GuestDetails.vue'
import GusetExamine from '@/views/guest/GusetExamine.vue'
import Examine from '@/views/guest/Examine.vue'
import GusetRegistration from '@/views/guest/GusetRegistration.vue'
import OrderDraftDetails from '@/views/guest/OrderDraftDetails.vue'
// 信息咨询模块
import Info from '@/views/information/Info.vue'
import Message from '@/views/information/Message.vue'
import MessageDetail from '@/views/information/MessageDetail.vue'
import Notice from '@/views/information/Notice.vue'
import NoticeDetail from '@/views/information/NoticeDetail.vue'
// 客服端管理
import Client from '@/views/client/Client.vue'
import ProductList from '@/views/client/ProductList.vue'
import EditProduct from '@/views/client/EditProduct.vue'
import EditProductDetail from '@/views/client/EditProductDetail.vue'
import Advertisement from '@/views/client/Advertisement.vue'
import EditAdvertisement from '@/views/client/EditAdvertisement.vue'
// 工厂管理
import Factory from '@/views/factory/Factory.vue'
import SetFactory from '@/views/factory/SetFactory.vue'
// 报表统计
import Statistics from '@/views/statistics/Statistics.vue'
import GuestListTotal from '@/views/statistics/GuestListTotal.vue'
import ServiceList from '@/views/statistics/ServiceList.vue'
import SalesmanList from '@/views/statistics/SalesmanList.vue'
import FactoryList from '@/views/statistics/FactoryList.vue'
import UserLoginList from '@/views/statistics/UserLoginList.vue'
import ProductTypeList from '@/views/statistics/ProductTypeList.vue'
import Overall from '@/views/statistics/Overall.vue'
import OrderStatisticsList from '@/views/statistics/OrderStatisticsList.vue'

import ServiceOrderStatisticsList from '@/views/statistics/ServiceOrderStatisticsList.vue'
import SalesmanOrderStatisticsList from '@/views/statistics/SalesmanOrderStatisticsList.vue'
import FactoryOrderStatisticsList from '@/views/statistics/FactoryOrderStatisticsList.vue'

import ProductTypeOrderStatisticsList from '@/views/statistics/ProductTypeOrderStatisticsList.vue'

// 数据字典
import DataDictionary from '@/views/dataDictionary/DataDictionary.vue'
import DataList from '@/views/dataDictionary/DataList.vue'
import EditDataDictionary from '@/views/dataDictionary/EditDataDictionary.vue'
import UpdateDataDictionary from '@/views/dataDictionary/UpdateDataDictionary.vue'
import Defaut from '@/views/users/userIfo/defaut.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: {name: 'UserIfo'},
    children: [
      {
        path: '/changePassword',
        name: 'ChangePassword',
        component: ChangePassword
      }, {
        /* 用户管理 */
        path: 'user',
        component: User,
        redirect: {name: 'UserIfo'},
        children: [{
          // 用户管理
          path: 'userIfo',
          name: 'UserIfo',
          component: UserIfo
        },
        {
          path: 'defaut',
          name: 'Defaut',
          component: Defaut
        },
        {
          path: 'addUserIfo',
          name: 'AddUserIfo',
          component: AddUserIfo
        }, {
          path: 'editUserIfo',
          name: 'EditUserIfo',
          component: EditUserIfo
        }, {
          path: 'addRole',
          name: 'AddRole',
          component: AddRole
        }, {
          // 角色管理
          path: 'role',
          name: 'Role',
          component: Role
        }, {
          path: 'editRole',
          name: 'EditRole',
          component: EditRole
        }, {
          // 部门管理
          path: 'department',
          name: 'Department',
          component: Department
        }, {
          // 二级部门
          path: 'subDepartment',
          name: 'SubDepartment',
          component: SubDepartment
        }]
      }, {
        /* 价格体系 */
        path: 'priceSystem',
        component: PriceSystem,
        children: [{
          // 产品类型
          path: 'productType',
          name: 'ProductType',
          component: ProductType
        },
        {
          path: 'addProductType',
          name: 'AddProductType',
          component: AddProductType
        },
        {
          path: 'editProductType',
          name: 'EditProductType',
          component: EditProductType
        },
        {
          // 产品子类型
          path: 'subProductType',
          name: 'SubProductType',
          component: SubProductType
        },
        {
          path: 'editSubProductType',
          name: 'EditSubProductType',
          component: EditSubProductType
        },
        {
          path: 'addSubProductType',
          name: 'AddSubProductType',
          component: AddSubProductType
        },
        {
          path: 'quotation',
          name: 'Quotation',
          component: Quotation
        },
        {
          path: 'handle',
          name: 'Handle',
          component: Handle
        }]
      }, {
        // 订单管理
        path: 'order',
        component: Order,
        children: [{
          path: 'orderList',
          name: 'OrderList',
          component: OrderList
        }, {
          path: 'orderListDetails',
          name: 'OrderListDetails',
          component: OrderListDetails
        }, {
          path: 'changeStatus', // 修改状态
          name: 'ChangeStatus',
          component: ChangeStatus
        }, {
          path: 'evaluateDetail',
          name: 'EvaluateDetail',
          component: EvaluateDetail
        }, {
          path: 'refundDetail',
          name: 'RefundDetail',
          component: RefundDetail
        }, {
          path: 'afterSaleDetail',
          name: 'AfterSaleDetail',
          component: AfterSaleDetail
        }, {
          path: 'changePrice', // 修改报价
          name: 'ChangePrice',
          component: ChangePrice
        }, {
          path: 'examinePriceList',
          name: 'ExaminePriceList',
          component: ExaminePriceList
        }, {
          path: 'factoryDistributionList',
          name: 'FactoryDistributionList',
          component: FactoryDistributionList
        }, {
          path: 'factoryDistribution',
          name: 'FactoryDistribution',
          component: FactoryDistribution
        }, {
          path: 'evaluate',
          name: 'Evaluate',
          component: Evaluate
        }, {
          path: 'afterSale',
          name: 'AfterSale',
          component: AfterSale
        }, {
          path: 'refund',
          name: 'Refund',
          component: Refund
        }]
      },
      {
        // 客户管理
        path: 'guest',
        component: Guest,
        children: [{
          path: 'guestList',
          name: 'GuestList',
          component: GuestList
        }, {
          path: 'gusetExamine',
          name: 'GusetExamine',
          component: GusetExamine
        }, {
          path: 'examine',
          name: 'Examine',
          component: Examine
        }, {
          path: 'guestDetails',
          name: 'GuestDetails',
          component: GuestDetails
        }, {
          path: 'gusetRegistration',
          name: 'GusetRegistration',
          component: GusetRegistration
        },
        {
          path: 'orderDraftDetails',
          name: 'OrderDraftDetails',
          component: OrderDraftDetails
        }]
      },
      {
        // 客服端管理
        path: 'client',
        component: Client,
        children: [{
          path: 'productList',
          name: 'ProductList',
          component: ProductList
        }, {
          path: 'editProduct',
          name: 'EditProduct',
          component: EditProduct
        }, {
          path: 'editProductDetail',
          name: 'EditProductDetail',
          component: EditProductDetail
        }, {
          path: 'advertisement',
          name: 'Advertisement',
          component: Advertisement
        }, {
          path: 'editAdvertisement',
          name: 'EditAdvertisement',
          component: EditAdvertisement
        }]
      },
      {
        // 信息咨询模块
        path: 'info',
        component: Info,
        children: [{
          path: 'message',
          name: 'Message',
          component: Message
        }, {
          path: 'messageDetail',
          name: 'MessageDetail',
          component: MessageDetail
        }, {
          path: 'notice',
          name: 'Notice',
          component: Notice
        }, {
          path: 'noticeDetail',
          name: 'NoticeDetail',
          component: NoticeDetail
        }]
      },
      {
        // 报表统计
        path: 'statistics',
        component: Statistics,
        children: [{
          path: 'guestListTotal',
          name: 'GuestListTotal',
          component: GuestListTotal
        }, {
          path: 'serviceList',
          name: 'ServiceList',
          component: ServiceList
        }, {
          path: 'salesmanList',
          name: 'SalesmanList',
          component: SalesmanList
        }, {
          path: 'factoryList',
          name: 'FactoryList',
          component: FactoryList
        }, {
          path: 'userLoginList',
          name: 'UserLoginList',
          component: UserLoginList
        }, {
          path: 'productTypeList',
          name: 'ProductTypeList',
          component: ProductTypeList
        }, {
          path: 'overall',
          name: 'Overall',
          component: Overall
        }, {
          path: 'orderStatisticsList',
          name: 'OrderStatisticsList',
          component: OrderStatisticsList
        }, {
          path: 'serviceOrderStatisticsList',
          name: 'ServiceOrderStatisticsList',
          component: ServiceOrderStatisticsList
        }, {
          path: 'salesmanOrderStatisticsList',
          name: 'SalesmanOrderStatisticsList',
          component: SalesmanOrderStatisticsList
        }, {
          path: 'factoryOrderStatisticsList',
          name: 'FactoryOrderStatisticsList',
          component: FactoryOrderStatisticsList
        }, {
          path: 'productTypeOrderStatisticsList',
          name: 'ProductTypeOrderStatisticsList',
          component: ProductTypeOrderStatisticsList
        }
        ]
      },
      {
        // 数据字典
        path: 'dataDictionary',
        component: DataDictionary,
        children: [{
          path: 'dataList',
          name: 'DataList',
          component: DataList
        },
        {
          path: 'editDataDictionary',
          name: 'EditDataDictionary',
          component: EditDataDictionary
        }, {
          path: 'updateDataDictionary',
          name: 'UpdateDataDictionary',
          component: UpdateDataDictionary
        }]
      }, {
        // 工厂管理
        path: 'factory',
        component: Factory,
        children: [{
          path: 'setFactory',
          name: 'SetFactory',
          component: SetFactory
        }]
      }],
    beforeEnter (to, from, next) {
      let token = Vue.cookie.get('token')
      if (!token || !/\S/.test(token)) {
        next({ name: 'Login' })
      }
      next()
    }
  }]
})
