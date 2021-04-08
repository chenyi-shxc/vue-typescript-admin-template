import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrRiskEvolutionCust(query) {
  return request({
    url: '/survey/zkrRiskEvolutionCust/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrRiskEvolutionCust(riskType) {
  return request({
    url: '/survey/zkrRiskEvolutionCust/' + riskType,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrRiskEvolutionCust(data) {
  return request({
    url: '/survey/zkrRiskEvolutionCust',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrRiskEvolutionCust(data) {
  return request({
    url: '/survey/zkrRiskEvolutionCust',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrRiskEvolutionCust(riskType) {
  return request({
    url: '/survey/zkrRiskEvolutionCust/' + riskType,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrRiskEvolutionCust(query) {
  return request({
    url: '/survey/zkrRiskEvolutionCust/export',
    method: 'get',
    params: query
  })
}