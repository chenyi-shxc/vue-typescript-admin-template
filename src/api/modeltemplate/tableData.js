import request from '@/utils/request'

// 查询数据管理-字段列表
export function listField(url, query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}

// 查询数据管理-字段详细
export function getField(id) {
  return request({
    url: '/datamanager/field/' + id,
    method: 'get'
  })
}

// 新增数据管理-字段
export function addField(data) {
  return request({
    url: '/datamanager/field',
    method: 'post',
    data: data
  })
}

// 修改数据管理-字段
export function updateField(data) {
  return request({
    url: '/datamanager/field',
    method: 'put',
    data: data
  })
}

// 删除数据管理-字段
export function delField(id) {
  return request({
    url: '/datamanager/field/' + id,
    method: 'delete'
  })
}

// 导出数据管理-字段
export function exportField(url, query) {
  return request({
    // url: '/datamanager/field/export',
    url: url,
    method: 'get',
    params: query
  })
}