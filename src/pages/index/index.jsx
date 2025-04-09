
import Taro from '@tarojs/taro'
import React, { useCallback, useEffect, useState } from "react";
import { View, Swiper, SwiperItem, Text, Button, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import CustomNavbar from '../../components/custom-navbar';
import api from '../../services/api/index';
import './index.less'

const Home = () => {
  const c_link = 'https://k1sw.wiselink.net.cn/'
  const [bannerlist, setBannerlist] = useState([])

  useEffect(() => {
    api.getBannerlist({ terminalId: 0 }).then(response => {
      setBannerlist(response?.content)
    }).catch(err => console.error('请求失败:', err))
  }, [])

  return (
    <View className='container'>
      <CustomNavbar title="我的页面" />
      <Swiper autoplay circular >
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
  );
};

export default Home;
