<template>
  <div class="entry">
    <div class="searchWrapper">

      <div class="inputbox">
        <van-search :value="searchValue" @focus="focus" placeholder="搜索您需要的服务" background=""></van-search>
      </div>
    </div>
    <!-- <view>
        <web-view src="http://localhost:8085/#/login/index">aaaa</web-view>
    </view> -->
     <TheBanner></TheBanner>
    <Subnav></Subnav>
    <NoticeCard></NoticeCard>
    <OrderList></OrderList>
  </div>
</template>
<script>
  import TheBanner from './banner';
  import Subnav from './subnav';
  import NoticeCard from './notice';
  import OrderList from './orderlist'
  import store from '@/store'
  export default {
    components: {
      TheBanner,
      Subnav,
      NoticeCard,
      OrderList

    },
    data() {
      return {
        address: '财富港大夏D座财富港大夏D座',
        searchValue: '',
        serviceList:[],
        current_id:"",
        orderType:this.$PLATFORM_CONFIG,
        currentOrderType:this.$PLATFORM_CONFIG[0].type,
      };
    },
    created: function () {
    },
    mounted(){
      store.commit('changeTab',{type:this.currentOrderType,index:0});
    },
    destroyed() {

    },
    methods: {
      focus() {
        this.$router.push({ path: '/other/pages/search/index' });
      },
     
    }
  };
</script>
<style lang="scss" src="./style.scss">

</style>