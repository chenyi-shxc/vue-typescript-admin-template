import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectPlanFlow(query) {
  return request({
    url: '/survey/zkrProjectPlanFlow/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectPlanFlow(bookBranch) {
  return request({
    url: '/survey/zkrProjectPlanFlow/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectPlanFlow(data) {
  return request({
    url: '/survey/zkrProjectPlanFlow',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectPlanFlow(data) {
  return request({
    url: '/survey/zkrProjectPlanFlow',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectPlanFlow(bookBranch) {
  return request({
    url: '/survey/zkrProjectPlanFlow/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectPlanFlow(query) {
  return request({
    url: '/survey/zkrProjectPlanFlow/export',
    method: 'get',
    params: query
  })
}