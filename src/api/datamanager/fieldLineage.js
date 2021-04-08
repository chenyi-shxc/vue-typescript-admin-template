import request from '@/utils/request'

// 查询数据管理-字段血缘列表
export function listFieldLineage(query) {
  return request({
    url: '/datamanager/fieldLineage/list',
    method: 'get',
    params: query
  })
}

// 查询数据管理-字段血缘详细
export function getFieldLineage(id) {
  return request({
    url: '/datamanager/fieldLineage/' + id,
    method: 'get'
  })
}

// 新增数据管理-字段血缘
export function addFieldLineage(data) {
  return request({
    url: '/datamanager/fieldLineage',
    method: 'post',
    data: data
  })
}

// 修改数据管理-字段血缘
export function updateFieldLineage(data) {
  return request({
    url: '/datamanager/fieldLineage',
    method: 'put',
    data: data
  })
}

// 删除数据管理-字段血缘
export function delFieldLineage(id) {
  return request({
    url: '/datamanager/fieldLineage/' + id,
    method: 'delete'
  })
}

// 导出数据管理-字段血缘
export function exportFieldLineage(query) {
  return request({
    url: '/datamanager/fieldLineage/export',
    method: 'get',
    params: query
  })
}