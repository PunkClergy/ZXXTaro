/*
 * @Author: lixiaoyaomail@163.com
 * @Date: 2025-04-09 15:20:12
 * @LastEditors: lixiaoyaomail@163.com
 * @LastEditTime: 2025-04-10 13:49:48
 * @FilePath: \ZXXTaro\src\utils\system-info.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';

// export const getNavInfo = () => {
//     if (process.env.TARO_ENV === 'h5') {
//         // H5 端没有胶囊按钮，返回默认值
//         return {
//             statusBarHeight: 0, // H5 不需要状态栏高度
//             navBarHeight: 44, // 默认导航栏高度（可以根据设计调整）
//             menuButtonInfo: {
//                 top: 0,
//                 height: 32, // 模拟胶囊按钮高度
//                 width: 87, // 模拟胶囊按钮宽度
//                 right: 16, // 模拟胶囊按钮距离右侧的距离
//             },
//         };
//     }

//     // 微信小程序端使用原生 API
//     const systemInfo = Taro.getSystemInfoSync();
//     const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();

//     const navBarHeight =
//         (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
//         menuButtonInfo.height;

//     return {
//         windowHeight:systemInfo.screenHeight,
//         statusBarHeight: systemInfo.statusBarHeight,
//         navBarHeight: navBarHeight,
//         menuButtonInfo: menuButtonInfo,
//     };
// };
export const getNavInfo = () => {
    // 公共结构保证返回值一致性
    const baseInfo = {
      windowHeight: 0,
      statusBarHeight: 0,
      navBarHeight: 0,
      menuButtonInfo: {
        top: 0,
        height: 0,
        width: 0,
        right: 0
      }
    }
  
    if (process.env.TARO_ENV === 'h5') {
      // 使用Taro统一获取H5端系统信息
      const systemInfo = Taro.getSystemInfoSync()
      return {
        ...baseInfo,
        windowHeight: systemInfo.windowHeight,
        navBarHeight: 44, // iOS默认导航栏高度
        menuButtonInfo: {
          top: 4,          // 模拟小程序胶囊按钮位置
          height: 32,      // 微信胶囊按钮标准高度
          width: 87,       // 微信胶囊按钮标准宽度
          right: 7         // 微信胶囊按钮标准右边距
        }
      }
    }
  
    // 小程序端数据获取
    try {
      const systemInfo = Taro.getSystemInfoSync()
      const menuButtonInfo = Taro.getMenuButtonBoundingClientRect()
      
      // 精确计算导航栏高度（胶囊底部Y坐标 - 状态栏高度）
      const navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 
                         + menuButtonInfo.height
  
      return {
        ...baseInfo,
        windowHeight: systemInfo.windowHeight,  // 使用可用窗口高度
        statusBarHeight: systemInfo.statusBarHeight,
        navBarHeight,
        menuButtonInfo: {
          top: menuButtonInfo.top,
          height: menuButtonInfo.height,
          width: menuButtonInfo.width,
          right: systemInfo.screenWidth - menuButtonInfo.right
        }
      }
    } catch (error) {
      console.error('导航信息获取失败:', error)
      return baseInfo // 返回兜底数据保证程序稳定性
    }
  }