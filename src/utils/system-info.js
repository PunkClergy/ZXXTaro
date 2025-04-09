import Taro from '@tarojs/taro';

export const getNavInfo = () => {
    if (process.env.TARO_ENV === 'h5') {
        // H5 端没有胶囊按钮，返回默认值
        return {
            statusBarHeight: 0, // H5 不需要状态栏高度
            navBarHeight: 44, // 默认导航栏高度（可以根据设计调整）
            menuButtonInfo: {
                top: 0,
                height: 32, // 模拟胶囊按钮高度
                width: 87, // 模拟胶囊按钮宽度
                right: 16, // 模拟胶囊按钮距离右侧的距离
            },
        };
    }

    // 微信小程序端使用原生 API
    const systemInfo = Taro.getSystemInfoSync();
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();

    const navBarHeight =
        (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
        menuButtonInfo.height;

    return {
        statusBarHeight: systemInfo.statusBarHeight,
        navBarHeight: navBarHeight,
        menuButtonInfo: menuButtonInfo,
    };
};