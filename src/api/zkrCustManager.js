import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrCustManager(query) {
  return request({
    url: '/survey/zkrCustManager/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrCustManager(crmOrgId) {
  return request({
    url: '/survey/zkrCustManager/' + crmOrgId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrCustManager(data) {
  return request({
    url: '/survey/zkrCustManager',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrCustManager(data) {
  return request({
    url: '/survey/zkrCustManager',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrCustManager(crmOrgId) {
  return request({
    url: '/survey/zkrCustManager/' + crmOrgId,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrCustManager(query) {
  return request({
    url: '/survey/zkrCustManager/export',
    method: 'get',
    params: query
  })
}