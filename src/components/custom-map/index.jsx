import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { returnCar, seekCar, unlock, closelock, origin, goNav, bluetooth, wifi, bluetooth_1, wifi_1 } from '@utils/image-out';
import './index.less';


// 模拟业务点数据
const mockBusinessPoints = [
    {
        id: 1,
        name: "模拟商店A",
        position: [116.406315, 39.908775], // 北京天安门附近
        content: "营业时间：9:00-20:00<br>电话：010-12345678",
        type: "store"
    },
    {
        id: 2,
        name: "模拟医院B",
        position: [116.403847, 39.913916], // 故宫附近
        content: "24小时急诊<br>床位：200张",
        type: "hospital"
    }
]

export default function LocationMap() {
    const [mapInstance, setMapInstance] = useState(null)
    const [activeWindow, setActiveWindow] = useState(null)

    // 初始化地图
    useEffect(() => {
        if (process.env.TARO_ENV !== 'h5') return

        const key = 'b4abfef4e5f096192e69e2550237eab6'
        const scriptId = 'amap-script'

        const initMap = () => {
            const map = new AMap.Map('map-container', {
                zoom: 10,
                resizeEnable: true
            })
            setMapInstance(map)

            // 加载定位插件
            AMap.plugin(['AMap.Geolocation'], () => {
                const geolocation = new AMap.Geolocation({
                    enableHighAccuracy: false,
                    showButton:false,
                    buttonPosition: 'RB',
                    showMarker: false // 禁用默认定位标记
                })

                map.addControl(geolocation)

                // 首次定位
                // geolocation.getCurrentPosition((status, result) => {
                //     if (status === 'complete') {
                //         const pos = [result.position.lng, result.position.lat]

                //         addCurrentPositionMarker(map, pos)
                //         addBusinessMarkers(map)
                //         map.setCenter(pos)
                //     }
                // })
                geolocation.getCurrentPosition((status, result) => {
                    if (status !== 'complete') {
                        const pos = [116.27940, 39.82360]
                        addCurrentPositionMarker(map, pos)
                        addBusinessMarkers(map)
                        map.setCenter(pos)
                    }
                })
            })
        }

        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script')
            script.id = scriptId
            script.src = `https://webapi.amap.com/maps?v=2.0&key=${key}&plugin=AMap.Geolocation`
            script.onload = initMap
            document.head.appendChild(script)
        } else {
            initMap()
        }

        return () => {
            if (mapInstance) mapInstance.destroy()
        }
    }, [])

    // 添加真实位置标记（蓝色）
    const addCurrentPositionMarker = (map, position) => {
        new AMap.Marker({
            position,
            map,
            content: `
        <div style="
          width: 24px;
            height: 24px;
            background: green;
            border: 2px solid #fff;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></div>
      `,
            offset: new AMap.Pixel(-10, -10)
        })
    }

    // 添加模拟业务点标记（红色）
    const addBusinessMarkers = (map) => {
        mockBusinessPoints.forEach(point => {
            const marker = new AMap.Marker({
                position: point.position,
                map,
                content: `
          <div style="
            width: 24px;
            height: 24px;
            background: #ff4d4f;
            border: 2px solid #fff;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          "></div>
        `,
                offset: new AMap.Pixel(-12, -12)
            })

            // 业务点点击事件
            marker.on('click', () => {
                activeWindow?.close()
                const infoWindow = new AMap.InfoWindow({
                    content: `
            <div style="
              min-width: 200px;
              padding: 12px;
              background: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            ">
              <h3 style="margin:0 0 8px;color:#ff4d4f;">${point.name}</h3>
              <div style="color:#666;line-height:1.5;">
                ${point.content.replace(/<br>/g, '</div><div>')}
              </div>
            </div>
          `,
                    offset: new AMap.Pixel(0, -24)
                })
                infoWindow.open(map, point.position)
                setActiveWindow(infoWindow)
            })
        })
    }



    return (
        <View className='main-container'>
            <View id="map-container" className='map-container' />
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

        </View >
    )
}