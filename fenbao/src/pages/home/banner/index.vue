<template>
  <div class="banner">
    <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
      <block v-for="(item, index) in imagesList " :key="index">
        <swiper-item class="swiper-item">
          <image :src="item.image" style="" class="slide-image" />
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imagesList: [
        {
          image: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/7176/31/12296/75565/5c345921Ec4df6c8a/5fe43848f7d9eef4.jpg!cr_1125x549_0_72!q70.jpg.dpg',
          name: 'logo'
        },
        {
          image: '//img.alicdn.com/imgextra/i4/897941969/O1CN011SEfCZ1QPqLQcoWfx_!!0-item_pic.jpg_760x760Q50s50.jpg_.webp',
          name: 'logo'
        },
        {
          image: '//img.alicdn.com/imgextra/i3/897941969/TB2ewm4r8jTBKNjSZFuXXb0HFXa_!!897941969.jpg_760x760Q50s50.jpg_.webp',
          name: 'logo'
        }
      ]
    };
  }
};
</script>
<style lang="scss"  scoped >
  @import './style.scss';
</style>

