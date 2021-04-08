import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listZkrProjectLoanpay(query) {
  return request({
    url: '/survey/zkrProjectLoanpay/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getZkrProjectLoanpay(bookBranch) {
  return request({
    url: '/survey/zkrProjectLoanpay/' + bookBranch,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addZkrProjectLoanpay(data) {
  return request({
    url: '/survey/zkrProjectLoanpay',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateZkrProjectLoanpay(data) {
  return request({
    url: '/survey/zkrProjectLoanpay',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delZkrProjectLoanpay(bookBranch) {
  return request({
    url: '/survey/zkrProjectLoanpay/' + bookBranch,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportZkrProjectLoanpay(query) {
  return request({
    url: '/survey/zkrProjectLoanpay/export',
    method: 'get',
    params: query
  })
}