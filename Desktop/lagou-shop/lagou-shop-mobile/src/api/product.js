import request from '@/utils/request'

export const getProductsData = prams => request({
  method: 'GET',
  url: '/products',
  prams
})

// 通过id获取商品信息
export const getProductDetails = productId => request({
  method: 'GET',
  url: `/product/detail/${productId}`
})

// 商品评价数量请接口
export const getCommentCount = productId => request({
  method: 'GET',
  url: `/reply/config/${productId}`
})

// 请求不同类型的评论数据
export const getCommentByTag = (productId, params) => request({
  method: 'GET',
  url: `/reply/list/${productId}`,
  params
})