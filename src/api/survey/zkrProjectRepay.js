import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectRepay(query) {
  return request({
    url: '/survey/zkrProjectRepay/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectRepay(bookBranch) {
  return request({
    url: '/survey/zkrProjectRepay/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectRepay(data) {
  return request({
    url: '/survey/zkrProjectRepay',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectRepay(data) {
  return request({
    url: '/survey/zkrProjectRepay',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectRepay(bookBranch) {
  return request({
    url: '/survey/zkrProjectRepay/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectRepay(query) {
  return request({
    url: '/survey/zkrProjectRepay/export',
    method: 'get',
    params: query
  })
}