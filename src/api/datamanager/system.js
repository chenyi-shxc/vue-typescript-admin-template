import request from '@/utils/request'

// 查询数据管理-应用系统列表
export function listSystem(query) {
  return request({
    url: '/datamanager/system/list',
    method: 'get',
    params: query
  })
}

// 查询数据管理-应用系统详细
export function getSystem(id) {
  return request({
    url: '/datamanager/system/' + id,
    method: 'get'
  })
}

// 新增数据管理-应用系统
export function addSystem(data) {
  return request({
    url: '/datamanager/system',
    method: 'post',
    data: data
  })
}

// 修改数据管理-应用系统
export function updateSystem(data) {
  return request({
    url: '/datamanager/system',
    method: 'put',
    data: data
  })
}

// 删除数据管理-应用系统
export function delSystem(id) {
  return request({
    url: '/datamanager/system/' + id,
    method: 'delete'
  })
}

// 导出数据管理-应用系统
export function exportSystem(query) {
  return request({
    url: '/datamanager/system/export',
    method: 'get',
    params: query
  })
}