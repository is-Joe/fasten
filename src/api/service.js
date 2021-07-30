import request from '@/util/request'

export function login(data) {
  return request({
    // url: '/auth',
    url: 'http://140.143.237.22:3000',
    method: 'post',
    data: data,
  })
}

// project
export function fetchProjects(query) {
  return request({
    url: '/projects',
    method: 'get',
    params: query,
  })
}

export function getProjectById(id) {
  return request({
    url: `/projects/${id}`,
    method: 'get',
  })
}
export function updateProject(id, data) {
  return request({
    url: `/projects/${id}`,
    method: 'put',
    data: data,
  })
}

export function createProject(data) {
  return request({
    url: `/projects`,
    method: 'post',
    data: data,
  })
}

export function deleteProject(id) {
  return request({
    url: `/projects/${id}`,
    method: 'delete',
  })
}

// node data
export function fetchNodeDatas(query) {
  return request({
    url: '/nodedatas',
    method: 'get',
    params: query,
  })
}

// node data
export function fetchLastDatas(query) {
  return request({
    url: '/lastdata',
    method: 'get',
    params: query,
  })
}

// node type A api
export function fetchNodeParamsA(query) {
  return request({
    url: '/nodeparamsa',
    method: 'get',
    params: query,
  })
}

export function getNodeParamAById(id) {
  return request({
    url: `/nodeparamsa/${id}`,
    method: 'get',
  })
}

export function updateNodeParamA(id, data) {
  return request({
    url: `/nodeparamsa/${id}`,
    method: 'put',
    data: data,
  })
}

export function createNodeParamA(data) {
  return request({
    url: `/nodeparamsa`,
    method: 'post',
    data: data,
  })
}

export function deleteNodeParamA(id) {
  return request({
    url: `/nodeparamsa/${id}`,
    method: 'delete',
  })
}

// node type A api
export function fetchNodeParamsB(query) {
  return request({
    url: '/nodeparamsb',
    method: 'get',
    params: query,
  })
}

export function getNodeParamBById(id) {
  return request({
    url: `/nodeparamsb/${id}`,
    method: 'get',
  })
}

export function updateNodeParamB(id, data) {
  return request({
    url: `/nodeparamsb/${id}`,
    method: 'put',
    data: data,
  })
}

export function createNodeParamB(data) {
  return request({
    url: `/nodeparamsb`,
    method: 'post',
    data: data,
  })
}

export function deleteNodeParamB(id) {
  return request({
    url: `/nodeparamsb/${id}`,
    method: 'delete',
  })
}

// node
export function fetchNodes(query) {
  return request({
    url: '/sensors',
    method: 'get',
    params: query,
  })
}

export function getNodeById(id) {
  return request({
    url: `/sensors/${id}`,
    method: 'get',
  })
}
export function updateNode(id, data) {
  return request({
    url: `/sensors/${id}`,
    method: 'put',
    data: data,
  })
}

export function createNode(data) {
  return request({
    url: `/sensors`,
    method: 'post',
    data: data,
  })
}

export function deleteNode(id) {
  return request({
    url: `/sensors/${id}`,
    method: 'delete',
  })
}

// company
export function fetchCompanies(query) {
  return request({
    url: '/companies',
    method: 'get',
    params: query,
  })
}

export function getCompanyById(id) {
  return request({
    url: `/companies/${id}`,
    method: 'get',
  })
}
export function updateCompany(id, data) {
  return request({
    url: `/companies/${id}`,
    method: 'put',
    data: data,
  })
}

export function createCompany(data) {
  return request({
    url: `/companies`,
    method: 'post',
    data: data,
  })
}

export function deleteCompany(id) {
  return request({
    url: `/companies/${id}`,
    method: 'delete',
  })
}

//user
export function fetchUsers(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query,
  })
}

export function getUserById(id) {
  return request({
    url: `/users/${id}`,
    method: 'get',
  })
}
export function updateUser(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data: data,
  })
}

export function createUser(data) {
  return request({
    url: `/users`,
    method: 'post',
    data: data,
  })
}

export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete',
  })
}

//role
export function fetchRoles(query) {
  return request({
    url: '/acl/roles',
    method: 'get',
    params: query,
  })
}

export function getRoleById(id) {
  return request({
    url: `/acl/roles/${id}`,
    method: 'get',
  })
}
export function updateRole(id, data) {
  return request({
    url: `/acl/users/${id}`,
    method: 'put',
    data: data,
  })
}

export function createRole(data) {
  return request({
    url: `/acl/roles`,
    method: 'post',
    data: data,
  })
}

export function deleteRole(id) {
  return request({
    url: `/acl/roles/${id}`,
    method: 'delete',
  })
}

// iae702
export function fetchIae702s(query) {
  return request({
    url: '/iae702s',
    method: 'get',
    params: query,
  })
}

export function getIae702ById(id) {
  return request({
    url: `/iae702s/${id}`,
    method: 'get',
  })
}
export function updateIae702(id, data) {
  return request({
    url: `/iae702s/${id}`,
    method: 'put',
    data: data,
  })
}

export function createIae702(data) {
  return request({
    url: `/iae702s`,
    method: 'post',
    data: data,
  })
}

export function deleteIae702(id) {
  return request({
    url: `/iae702s/${id}`,
    method: 'delete',
  })
}

// iam202
export function fetchIam202_ids(query) {
  return request({
    url: '/iam202_ids',
    method: 'get',
    params: query,
  })
}

export function getIam202_idById(id) {
  return request({
    url: `/iam202_ids/${id}`,
    method: 'get',
  })
}
export function updateIam202_id(id, data) {
  return request({
    url: `/iam202_ids/${id}`,
    method: 'put',
    data: data,
  })
}

export function createIam202_id(data) {
  return request({
    url: `/iam202_ids`,
    method: 'post',
    data: data,
  })
}

export function deleteIam202_id(id) {
  return request({
    url: `/iam202_ids/${id}`,
    method: 'delete',
  })
}

// node data
export function fetchIam202Datas(query) {
  return request({
    url: '/iam202_datas',
    method: 'get',
    params: query,
  })
}
