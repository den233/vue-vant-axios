<template>
  <div class="todayOrder">
     
    <h6 class="title"> <i class="iconfont1 icon-hot"></i>  <div class='hot'  > 热门推荐</div> <i @click='filter' class="fa fa-filter">{{orderName}}</i> </h6>
    <OrderHome :data="serviceList.list" ></OrderHome>
    <van-dialog
      v-model="show"
      :show-cancel-button='true'
      show-confirm-button
      @confirm='confirm'
      @cancel='cancel'
    >
    <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell v-for='(item,index) in orderType' :key='index' :title="item.name" clickable @click="radioType(index,item.type)">
            <van-radio :name="index" />
          </van-cell>
          
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
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
      serviceList: datasList,
      show:false,
      radio:this.$store.getters.active,
      orderName:PLATFORM_CONFIG.orderType[this.$store.getters.active].name,
      orderType:PLATFORM_CONFIG.orderType,
      radioIndex:this.$store.getters.active
    };
  },
  methods:{
    filter(index){
      this.show=true
    }
    ,radioType(index,type){
      this.radioIndex=index;
      console.log(index)
    },
    confirm(type){
      console.log(this.radioIndex)
      this.orderName=this.orderType[this.radioIndex].name;
      this.radio=this.radioIndex;
      return false;
    },
    cancel(){

    }
  }
};
</script>
<style lang="scss" scoped src="./style.scss"></style>
