import App from './App'
import Vue from 'vue'
import Vuex from 'vuex'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import MegaloRouterPatch from 'megalo-router-patch'
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: require('./assets/images/err.png'),
//   loading: require('./assets/images/ld1.gif'),
//   attempt: 5,
//   listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
// });
Vue.use(vuescroll);
Vue.use(MegaloRouterPatch)
Vue.use(Vuex)
Vue.use(VHtmlPlugin)

const store = require('./store').default
Vue.prototype.$store = store
App.mpType = 'app'
let orderType = [
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
Vue.prototype.$orderType = orderType;
const app = new Vue( App )

app.$mount()

export default {
  config: {
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    pages: [
      'pages/index/index',
      'pages/todomvc/index',
      'pages/v-model/index',
      'pages/v-html/index',
      'pages/vuex/index',
      'pages/native/index',
      'pages/webview/index',
      'pages/img/index'
    ],
    subPackages: [
      {
          root: 'packageA',
          pages: [
            'pages/a/index',
            'pages/todomvc/index',
          ]
      },
      {
        root: 'packageB',
        pages: [
          'pages/home/index',
        ]
      }
       
    ],
   
    tabBar: {
      list: [
        {
        pagePath: 'pages/index/index',
        text: '首页'
        },
        {
        pagePath: 'pages/todomvc/index',
        text: 'todo'
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