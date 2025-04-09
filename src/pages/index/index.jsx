

import Taro from '@tarojs/taro'
import React, { useCallback, useEffect, useState } from "react";
import { View, Swiper, SwiperItem, Text, Button, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import CustomNavbar from '../../components/custom-navbar';
import { homeApi } from '../../services/api/index';
import CustomTabBar from '../../components/custom-tabBar';
import { imageToBase64 } from '../../utils/trans'
import { getNavInfo } from '../../utils/system-info';
import './index.less'

const Home = () => {
  const c_link = 'https://k1sw.wiselink.net.cn/'
  const { statusBarHeight, navBarHeight } = getNavInfo();
  const [bannerlist, setBannerlist] = useState([])
  const [bg, setBg] = useState('')
  const [b,setB]=useState('')

  const handleBannerList = () => {
    homeApi.getBannerlist({ terminalId: 0 }).then(response => {
      setBannerlist(response.content)
    }).catch(err => console.error('请求失败:', err))
  }
  const handleImageToBase64 = () => {
    imageToBase64("/assets/images/bg-folder/banner-bg.png").then(e => {
      setBg(`data:image/png;base64,${e}`)
    })
  }
  const handleImageToBase641 = () => {
    imageToBase64("/assets/images/bg-folder/bg.png").then(e => {
      setB(`data:image/png;base64,${e}`)
    })
  }
  useEffect(() => {
    handleBannerList()
    handleImageToBase64()
    handleImageToBase641()

  }, [])

  return (
    <View className='container' style={{backgroundImage: `url(${b})`}}>
      <CustomNavbar title="智信通Wiselink" />
      <View className='swiper-outer-container'
        style={{ backgroundImage: `url(${bg})`, marginTop: `${statusBarHeight + navBarHeight}px` }}>
        <Swiper className='banner-swiper' autoplay circular >
          {bannerlist.map(item => (
            <SwiperItem key={item.id}>
              <View className='swiper-item'>
                <Image
                  src={`${c_link}/img/${item.img}`}
                  mode='aspectFill' // 图片裁剪模式
                  className='swiper-image'
                />
              </View>
            </SwiperItem>
          ))}
        </Swiper>

      </View>

      <CustomTabBar selectedtext={'首页'} />
    </View>
  );
};

export default Home;
