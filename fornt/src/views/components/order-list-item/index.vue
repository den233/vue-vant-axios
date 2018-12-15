<template>
  <ul class="lists">
    <li class="lists-item" v-for="(item,index) in data" :key="index">
      <router-link :to="{path:'/service/details'}" tag="div" style="display:flex">
        <div class="imgs">
          <img :src="item.imgSrc || 'https://via.placeholder.com/170x170'" alt="">
        </div>
        <div class="info">
          <h6 class="label">{{item.name}}</h6>
          <p class="desc">pv：{{item.pv}}</p>
          <p class="price">￥
            <span class="total">{{item.price}}</span>
          </p>    
        </div>
      </router-link>
        <van-stepper   
        integer
        :min="1"
        :step="1"
      />
      <van-button class="add_cart" size="small" type="danger">加入购物车</van-button>
    </li>
  </ul>
</template>
<script>
  import bus from '@/components/bus';
export default {
  props: {
    data: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data() {
    return  {
      currentPage: 1
    }
  },
  mounted(){
      this.getBus()
    },
    methods:{
       getBus(){
         let self =this;
         bus.$on('useBusEvent',function(msg){
          // console.log(msg)
         })
       }
    }
};
</script>
<style lang="scss" scoped src="./style.scss"></style>
