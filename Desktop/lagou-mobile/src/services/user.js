import request from "@/utils/request"

export const Login = data => {

  // 用户登录接口
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: new URLSearchParams(data).toString()
  })
}
// 用户基本信息
export const getInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
