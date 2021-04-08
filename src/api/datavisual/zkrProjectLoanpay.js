import request from '@/utils/request'

// 查询项目资金支付信息列表
export function listZkrProjectLoanpay(query) {
  return request({
    url: '/datavisual/zkrProjectLoanpay/list',
    method: 'get',
    params: query
  })
}

// 查询项目资金支付信息详细
export function getZkrProjectLoanpay(yearPayDate) {
  return request({
    url: '/datavisual/zkrProjectLoanpay/' + yearPayDate,
    method: 'get'
  })
}

// 新增项目资金支付信息
export function addZkrProjectLoanpay(data) {
  return request({
    url: '/datavisual/zkrProjectLoanpay',
    method: 'post',
    data: data
  })
}

// 修改项目资金支付信息
export function updateZkrProjectLoanpay(data) {
  return request({
    url: '/datavisual/zkrProjectLoanpay',
    method: 'put',
    data: data
  })
}

// 删除项目资金支付信息
export function delZkrProjectLoanpay(yearPayDate) {
  return request({
    url: '/datavisual/zkrProjectLoanpay/' + yearPayDate,
    method: 'delete'
  })
}

// 导出项目资金支付信息
export function exportZkrProjectLoanpay(query) {
  return request({
    url: '/datavisual/zkrProjectLoanpay/export',
    method: 'get',
    params: query
  })
}

// 资金流向图
export function loanPayImg() {
  return request({
    url: '/datavisual/zkrProjectLoanpay/loanPayImg/000111/20210326/P000001',
    method: 'get',
    params: null
  })
}
