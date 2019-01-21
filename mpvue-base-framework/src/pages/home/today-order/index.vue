<template>
  <div class="todayOrder">
     
    <h6 class="title"> <i class="iconfont1 icon-hot"></i>  <div class='hot'  > 热门推荐</div><div class="a_link" @click='filter' ><van-icon class="fa fa-filter"   name="arrow-down" /> {{orderName}}</div> </h6>
    <OrderHome :data="serviceList" :currentOrderType="currentOrderType" ></OrderHome>
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
          <van-cell v-for='(item,index) in orderType' :key='index' :title="item.name" clickable @click="radioType($event,index,item.type)">
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
import Dialog from 'staticA/vant/dialog/dialog';
export default {
  components: {
    OrderHome
  },
  data () {
    return {
      serviceList: [],
      show:false,
      radio:0,
      orderName:this.$PLATFORM_CONFIG[0].name,
      orderType:this.$PLATFORM_CONFIG,
      currentOrderType:this.$PLATFORM_CONFIG[0].type,
      radioIndex:0
    };
  },
  mounted(){
    //console.log(this.orderType)
    this.catEvent("");
  },
  methods:{
    filter(index){
  
      this.show=true
    },
    async getGoodsList(id){
        let _this=this;
        _this.serviceList=[];
        _this.hasData=false;
        let querydata={};
          querydata=  {
          productName:'',
          category:id,
          _currPageNo:1,
          _pageSize:20,
          orderType:_this.currentOrderType,
          }; 
          
          return await _this.$api.apiConfig.productSale(
               querydata
            ) 
      },
      async categoryHandle(id){
         let _this=this;
         let v1= await  _this.getGoodsList(id);
           v1=v1.productsale_list_response;
         var arr = Object.getOwnPropertyNames(v1);
         if(arr.length==0){
           this.hasData=true
           return false;
         }
         if(v1.content.length==0){
           this.hasData=true
           return false;
         }
        _this.serviceList=v1.content.map(v=>{
          return {
            id: v.id,
            imgUrl: v.imgUrl,
            price: v.price,
            productName: v.productName,
            productNo: v.productNo,
            pv: v.pv,
            number:1
          }
        });
        _this.current_id=id;
       console.log( _this.serviceList)
      },
      catEvent(id){
        let _this=this;
         _this.categoryHandle(id)
      }
    ,radioType(e,index,type){
      this.radio=index;
    },
    confirm({mp}){
      this.orderName=this.orderType[this.radio].name;
      this.show=false
      this.catEvent("");
      this.currentOrderType=this.orderType[ this.radio].type;
    },
    onClose(){
      this.show=false
    }
  }
};
</script>
<style lang="scss" scoped src="./style.scss"></style>
