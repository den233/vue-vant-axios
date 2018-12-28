<template>
  <ul class="ec-ips">
    <li class="ec-ips-item jing">热</li>
    <li class="ec-ips-item xin">门</li>
    <li class="ec-ips-item jian">推</li>
    <li class="ec-ips-item hui">荐</li>
     <div class="clear"></div>
  </ul>
</template>
<style lang="scss" scoped>
$ips--size: 0.48rem /* 18/37.5 */;
.ec-ips {
  .clear{
    clear: both;
  }
  &-item {
    float: left;
    height: $ips--size;
    line-height: $ips--size;
    text-align: center;
    width: $ips--size;
    border-radius: 0.106667rem /* 4/37.5 */;
    background: #ccc;
    color: #fff;
    font-size: 0.266667rem /* 10/37.5 */;
    margin-right: 0.106667rem /* 4/37.5 */;
    &.jing {
      background: #fecc66;
    }
    &.xin {
      background: #fe6262;
    }
    &.jian {
      background: #8ecd4a;
    }
    &.hui {
      background: #269fef;
    }
  }
}
</style>
