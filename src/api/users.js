import axios from 'axios'

// 用户登录接口
export const login = (params) => {
  return axios.post('servepc/sysUser/login', params).then(res => {
    return res.data
  })
}

// 用户修改密码接口
export const changePassword = (params) => {
  return axios.post('servepc/sysUser/changePassword', params).then(res => {
    return res.data
  })
}

// 用户退出登录接口
export const logout = () => {
  return axios.post('servepc/sysUser/logout').then(res => {
    return res.data
  })
}

// 查询所有菜单树形接口
export const sysMenu = () => {
  return axios.post('servepc/sysMenu/list').then(res => {
    return res.data
  })
}

// 查询用户拥有的权限菜单接口
export const getMenuTree = () => {
  return axios.post('servepc/sysMenu/getSysMenuTree').then(res => {
    return res.data
  })
}

// 用户信息分页查询接口
export const queryUser = (params) => {
  return axios.post('servepc/sysUser/queryPage', params).then(res => {
    return res.data
  })
}

// 用户信息添加接口
export const addUser = (params) => {
  return axios.post('servepc/sysUser/add', params).then(res => {
    return res.data
  })
}

// 用户信息编辑接口
export const updUser = (params) => {
  return axios.post('servepc/sysUser/update', params).then(res => {
    return res.data
  })
}

// 用户信息删除接口
export const delUser = (id) => {
  return axios.post('servepc/sysUser/delete', {id: id}).then(res => {
    return res.data
  })
}

// 获取专属业务员ID接口
export const getBelongOwnId = () => {
  return axios.post('servepc/sysUser/getBelongOwnId').then(res => {
    return res.data
  })
}

// 角色管理分页查询接口
export const queryRole = (params) => {
  return axios.post('servepc/sysRole/queryPage', params).then(res => {
    return res.data
  })
}

// 角色信息下拉列表查询接口
export const queryRoleList = () => {
  return axios.post('servepc/sysRole/getList').then(res => {
    return res.data
  })
}

// 角色管理添加接口
export const addRole = (params) => {
  return axios.post('servepc/sysRole/add', params).then(res => {
    return res.data
  })
}

// 角色管理编辑接口
export const updRole = (params) => {
  return axios.post('servepc/sysRole/update', params).then(res => {
    return res.data
  })
}

// 角色管理删除接口
export const delRole = (id) => {
  return axios.post('servepc/sysRole/delete', {id: id}).then(res => {
    return res.data
  })
}

// 部门管理分页查询接口
export const queryDeptPage = (params) => {
  return axios.post('servepc/sysDept/queryPage', params).then(res => {
    return res.data
  })
}

// 部门信息下拉列表查询接口
export const queryDeptList = () => {
  return axios.post('servepc/sysDept/getList').then(res => {
    return res.data
  })
}

// 查询1级部门分类列表接口
export const queryDept = () => {
  return axios.post('servepc/sysDept/queryOneList').then(res => {
    return res.data
  })
}

// 部门管理添加接口
export const addDeptPage = (params) => {
  return axios.post('servepc/sysDept/add', params).then(res => {
    return res.data
  })
}

// 部门管理编辑接口
export const updDeptPage = (params) => {
  return axios.post('servepc/sysDept/update', params).then(res => {
    return res.data
  })
}

// 部门管理删除接口
export const delDept = (id) => {
  return axios.post('servepc/sysDept/delete', {id: id}).then(res => {
    return res.data
  })
}

// 查询角色拥有的权限菜单接口
export const getTree = (params) => {
  return axios.post('servepc/sysMenu/getTree', params).then(res => {
    return res.data
  })
}

// 二级
// 二级部门分页查询接口
export const queryDeptPageSub = (params) => {
  return axios.post('servepc/sysDept/queryPageSub', params).then(res => {
    return res.data
  })
}

// 二级部门管理添加接口
export const addDeptPageSub = (params) => {
  return axios.post('servepc/sysDept/addSub', params).then(res => {
    return res.data
  })
}

// 二级部门管理编辑接口
export const updDeptPageSub = (params) => {
  return axios.post('servepc/sysDept/update', params).then(res => {
    return res.data
  })
}

// 部门管理删除接口
export const delDeptSub = (id) => {
  return axios.post('servepc/sysDept/delete', {id: id}).then(res => {
    return res.data
  })
}
