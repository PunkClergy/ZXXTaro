export default {
  pages: [
    'pages/index/index',
    'pages/category/index',
    'pages/cart/index',
    'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'My App',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666',
    selectedColor: '#6190E8',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/images/hook.png',
        selectedIconPath: 'assets/images/hook.png'
      },
      {
        pagePath: 'pages/category/index',
        text: '分类',
        iconPath: 'assets/images/hook.png',
        selectedIconPath: 'assets/images/hook.png'
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: 'assets/images/hook.png',
        selectedIconPath: 'assets/images/hook.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'assets/images/hook.png',
        selectedIconPath: 'assets/images/hook.png'
      }
    ]
  }
}