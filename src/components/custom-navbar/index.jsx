
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components';
import { getNavInfo } from '../../utils/system-info';
import './index.less';

const CustomNavbar = ({ title }) => {
    const { statusBarHeight, navBarHeight } = getNavInfo();
    return (
        <View className="custom-navbar"
            style={{ paddingTop: `${statusBarHeight}px`, height: `${navBarHeight}px` }}>
            <View className="nav-content">
                <View className="left-buttons">
                    <View className="nav-btn" >
                        <Image src="/assets/home/left.png" className="icon" mode="aspectFit" onClick={() => Taro.navigateBack()} />
                    </View>
                    <View className="nav-btn">
                        <Image src="/assets/home/home.png" className="icon" mode="aspectFit" onClick={
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