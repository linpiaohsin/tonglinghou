import axios from 'axios'
// 买砖
export const buyBill = (params) => {
  return axios.post('agentCardList/findAgentCardList', params).then(res => {
    return res.data
  })
}
// 付款
export const payTo = (params) => {
  return axios.post('qpay/pay', params).then(res => {
    return res.data
  })
}
