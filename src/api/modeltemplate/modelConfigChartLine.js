import request from '@/utils/request'

// 查询模板配置-列配置-折线图列表
export function listModelConfigChartLine(query) {
  return request({
    url: '/modeltemplate/modelConfigChartLine/list',
    method: 'get',
    params: query
  })
}

// 查询模板配置-列配置-折线图详细
export function getModelConfigChartLine(id) {
  return request({
    url: '/modeltemplate/modelConfigChartLine/' + id,
    method: 'get'
  })
}

// 新增模板配置-列配置-折线图
export function addModelConfigChartLine(data) {
  return request({
    url: '/modeltemplate/modelConfigChartLine',
    method: 'post',
    data: data
  })
}

// 修改模板配置-列配置-折线图
export function updateModelConfigChartLine(data) {
  return request({
    url: '/modeltemplate/modelConfigChartLine',
    method: 'put',
    data: data
  })
}

// 删除模板配置-列配置-折线图
export function delModelConfigChartLine(id) {
  return request({
    url: '/modeltemplate/modelConfigChartLine/' + id,
    method: 'delete'
  })
}

// 导出模板配置-列配置-折线图
export function exportModelConfigChartLine(query) {
  return request({
    url: '/modeltemplate/modelConfigChartLine/export',
    method: 'get',
    params: query
  })
}