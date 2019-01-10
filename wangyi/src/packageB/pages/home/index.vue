<template>
    <div class="entry">
      <div class="searchWrapper">
     
        <div class="inputbox">
          <van-search v-model="searchValue" @focus="focus" placeholder="搜索您需要的服务" background=""></van-search>
        </div>
      </div>
      <!-- <view>
        <web-view src="http://localhost:8085/#/login/index">aaaa</web-view>
    </view> -->
       <TheBanner></TheBanner>
       <Subnav></Subnav>
       <NoticeCard></NoticeCard>
       <!-- <Subnav></Subnav>
       <NoticeCard></NoticeCard>
       <TheTodayOrder></TheTodayOrder> -->
    </div>
  </template>
  <script>
   import TheBanner from './banner';
   import Subnav from './subnav';
  //   import TheTodayOrder from './today-order';
    import NoticeCard from './notice';
  export default {
    components: {
       TheBanner,
        Subnav,
          NoticeCard,
        //  TheTodayOrder
      
    },
    data () {
      return {
        address: '财富港大夏D座财富港大夏D座',
        searchValue: '',
         
      };
    },
    created: function() {
    },
     destroyed(){
   
     },
    methods: {
      focus () {
        this.$router.push({path: '/service/list-search'});
      }
    }
  };
  </script>
  <style lang="scss" src="./style.scss">
     
  </style>
  