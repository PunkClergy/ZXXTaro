import Taro from '@tarojs/taro'
import React, { useEffect, useState } from "react";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import CustomNavbar from '@/components/custom-navbar';
import CustomTabBar from '@/components/custom-tabBar';
import { TurnImageToBase64 } from '@utils/hardware'
import { getNavInfo } from '@utils/system-info';
import { homeApi } from '@/services/api/index';
import { BASE_URL } from '@/config'
import bgIcon from '@assets/images/bg-folder/bg.png'
import bannerBgIcon from '@assets/images/bg-folder/banner-bg.png'
import './index.less'

const Home = () => {
  const [bannerlist, setBannerlist] = useState([])
  const { statusBarHeight, navBarHeight, windowHeight } = getNavInfo();
  useEffect(() => {
    homeApi.getBannerlist({ terminalId: 0 }).then(response => {
      setBannerlist(response.content)
    }).catch(err => console.error('请求失败:', err))
  }, [])

  return (
    <View className='container' style={{ backgroundImage: `url(${TurnImageToBase64(bgIcon)})`, height: `${windowHeight}px` }}>
      <CustomNavbar title="我的页面" />
      <View className='swiper-outer-container'
        style={{ backgroundImage: `url(${TurnImageToBase64(bannerBgIcon)})`, marginTop: `${statusBarHeight + navBarHeight}px`,height:'150px' }}>
        {/* <Swiper className='banner-swiper' style={{height:'200px'}} autoplay circular >
          {bannerlist.map(item => (
            <SwiperItem key={item.id} style={{height:'100px',overflow:'hidden'}}>
              <View className='swiper-item'>
                <Image
                  src={`${BASE_URL}/img/${item.img}`}
                  mode='aspectFill' // 图片裁剪模式
                  className='swiper-image'
                />
              </View>
            </SwiperItem>
          ))}
        </Swiper> */}

      </View>

      <CustomTabBar selectedtext={'首页'} />
    </View>
  );
};

export default Home;
