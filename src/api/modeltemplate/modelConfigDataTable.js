import request from '@/utils/request'

// 查询模板配置-列配置-通用数据列表
export function listModelConfigDataTable(query) {
  return request({
    url: '/modeltemplate/modelConfigDataTable/list',
    method: 'get',
    params: query
  })
}

// 查询模板配置-列配置-通用数据详细
export function getModelConfigDataTable(id) {
  return request({
    url: '/modeltemplate/modelConfigDataTable/' + id,
    method: 'get'
  })
}

// 查询模板配置-列配置-通用数据详细
export function getModelConfigDataTableVO(id) {
  return request({
    url: '/modeltemplate/modelConfigDataTable/getVO/' + id,
    method: 'get'
  })
}

// 新增模板配置-列配置-通用数据
export function addModelConfigDataTable(data) {
  return request({
    url: '/modeltemplate/modelConfigDataTable',
    method: 'post',
    data: data
  })
}

// 修改模板配置-列配置-通用数据
export function updateModelConfigDataTable(data) {
  return request({
    url: '/modeltemplate/modelConfigDataTable',
    method: 'put',
    data: data
  })
}

// 删除模板配置-列配置-通用数据
export function delModelConfigDataTable(id) {
  return request({
    url: '/modeltemplate/modelConfigDataTable/' + id,
    method: 'delete'
  })
}

// 导出模板配置-列配置-通用数据
export function exportModelConfigDataTable(query) {
  return request({
    url: '/modeltemplate/modelConfigDataTable/export',
    method: 'get',
    params: query
  })
}