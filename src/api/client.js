import axios from 'axios'

/**
 * 客户端管理产品列表分页查询
 * @param {*} params
 */
export const queryPage = (params) => {
  return axios.post('servepc/product/queryPage', params).then(res => {
    return res.data
  })
}
// 新增
export const addData = (params) => {
  return axios.post('servepc/popupAd/add', params).then(res => {
    return res.data
  })
}
//启动或者不启用弹窗广告
export const selectUseStatus = (params) => {
  return axios.post('servepc/popupAd/updateIsUse', params).then(res => {
    return res.data
  })
}
// 编辑
export const updateData = (params) => {
  return axios.post('servepc/popupAd/update', params).then(res => {
    return res.data
  })
}

export const popupAddelete = (params) => {
  return axios.post('servepc/popupAd/delete', params).then(res => {
    return res.data
  })
}
/**
 * 客户端产品删除
 * @param {*} params
 */
export const deleteProduct = (params) => {
  return axios.post('servepc/product/delete', params).then(res => {
    return res.data
  })
}
/**
 * 客户端管理弹窗广告分页查询
 * @param {*} params
 */
export const queryPageAd = (params) => {
  return axios.post('servepc/popupAd/queryPage', params).then(res => {
    return res.data
  })
}

// 目标客户查询
export const customerQuery = (params) => {
  return axios.post('servepc/cusUser/query/EnterpriseName', params).then(res => {
    return res.data
  })
}

// 屎黄色区域
export const getProductItemValuesTree = (params) => {
  return axios.post('servepc/productItem/getProductItemValuesTree', params).then(res => {
    return res.data
  })
}

// 一级产品类型
export const oneLevelQuery = (params) => {
  return axios.post('servepc/product/oneLevelQuery', params).then(res => {
    return res.data
  })
}
// 二级产品类型
export const secondLevelQuery = (params) => {
  return axios.post('servepc/product/secondLevelQuery', params).then(res => {
    return res.data
  })
}

// 根据二级产品类型获取 servepc/productItem/add
export const getPriceItemInfo = (params) => {
  return axios.post('productTypeSub/getPriceItemInfoById', params).then(res => {
    return res.data
  })
}

// 产品列表添加
export const prodectItemAdd = (params) => {
  return axios.post('servepc/product/add', params).then(res => {
  // return axios.post('servepc/productItem/add', params).then(res => {
    return res.data
  })
}
// 产品列表编辑
export const prodectItemUpdate = (params) => {
  return axios.post('servepc/product/update', params).then(res => {
    return res.data
  })
}
