import axios from 'axios'

// 图片上传
export const factoryAdd = (params) => {
  return axios.post('common/upload', params).then(res => {
    return res.data
  })
}
