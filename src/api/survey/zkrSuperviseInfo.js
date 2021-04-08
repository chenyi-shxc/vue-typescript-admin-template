import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrSuperviseInfo(query) {
  return request({
    url: '/survey/zkrSuperviseInfo/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrSuperviseInfo(orgNo) {
  return request({
    url: '/survey/zkrSuperviseInfo/' + orgNo,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrSuperviseInfo(data) {
  return request({
    url: '/survey/zkrSuperviseInfo',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrSuperviseInfo(data) {
  return request({
    url: '/survey/zkrSuperviseInfo',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrSuperviseInfo(orgNo) {
  return request({
    url: '/survey/zkrSuperviseInfo/' + orgNo,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrSuperviseInfo(query) {
  return request({
    url: '/survey/zkrSuperviseInfo/export',
    method: 'get',
    params: query
  })
}