import axios from 'axios'

// 工厂下拉例表管理
export const factoryList = (params) => {
  return axios.post('servepc/factory/listQuery', params).then(res => {
    return res.data
  })
}

// 添加工厂
export const factoryAdd = (params) => {
  return axios.post('servepc/factory/add', params).then(res => {
    return res.data
  })
}

// 删除工厂 信息
export const factoryDelete = (params) => {
  return axios.post('servepc/factory/delete', params).then(res => {
    return res.data
  })
}

// 查询工厂列表
export const factoryQueryPage = (params) => {
  return axios.post('servepc/factory/queryPage', params).then(res => {
    return res.data
  })
}

// 编辑修改工厂信息
export const factoryUpdate = (params) => {
  return axios.post('servepc/factory/update', params).then(res => {
    return res.data
  })
}
