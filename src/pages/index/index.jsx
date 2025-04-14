/*
 * @Author: MaC
 * @Date: 2025-04-09 15:20:12
 * @LastEditors: MaC
 * @LastEditTime: 2025-04-14 11:27:21
 * @FilePath: \ZXXTaro\src\pages\index\index.jsx
 */
import Taro from '@tarojs/taro'
import React, { useEffect, useState, Fragment } from "react";
import { View, Swiper, SwiperItem, Image, Text, ScrollView } from "@tarojs/components";
import CustomNavbar from '@/components/custom-navbar';
import CustomTabBar from '@/components/custom-tabBar';
import CustomMap from '@/components/custom-map';
import { TurnImageToBase64 } from '@utils/hardware'
import { getNavInfo, getImageDimensions } from '@utils/system-info';
import { homeApi } from '@/services/api/index';
import { BASE_URL } from '@/config'
import bgIcon from '@assets/images/bg-folder/bg.png'
import bannerBgIcon from '@assets/images/bg-folder/banner-bg.png'
import './index.less'

const Home = () => {
  const { statusBarHeight, navBarHeight, windowHeight, windowWidth, tabarHeight, quickHeight, quickHeightDot, intervalHeight } = getNavInfo();
  const [bannerlist, setBannerlist] = useState([{}])
  const [bannerInfo, setBannerInfo] = useState({ height: 0, width: 0 })
  const [quickList, setQuickList] = useState([[]])
  const [dot, setDot] = useState(0)
  const [leftData, setLabelData] = useState([])
  const [rightData, setRightData] = useState([])
  const [navIndex, setNavIndex] = useState(0)
  const [quick, setQuick] = useState(0)
  const [quickIndex, setQuickIndex] = useState(0)

  const [leftTop, setLeftTop] = useState(0)
  const [rightTop, setRightTop] = useState(0)
  const [rect, setRect] = useState({
    leftHeight: 0,
    leftItem: [],
    rightItem: [],
  })


  // 获取banner数据
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
  // 获取快捷入口数据
  const handleQuickEntry = () => {
    homeApi.getMidMenulist({ terminalId: -1 }).then(response => {
      const chunkArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        )
      }
      const groupedData = chunkArray(response.content, 5)
      setQuickList(groupedData)
    }).catch(err => console.error('请求失败:', err))
  }
  // 获取树左侧数据
  const handleMenulist = (evt) => {
    homeApi.getMenulist({
      menuId: evt.id,
      isDir: 1,
    }).then(response => {
      setLabelData(response.content)
    }).catch(err => console.error('请求失败:', err))
  }
  // 初始化元素位置信息 
  const initiGetRect = (selector) => {
    return new Promise(resolve => {
      setTimeout(() => {
        Taro.createSelectorQuery()
          .select(selector)
          .boundingClientRect(res => resolve(res || {}))
          .exec()
      }, 10)
    })
  }
  // 初始化右侧布局参数值
  const initRight = async (length, selector) => {
    const items = []
    for (let i = 0; i < length; i++) {
      const res = await initiGetRect(`${selector}${i}`)
      items.push({
        height: res?.height + 5 || 0,
      })
    }
    return items
  }
  // 初始化左侧布局参数值
  const initLeft = async (length, selector) => {
    const items = []
    for (let i = 0; i < length; i++) {
      const res = await initiGetRect(`${selector}${i}`)
      items.push({
        height: res?.height || 0
      })
    }
    return items
  }
  // 初始化布局参数设定
  const initLayoutParams = async () => {
    const [left, right, leftHeight] = await Promise.all([
      initLeft(leftData.length, "#left-"),
      initRight(rightData.length, "#right-"),
      initiGetRect('#leftHeight')
    ])
    setRect({
      ...rect,
      leftItem: left,
      rightItem: right,
      leftHeight: leftHeight?.height || 0
    })
  }
  // 获取树右侧数据
  const handleRightMenulist = (evt) => {
    homeApi.getRightMenulist({
      menuId: evt.id,
      isDir: 1,
    }).then(response => {
      setRightData(response.content)
    }).catch(err => console.error('请求失败:', err))
  }
  // 点击左侧树执行事件
  const handleNavTabbar = (index) => {
    console.log(1111)
    const { rightItem } = rect
    setNavIndex(index)
    setRightTop(rightItem.slice(0, index).reduce((acc, curr) => acc + curr.height, 0))

  }

  // 右侧数据滚动时出发
  const handleOnScroll = (evt) => {
    // console.log(evt)
  };
  // 点击快捷入口
  const handleOnQuick = (i, index) => {
    setQuick(i)
    setQuickIndex(index)
  }

  useEffect(() => {
    handlebannerList()
    handleImageDimensions()
    handleQuickEntry()
  }, [])
  useEffect(() => {
    initLayoutParams()
  }, [rightData])
  useEffect(() => {
    if (quickList.length > 0) {
      if (quickList[quickIndex].length > 0) {
        handleMenulist(quickList[quickIndex][quick])
        handleRightMenulist(quickList[quickIndex][quick])
      }
    }

  }, [quick, quickList])

  return (
    <View className='container' style={{ backgroundImage: `url(${TurnImageToBase64(bgIcon)})`, height: `${windowHeight}px` }}>
      <CustomNavbar title="我的页面" />
      <View className='swiper-outer-container'
        style={{
          backgroundImage: `url(${TurnImageToBase64(bannerBgIcon)})`,
          marginTop: `${statusBarHeight + navBarHeight + intervalHeight}px`,
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
      <View className='quick-container' style={{ marginTop: `${intervalHeight}px` }}>
        <View className="quick-entry-container" style={{ height: `${quickHeight}px` }}>
          <Swiper style={{ height: `100%` }} circular onChange={(e) => { setDot(e.detail.current) }}>
            {quickList.length > 0 && quickList.map((item, index) => (
              <SwiperItem key={index}>
                <View className='quick-swiper-item'>
                  {item.length > 0 && item.map((ele, i) => (
                    <View key={i} className='quick-swiper-item-view' onClick={() => handleOnQuick(i, index)}>
                      <Image className='quick-swiper-item-image' src={`${BASE_URL}/img/${ele.icon}`} />
                      <Text className='quick-swiper-item-text'>{ele.name}</Text>
                    </View>
                  ))}
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <View className='quick-dot-container' style={{ height: `${quickHeightDot}px` }}>
          {quickList.length > 0 && quickList.map((evt, i) => (
            <View key={i} className={dot == i ? 'quick-dot-active' : 'quick-dot-initial'} style={{ height: `${quickHeightDot / 2}px` }}></View>
          ))}
        </View>
      </View>

      <View className='main-content-area-container'
        style={{
          marginTop: `${intervalHeight}px`,
          height: `${windowHeight - (navBarHeight + bannerInfo.height + tabarHeight + quickHeight + quickHeightDot + statusBarHeight + (intervalHeight * 4))}px`
        }}>
        {quickIndex == 0 && quick == 0 ? 
    
            <CustomMap />
      : <Fragment>
          <ScrollView
            scrollY
            scrollWithAnimation
            className='vertical-left'
            scrollTop={leftTop}
            showScrollbar={false}
            id='leftHeight'
          >
            {leftData.length > 0 && leftData.map((ele, index) => (
              <View
                key={`left-${index}`}
                id={`left-${index}`}
                className={`vertical-container ${navIndex === index ? 'active' : ''}`}
                onClick={() => handleNavTabbar(index)}
              >
                <View className={`vertical-icon ${navIndex === index ? 'active' : ''}`}></View>
                <Text className='vertical-title'>{ele.name}</Text>
              </View>
            ))}
          </ScrollView>

          <ScrollView
            scrollY
            scrollWithAnimation
            className='vertical-right'
            showScrollbar={false}
            scrollTop={rightTop}
            onScroll={handleOnScroll}
          >
            {rightData.length > 0 && rightData.map((element, index) => (
              <View
                className='vertical-container'
                key={`right-${index}`}
                id={`right-${index}`}>
                <Text className='vertical-container-title'>{element.name}</Text>
                <View className='vertical-container-content'>
                  {element.children.length > 0 && element.children.map((ele, i) => (
                    <View className='vertical-secondary-container' key={i}>
                      <Image className='secondary-container-images' src={`${BASE_URL}/img/${ele.icon}`} style={{}} />
                      <Text className='secondary-container-title'>{ele.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </Fragment>}


      </View>
      <CustomTabBar selectedtext={'首页'} />
    </View>
  );
};

export default Home;
