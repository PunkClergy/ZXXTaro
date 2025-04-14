/*
 * @Author: MaC
 * @Date: 2025-04-09 15:20:11
 * @LastEditors: MaC
 * @LastEditTime: 2025-04-14 16:22:17
 * @FilePath: \ZXXTaro\src\config.js
 */

export const BASE_URL = process.env.NODE_ENV == 'development' ?
    'https://k1swtest.wiselink.net.cn' ://测试地址
    'https://k1sw.wiselink.net.cn' // 正式地址
export const TIMEOUT = 15000 // 15秒超时