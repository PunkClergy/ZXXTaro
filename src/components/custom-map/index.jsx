import Taro from '@tarojs/taro';
import { Map, Markers } from 'react-amap';
import { View, Text, Image } from '@tarojs/components';
import { returnCar, seekCar, unlock, closelock, origin, goNav, bluetooth, wifi, bluetooth_1, wifi_1 } from '@utils/image-out';
import './index.less';
import { useEffect } from 'react';

const CustomMap = () => {

    const randomPosition = () => ({
        longitude: 100 + Math.random() * 20,
        latitude: 30 + Math.random() * 20
    })
    const markerStyle = {
        padding: '5px',
        border: '1px solid #ddd',
        background: '#fff',
    };
    const center = { longitude: 120.126293, latitude: 30.274653 };
    const markers = Array(10).fill(true).map(function (e, i) {
        var position = randomPosition();
        return {
            position,
            // 这个属性就可以用来确定点击的是哪个坐标点
            myIndex: i
        }
    });
    const renderMarkerFn = (extData) => (
        <View>
            {extData.myIndex}
        </View>

    );
    const markersEvents = {
        click(e, marker) {
            // 通过高德原生提供的 getExtData 方法获取原始数据
            const extData = marker.getExtData();
            const index = extData.myIndex;
            alert(`点击的是第${index}号坐标点`);
        }
    }

    return (
        <View className='map-container'>
            <Map
                zoom={1}
                center={[center.longitude, center.latitude]}
                mapStyle="amap://styles/normal"
                version="2.0"
                mapKey="b73ffdf7caa88d4036228c9efdbc7c78"
            >
                <Markers
                    render={(evt) => renderMarkerFn(evt)}
                    markers={markers}
                    events={markersEvents}
                    useCluster
                />
            </Map>
            <View className='map-tools' style={{ bottom: `10px` }}>
                <View className='map-tools-container'>
                    <Image src={returnCar} className='map-tools-image' />
                    <Text className='map-tools-text'>归还车辆</Text>
                </View>
                <View className='map-tools-container'>
                    <Image src={unlock} className='map-tools-image' />
                    <Text className='map-tools-text'>开锁</Text>
                </View>
                <View className='map-tools-container'>
                    <Image src={closelock} className='map-tools-image' />
                    <Text className='map-tools-text'>关锁</Text>
                </View>
                <View className='map-tools-container'>
                    <Image src={seekCar} className='map-tools-image' />
                    <Text className='map-tools-text'>寻车</Text>
                </View>
                <View className='map-tools-container'>
                    <Image src={seekCar} className='map-tools-image' />
                    <Text className='map-tools-text'>查看照片</Text>
                </View>
            </View>
            <View className='map-nav' style={{ bottom: `50px`, right: '5%' }}>
                <View className='map-nav-container'>
                    <Image src={origin} className='map-nav-image' />
                </View>
                <View className='map-nav-container'>
                    <Image src={goNav} className='map-nav-image' />
                </View>
            </View>
            <View className='map-network' style={{ top: `10px`, right: `90%` }}>
                <View className='map-network-container'>
                    <Image src={bluetooth} className='map-network-image' />
                </View>
                <View className='map-network-container'>
                    <Image src={wifi_1} className='map-network-image' />
                </View>
            </View>
        </View>

    );
};

export default CustomMap;