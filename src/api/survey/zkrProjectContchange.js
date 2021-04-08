import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectContchange(query) {
  return request({
    url: '/survey/zkrProjectContchange/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectContchange(bookBranch) {
  return request({
    url: '/survey/zkrProjectContchange/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectContchange(data) {
  return request({
    url: '/survey/zkrProjectContchange',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectContchange(data) {
  return request({
    url: '/survey/zkrProjectContchange',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectContchange(bookBranch) {
  return request({
    url: '/survey/zkrProjectContchange/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectContchange(query) {
  return request({
    url: '/survey/zkrProjectContchange/export',
    method: 'get',
    params: query
  })
}