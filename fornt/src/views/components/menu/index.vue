<template>
  <div class="menu">
    <ul class="list">
      <li class="list-item home">
        <router-link :to="{path:'/home/entry'}" tag="div">
          <i class="icon fa fa-home"></i>
          <p class="label">首页</p>
        </router-link>
      </li>
      <li class="list-item classify">
        <router-link :to="{path:'/shop/entry'}" tag="div">
          <i class="icon fa fa-th-large"></i>
          <p class="label">商城</p>
        </router-link>
      </li>
      <li class="list-item">
        <router-link :to="{path:'/cart/activation'}" tag="div">
          <i class="icon fa fa-cart-plus"></i>
          <p class="label">购物车</p>
        </router-link>
      </li>
      <li class="list-item mine">
        <router-link :to="{path:'/mine/entry'}" tag="div">
          <i class="icon fa fa-user-o"></i>
          <p class="label">我的</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: '1'
    };
  }
};
</script>
<style lang="scss" scoped src="./style.scss"></style>
