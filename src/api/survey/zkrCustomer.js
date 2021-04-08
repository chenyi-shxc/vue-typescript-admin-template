import request from '@/utils/request'

// 查询客户基本信息列表
export function listZkrCustomer(query) {
  return request({
    url: '/survey/zkrCustomer/list',
    method: 'get',
    params: query
  })
}

// 查询客户基本信息详细
export function getZkrCustomer(crmOrgId) {
  return request({
    url: '/survey/zkrCustomer/' + crmOrgId,
    method: 'get'
  })
}

// 新增客户基本信息
export function addZkrCustomer(data) {
  return request({
    url: '/survey/zkrCustomer',
    method: 'post',
    data: data
  })
}

// 修改客户基本信息
export function updateZkrCustomer(data) {
  return request({
    url: '/survey/zkrCustomer',
    method: 'put',
    data: data
  })
}

// 删除客户基本信息
export function delZkrCustomer(crmOrgId) {
  return request({
    url: '/survey/zkrCustomer/' + crmOrgId,
    method: 'delete'
  })
}

// 导出客户基本信息
export function exportZkrCustomer(query) {
  return request({
    url: '/survey/zkrCustomer/export',
    method: 'get',
    params: query
  })
}