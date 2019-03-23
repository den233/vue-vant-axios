import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
    config: {
        navigationBarTitleText: '银行卡添加',
        "usingComponents": {
    
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
};