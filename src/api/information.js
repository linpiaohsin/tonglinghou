import axios from 'axios'

/**
 * 短信消息分页查询接口/系统消息分页查询接口
 * @param {*} params
 */
export const queryPage = (params) => {
  return axios.post('servepc/messageRecord/queryPage', params).then(res => {
    return res.data
  })
}
