<template>
  <div class="todayOrder">
     
    <h6 class="title"> <i class="iconfont1 icon-hot"></i>  <div class='hot'  > 热门推荐</div><div class="a_link" @click='filter' ><van-icon class="fa fa-filter"   name="arrow-down" /> {{orderName}}</div> </h6>
    <OrderHome :data="serviceList.list" ></OrderHome>
    <van-dialog
       use-slot
       :show="show"
       show-cancel-button
      show-confirm-button
      @confirm='confirm'
      @close="onClose"
    >
    
    <van-radio-group :value='radio'>
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
import OrderHome from '@/components/order-home';
import Dialog from '@/static/vant/dialog/dialog';
export default {
  components: {
    OrderHome
  },
  data () {
    return {
      serviceList: datasList,
      show:false,
      radio:0,
      orderName:this.$PLATFORM_CONFIG[0].name,
      orderType:this.$PLATFORM_CONFIG,
      radioIndex:0
    };
  },
  mounted(){
    //console.log(this.orderType)
  },
  methods:{
    filter(index){
  
      this.show=true
    }
    ,radioType(index,type){
      this.radio=index;
      this.radioIndex=index;
      console.log(this.radio)
    },
    confirm(type){
      console.log(this.radioIndex)
      this.orderName=this.orderType[this.radioIndex].name;
      this.show=false
      return false;
    },
    onClose(){
      this.show=false
    }
  }
};
</script>
<style lang="scss" scoped src="./style.scss"></style>
