import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrCustOutRisk(query) {
  return request({
    url: '/survey/zkrCustOutRisk/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrCustOutRisk(crmOrgId) {
  return request({
    url: '/survey/zkrCustOutRisk/' + crmOrgId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrCustOutRisk(data) {
  return request({
    url: '/survey/zkrCustOutRisk',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrCustOutRisk(data) {
  return request({
    url: '/survey/zkrCustOutRisk',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrCustOutRisk(crmOrgId) {
  return request({
    url: '/survey/zkrCustOutRisk/' + crmOrgId,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrCustOutRisk(query) {
  return request({
    url: '/survey/zkrCustOutRisk/export',
    method: 'get',
    params: query
  })
}