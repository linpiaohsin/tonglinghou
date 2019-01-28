import axios from 'axios'

import * as userManagement from './users.js'
import * as factoryManagement from './factory.js'

import * as guestManagement from './cusUser.js'
import * as statisticsManagement from './statistics.js'

import * as dictionariesManagement from './dictionaries.js'

import * as priceSystemManagement from './priceSystem.js'
import * as commonManagement from './common.js'

import * as informationManagement from './information.js'
import * as informationClient from './client.js'

import * as informationOrder from './order.js'
import vm from '@/main.js'
// axios.defaults.baseURL = 'http://192.168.31.108:2018/web/api/'

axios.defaults.baseURL = 'http://47.106.243.1:2018/web/api/'

axios.defaults.withCredentials = true

axios.interceptors.response.use((response) => {
  if (response.data.code === 10000) {
    vm.$router.push('/')
  }
  return Promise.resolve(response)
}, (error) => {
  console.log('>>>>>>', error)
  return Promise.resolve(error)
})
// 公共服务
export const common = commonManagement
// 导出用户管理模块
export const sysUser = userManagement

// 信息管理模块
export const information = informationManagement

// 客户管理模块
export const client = informationClient

// 工厂模块
export const factory = factoryManagement

// 用户管理 模块 （客户管理）
export const guest = guestManagement

// 报表统计 模块
export const statistics = statisticsManagement

// 字典表
export const dictionaries = dictionariesManagement

// 价格体系设置模块
export const priceSystem = priceSystemManagement

// 订单
export const order = informationOrder

// 按钮权限控制
export const menuBtnControl = (params) => {
  return axios.post('servepc/sysMenu/getSysMenuAnNiu', params).then(res => {
    return res.data
  })
}
