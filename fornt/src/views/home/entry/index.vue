<template>
  <div class="entry">
    <div class="searchWrapper">
   
      <div class="inputbox">
        <van-search v-model="searchValue" @focus="focus" placeholder="搜索您需要的服务" background=""></van-search>
      </div>
    </div>
    <TheBanner></TheBanner>
    <Subnav></Subnav>
    <Marquee></Marquee>
    <TheTodayOrder></TheTodayOrder>
  </div>
</template>
<script>
import TheBanner from './banner';
import Subnav from '@/views/components/subnav';
import TheTodayOrder from './today-order';
import Marquee from '@/views/components/marquee/index.vue';
export default {
  components: {
    TheBanner,
    Subnav,
    TheTodayOrder,
    Marquee
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
<style lang="scss" src="./style.scss"></style>
