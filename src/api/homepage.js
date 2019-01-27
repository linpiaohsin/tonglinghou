import axios from 'axios'
// 用户登录接口
export const login = (params) => {
  return axios.post('agent/findPwdByPhone', params).then(res => {
    return res.data
  })
}
