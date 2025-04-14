import { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components';
import { returnCar, seekCar, unlock, closelock, origin, goNav, bluetooth, wifi, bluetooth_1, wifi_1 } from '@utils/image-out';
import Taro from '@tarojs/taro'
import './index.less';

export default function MapWithPopup() {
    const [activeInfoWindow, setActiveInfoWindow] = useState(null)

    useEffect(() => {
        // 仅H5环境运行
        if (process.env.TARO_ENV !== 'h5') {
            Taro.showToast({ title: '当前环境不支持地图' })
            return
        }

        const key = 'b4abfef4e5f096192e69e2550237eab6' // 替换成实际key
        const scriptId = 'amap-script'

        const initMap = () => {
            const map = new AMap.Map('map-container', {
                zoom: 13,
                center: [116.397428, 39.90923]
            })

            // 示例标记数据
            const markers = [
                {
                    position: [116.397428, 39.90923],
                    title: '天安门',
                    content: '<div style="padding:10px;min-width:200px">北京著名地标</div>'
                },
                {
                    position: [116.403963, 39.915119],
                    title: '故宫',
                    content: '<div style="padding:10px;min-width:200px">明清皇家宫殿</div>'
                }
            ]

            markers.forEach(markerData => {
                const marker = new AMap.Marker({
                    position: markerData.position,
                    map: map
                })

                // 点击标记事件
                marker.on('click', () => {
                    // 关闭之前的信息窗
                    if (activeInfoWindow) activeInfoWindow.close()

                    const infoWindow = new AMap.InfoWindow({
                        content: `
              <div style="padding:10px;min-width:200px">
                <h3 style="margin:0 0 8px">${markerData.title}</h3>
                ${markerData.content}
              </div>
            `,
                        offset: new AMap.Pixel(0, -30)
                    })

                    infoWindow.open(map, markerData.position)
                    setActiveInfoWindow(infoWindow)
                })
            })
        }

        // 动态加载高德地图JS API
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script')
            script.id = scriptId
            script.src = `https://webapi.amap.com/maps?v=2.0&key=${key}`
            script.onload = initMap
            document.head.appendChild(script)
        } else {
            initMap()
        }

        // 清理函数
        return () => {
            if (activeInfoWindow) activeInfoWindow.close()
            const mapContainer = document.getElementById('map-container')
            if (mapContainer) mapContainer.innerHTML = ''
        }
    }, [])

    return (
        <View className='main-container'>
            <View
                id="map-container"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: "auto",
                    width: '96%',
                    height: '100%',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}
            />
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

    )
}