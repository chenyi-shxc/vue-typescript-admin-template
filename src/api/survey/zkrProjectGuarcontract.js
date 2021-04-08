import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectGuarcontract(query) {
  return request({
    url: '/survey/zkrProjectGuarcontract/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectGuarcontract(bookBranch) {
  return request({
    url: '/survey/zkrProjectGuarcontract/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectGuarcontract(data) {
  return request({
    url: '/survey/zkrProjectGuarcontract',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectGuarcontract(data) {
  return request({
    url: '/survey/zkrProjectGuarcontract',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectGuarcontract(bookBranch) {
  return request({
    url: '/survey/zkrProjectGuarcontract/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectGuarcontract(query) {
  return request({
    url: '/survey/zkrProjectGuarcontract/export',
    method: 'get',
    params: query
  })
}