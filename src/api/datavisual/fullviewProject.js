import request from '@/utils/request'

// 查询全景视图-项目信息列表
export function listFullviewProject(query) {
  return request({
    url: '/datavisual/fullviewProject/list',
    method: 'get',
    params: query
  })
}

// 查询全景视图-项目信息详细
export function getFullviewProject(bookBranch) {
  return request({
    url: '/datavisual/fullviewProject/' + bookBranch,
    method: 'get'
  })
}

// 新增全景视图-项目信息
export function addFullviewProject(data) {
  return request({
    url: '/datavisual/fullviewProject',
    method: 'post',
    data: data
  })
}

// 修改全景视图-项目信息
export function updateFullviewProject(data) {
  return request({
    url: '/datavisual/fullviewProject',
    method: 'put',
    data: data
  })
}

// 删除全景视图-项目信息
export function delFullviewProject(bookBranch) {
  return request({
    url: '/datavisual/fullviewProject/' + bookBranch,
    method: 'delete'
  })
}

// 导出全景视图-项目信息
export function exportFullviewProject(query) {
  return request({
    url: '/datavisual/fullviewProject/export',
    method: 'get',
    params: query
  })
}