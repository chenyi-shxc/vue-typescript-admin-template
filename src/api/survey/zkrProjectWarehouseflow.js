import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectWarehouseflow(query) {
  return request({
    url: '/survey/zkrProjectWarehouseflow/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectWarehouseflow(bookBranch) {
  return request({
    url: '/survey/zkrProjectWarehouseflow/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectWarehouseflow(data) {
  return request({
    url: '/survey/zkrProjectWarehouseflow',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectWarehouseflow(data) {
  return request({
    url: '/survey/zkrProjectWarehouseflow',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectWarehouseflow(bookBranch) {
  return request({
    url: '/survey/zkrProjectWarehouseflow/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectWarehouseflow(query) {
  return request({
    url: '/survey/zkrProjectWarehouseflow/export',
    method: 'get',
    params: query
  })
}