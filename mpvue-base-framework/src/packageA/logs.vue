<template>
  <div>
   <van-tag>标签</van-tag>
    <van-tag type="danger">标签</van-tag>
    <van-tag type="primary">标签</van-tag>
    <van-tag type="success">标签</van-tag>
    <van-cell-group>
              <van-field
                :value="username"
                clearable
                label="用户名"
                placeholder="请输入用户名"
               
              />
            
              <van-field
                :value="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                
              />
            </van-cell-group>
  </div>
</template>

<script>
 
import card from '@/components/card'

export default {
  config: {
    navigationBarTitleText: '查看启动日志'
  },

  components: {
    card
  },

  data () {
    return {
      logs: []
    }
  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
     
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
