/*
 * @Author: lixiaoyaomail@163.com
 * @Date: 2025-04-09 15:20:12
 * @LastEditors: MaC
 * @LastEditTime: 2025-04-14 16:35:36
 * @FilePath: \ZXXTaro\src\services\http.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro'
import { BASE_URL, TIMEOUT } from '@/config'

const http = (options) => {
    return new Promise((resolve, reject) => {
        Taro.request({
            ...options,
            url: `${BASE_URL}${options.url}`,
            timeout: TIMEOUT,
            header: {
                'Content-Type': 'application/json',
                'token': Taro.getStorageSync('token'),
                ...options.header
            }
        }).then((res) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                resolve(res.data)
            } else {
                const errorMsg = res.data.message || `请求错误 [${res.statusCode}]`
                handleError(errorMsg, res.statusCode)
                reject(errorMsg)
            }
        }).catch(err => {
            handleError('网络连接失败')
            reject(err)
        })
    })
}

// 错误处理
const handleError = (message, statusCode) => {
    if (statusCode === 401) {
        // 跳转登录示例
        Taro.navigateTo({ url: '/pages/login/index' })
    }
    Taro.showToast({ title: message, icon: 'none' })
}

export default http