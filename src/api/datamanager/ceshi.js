import request from '@/utils/request'

// 查询用户信息122列表
export function listCeshi(query) {
  return request({
    url: '/datamanager/ceshi/list',
    method: 'get',
    params: query
  })
}

// 查询用户信息122详细
export function getCeshi(userId) {
  return request({
    url: '/datamanager/ceshi/' + userId,
    method: 'get'
  })
}

// 新增用户信息122
export function addCeshi(data) {
  return request({
    url: '/datamanager/ceshi',
    method: 'post',
    data: data
  })
}

// 修改用户信息122
export function updateCeshi(data) {
  return request({
    url: '/datamanager/ceshi',
    method: 'put',
    data: data
  })
}

// 删除用户信息122
export function delCeshi(userId) {
  return request({
    url: '/datamanager/ceshi/' + userId,
    method: 'delete'
  })
}

// 导出用户信息122
export function exportCeshi(query) {
  return request({
    url: '/datamanager/ceshi/export',
    method: 'get',
    params: query
  })
}