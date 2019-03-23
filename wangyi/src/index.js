import App from './App'
import Vue from 'vue'
import Vuex from 'vuex'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import MegaloRouterPatch from 'megalo-router-patch'
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
Vue.use(MegaloRouterPatch)
Vue.use(Vuex)
Vue.use(VHtmlPlugin)

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
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#37A19D',
      navigationBarTitleText: '隆力奇商城',
      navigationBarTextStyle: 'white'
    },
    "usingComponents": {
    "van-toast": "/static/vant/toast/index",
    "van-search": "/static/vant/search/index",
    "van-icon": "/static/vant/icon/index",
    "van-cell": "/static/vant/cell/index",
    "van-cell-group": "/static/vant/cell-group/index",
    "van-radio": "/static/vant/radio/index",
    "van-radio-group": "/static/vant/radio-group/index",
    "van-dialog": "/static/vant/dialog/index",
    "van-stepper": "/static/vant/stepper/index",
    "van-tab": "/static/vant/tab/index",
    "van-tabs": "/static/vant/tabs/index",
    "van-nav-bar": "/static/vant/nav-bar/index",
    "van-popup": "/static/vant/popup/index",
    "van-field": "/static/vant/field/index",
    "van-button": "/static/vant/button/index",
    "van-picker": "/static/vant/picker/index",
    "van-checkbox": "/static/vant/checkbox/index",
    "van-checkbox-group": "/static/vant/checkbox-group/index",
    "van-area": "/static/vant/area/index",
    "van-card": "/static/vant/card/index",
    "van-submit-bar": "/static/vant/submit-bar/index",
    "van-address-edit": "/static/vant/address-edit/index",
    "van-tag": "/static/vant/tag/index",
    "van-switch-cell": "/static/vant/switch-cell/index",
    "van-switch": "/static/vant/switch/index",
    "van-steps": "/static/vant/steps/index",
    "van-action-sheet": "/static/vant/action-sheet/index",
    "van-datetime-picker": "/static/vant/datetime-picker/index",
    "i-page": "/static/iview/page/index",
    "i-load-more": "/static/iview/load-more/index",
    "i-tabs": "/static/iview/tabs/index",
    "i-tab": "/static/iview/tab/index",
    "ff-canvas": "/static/f2-canvas/f2-canvas"
  }, 
  "pages": [
    "pages/login/index",
    "pages/home/index",
    "pages/shop/index" ,
     "pages/cart/index" ,
     "pages/mine/index" 
  ] ,
    subPackages: [
			{
					root: 'minepage',
					pages: [
						'pages/bankcardbinding/index',
						'pages/bankcardadd/index',
						"pages/transfer/index",
						"pages/tixian/index",
						"pages/wxcharge/index",
						"pages/myteam/index",
						"pages/wxbinding/index",
						"pages/basicinfo/index",
						"pages/changepassword/index"
					]
			},
			{
				root: 'mingxi',
				pages: [
					"pages/accountdetails/index",
					"pages/bonusdetails/index",
					"pages/cashdetails/index",
					"pages/coindetails/index",
					"pages/pvdetails/index",
					"pages/tixianrecord/index",
					"pages/transferdetails/index"
				]
			},
			 {
			 		root: 'order',
			 		pages: [
			 			"pages/activeorder/index",
			 			"pages/logistics/index",
			 			"pages/myorder/index",
						"pages/repeatorder/index",
						"pages/upgrageorder/index"
			 		]
			 },
			{
					root: 'other',
					pages: [
						"pages/messagedetails/index",
						"pages/messagelist/index",
						"pages/search/index"
					]
			}
       
    ],
   
    "tabBar": {
      "backgroundColor": "#fafafa",
      "borderStyle": "white",
      "selectedColor": "#37A19D",
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
        "pagePath": "pages/cart/index",
        "iconPath": "static/images/ic_menu_shoping_nor.png",
        "selectedIconPath": "static/images/ic_menu_shoping_pressed.png",
        "text": "购物车"
      },
      {
        "pagePath": "pages/mine/index",
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