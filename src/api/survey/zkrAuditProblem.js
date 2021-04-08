import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrAuditProblem(query) {
  return request({
    url: '/survey/zkrAuditProblem/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrAuditProblem(stdCode) {
  return request({
    url: '/survey/zkrAuditProblem/' + stdCode,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrAuditProblem(data) {
  return request({
    url: '/survey/zkrAuditProblem',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrAuditProblem(data) {
  return request({
    url: '/survey/zkrAuditProblem',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrAuditProblem(stdCode) {
  return request({
    url: '/survey/zkrAuditProblem/' + stdCode,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrAuditProblem(query) {
  return request({
    url: '/survey/zkrAuditProblem/export',
    method: 'get',
    params: query
  })
}