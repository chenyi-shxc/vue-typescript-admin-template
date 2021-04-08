import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrAfterloanAttach(query) {
  return request({
    url: '/survey/zkrAfterloanAttach/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrAfterloanAttach(bookBranch) {
  return request({
    url: '/survey/zkrAfterloanAttach/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrAfterloanAttach(data) {
  return request({
    url: '/survey/zkrAfterloanAttach',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrAfterloanAttach(data) {
  return request({
    url: '/survey/zkrAfterloanAttach',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrAfterloanAttach(bookBranch) {
  return request({
    url: '/survey/zkrAfterloanAttach/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrAfterloanAttach(query) {
  return request({
    url: '/survey/zkrAfterloanAttach/export',
    method: 'get',
    params: query
  })
}