import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrCustPartner(query) {
  return request({
    url: '/survey/zkrCustPartner/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrCustPartner(crmOrgId) {
  return request({
    url: '/survey/zkrCustPartner/' + crmOrgId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrCustPartner(data) {
  return request({
    url: '/survey/zkrCustPartner',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrCustPartner(data) {
  return request({
    url: '/survey/zkrCustPartner',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrCustPartner(crmOrgId) {
  return request({
    url: '/survey/zkrCustPartner/' + crmOrgId,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrCustPartner(query) {
  return request({
    url: '/survey/zkrCustPartner/export',
    method: 'get',
    params: query
  })
}