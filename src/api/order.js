import axios from 'axios'

// 订单管理-订单列表
export const orderListPage = (params) => {
  return axios.post('servepc/order/queryPage', params).then(res => {
    return res.data
  })
}

// 订单详情
export const orderInfo = (params) => {
  return axios.post('servepc/order/query', params).then(res => {
    return res.data
  })
}

// 产品类型
export const productType = (params) => {
  return axios.post('servepc/productType/queryPage', params).then(res => {
    return res.data
  })
}

// 修改订单状态
export const updateOrderStatus = (params) => {
  return axios.post('servepc/order/update', params).then(res => {
    return res.data
  })
}

// 工厂分配修改
export const orderUpdFactory = (params) => {
  return axios.post('servepc/order/updFactory', params).then(res => {
    return res.data
  })
}

// 订单管理-审核报价
export const examinePriceListPage = (params) => {
  return axios.post('servepc/orderRob/queryPage', params).then(res => {
    return res.data
  })
}

// 工厂分配
export const factoryDistributionListPage = (params) => {
  return axios.post('servepc/order/factoryDisQuery', params).then(res => {
    return res.data
  })
}

// 订单管理-评价管理
export const evaluatePage = (params) => {
  return axios.post('servepc/orderEvaluate/queryPage', params).then(res => {
    return res.data
  })
}

// 退款申请
export const refundPage = (params) => {
  return axios.post('servepc/refundApply/queryPage', params).then(res => {
    return res.data
  })
}

// 退款申请
export const refundMoney = (params) => {
  return axios.post('servepc/refundApply/update', params).then(res => {
    return res.data
  })
}

// 退款申请
export const changePrice = (params) => {
  return axios.post('servepc/order/updatePrice', params).then(res => {
    return res.data
  })
}



export const afterSalePage = (params) => {
  return axios.post('servepc/saleAfterApply/queryPage', params).then(res => {
    return res.data
  })
}

export const afterSale = (params) => {
  return axios.post('servepc/saleAfterApply/update', params).then(res => {
    return res.data
  })
}

export const robUpdate = (params) => {
  return axios.post('servepc/orderRob/robUpdate', params).then(res => {
    return res.data
  })
}

export const getOrderByOrderNo = (params) => {
  return axios.post('servepc/orderEvaluate/getOrderByOrderNo', params).then(res => {
    return res.data
  })
}
// 产品类型树形下拉列表
export const productTypeSub = (params) => {
  return axios.post('servepc/productTypeSub/productTreeQuery', params).then(res => {
    return res.data
  })
}

// 用户地址分页查询接口
export const cusUserAddress = (params) => {
  return axios.post('customer/cusUserAddress/queryPage', params).then(res => {
    return res.data
  })
}

// 特殊工艺下拉列表查询
export const specialProcessList = (params) => {
  return axios.post('servepc/specialProcess/queryList', params).then(res => {
    return res.data
  })
}

// 计算公式
export const productTypeValuation = (params) => {
  return axios.post('servepc/productType/valuation', params).then(res => {
    return res.data
  })
}

// 生成报价接口
export const orderDraft = (params) => {
  return axios.post('servepc/order/createOffer', params).then(res => {
    return res.data
  })
}

// 已完成收货，未评价的订单
export const needEvaluateOrder = (params) => {
  return axios.post('servepc/orderEvaluate/needEvaluateOrder', params).then(res => {
    return res.data
  })
}

// 根据产品id 查 父级信息
export const getInfoByProductId = (params) => {
  return axios.post('servepc/product/getInfoByProductId', params).then(res => {
    return res.data
  })
}

// 审核，修改订单
export const orderUpdatePrice = (params) => {
  return axios.post('servepc/order/updatePrice', params).then(res => {
    return res.data
  })
}

// 单独修改价格
export const orderUpdPrice = (params) => {
  return axios.post('servepc/order/updPrice', params).then(res => {
    return res.data
  })
}

