import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectContract(query) {
  return request({
    url: '/survey/zkrProjectContract/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectContract(bookBranch) {
  return request({
    url: '/survey/zkrProjectContract/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectContract(data) {
  return request({
    url: '/survey/zkrProjectContract',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectContract(data) {
  return request({
    url: '/survey/zkrProjectContract',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectContract(bookBranch) {
  return request({
    url: '/survey/zkrProjectContract/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectContract(query) {
  return request({
    url: '/survey/zkrProjectContract/export',
    method: 'get',
    params: query
  })
}