import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectAssetsquality(query) {
  return request({
    url: '/survey/zkrProjectAssetsquality/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectAssetsquality(bookBranch) {
  return request({
    url: '/survey/zkrProjectAssetsquality/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectAssetsquality(data) {
  return request({
    url: '/survey/zkrProjectAssetsquality',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectAssetsquality(data) {
  return request({
    url: '/survey/zkrProjectAssetsquality',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectAssetsquality(bookBranch) {
  return request({
    url: '/survey/zkrProjectAssetsquality/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectAssetsquality(query) {
  return request({
    url: '/survey/zkrProjectAssetsquality/export',
    method: 'get',
    params: query
  })
}