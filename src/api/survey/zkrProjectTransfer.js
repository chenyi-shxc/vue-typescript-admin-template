import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectTransfer(query) {
  return request({
    url: '/survey/zkrProjectTransfer/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectTransfer(orgNo) {
  return request({
    url: '/survey/zkrProjectTransfer/' + orgNo,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectTransfer(data) {
  return request({
    url: '/survey/zkrProjectTransfer',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectTransfer(data) {
  return request({
    url: '/survey/zkrProjectTransfer',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectTransfer(orgNo) {
  return request({
    url: '/survey/zkrProjectTransfer/' + orgNo,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectTransfer(query) {
  return request({
    url: '/survey/zkrProjectTransfer/export',
    method: 'get',
    params: query
  })
}