import axios from 'axios'
// 代理商
export const saveCusAgent = (params) => {
  return axios.post('agent/saveCusAgentInfo', params).then(res => {
    return res.data
  })
}
// 代理商-查询下级代理商或者是查询更多
export const getByAgent = (params) => {
  return axios.post('agent/findFatherIdAndTwoLevelIdByAgentNumber', params).then(res => {
    return res.data
  })
}
