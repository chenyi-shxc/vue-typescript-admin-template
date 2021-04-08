import request from '@/utils/request'

// 查询模板配置-模板列表
export function listModelConfigTemplate(query) {
  return request({
    url: '/modeltemplate/modelConfigTemplate/list',
    method: 'get',
    params: query
  })
}

// 查询模板配置-模板详细
export function getModelConfigTemplate(id) {
  return request({
    url: '/modeltemplate/modelConfigTemplate/' + id,
    method: 'get'
  })
}

// 新增模板配置-模板
export function addModelConfigTemplate(data) {
  return request({
    url: '/modeltemplate/modelConfigTemplate',
    method: 'post',
    data: data
  })
}

// 修改模板配置-模板
export function updateModelConfigTemplate(data) {
  return request({
    url: '/modeltemplate/modelConfigTemplate',
    method: 'put',
    data: data
  })
}

// 删除模板配置-模板
export function delModelConfigTemplate(id) {
  return request({
    url: '/modeltemplate/modelConfigTemplate/' + id,
    method: 'delete'
  })
}

// 导出模板配置-模板
export function exportModelConfigTemplate(query) {
  return request({
    url: '/modeltemplate/modelConfigTemplate/export',
    method: 'get',
    params: query
  })
}