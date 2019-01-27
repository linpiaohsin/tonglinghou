import axios from 'axios'

import * as homepage from './homepage.js'
import * as payment from './payment.js'
import * as agentInfo from './agent.js'
import * as buyBill from './buyDia.js'
import * as mined from './mine.js'

axios.defaults.baseURL = 'http://192.168.31.248:8080/QunYuGamePlatform/'

// axios.defaults.baseURL = 'http://211.110.66.25:8080/QunYuGamePlatform/'

axios.defaults.withCredentials = true

export const home = homepage

export const pay = payment

export const agent = agentInfo

export const bill = buyBill

export const mine = mined

// 用户登录接口
export const findAgentCard = (params) => {
  return axios.post('agent/findAgentCardById', params).then(res => {
    return res.data
  })
}
