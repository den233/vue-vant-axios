<template>
  <div class="wxbangding">
    <van-nav-bar title="微信绑定">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
    </van-nav-bar>
    <div class="imgs">
      <img :src="imgUrl" alt="">
    </div>
    <div class="button_group">
      <van-button round type="primary" size="small" disabled>绑定</van-button>
      <van-button round type="danger" size="small" disabled>解除绑定</van-button>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script>
  export default {
    data() {
      return {
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545363588299&di=4b5f7c33e63ca746342c273fb579053f&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141109%2F0035035909760939_b.jpg'
      }
    },
    mounted() {

    },

    methods: {
      onClickLeft() {
        this.$router.go(-1);
      }
    }

  };
</script>