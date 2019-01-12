import App from './index'
import Vue from 'vue'
const app = new Vue( App )

app.$mount()

export default {
  config: {
    navigationBarTitleText: '商品中心',
    "usingComponents": {
      "van-search": "/static/vant/search/index",
      "van-icon": "/static/vant/icon/index",
      "van-cell": "/static/vant/cell/index",
       "van-cell-group": "/static/vant/cell-group/index",
       "van-radio": "/static/vant/radio/index",
       "van-radio-group": "/static/vant/radio-group/index",
       'van-dialog': '/static/vant/dialog/index',
       "van-stepper": "/static/vant/stepper/index",
       "van-tab": "/static/vant/tab/index",
       "van-tabs": "/static/vant/tabs/index",
       "van-nav-bar": "/static/vant/nav-bar/index",
       "van-popup": "/static/vant/popup/index",
       "van-field": "/static/vant/field/index",
       "van-button": "/static/vant/button/index",
       "van-toast": "/static/vant/toast/index",
       "i-page": "/static/iview/page/index"
    },
    // 微信小程序配置
    _wechat: {
      // navigationBarBackgroundColor: '#44B549',
      // navigationBarTextStyle: 'white'
    },

    // 支付宝小程序配置
    _alipay: {
     // navigationBarBackgroundColor: '#4D7AF4',
    },

    // 百度小程序配置
    _swan: {
      // navigationBarBackgroundColor: '#38f',
      // navigationBarTextStyle: 'white'
    }
  }
}