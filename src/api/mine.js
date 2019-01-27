import axios from 'axios'
// 用户登录接口
export const player = (params) => {
  return axios.post('playerrechargerecord/findPlayerIdByAgentId', params).then(res => {
    return res.data
  })
}

export const rechargeRecord = (params) => {
  return axios.post('playerrechargerecord/findsAgentRechargeRecord', params).then(res => {
    return res.data
  })
}

// 房卡上半部分
export const topPath = (params) => {
  return axios.post('agentBuyRecord/findCurrentYestadayLastWeek', params).then(res => {
    return res.data
  })
}

// 房卡下半部分
export const lastPath = (params) => {
  return axios.post('agentBuyRecord/findAgentBuyRecordByAgentId', params).then(res => {
    return res.data
  })
}

// 个人信息
export const personInfo = (params) => {
  return axios.post('agent/findAgentInfoByAgentNumber', params).then(res => {
    return res.data
  })
}

// 修改密码
export const changePwd = (params) => {
  return axios.post('agent/modifyPassword', params).then(res => {
    return res.data
  })
}

// 认证
export const certifiCation = (params) => {
  return axios.post('agentRealName/saveAgentAuthentication', params).then(res => {
    return res.data
  })
}

// 实名认证状态
export const certifiCationStatus = (params) => {
  return axios.post('agentRealName/findAgentIsAuth', params).then(res => {
    return res.data
  })
}
// 我的-充值记录
export const myAgentRecord = (params) => {
  return axios.post('playerrechargerecord/findsAgentRechargeRecord', params).then(res => {
    return res.data
  })
}
