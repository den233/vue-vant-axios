<template>
  <div class="todayOrder">
     
    <h6 class="title"> <i class="iconfont1 icon-hot"></i>  <div class='hot'  ><EcIps/></div>  </h6>
    <OrderHome :data="serviceList.list"></OrderHome>
  </div>
</template>
<script>
import datasList from './datas.js';
import OrderHome from '@/views/components/order-home';
export default {
  components: {
    OrderHome
  },
  data () {
    return {
      serviceList: datasList
    };
  }
};
</script>
<style lang="scss" scoped src="./style.scss"></style>
