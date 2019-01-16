import App from './index'
import Vue from 'vue'

const app = new Vue( App )

app.$mount()
export default {
    "usingComponents": {
      "van-nav-bar": "/static/vant/nav-bar/index"
    },
    config: {
      "enablePullDownRefresh": true,
    }
  };
  
