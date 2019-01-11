import App from './index'
import Vue from 'vue'

const app = new Vue( App )

app.$mount()
export default {
    config: {
      "usingComponents": {
        "van-search": "/static/vant/search/index",
        "van-icon": "/static/vant/icon/index",
        "van-cell": "/static/vant/cell/index",
         "van-cell-group": "/static/vant/cell-group/index",
         "van-radio": "/static/vant/radio/index",
         "van-radio-group": "/static/vant/radio-group/index",
         'van-dialog': '/static/vant/dialog/index',
         "van-stepper": "/static/vant/stepper/index"
      }
    },
  };
  
