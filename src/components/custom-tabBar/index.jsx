/*
 * @Author: MaC
 * @Date: 2025-04-09 17:45:13
 * @LastEditors: MaC
 * @LastEditTime: 2025-04-11 14:06:02
 * @FilePath: \ZXXTaro\src\components\custom-tabBar\index.jsx
 */
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { getNavInfo } from '@utils/system-info';
import { tabarApi } from '@/services/api/index'
import { BASE_URL } from '@/config'
import './index.less'

export default function CustomTabBar(props) {
    const { selectedtext } = props
    const { tabarHeight } = getNavInfo();
    const [tabList, setTabList] = useState([])
    // 获取底部导航数据
    const handleGetNavigation = () => {
        tabarApi.getTabarList({}).then(response => {
            const list = response.content
            setTabList(list)
        }).catch(err => console.error('请求失败:', err))
    }
    const handle = (evt) => {
        console.log(evt)
        Taro.switchTab({
            url: '/pages/user/index' // 跳转的目标 TabBar 页面路径
        })
    }
    useEffect(() => {
        handleGetNavigation()
    }, [])


    return (
        <View className='custom-tabbar' style={{ height: `${tabarHeight}px` }}>
            <View class="tab-bar-border"></View>
            {tabList.map(ele => {
                return <View className='tab-bar-item' key={ele.iconPath} onClick={() => handle(ele)}>
                    <Image src={`${BASE_URL}/img/${selectedtext == ele.text ? ele.selectedIconPath : ele.iconPath}`} className='icon' />
                    <Text className='text'>{ele.text}</Text>
                </View>
            })}
        </View>
    )
}