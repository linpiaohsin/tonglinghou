import axios from 'axios'

axios.defaults.withCredentials = true

// 用户登录接口
export const login = (params) => {
  return axios.post('servepc/sysUser/login', params).then(res => {
    return res.data
  })
}
