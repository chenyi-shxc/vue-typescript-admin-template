import request from '@/utils/request'

// 查询模板配置-列配置-折线柱状图列表
export function listModelConfigChartLinebar(query) {
  return request({
    url: '/modeltemplate/modelConfigChartLinebar/list',
    method: 'get',
    params: query
  })
}

// 查询模板配置-列配置-折线柱状图详细
export function getModelConfigChartLinebar(id) {
  return request({
    url: '/modeltemplate/modelConfigChartLinebar/' + id,
    method: 'get'
  })
}

// 新增模板配置-列配置-折线柱状图
export function addModelConfigChartLinebar(data) {
  return request({
    url: '/modeltemplate/modelConfigChartLinebar',
    method: 'post',
    data: data
  })
}

// 修改模板配置-列配置-折线柱状图
export function updateModelConfigChartLinebar(data) {
  return request({
    url: '/modeltemplate/modelConfigChartLinebar',
    method: 'put',
    data: data
  })
}

// 删除模板配置-列配置-折线柱状图
export function delModelConfigChartLinebar(id) {
  return request({
    url: '/modeltemplate/modelConfigChartLinebar/' + id,
    method: 'delete'
  })
}

// 导出模板配置-列配置-折线柱状图
export function exportModelConfigChartLinebar(query) {
  return request({
    url: '/modeltemplate/modelConfigChartLinebar/export',
    method: 'get',
    params: query
  })
}