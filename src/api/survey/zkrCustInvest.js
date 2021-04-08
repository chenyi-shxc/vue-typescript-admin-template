import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrCustInvest(query) {
  return request({
    url: '/survey/zkrCustInvest/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrCustInvest(crmOrgId) {
  return request({
    url: '/survey/zkrCustInvest/' + crmOrgId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrCustInvest(data) {
  return request({
    url: '/survey/zkrCustInvest',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrCustInvest(data) {
  return request({
    url: '/survey/zkrCustInvest',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrCustInvest(crmOrgId) {
  return request({
    url: '/survey/zkrCustInvest/' + crmOrgId,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrCustInvest(query) {
  return request({
    url: '/survey/zkrCustInvest/export',
    method: 'get',
    params: query
  })
}