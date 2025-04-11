/*
 * @Author: MaC
 * @Date: 2025-04-09 15:20:12
 * @LastEditors: MaC
 * @LastEditTime: 2025-04-11 10:49:27
 * @FilePath: \ZXXTaro\src\utils\system-info.js
 */
import Taro from '@tarojs/taro';
// 获取设备信息
export const getNavInfo = () => {
  const baseInfo = {
    intervalHeight:5,//间隔高度
    tabarHeight: 80,//tabar高度
    quickHeight: 60,//首页快捷入口高速
    quickHeightDot: 10,//首页快捷入口指示点高度
    windowHeight: 0,//屏幕可用高度
    windowWidth: 0,//屏幕可用宽度
    statusBarHeight: 0,//状态栏高度
    navBarHeight: 0,
    menuButtonInfo: {
      top: 0,
      height: 0,
      width: 0,
      right: 0
    }
  }

  if (process.env.TARO_ENV === 'h5') {
    const systemInfo = Taro.getSystemInfoSync()
    return {
      ...baseInfo,
      windowHeight: systemInfo.windowHeight,
      windowWidth: systemInfo.windowWidth,
      navBarHeight: 44, // iOS默认导航栏高度
      menuButtonInfo: {
        top: 4,          // 模拟小程序胶囊按钮位置
        height: 32,      // 微信胶囊按钮标准高度
        width: 87,       // 微信胶囊按钮标准宽度
        right: 7         // 微信胶囊按钮标准右边距
      }
    }
  }

  try {
    const systemInfo = Taro.getSystemInfoSync()
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect()

    const navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2
      + menuButtonInfo.height

    return {
      ...baseInfo,
      windowHeight: systemInfo.windowHeight,
      windowWidth: systemInfo.windowWidth,
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
    return baseInfo
  }
}
// 获取图片高度和宽度
export const getImageDimensions = (imageUrl, callback) => {
  const isH5 = process.env.TARO_ENV === 'h5';
  const isWeapp = process.env.TARO_ENV === 'weapp';
  const executor = () => new Promise((resolve, reject) => {
    if (isH5) {
      const img = new Image();
      img.onload = () => resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
      img.onerror = (e) => reject(new Error(`图片加载失败 ${e.toString()}`));
      img.src = imageUrl;
    } else if (isWeapp) {
      wx.getImageInfo({
        src: imageUrl,
        success: res => resolve(res),
        fail: err => reject(new Error(`图片加载失败: ${err.errMsg}`))
      });
    } else {
      reject(new Error('Unsupported platform'));
    }
  });
  if (typeof callback === 'function') {
    executor()
      .then(res => callback(null, res))
      .catch(err => callback(err));
  } else {
    return executor();
  }
};

