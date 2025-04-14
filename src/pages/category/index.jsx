// index.jsx
import { useState, useEffect } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, ScrollView, Text, Image } from '@tarojs/components'
import './index.less'

// 模拟标签数据
const mockLabelData = [
    {
        label: '体育',
        children: [
            { value: '1', label: '篮球' },
            { value: '2', label: '足球' },
            { value: '3', label: '羽毛球' }
        ]
    },
    {
        label: '娱乐',
        children: [
            { value: '4', label: '电影' },
            { value: '5', label: '音乐' },
            { value: '6', label: '综艺' }
        ]
    },
    {
        label: '科技',
        children: [
            { value: '7', label: '人工智能' },
            { value: '8', label: '区块链' },
            { value: '9', label: '物联网' }
        ]
    }
]

const Category = () => {
    // 状态管理
    const [navIndex, setNavIndex] = useState(0)
    const [mainCur, setMainCur] = useState('')
    const [labelList, setLabelList] = useState([])
    const [leftTop, setLeftTop] = useState(0)
    const [selectLabel, setSelectLabel] = useState([])
    const [rect, setRect] = useState({
        leftHeight: 0,
        leftItem: [],
        rightItem: [],
    })

    // 组件加载时初始化数据
    const useDidShow = () => {
        // 初始化标签数据
        console.log(111)
        const initData = mockLabelData.map(item => ({
            ...item,
            children: item.children.map(child => ({
                ...child,
                select_status: false
            }))
        }))
        console.log(initData)
        setLabelList(initData)
    }

    useEffect(()=>{
        useDidShow()
    },[])
    // 数据变化后初始化布局
    useEffect(() => {
        if (labelList.length > 0) {
            getTabList()
        }
    }, [labelList])

    /** 布局初始化 */
    const getTabList = async () => {
        const [left, right, leftHeight] = await Promise.all([
            initLeft(labelList.length, "#left-"),
            initRight(labelList.length, "#right-"),
            getRect('#leftHeight')
        ])
        console.log({
            ...rect,
            leftItem: left,
            rightItem: right,
            leftHeight: leftHeight?.height || 0
        })
        setRect({
            ...rect,
            leftItem: left,
            rightItem: right,
            leftHeight: leftHeight?.height || 0
        })
    }

    /** 获取元素位置信息 */
    const getRect = (selector) => {
        return new Promise(resolve => {
            setTimeout(() => {
                Taro.createSelectorQuery()
                    .select(selector)
                    .boundingClientRect(res => resolve(res || {}))
                    .exec()
            }, 10)
        })
    }

    /** 初始化左侧布局 */
    const initLeft = async (length, selector) => {
        const items = []
        for (let i = 0; i < length; i++) {
            const res = await getRect(`${selector}${i}`)
            items.push({
                offsetTop: res?.top || 0,
                height: res?.height || 0
            })
        }
        return items
    }

    /** 初始化右侧布局 */
    const initRight = async (length, selector) => {
        const items = []
        for (let i = 0; i < length; i++) {
            const res = await getRect(`${selector}${i}`)
            items.push({
                offsetTop: res?.top || 0,
                bottom: res?.bottom || 0
            })
        }
        return items
    }

    /** 左侧导航点击 */
    const navTabbar = (index) => {
        const { leftItem } = rect
        const centerPosition = leftItem[index]?.offsetTop -
            rect.leftHeight / 2 +
            leftItem[index]?.height / 2 || 0

        setNavIndex(index)
        setMainCur(index)
        setLeftTop(centerPosition)
    }

    /** 右侧滚动处理 */
    const scrollBtn = (e) => {
        const { rightItem } = rect
        const scrollTop = e.detail.scrollTop + 20

        rightItem.forEach((item, index) => {
            if (scrollTop > item.offsetTop &&
                scrollTop < item.bottom &&
                navIndex !== index) {
                navTabbar(index)
            }
        })
    }

    /** 标签选择处理 */
    const labelBtn = (value) => {
        const updated = labelList.map(item => ({
            ...item,
            children: item.children.map(child => {
                if (child.value === value) {
                    // 最多选择3个的逻辑
                    const canSelect = selectLabel.length < 3 || child.select_status
                    if (!canSelect) {
                        Taro.showToast({ title: '最多选择三个标签', icon: 'none' })
                        return child
                    }
                    return { ...child, select_status: !child.select_status }
                }
                return child
            })
        }))

        // 更新选中列表
        const selected = updated
            .flatMap(item => item.children)
            .filter(c => c.select_status)

        setLabelList(updated)
        setSelectLabel(selected)
        Taro.setStorageSync('selectLabel', selected)
    }

    return (
        <View className='user_label_wrapp'>
            <View className='activity_top' />

            <View className='label_border_box'>
                {/* 左侧导航 */}
                <ScrollView
                    scrollY
                    scrollWithAnimation
                    className='vertical_left'
                    scrollTop={leftTop}
                    showScrollbar={false}
                    id='leftHeight'
                >
                    {labelList.map((item, index) => (
                        <View
                            key={`left-${index}`}
                            className={`vertical_title ${navIndex === index ? 'active' : ''}`}
                            id={`left-${index}`}
                            onClick={() => navTabbar(index)}
                        >
                            <Text className='title-text'>{item.label}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* 右侧内容 */}
                <ScrollView
                    scrollY
                    scrollWithAnimation
                    className='vertical-right'
                    showScrollbar={false}
                    onScroll={scrollBtn}
                    scrollIntoView={`right-${mainCur}`}
                >
                    {labelList.map((item, index) => (
                        <View
                            key={`right-${index}`}
                            id={`right-${index}`}
                            className='vertical-right-item'
                        >
                            <View className='right_title'>{item.label}</View>
                            <View className='vertical-label'>
                                {item.children.map((child) => (
                                    <View
                                        key={child.value}
                                        className={`label-box ${child.select_status ? 'active' : ''}`}
                                        onClick={() => labelBtn(child.value)}
                                    >
                                        {child.label}
                                        {child.select_status && (
                                            <Image
                                                className='label_icon'
                                                src='https://fastly.jsdelivr.net/npm/@vant/assets/success.svg'
                                            />
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default Category