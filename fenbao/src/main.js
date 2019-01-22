import App from './App'
import Vue from 'vue'
import Vuex from 'vuex'
 
 
import fly from '@/utils/http'

import api from './api/index.js';
import MpvueRouterPatch from 'mpvue-router-patch'
Vue.use(MpvueRouterPatch)
Vue.use(api);
Vue.prototype.$fly = fly;
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
//  const store = require('./store').default
//  Vue.prototype.$store = store
 
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
Vue.prototype.$img = '';
const app = new Vue({
  mpType: 'app',
  ...App
})
app.$mount()
