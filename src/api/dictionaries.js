import axios from 'axios'

// 字典表

// 分页查询
export const sysDictQueryPage = (params) => {
  return axios.post('servepc/sysDict/queryPage', params).then(res => {
    return res.data
  })
}

// 添加
export const add = (params) => {
  return axios.post('servepc/sysDict/add', params).then(res => {
    return res.data
  })
}

// 更改
export const update = (params) => {
  return axios.post('servepc/sysDict/update', params).then(res => {
    return res.data
  })
}

// 删除
export const sysDictDelete = (params) => {
  return axios.post('servepc/sysDict/delete', params).then(res => {
    return res.data
  })
}
