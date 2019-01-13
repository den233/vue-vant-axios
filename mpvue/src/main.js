import App from './App'
import Vue from 'vue'
import Vuex from 'vuex'
 
 
import fly from '@/utils/http'
Vue.prototype.$fly = fly;
import api from './api/index.js';
Vue.use(api);
// import vuescroll from 'vuescroll';
// import 'vuescroll/dist/vuescroll.css';
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: require('./assets/images/err.png'),
//   loading: require('./assets/images/ld1.gif'),
//   attempt: 5,
//   listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
// });
// Vue.use(vuescroll);
 
Vue.use(Vuex)

const store = require('./store').default
Vue.prototype.$store = store

App.mpType = 'app'
let PLATFORM_CONFIG = [
  {
    name: '会员激活',
    path: '/shop/entry',
    type: '22',
    icon: 'iconfont1 icon-jiating'
  },
  {
    name: '重消单',
    path: '/shop/entry',
    type: '21',
    icon: 'iconfont1 icon-dingdan'
  },
  {
    name: '升级单',
    path: '/shop/entry',
    type: '23',
    icon: 'iconfont1 icon-huiyuan1'
  }
]
Vue.prototype.$PLATFORM_CONFIG = PLATFORM_CONFIG;
const app = new Vue( App )

app.$mount()

export default {
  config: {
    window: {
      backgroundTextStyle: '#fff',
      navigationBarBackgroundColor: '#42aaf5',
      navigationBarTitleText: '隆力奇商城',
      navigationBarTextStyle: '#fff'
    },
    "usingComponents": {
      "van-toast": "/static/vant/toast/index",
      "van-icon": "/static/vant/icon/index"
    },
    pages: [
      'pages/home/index',
      'pages/shop/index',
       
    ] ,
   
    "tabBar": {
      "backgroundColor": "#fafafa",
      "borderStyle": "white",
      "selectedColor": "#42aaf5",
      "color": "#666",
      "list": [{
        "pagePath": "pages/home/index",
        "iconPath": "static/images/ic_menu_choice_nor.png",
        "selectedIconPath": "static/images/ic_menu_choice_pressed.png",
        "text": "首页"
      },
      
      {
        "pagePath": "pages/shop/index",
        "iconPath": "static/images/ic_menu_sort_nor.png",
        "selectedIconPath": "static/images/ic_menu_sort_pressed.png",
        "text": "商城"
      },
      {
        "pagePath": "pages/home/index",
        "iconPath": "static/images/ic_menu_shoping_nor.png",
        "selectedIconPath": "static/images/ic_menu_shoping_pressed.png",
        "text": "购物车"
      },
      {
        "pagePath": "pages/home/index",
        "iconPath": "static/images/ic_menu_me_nor.png",
        "selectedIconPath": "static/images/ic_menu_me_pressed.png",
        "text": "我的"
      }
      ]
    },
    _alipay: {
      window: {
        navigationBarTitleText: 'Alipay'
      }
    },
    _swan: {
      window: {
        navigationBarTitleText: 'Baidu'
      }
    }
  }
}