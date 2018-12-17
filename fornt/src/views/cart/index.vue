<template>
  <div class="cart">
    <van-nav-bar title="标题"   >
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <router-view />
  </div>
</template>
<script>
  import SlotChild from './slotChild'
  export default {
    name: 'Cart',
  };
</script>