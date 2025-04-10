import http from '../http'

// 统一接口管理
const homeApi = {
  // 获取banner图list
  getBannerlist: (params) => http({
    url: '/api/bannerlist',
    method: 'GET',
    data: params
  }),

  // POST 示例
  login: (data) => http({
    url: '/api/login',
    method: 'POST',
    data
  })
}

export default homeApi