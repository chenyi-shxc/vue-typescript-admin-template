import request from '@/utils/request'

// 查询风险聚焦列表
export function listZkrTotalEvent(query) {
  return request({
    url: '/survey/zkrTotalEvent/list',
    method: 'get',
    params: query
  })
}

// 查询风险聚焦详细
export function getZkrTotalEvent(bookBranch) {
  return request({
    url: '/survey/zkrTotalEvent/' + bookBranch,
    method: 'get'
  })
}

// 新增风险聚焦
export function addZkrTotalEvent(data) {
  return request({
    url: '/survey/zkrTotalEvent',
    method: 'post',
    data: data
  })
}

// 修改风险聚焦
export function updateZkrTotalEvent(data) {
  return request({
    url: '/survey/zkrTotalEvent',
    method: 'put',
    data: data
  })
}

// 删除风险聚焦
export function delZkrTotalEvent(bookBranch) {
  return request({
    url: '/survey/zkrTotalEvent/' + bookBranch,
    method: 'delete'
  })
}

// 导出风险聚焦
export function exportZkrTotalEvent(query) {
  return request({
    url: '/survey/zkrTotalEvent/export',
    method: 'get',
    params: query
  })
}