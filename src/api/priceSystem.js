import axios from 'axios'

// 产品类型模块
// 产品类型分页查询接口
export const productTypeQuery = (params) => {
  return axios.post('servepc/productType/queryPage', params).then(res => {
    return res.data
  })
}

// 产品类型添加接口
export const productTypeAdd = (params) => {
  return axios.post('servepc/productType/add', params).then(res => {
    return res.data
  })
}

// 产品类型例表
export const productTypeAll = (params) => {
  return axios.post('servepc/productType/getAll', params).then(res => {
    return res.data
  })
}

// 报价项树形列表查询
export const productTypeTree = (params) => {
  return axios.post('servepc/productItem/getProductItemValuesTree', params).then(res => {
    return res.data
  })
}

// 产品类型编辑接口
export const productTypeUpdate = (params) => {
  return axios.post('servepc/productType/update', params).then(res => {
    return res.data
  })
}

// 产品类型删除接口
export const productTypeDelete = (id) => {
  return axios.post('servepc/productType/delete', {id: id}).then(res => {
    return res.data
  })
}

// 产品类型子类型模块
// 产品类型子类型分页查询接口
export const productTypeSubQuery = (params) => {
  return axios.post('servepc/productTypeSub/queryPage', params).then(res => {
    return res.data
  })
}

// 产品类型子类型添加接口
export const productTypeSubAdd = (params) => {
  return axios.post('servepc/productTypeSub/add', params).then(res => {
    return res.data
  })
}

// 产品类型子类型编辑接口
export const productTypeSubUpdate = (params) => {
  return axios.post('servepc/productTypeSub/update', params).then(res => {
    return res.data
  })
}

// 产品类型子类型删除接口
export const productTypeSubDelete = (id) => {
  return axios.post('servepc/productTypeSub/delete', {id: id}).then(res => {
    return res.data
  })
}
// 报价项管理模块
// 报价项管理分页查询接口
export const productItemQuery = (params) => {
  return axios.post('servepc/productItem/queryPage', params).then(res => {
    return res.data
  })
}
// 报价项管理添加接口
export const productItemAdd = (params) => {
  return axios.post('servepc/productItem/add', params).then(res => {
    return res.data
  })
}
// 报价项管理编辑接口
export const productItemUpdate = (params) => {
  return axios.post('servepc/productItem/update', params).then(res => {
    return res.data
  })
}
// 报价项管理删除接口
export const productItemDelete = (params) => {
  return axios.post('servepc/productItem/delete', params).then(res => {
    return res.data
  })
}

// 表面处理模块
// 表面处理分页查询接口
export const specialProcessQuery = (params) => {
  return axios.post('servepc/specialProcess/queryPage', params).then(res => {
    return res.data
  })
}
// 表面处理添加接口
export const specialProcessAdd = (params) => {
  return axios.post('servepc/specialProcess/add', params).then(res => {
    return res.data
  })
}
// 表面处理编辑接口
export const specialProcessUpdate = (params) => {
  return axios.post('servepc/specialProcess/update', params).then(res => {
    return res.data
  })
}
// 表面处理删除接口
export const specialProcessDelete = (id) => {
  return axios.post('servepc/specialProcess/delete', {id: id}).then(res => {
    return res.data
  })
}
// 产品类型子类型报价项树形查询接口
export const getPriceItemInfoById = (params) => {
  return axios.post('servepc/productTypeSub/getPriceItemInfoById', params).then(res => {
    return res.data
  })
}
// 根据产品子类型id 查询报价项
export const productTypeSubQueryDetail = (params) => {
  return axios.post('servepc/productTypeSub/query', params).then(res => {
    return res.data
  })
}
