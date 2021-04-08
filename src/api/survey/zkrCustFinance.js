import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrCustFinance(query) {
  return request({
    url: '/survey/zkrCustFinance/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrCustFinance(gid) {
  return request({
    url: '/survey/zkrCustFinance/' + gid,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrCustFinance(data) {
  return request({
    url: '/survey/zkrCustFinance',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrCustFinance(data) {
  return request({
    url: '/survey/zkrCustFinance',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrCustFinance(gid) {
  return request({
    url: '/survey/zkrCustFinance/' + gid,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrCustFinance(query) {
  return request({
    url: '/survey/zkrCustFinance/export',
    method: 'get',
    params: query
  })
}