import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components';
import { getNavInfo } from '../../utils/system-info';
import './index.less';

const CustomNavbar = ({ title }) => {
    const { statusBarHeight, navBarHeight, menuButtonInfo } = getNavInfo();

    return (
        <View
            className="custom-navbar"
            style={{ paddingTop: `${statusBarHeight}px`, height: `${navBarHeight}px`, }}
        >

            <View
                className="back-btn"
                style={{
                    top: `${menuButtonInfo.top}px`,
                    height: `${menuButtonInfo.height}px`,
                    lineHeight: `${menuButtonInfo.height}px`,
                }}
                // onClick={() => Taro.navigateBack()}
            >
                <Image
                    src="/assets/home/left.png"
                    mode="aspectFit"
                    style={{ width: '20px', height: '20px' }}
                />
                

            </View>

            {/* 中间标题 */}
            <Text
                className="navbar-title"
                style={{
                    lineHeight: `${navBarHeight}px`,
                }}
            >
                {title}
            </Text>
        </View>
    );
};

export default CustomNavbar;