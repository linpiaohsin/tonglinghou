import axios from 'axios'
// 用户登录接口
export const player = (params) => {
  return axios.post('playerrechargerecord/findPlayerIdByAgentId', params).then(res => {
    return res.data
  })
}
// 查询
export const isexit = (params) => {
  return axios.post('player/findUser', params).then(res => {
    return res.data
  })
}

// 历史充值记录
export const findPlayer = (params) => {
  return axios.post('playerrechargerecord/findUserRecharge', params).then(res => {
    return res.data
  })
}
// 充值
export const addAgentCards = (params) => {
  return axios.post('agent/updateAgentCards', params).then(res => {
    return res.data
  })
}
