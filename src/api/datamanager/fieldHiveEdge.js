import request from '@/utils/request'

// 查询数据管理-hive的血缘分析边列表
export function listFieldHiveEdge(query) {
  return request({
    url: '/datamanager/fieldHiveEdge/list',
    method: 'get',
    params: query
  })
}

// 查询数据管理-hive的血缘分析边详细
export function getFieldHiveEdge(id) {
  return request({
    url: '/datamanager/fieldHiveEdge/' + id,
    method: 'get'
  })
}

// 新增数据管理-hive的血缘分析边
export function addFieldHiveEdge(data) {
  return request({
    url: '/datamanager/fieldHiveEdge',
    method: 'post',
    data: data
  })
}

// 修改数据管理-hive的血缘分析边
export function updateFieldHiveEdge(data) {
  return request({
    url: '/datamanager/fieldHiveEdge',
    method: 'put',
    data: data
  })
}

// 删除数据管理-hive的血缘分析边
export function delFieldHiveEdge(id) {
  return request({
    url: '/datamanager/fieldHiveEdge/' + id,
    method: 'delete'
  })
}

// 导出数据管理-hive的血缘分析边
export function exportFieldHiveEdge(query) {
  return request({
    url: '/datamanager/fieldHiveEdge/export',
    method: 'get',
    params: query
  })
}