import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectFlowPerson(query) {
  return request({
    url: '/survey/zkrProjectFlowPerson/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectFlowPerson(personOa) {
  return request({
    url: '/survey/zkrProjectFlowPerson/' + personOa,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectFlowPerson(data) {
  return request({
    url: '/survey/zkrProjectFlowPerson',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectFlowPerson(data) {
  return request({
    url: '/survey/zkrProjectFlowPerson',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectFlowPerson(personOa) {
  return request({
    url: '/survey/zkrProjectFlowPerson/' + personOa,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectFlowPerson(query) {
  return request({
    url: '/survey/zkrProjectFlowPerson/export',
    method: 'get',
    params: query
  })
}