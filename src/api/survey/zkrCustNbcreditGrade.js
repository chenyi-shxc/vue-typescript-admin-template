import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrCustNbcreditGrade(query) {
  return request({
    url: '/survey/zkrCustNbcreditGrade/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrCustNbcreditGrade(crmOrgId) {
  return request({
    url: '/survey/zkrCustNbcreditGrade/' + crmOrgId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrCustNbcreditGrade(data) {
  return request({
    url: '/survey/zkrCustNbcreditGrade',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrCustNbcreditGrade(data) {
  return request({
    url: '/survey/zkrCustNbcreditGrade',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrCustNbcreditGrade(crmOrgId) {
  return request({
    url: '/survey/zkrCustNbcreditGrade/' + crmOrgId,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrCustNbcreditGrade(query) {
  return request({
    url: '/survey/zkrCustNbcreditGrade/export',
    method: 'get',
    params: query
  })
}