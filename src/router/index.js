import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/views/login')
const Comtainer = () => import('@/views/contain')
const HomePage = () => import('@/views/home/homePage')

const Topup = () => import('@/views/payment/topup')
const Recharge = () => import('@/views/payment/recharge')

const Agent = () => import('@/views/agent/agent')
const Morecontent = () => import('@/views/agent/morecontent')

const Buydrill = () => import('@/views/buyDia/buydrill')
const qrCode = () => import('@/views/buyDia/qrcode')

const My = () => import('@/views/mine/mine')
const RechargeRecord = () => import('@/views/mine/rechargeRecord')
const DrillRecord = () => import('@/views/mine/drillRecord')

const Agreement = () => import('@/views/mine/agreement')
const Specification = () => import('@/views/mine/specification')
const Personal = () => import('@/views/mine/personal')
const Identify = () => import('@/views/mine/identify')
const rechargeList = () => import('@/views/mine/rechargeList')
const checkPassword = () => import('@/views/mine/checkPassword')

const CreateFriends = () => import('@/views/mine/createFriends')
const Protol = () => import('@/views/queyouhui/protol')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Protol',
      name: Protol,
      component: Protol
    },
    {
      path: '/Comtainer',
      component: Comtainer,
      children: [
        {
          path: 'HomePage',
          name: HomePage,
          component: HomePage
        },
        {
          path: 'Topup',
          name: Topup,
          component: Topup
        },
        {
          path: 'Agent',
          name: Agent,
          component: Agent
        },
        {
          path: 'Morecontent',
          name: Morecontent,
          component: Morecontent
        },
        {
          path: 'Buydrill',
          name: Buydrill,
          component: Buydrill
        },
        {
          path: 'My',
          name: My,
          component: My
        },
        {
          path: 'RechargeRecord',
          name: RechargeRecord,
          component: RechargeRecord
        },
        {
          path: 'DrillRecord',
          name: DrillRecord,
          component: DrillRecord
        },
        {
          path: 'CreateFriends',
          name: CreateFriends,
          component: CreateFriends
        },
        {
          path: 'personal',
          name: Personal,
          component: Personal
        },
        {
          path: 'Identify',
          name: Identify,
          component: Identify
        },

        {
          path: 'Agreement',
          name: Agreement,
          component: Agreement
        },
        {
          path: 'Recharge',
          name: Recharge,
          component: Recharge
        },
        {
          path: 'Specification',
          name: Specification,
          component: Specification
        },
        {
          path: 'rechargeList',
          name: rechargeList,
          component: rechargeList
        },
        {
          path: 'checkPassword',
          name: checkPassword,
          component: checkPassword
        },
        {
          path: 'qrcode',
          name: qrCode,
          component: qrCode
        }
      ]
    }
  ]
})
