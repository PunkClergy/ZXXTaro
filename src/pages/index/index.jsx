import Taro from '@tarojs/taro'
import React, { useEffect, useState } from "react";
import { View, Swiper, SwiperItem, Image, Text } from "@tarojs/components";
import CustomNavbar from '@/components/custom-navbar';
import CustomTabBar from '@/components/custom-tabBar';
import { TurnImageToBase64 } from '@utils/hardware'
import { getNavInfo, getImageDimensions } from '@utils/system-info';
import { homeApi } from '@/services/api/index';
import { BASE_URL } from '@/config'
import bgIcon from '@assets/images/bg-folder/bg.png'
import bannerBgIcon from '@assets/images/bg-folder/banner-bg.png'
import './index.less'

const Home = () => {

  const { statusBarHeight, navBarHeight, windowHeight, windowWidth } = getNavInfo();
  const [bannerlist, setBannerlist] = useState([{}])
  const [bannerInfo, setBannerInfo] = useState({ height: 0, width: 0 })
  const [quickList, setQuickList] = useState([[]])
  const [dot, setDot] = useState(0)



  // 请求banner数据
  const handlebannerList = () => {
    homeApi.getBannerlist({ terminalId: 0 }).then(response => {
      console.log(response.content)
      setBannerlist(response.content)
    }).catch(err => console.error('请求失败:', err))
  }
  // 获取图片的高和宽
  const handleImageDimensions = () => {
    getImageDimensions(bannerBgIcon, (err, dimensions) => {
      if (err) {
        return;
      }
      const proportion = dimensions.width / windowWidth
      setBannerInfo({
        width: dimensions.width / proportion,
        height: dimensions.height / proportion
      })
    });
  }
  // 获取快捷入口数据
  const handleQuickEntry = () => {
    homeApi.getMidMenulist({ terminalId: -1 }).then(response => {
      const chunkArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        )
      }
      const groupedData = chunkArray(response.content, 5)
      console.log(groupedData)
      setQuickList(groupedData)
    }).catch(err => console.error('请求失败:', err))
  }
  useEffect(() => {
    handlebannerList()
    handleImageDimensions()
    handleQuickEntry()
  }, [])

  return (
    <View className='container' style={{ backgroundImage: `url(${TurnImageToBase64(bgIcon)})`, height: `${windowHeight}px` }}>
      <CustomNavbar title="我的页面" />
      <View className='swiper-outer-container'
        style={{
          backgroundImage: `url(${TurnImageToBase64(bannerBgIcon)})`,
          marginTop: `${statusBarHeight + navBarHeight}px`,
          height: `${bannerInfo.height}px`,
        }}>

        <Swiper className='banner-swiper' autoplay circular>
          {bannerlist.length > 0 && bannerlist.map((item, index) => (
            <SwiperItem key={index} >
              <View className='swiper-item'>
                <Image
                  src={`${BASE_URL}/img/${item.img}`}
                  mode='aspectFill'
                  className='swiper-image'
                  style={{
                    height: `${bannerInfo.height}px`,
                  }}
                />
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
      <View className='quick-container'>
        <View className="quick-entry-container" >
          <Swiper style={{ height: '60px' }} circular onChange={(e) => { setDot(e.detail.current) }}>
            {quickList.length > 0 && quickList.map((item, index) => (
              <SwiperItem key={index}>
                <View className='quick-swiper-item'>
                  {item.length > 0 && item.map((ele, i) => (
                    <View key={i} className='quick-swiper-item-view'>
                      <Image className='quick-swiper-item-image' src={`${BASE_URL}/img/${ele.icon}`} />
                      <Text className='quick-swiper-item-text'>{ele.name}</Text>
                    </View>
                  ))}
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <View className='quick-dot-container'>
          {quickList.length > 0 && quickList.map((evt, i) => (
            <View key={i} className={dot == i ? 'quick-dot-active' : 'quick-dot-initial'}></View>
          ))}
        </View>
      </View>
      <CustomTabBar selectedtext={'首页'} />
    </View>
  );
};

export default Home;
