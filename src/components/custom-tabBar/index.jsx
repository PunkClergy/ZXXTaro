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
    useEffect(() => {
        handleGetNavigation()
    }, [])


    return (
        <View className='custom-tabbar' style={{ height: `${tabarHeight}px` }}>
            <View class="tab-bar-border"></View>
            {tabList.map(ele => {
                return <View className='tab-bar-item' key={ele.iconPath}>
                    <Image src={`${BASE_URL}/img/${selectedtext == ele.text ? ele.selectedIconPath : ele.iconPath}`} className='icon' />
                    <Text className='text'>{ele.text}</Text>
                </View>
            })}
        </View>
    )
}