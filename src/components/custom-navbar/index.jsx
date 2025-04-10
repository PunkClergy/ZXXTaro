
// 按需引入 Taro 和组件
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import { getNavInfo } from '@utils/system-info';
import leftIcon from '@assets/images/home/left.png';
import homeIcon from '@assets/images/home/home.png';
import './index.less';

const CustomNavbar = ({ title }) => {
    const { statusBarHeight, navBarHeight } = getNavInfo();
    return (
        <View className="custom-navbar"
            style={{ paddingTop: `${statusBarHeight}px`, height: `${navBarHeight}px` }}>
            <View className="nav-content">
                <View className="left-buttons">
                    <View className="nav-btn" >
                        <Image src={leftIcon} className="icon" mode="aspectFit" onClick={() => Taro.navigateBack()} />
                    </View>
                    <View className="nav-btn">
                        <Image src={homeIcon} className="icon" mode="aspectFit" onClick={
                            () => Taro.reLaunch({
                                url: '/pages/index/index'
                            })} />
                    </View>
                </View>
                <View className="title-box">
                    <Text className="title-text">{title}</Text>
                </View>
            </View>
        </View>
    );
};

export default CustomNavbar;