import request from '@/utils/request'

// 查询项目贷款发放信息列表
export function listZkrProjectLoanpayout(query) {
  return request({
    url: '/datavisual/zkrProjectLoanpayout/list',
    method: 'get',
    params: query
  })
}

// 查询项目贷款发放信息详细
export function getZkrProjectLoanpayout(bookBranch) {
  return request({
    url: '/datavisual/zkrProjectLoanpayout/' + bookBranch,
    method: 'get'
  })
}

// 新增项目贷款发放信息
export function addZkrProjectLoanpayout(data) {
  return request({
    url: '/datavisual/zkrProjectLoanpayout',
    method: 'post',
    data: data
  })
}

// 修改项目贷款发放信息
export function updateZkrProjectLoanpayout(data) {
  return request({
    url: '/datavisual/zkrProjectLoanpayout',
    method: 'put',
    data: data
  })
}

// 删除项目贷款发放信息
export function delZkrProjectLoanpayout(bookBranch) {
  return request({
    url: '/datavisual/zkrProjectLoanpayout/' + bookBranch,
    method: 'delete'
  })
}

// 导出项目贷款发放信息
export function exportZkrProjectLoanpayout(query) {
  return request({
    url: '/datavisual/zkrProjectLoanpayout/export',
    method: 'get',
    params: query
  })
}