import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectWriteoff(query) {
  return request({
    url: '/survey/zkrProjectWriteoff/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectWriteoff(bookBranch) {
  return request({
    url: '/survey/zkrProjectWriteoff/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectWriteoff(data) {
  return request({
    url: '/survey/zkrProjectWriteoff',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectWriteoff(data) {
  return request({
    url: '/survey/zkrProjectWriteoff',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectWriteoff(bookBranch) {
  return request({
    url: '/survey/zkrProjectWriteoff/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectWriteoff(query) {
  return request({
    url: '/survey/zkrProjectWriteoff/export',
    method: 'get',
    params: query
  })
}