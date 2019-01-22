import Model from './Model'
import Vue from 'vue'

const app = new Vue( Model )

app.$mount()

export default {
  config: {
    usingComponents: {

    },
    _wechat: {
      usingComponents: {
        textarea: '../../native/textarea/index'
      }
    }
  }
}
