import request from '@/utils/request'

// 查询审计模型列列表
export function listStModer(query) {
  return request({
    url: '/survey/stModer/list',
    method: 'get',
    params: query
  })
}

// 查询审计模型列详细
export function getStModer(mpModelBaseInfoId) {
  return request({
    url: '/survey/stModer/' + mpModelBaseInfoId,
    method: 'get'
  })
}

// 新增审计模型列
export function addStModer(data) {
  return request({
    url: '/survey/stModer',
    method: 'post',
    data: data
  })
}

// 修改审计模型列
export function updateStModer(data) {
  return request({
    url: '/survey/stModer',
    method: 'put',
    data: data
  })
}

// 删除审计模型列
export function delStModer(mpModelBaseInfoId) {
  return request({
    url: '/survey/stModer/' + mpModelBaseInfoId,
    method: 'delete'
  })
}

// 导出审计模型列
export function exportStModer(query) {
  return request({
    url: '/survey/stModer/export',
    method: 'get',
    params: query
  })
}