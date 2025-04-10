import Taro from '@tarojs/taro'
import React, { useEffect, useState } from "react";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
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
  // 请求banner数据
  const handlebannerList = () => {
    homeApi.getBannerlist({ terminalId: 0 }).then(response => {
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

  useEffect(() => {
    handlebannerList()
    handleImageDimensions()
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
      <CustomTabBar selectedtext={'首页'} />
    </View>
  );
};

export default Home;
