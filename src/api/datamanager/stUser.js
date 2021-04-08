import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listStUser(query) {
  return request({
    url: '/datamanager/stUser/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getStUser(id) {
  return request({
    url: '/datamanager/stUser/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addStUser(data) {
  return request({
    url: '/datamanager/stUser',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateStUser(data) {
  return request({
    url: '/datamanager/stUser',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delStUser(id) {
  return request({
    url: '/datamanager/stUser/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportStUser(query) {
  return request({
    url: '/datamanager/stUser/export',
    method: 'get',
    params: query
  })
}