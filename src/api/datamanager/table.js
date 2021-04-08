import request from '@/utils/request'

// 查询数据管理-数据列表
export function listTable(query) {
  return request({
    url: '/datamanager/table/list',
    method: 'get',
    params: query
  })
}

// 查询数据管理-数据详细
export function getTable(id) {
  return request({
    url: '/datamanager/table/' + id,
    method: 'get'
  })
}

// 新增数据管理-数据
export function addTable(data) {
  return request({
    url: '/datamanager/table',
    method: 'post',
    data: data
  })
}

// 修改数据管理-数据
export function updateTable(data) {
  return request({
    url: '/datamanager/table',
    method: 'put',
    data: data
  })
}

// 删除数据管理-数据
export function delTable(id) {
  return request({
    url: '/datamanager/table/' + id,
    method: 'delete'
  })
}

// 导出数据管理-数据
export function exportTable(query) {
  return request({
    url: '/datamanager/table/export',
    method: 'get',
    params: query
  })
}