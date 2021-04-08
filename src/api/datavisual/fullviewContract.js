import request from '@/utils/request'

// 查询全景视图-合同信息列表
export function listFullviewContract(query) {
  return request({
    url: '/datavisual/fullviewContract/list',
    method: 'get',
    params: query
  })
}

// 查询全景视图-合同信息详细
export function getFullviewContract(bookBranch) {
  return request({
    url: '/datavisual/fullviewContract/' + bookBranch,
    method: 'get'
  })
}

// 新增全景视图-合同信息
export function addFullviewContract(data) {
  return request({
    url: '/datavisual/fullviewContract',
    method: 'post',
    data: data
  })
}

// 修改全景视图-合同信息
export function updateFullviewContract(data) {
  return request({
    url: '/datavisual/fullviewContract',
    method: 'put',
    data: data
  })
}

// 删除全景视图-合同信息
export function delFullviewContract(bookBranch) {
  return request({
    url: '/datavisual/fullviewContract/' + bookBranch,
    method: 'delete'
  })
}

// 导出全景视图-合同信息
export function exportFullviewContract(query) {
  return request({
    url: '/datavisual/fullviewContract/export',
    method: 'get',
    params: query
  })
}