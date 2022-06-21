import request from '@/utils/request'

// 新增（编辑）地址接口
export const addAddress = data => request({
  method: 'POST',
  url: '/address/edit',
  data
})

export const getCityList = params => request({
  method: 'GET',
  url: '/city_list',
  params
})
