import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectLoanpayout(query) {
  return request({
    url: '/survey/zkrProjectLoanpayout/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectLoanpayout(bookBranch) {
  return request({
    url: '/survey/zkrProjectLoanpayout/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectLoanpayout(data) {
  return request({
    url: '/survey/zkrProjectLoanpayout',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectLoanpayout(data) {
  return request({
    url: '/survey/zkrProjectLoanpayout',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectLoanpayout(bookBranch) {
  return request({
    url: '/survey/zkrProjectLoanpayout/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectLoanpayout(query) {
  return request({
    url: '/survey/zkrProjectLoanpayout/export',
    method: 'get',
    params: query
  })
}