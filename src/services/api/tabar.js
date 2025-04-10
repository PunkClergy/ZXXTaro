import http from '../http'

// 获取底部导航
const tabarApi = {
    getTabarList: () => http({
        url: '/deskapi/navlist',
        method: 'GET',
    }),
}

export default tabarApi