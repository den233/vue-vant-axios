<template>
  <div class="banner">
    <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
      <block v-for="(item, index) in imagesList " :key="index">
        <swiper-item class="swiper-item">
          <image :src="item.imager_url" style="" class="slide-image" />
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
      ]
    };
  },
  mounted(){
      this.get_pics()
  },
  methods:{
    get_pics(){
      let _this=this;
      this.$api.apiConfig.getBanner({}).then(data=>{
        _this.imagesList=data.images;
      })
    }
  }
};
</script>
<style lang="scss"  scoped >
  @import './style.scss';
</style>

