import request from '@/utils/request'

// 查询集团客户列表
export function listZkrBlocInfo(query) {
  return request({
    url: '/survey/zkrBlocInfo/list',
    method: 'get',
    params: query
  })
}

// 查询集团客户详细
export function getZkrBlocInfo(blocNo) {
  return request({
    url: '/survey/zkrBlocInfo/' + blocNo,
    method: 'get'
  })
}

// 新增集团客户
export function addZkrBlocInfo(data) {
  return request({
    url: '/survey/zkrBlocInfo',
    method: 'post',
    data: data
  })
}

// 修改集团客户
export function updateZkrBlocInfo(data) {
  return request({
    url: '/survey/zkrBlocInfo',
    method: 'put',
    data: data
  })
}

// 删除集团客户
export function delZkrBlocInfo(blocNo) {
  return request({
    url: '/survey/zkrBlocInfo/' + blocNo,
    method: 'delete'
  })
}

// 导出集团客户
export function exportZkrBlocInfo(query) {
  return request({
    url: '/survey/zkrBlocInfo/export',
    method: 'get',
    params: query
  })
}

//测试模型列表
export function listZkrBlocInfo233(query) {
  return request({
    url: '/survey/index/dataTotal',
    method: 'get',
    params: query
  })
}

//测试模型列表
export function listZkrBlocInfo244(query) {
  return request({
    url: '/survey/index/mapData',
    method: 'get',
    params: query
  })
}
//测试模型列表
export function listZkrBlocInfo255(query) {
  return request({
    url: '/survey/index/dataList',
    method: 'get',
    params: query
  })
}
