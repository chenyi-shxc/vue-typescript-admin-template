import request from '@/utils/request'

// 查询全景视图-客户信息列表
export function listFullviewCust(query) {
  return request({
    url: '/datavisual/fullviewCust/list',
    method: 'get',
    params: query
  })
}

// 查询全景视图-客户信息详细
export function getFullviewCust(bookBranch) {
  return request({
    url: '/datavisual/fullviewCust/' + bookBranch,
    method: 'get'
  })
}

// 新增全景视图-客户信息
export function addFullviewCust(data) {
  return request({
    url: '/datavisual/fullviewCust',
    method: 'post',
    data: data
  })
}

// 修改全景视图-客户信息
export function updateFullviewCust(data) {
  return request({
    url: '/datavisual/fullviewCust',
    method: 'put',
    data: data
  })
}

// 删除全景视图-客户信息
export function delFullviewCust(bookBranch) {
  return request({
    url: '/datavisual/fullviewCust/' + bookBranch,
    method: 'delete'
  })
}

// 导出全景视图-客户信息
export function exportFullviewCust(query) {
  return request({
    url: '/datavisual/fullviewCust/export',
    method: 'get',
    params: query
  })
}

// 导出全景视图-客户信息
export function queryFullView() {
  return request({
    url: '/datavisual/fullView/timeline2/1000/20210326',
    method: 'get',
    params: null
  })
}
