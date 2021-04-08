import request from '@/utils/request'

// 查询模板配置-列配置-柱状图列表
export function listModelConfigChartBar(query) {
  return request({
    url: '/modeltemplate/modelConfigChartBar/list',
    method: 'get',
    params: query
  })
}

// 查询模板配置-列配置-柱状图详细
export function getModelConfigChartBar(id) {
  return request({
    url: '/modeltemplate/modelConfigChartBar/' + id,
    method: 'get'
  })
}

// 新增模板配置-列配置-柱状图
export function addModelConfigChartBar(data) {
  return request({
    url: '/modeltemplate/modelConfigChartBar',
    method: 'post',
    data: data
  })
}

// 修改模板配置-列配置-柱状图
export function updateModelConfigChartBar(data) {
  return request({
    url: '/modeltemplate/modelConfigChartBar',
    method: 'put',
    data: data
  })
}

// 删除模板配置-列配置-柱状图
export function delModelConfigChartBar(id) {
  return request({
    url: '/modeltemplate/modelConfigChartBar/' + id,
    method: 'delete'
  })
}

// 导出模板配置-列配置-柱状图
export function exportModelConfigChartBar(query) {
  return request({
    url: '/modeltemplate/modelConfigChartBar/export',
    method: 'get',
    params: query
  })
}