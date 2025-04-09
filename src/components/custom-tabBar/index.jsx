import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { tabarApi } from '../../services/api/index'
import './index.less'

export default function CustomTabBar(props) {
    const { selectedtext } = props
    const [tabList, setTabList] = useState([])
    useEffect(() => {
        tabarApi.getTabarList({ terminalId: 0 }).then(response => {
            const list = [
                {
                    pagePath: "/pages/desk/desk",
                    iconPath: "/assets/images/tabar/desk@2x.png",
                    selectedIconPath: "/assets/images/tabar/desk_s@2x.png",
                    text: "首页"
                },
                {
                    pagePath: "/pages/stationDispatch/stationDispatch",
                    iconPath: "/assets/images/tabar/sys@2x.png",
                    selectedIconPath: "/assets/images/tabar/sys_s@2x.png",
                    text: "热点位置"
                },
                {
                    pagePath: "/pages/carManager/buyOilDevice/buyOilDevice",
                    iconPath: "/assets/images/tabar/purchase@2x.png",
                    selectedIconPath: "/assets/images/tabar/purchase_s@2x.png",
                    text: "购买和充值"
                }, {
                    pagePath: "/pages/system/managerInfo/userinfo",
                    iconPath: "/assets/images/tabar/setUp@2x.png",
                    selectedIconPath: "/assets/images/tabar/setUp_s@2x.png",
                    text: "系统"
                }
            ]
            setTabList(list)
        }).catch(err => console.error('请求失败:', err))
    }, [])


    return (
        <View className='custom-tabbar'>
            <View class="tab-bar-border"></View>
            {tabList.map(ele => {
                return <View className='tab-bar-item'>
                    <Image src={selectedtext == ele.text ? ele.selectedIconPath : ele.iconPath} className='icon' />
                    <Text className='text'>{ele.text}</Text>
                </View>
            })}
        </View>
    )
}