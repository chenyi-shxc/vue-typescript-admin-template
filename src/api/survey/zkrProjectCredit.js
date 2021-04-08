import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectCredit(query) {
  return request({
    url: '/survey/zkrProjectCredit/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectCredit(bookBranch) {
  return request({
    url: '/survey/zkrProjectCredit/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectCredit(data) {
  return request({
    url: '/survey/zkrProjectCredit',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectCredit(data) {
  return request({
    url: '/survey/zkrProjectCredit',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectCredit(bookBranch) {
  return request({
    url: '/survey/zkrProjectCredit/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectCredit(query) {
  return request({
    url: '/survey/zkrProjectCredit/export',
    method: 'get',
    params: query
  })
}