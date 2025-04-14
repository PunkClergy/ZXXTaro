import Taro from '@tarojs/taro';
import { Map, Markers, InfoWindow } from 'react-amap';
import { View, Text, Image } from '@tarojs/components';
import { returnCar, seekCar, unlock, closelock, origin, goNav, bluetooth, wifi, bluetooth_1, wifi_1 } from '@utils/image-out';
import { mapApi } from '@/services/api/index';
import './index.less';
import { useEffect, useState } from 'react';

const CustomMap = () => {
    const [markers, setMarkers] = useState([])
    const [center, setCenter] = useState({ longitude: 116.28335800578549, latitude: 39.82617362264038 });//当前位置
    const [visible, setVisible] = useState(false); // 控制 InfoWindow 的显示状态
    const [markerPosition, setMarkerPosition] = useState([])

    // 获取车辆数据
    const handleAllCarPoisitonList = () => {
        // mapApi.getAllCarPoisiton().then(response => {
        //     console.log(response.content)
        // }).catch(err => console.error('请求失败:', err))
        const res = {
            "code": 1000,
            "msg": "操作成功",
            "content": [
                {
                    "id": "0",
                    "sn": "550009599",
                    "idc": "19550009599",
                    "gpsTime": 1618761692000,
                    "longitude": 116.241082,
                    "latitude": 39.862382,
                    "speed": 1,
                    "direction": 41,
                    "altitude": 0,
                    "showtime": "2021-04-19 00:01:32",
                    "showlng": null,
                    "showlat": null,
                    "plateNumber": "京9599",
                    "tlongitude": 116.24711030486638,
                    "tlatitude": 39.86359678538823,
                    "blueKey": "3B6C83DC5D018D94",
                    "keTel": null,
                    "openId": null,
                    "startDate": null,
                    "endDate": null,
                    "deposit": null,
                    "kmprice": null,
                    "minuteprice": null,
                    "vehicleModeName": "北汽E150",
                    "vehicleSerialName": "北京汽车",
                    "vin": "aa",
                    "xsgw": "33",
                    "companyId": null,
                    "type": null,
                    "controlPower": null,
                    "uploadImgUrl": null,
                    "uploadImgUrlTwo": null,
                    "uploadImgUrlThree": null,
                    "uploadImgUrlFour": null,
                    "uploadImgUrlFive": null,
                    "address": "北京市丰台区卢沟桥街道小屯西路121号",
                    "hasUsedCar": null
                },
                {
                    "id": "0",
                    "sn": "550009760",
                    "idc": "19550009760",
                    "gpsTime": 1732593726000,
                    "longitude": 116.27845,
                    "latitude": 39.8245,
                    "speed": 1,
                    "direction": 11,
                    "altitude": 0,
                    "showtime": "2024-11-26 12:02:06",
                    "showlng": null,
                    "showlat": null,
                    "plateNumber": "京9760",
                    "tlongitude": 116.28448114167695,
                    "tlatitude": 39.82572674396872,
                    "blueKey": "373581F0FA3993BA",
                    "keTel": null,
                    "openId": null,
                    "startDate": null,
                    "endDate": null,
                    "deposit": null,
                    "kmprice": null,
                    "minuteprice": null,
                    "vehicleModeName": "宝骏310W",
                    "vehicleSerialName": "宝骏汽车",
                    "vin": "",
                    "xsgw": "",
                    "companyId": null,
                    "type": null,
                    "controlPower": null,
                    "uploadImgUrl": null,
                    "uploadImgUrlTwo": null,
                    "uploadImgUrlThree": null,
                    "uploadImgUrlFour": null,
                    "uploadImgUrlFive": null,
                    "address": "北京市丰台区看丹街道中国银行ATM",
                    "hasUsedCar": null
                },
                {
                    "id": "0",
                    "sn": "550011120",
                    "idc": "19550011120",
                    "gpsTime": 1655277576000,
                    "longitude": 116.278048,
                    "latitude": 39.824665,
                    "speed": 0,
                    "direction": 1,
                    "altitude": 0,
                    "showtime": "2022-06-15 15:19:36",
                    "showlng": null,
                    "showlat": null,
                    "plateNumber": "景199872",
                    "tlongitude": 116.28407872901202,
                    "tlatitude": 39.82589133786692,
                    "blueKey": "27E7AF3D78F3EEB3",
                    "keTel": null,
                    "openId": null,
                    "startDate": null,
                    "endDate": null,
                    "deposit": null,
                    "kmprice": null,
                    "minuteprice": null,
                    "vehicleModeName": "Jeep J12",
                    "vehicleSerialName": "Jeep",
                    "vin": "456782",
                    "xsgw": null,
                    "companyId": null,
                    "type": null,
                    "controlPower": null,
                    "uploadImgUrl": null,
                    "uploadImgUrlTwo": null,
                    "uploadImgUrlThree": null,
                    "uploadImgUrlFour": null,
                    "uploadImgUrlFive": null,
                    "address": "北京市丰台区看丹街道西提岛咖啡玛雅岛店",
                    "hasUsedCar": null
                },
                {
                    "id": "0",
                    "sn": "640019899",
                    "idc": "19640019899",
                    "gpsTime": 1744592223000,
                    "longitude": 116.277328,
                    "latitude": 39.824948,
                    "speed": 0,
                    "direction": 101,
                    "altitude": 57,
                    "showtime": "2025-04-14 08:57:03",
                    "showlng": null,
                    "showlat": null,
                    "plateNumber": "京640019899",
                    "tlongitude": 116.28335800578549,
                    "tlatitude": 39.82617362264038,
                    "blueKey": "7B43D038AF9C2DB7",
                    "keTel": null,
                    "openId": null,
                    "startDate": null,
                    "endDate": null,
                    "deposit": null,
                    "kmprice": null,
                    "minuteprice": null,
                    "vehicleModeName": "高尔夫6",
                    "vehicleSerialName": "一汽大众",
                    "vin": "",
                    "xsgw": "",
                    "companyId": null,
                    "type": null,
                    "controlPower": null,
                    "uploadImgUrl": null,
                    "uploadImgUrlTwo": null,
                    "uploadImgUrlThree": null,
                    "uploadImgUrlFour": null,
                    "uploadImgUrlFive": null,
                    "address": "北京市丰台区看丹街道海鹰路6号院11",
                    "hasUsedCar": null
                }
            ],
            "count": null
        }
        const markersList = res.content.map((ele, i) => {
            let temp = {
                position: {
                    latitude: ele.tlatitude,
                    longitude: ele.tlongitude
                },
                myIndex: i
            }
            return temp
        })
        setMarkers(markersList)
    }

    useEffect(() => {
        handleAllCarPoisitonList()
    }, [])



    const renderMarkerFn = (extData) => (
        <View>
            {extData.myIndex}
            {visible ? '1' : '2'}
        </View>

    );
    const markersEvents = {
        click(e, marker) {
            console.log(marker._style)
            const extData = marker.getExtData();
            const index = extData.myIndex;
            console.log(extData)
            
          
        }
    }

    return (
        <View className='map-container'>
            <Map
                zoom={20}
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
                <View style={{position:'absolute',top:'225px',left:'187px'}}>111</View>
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