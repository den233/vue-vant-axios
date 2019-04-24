<template>
  <div class="banner">
    <swiper :style="{height:banner_height}" class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
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
  onLoad: function () {
        console.log('onLoad')
        
      },
  data () {
    return {
      imagesList: [
      ],
      banner_height:'230px'
    };
  },
  mounted(){
    var that = this
        // 获取系统信息
        wx.getSystemInfo({
          success: function (res) {
            console.log(res);
            // 可使用窗口宽度、高度
            console.log('height=' + res.windowHeight);
            console.log('width=' + res.windowWidth);
            // 计算主体部分高度,单位为px
            
              // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
             // that.banner_height= res.windowWidth+'px'
            
          }
        })
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

