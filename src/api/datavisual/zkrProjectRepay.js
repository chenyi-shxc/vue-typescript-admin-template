import request from '@/utils/request'

// 查询项目本息回收信息列表
export function listZkrProjectRepay(query) {
  return request({
    url: '/datavisual/zkrProjectRepay/list',
    method: 'get',
    params: query
  })
}

// 查询项目本息回收信息详细
export function getZkrProjectRepay(bookBranch) {
  return request({
    url: '/datavisual/zkrProjectRepay/' + bookBranch,
    method: 'get'
  })
}

// 新增项目本息回收信息
export function addZkrProjectRepay(data) {
  return request({
    url: '/datavisual/zkrProjectRepay',
    method: 'post',
    data: data
  })
}

// 修改项目本息回收信息
export function updateZkrProjectRepay(data) {
  return request({
    url: '/datavisual/zkrProjectRepay',
    method: 'put',
    data: data
  })
}

// 删除项目本息回收信息
export function delZkrProjectRepay(bookBranch) {
  return request({
    url: '/datavisual/zkrProjectRepay/' + bookBranch,
    method: 'delete'
  })
}

// 导出项目本息回收信息
export function exportZkrProjectRepay(query) {
  return request({
    url: '/datavisual/zkrProjectRepay/export',
    method: 'get',
    params: query
  })
}