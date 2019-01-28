import axios from 'axios'

// 报表统计

// 客户统计 分页组合查询
export const statisticsCustomer = (params) => {
  return axios.post('servepc/order/queryPage/statistics/customer', params).then(res => {
    return res.data
  })
}

// 获取 省市区
export const addressRegion = (params) => {
  return axios.post('servepc/addressRegion/query', params).then(res => {
    return res.data
  })
}

// 客户统计  查看订单
export const queryCusOrderPage = (params) => {
  return axios.post('servepc/order/queryCusOrderPage', params).then(res => {
    return res.data
  })
}

// 产品类型树形下拉列表
export const productTreeQuery = (params) => {
  return axios.post('servepc/productTypeSub/productTreeQuery', params).then(res => {
    return res.data
  })
}
// 公司部门
export const sysDeptGetList = (params) => {
  return axios.post('servepc/sysDept/getList', params).then(res => {
    return res.data
  })
}

// 客服统计： 客服订单统计分页查询接口
export const waiter = (params) => {
  return axios.post('servepc/order/queryPage/statistics/waiter', params).then(res => {
    return res.data
  })
}
// 客服统计：订单统计查询 "totalSum": 总单数, "totalCount": 总金额
export const waiterTotal = (params) => {
  return axios.post('servepc/order/query/statistics/waiter', params).then(res => {
    return res.data
  })
}

// 业务员统计：业务员订单统计分页查询接口
export const salesman = (params) => {
  return axios.post('servepc/order/queryPage/statistics/salesman', params).then(res => {
    return res.data
  })
}
// 业务员统计: 业务员：订单统计查询； "totalSum": 总单数, "totalCount": 总金额
export const salesmanTotal = (params) => {
  return axios.post('servepc/order/query/statistics/salesman', params).then(res => {
    return res.data
  })
}

// 工厂统计
export const factory = (params) => {
  return axios.post('servepc/factory/statisticsPage', params).then(res => {
    return res.data
  })
}

// 客户登录统计查询
export const sysLogincount = (params) => {
  return axios.post('servepc/sysLogincount/queryPage', params).then(res => {
    return res.data
  })
}

// 产品类型统计
export const productTypeStatistics = (params) => {
  return axios.post('servepc/order/productTypeStatistics', params).then(res => {
    return res.data
  })
}
// 综合报表查询工厂业绩排名
export const ConsolidatedStatementQuery = (params) => {
  return axios.post('servepc/order/ConsolidatedStatementQuery', params).then(res => {
    return res.data
  })
}

