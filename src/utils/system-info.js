import Taro from '@tarojs/taro';
// 获取设备信息
export const getNavInfo = () => {
  const baseInfo = {
    windowHeight: 0,
    windowWidth: 0,
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

