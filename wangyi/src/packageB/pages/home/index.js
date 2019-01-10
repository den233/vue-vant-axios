import App from './index'
import Vue from 'vue'

const app = new Vue( App )

app.$mount()
export default {
    config: {
      "usingComponents": {
        "van-search": "/static/vant/search/index",
        "van-icon": "/static/vant/icon/index"
      }
    },
  };
  
