import request from '@/utils/request'

// 查询模板配置-模型模板配置结果列表
export function listModelConfigResult(query) {
  return request({
    url: '/modeltemplate/modelConfigResult/list',
    method: 'get',
    params: query
  })
}

// 查询模板配置-模型模板配置结果详细
export function getModelConfigResult(id) {
  return request({
    url: '/modeltemplate/modelConfigResult/' + id,
    method: 'get'
  })
}

// 新增模板配置-模型模板配置结果
export function addModelConfigResult(data) {
  return request({
    url: '/modeltemplate/modelConfigResult',
    method: 'post',
    data: data
  })
}

// 修改模板配置-模型模板配置结果
export function updateModelConfigResult(data) {
  return request({
    url: '/modeltemplate/modelConfigResult',
    method: 'put',
    data: data
  })
}

// 删除模板配置-模型模板配置结果
export function delModelConfigResult(id) {
  return request({
    url: '/modeltemplate/modelConfigResult/' + id,
    method: 'delete'
  })
}

// 导出模板配置-模型模板配置结果
export function exportModelConfigResult(query) {
  return request({
    url: '/modeltemplate/modelConfigResult/export',
    method: 'get',
    params: query
  })
}