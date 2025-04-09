import http from '../http'


const tabarApi = {
    getTabarList: (params) => http({
        url: '/api/bannerlist',
        method: 'GET',
        data: params
    }),
}

export default tabarApi