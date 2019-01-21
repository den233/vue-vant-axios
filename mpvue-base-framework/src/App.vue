<script>
export default {
  globalConfig: {
    usingComponents: {
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
      "i-page": "/static/iview/page/index",
      "i-load-more": "/static/iview/load-more/index",
      "ff-canvas": "/static/f2-canvas/f2-canvas"
    }
  },
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
 
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
