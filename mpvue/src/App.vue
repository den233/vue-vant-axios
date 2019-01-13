<template>
  <div></div>
</template>
<style>
  @import  "../static/style/iconfont.css";
</style>
<script>
  export default {
    onLaunch() {
      console.log('app onLaunch', this)
      console.log('打印环境变量:', process.env.VUE_APP_TEST)
    },
    globalData() {
      return {
        a: 100
      }
    }
  }
</script>

