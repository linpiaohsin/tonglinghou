import axios from 'axios'

// 客户管理

// 查询客户列表
export const cusUserQueryPage = (params) => {
  return axios.post('servepc/cusUser/queryPage', params).then(res => {
    return res.data
  })
}

// 更改状态： 冻结  解冻
export const cusUserUpdateIsFrozen = (params) => {
  return axios.post('servepc/cusUser/update/isFrozen', params).then(res => {
    return res.data
  })
}

// 客户列表
// 客户列表  保存订单
export const orderDraftQueryPage = (params) => {
  return axios.post('servepc/orderDraft/queryPage', params).then(res => {
    return res.data
  })
}

// 客户审核 列表
export const cusUserQueryPageNoPass = (params) => {
  return axios.post('servepc/cusUser/queryPage/noPass', params).then(res => {
    return res.data
  })
}

// 客户审核 ，点击审核
export const cusUserUpdateStatus = (params) => {
  return axios.post('servepc/cusUser/update/status', params).then(res => {
    return res.data
  })
}

// 客户信息登记  分页与组合查询接口
export const cusConsultQueryPage = (params) => {
  return axios.post('servepc/cusConsult/queryPage', params).then(res => {
    return res.data
  })
}

// 客户信息登记备注接口
export const cusConsultUpdateRemark = (params) => {
  return axios.post('servepc/cusConsult/update/remark', params).then(res => {
    return res.data
  })
}

// 客户信息修改沟通状态接口
export const cusConsultUpdateIsContact = (params) => {
  return axios.post('servepc/cusConsult/update/isContact', params).then(res => {
    return res.data
  })
}
