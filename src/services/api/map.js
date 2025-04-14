/*
 * @Author: MaC
 * @Date: 2025-04-14 15:47:25
 * @LastEditors: MaC
 * @LastEditTime: 2025-04-14 15:48:05
 * @FilePath: \ZXXTaro\src\services\api\map.js
 */
import http from '../http'

// 获取底部导航
const mapApi = {
    getAllCarPoisiton: () => http({
        url: '/carapi/getAllCarPoisiton',
        method: 'GET',
    }),

}

export default mapApi