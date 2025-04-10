import http from '../http'

// 统一接口管理
const homeApi = {
  // 获取banner图list
  getBannerlist: (params) => http({
    url: '/api/bannerlist',
    method: 'GET',
    data: params
  }),
  // 获取快捷入口数据
  getMidMenulist: (params) => http({
    url: '/deskapi/midMenulist',
    method: 'GET',
    data: params
  }),
}

export default homeApi