import request from '@/utils/request'

// 查询数据管理-数据血缘列表
export function listTableLineage(query) {
  return request({
    url: '/datamanager/tableLineage/list',
    method: 'get',
    params: query
  })
}

// 查询数据管理-数据血缘详细
export function getTableLineage(id) {
  return request({
    url: '/datamanager/tableLineage/' + id,
    method: 'get'
  })
}

// 新增数据管理-数据血缘
export function addTableLineage(data) {
  return request({
    url: '/datamanager/tableLineage',
    method: 'post',
    data: data
  })
}

// 修改数据管理-数据血缘
export function updateTableLineage(data) {
  return request({
    url: '/datamanager/tableLineage',
    method: 'put',
    data: data
  })
}

// 删除数据管理-数据血缘
export function delTableLineage(id) {
  return request({
    url: '/datamanager/tableLineage/' + id,
    method: 'delete'
  })
}

// 导出数据管理-数据血缘
export function exportTableLineage(query) {
  return request({
    url: '/datamanager/tableLineage/export',
    method: 'get',
    params: query
  })
}

// 查询血缘关系图
export function tableLineageChart(query) {
  return request({
    url: '/datamanager/tableLineage/chart',
    method: 'get',
    params: query
  })
}