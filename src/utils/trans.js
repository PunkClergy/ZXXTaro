/*
 * @Author: lixiaoyaomail@163.com
 * @Date: 2025-04-09 19:07:59
 * @LastEditors: lixiaoyaomail@163.com
 * @LastEditTime: 2025-04-09 20:14:25
 * @FilePath: \ZXXTaro\src\utils\trans.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 将图片资源转换为 Base64 编码
 * @param {string|File|Blob|HTMLImageElement} source 图片源（URL/本地文件/图片元素）
 * @param {Object} [options] 配置选项
 * @param {string} [options.format='image/png'] 输出格式（image/png、image/jpeg、image/webp）
 * @param {number} [options.quality=0.92] 输出质量（0-1，仅对 JPEG/WEBP 有效）
 * @returns {Promise<string>} 返回包含 Base64 编码的 Promise
 */
import Taro from '@tarojs/taro';

/**
 * 将图片文件或路径转换为 Base64
 * @param {string | File} input - 图片路径（小程序环境）或图片文件对象（H5 环境）
 * @returns {Promise<string>} 返回 Base64 字符串的 Promise
 */
export const imageToBase64 = (input) => {
    return new Promise((resolve, reject) => {
        if (process.env.TARO_ENV === 'h5') {
            // H5 环境：使用 FileReader 处理
          

            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]); // 去掉 Data URL 的前缀
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(input);
        } else {
            // 小程序环境：使用 Taro.getFileSystemManager 处理
            const filePath = typeof input === 'string' ? input : input;

            Taro.getFileSystemManager().readFile({
                filePath,
                encoding: 'base64',
                success: (res) => resolve(res.data),
                fail: (err) => reject(err),
            });
        }
    });
};
