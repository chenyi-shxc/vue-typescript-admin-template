import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectCreditchange(query) {
  return request({
    url: '/survey/zkrProjectCreditchange/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectCreditchange(bookBranch) {
  return request({
    url: '/survey/zkrProjectCreditchange/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectCreditchange(data) {
  return request({
    url: '/survey/zkrProjectCreditchange',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectCreditchange(data) {
  return request({
    url: '/survey/zkrProjectCreditchange',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectCreditchange(bookBranch) {
  return request({
    url: '/survey/zkrProjectCreditchange/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectCreditchange(query) {
  return request({
    url: '/survey/zkrProjectCreditchange/export',
    method: 'get',
    params: query
  })
}