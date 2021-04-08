import request from '@/utils/request'

// 查询设计模型统计列表
export function listStModeSj(query) {
  return request({
    url: '/datamanager/stModeSj/list',
    method: 'get',
    params: query
  })
}

// 查询设计模型统计详细
export function getStModeSj(id) {
  return request({
    url: '/datamanager/stModeSj/' + id,
    method: 'get'
  })
}

// 新增设计模型统计
export function addStModeSj(data) {
  return request({
    url: '/datamanager/stModeSj',
    method: 'post',
    data: data
  })
}

// 修改设计模型统计
export function updateStModeSj(data) {
  return request({
    url: '/datamanager/stModeSj',
    method: 'put',
    data: data
  })
}

// 删除设计模型统计
export function delStModeSj(id) {
  return request({
    url: '/datamanager/stModeSj/' + id,
    method: 'delete'
  })
}

// 导出设计模型统计
export function exportStModeSj(query) {
  return request({
    url: '/datamanager/stModeSj/export',
    method: 'get',
    params: query
  })
}