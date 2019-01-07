<template>
    <div class="security">
        <van-nav-bar :title="title" >
            <van-icon name="search" slot="right" @click='onSearch' />
            <div class="search" @click='pickType' slot="left">
                <i class="fa fa-filter">筛选</i>
              </div>
          </van-nav-bar>
      <div class="van-tabs van-tabs--line" >
          <van-tabs v-model="active" @click='tabClick'>
              <van-tab v-for='(item,index) in orderType' :key='index' :title="item.name"></van-tab>
            </van-tabs>
          <div class="van-tabs__content">
           
                <div class="content">
                  
                    <div class="catlog">
                        <vue-scroll
                        ref="vs" :ops="ops"
                        >
                          <CategoryItem @useBusEvent="catEvent"></CategoryItem>
                        </vue-scroll>  
                    </div>
                  
                    <div class="list">
                        <vue-scroll   
                        ref="vs" :ops="ops"
                        >
                         <OrderListItem :currentOrderType="currentOrderType"  :data="serviceList"></OrderListItem>
                         <img class="nodata" :src="imgUrl" alt="" v-if='hasData'>
                        </vue-scroll>
                      
                    </div>
                    
                  
                </div>
              
                <van-pagination 
                v-model="currentPage" 
                :total-items=pagecon.total
                :show-page-size='5'
                force-ellipses
                @change='chagePage'
              />
          </div>
      </div>
      <van-popup v-model="show" position="bottom" :overlay="true">
        <div class="buttons">
            <button @click='reset' class="btn btn-reset"  v-fb="{cls:'buttonActive'}">重置</button>
            <button @click='confirmSearch' class="btn btn-confirm"  v-fb="{cls:'buttonActive'}">确定</button>
            <div class="clear"></div>
        </div>
        <div class="search">
            <van-cell-group>
                <van-field v-model="pName" placeholder="请输入产品名" />
              </van-cell-group>
           <div class="item">
              <div class="title">价格区间(元)</div>
              <input  readonly v-model='searchList.minPrice'  @click="inputFun('minPrice')" class='price'  type="text"> - <input readonly v-model='searchList.maxPrice'   @click="inputFun('maxPrice')" class='price' type="text">
           </div>
           <div class="item">
              <div class="title">pv区间(元)</div>
              <input readonly v-model='searchList.minPv'   @click="inputFun('minPv')" class='price'  type="text"> - <input readonly v-model='searchList.maxPv'   @click="inputFun('maxPv')" class='price' type="text">
           </div>
        </div>   
        <van-number-keyboard
          :show="showboard"
          extra-key="."
          close-button-text="完成"
          @blur="showboard = false"
          @input="onInput"
          @delete="onDelete"
          :hide-on-click-outside='true'
      />
      </van-popup>  
     
    </div>
  </template>
  <style lang="scss"   src="./style.scss"></style>
  <script>
  import OrderListItem from '@/views/components/order-list-item';
  import CategoryItem from '../category';
  import $http from '@/utils/http.js';
  import bus from '@/components/bus';
  import tools from '@/utils/tools.js'
  export default {
    components: {
      OrderListItem,CategoryItem
    },
    data () {
      return {
        
        pagecon:{
          total:0,
          page_size:10
        },
        currentPage:1,
        show:false,
        showboard:false,
        hasData:false,
        active:this.$store.getters.active,
        orderType:PLATFORM_CONFIG.orderType,
        currentOrderType:this.$store.getters.currentOrderType,
        title:'商城',
        serviceList: [],
        current_id:'',
        imgUrl:require('@/assets/images/timg.jpg'),
        ops: {
            bar: {
               background:'transparent'
            },
            rail: {
             
            },
            scrollPanel: {
            // 当组件mounted了以后，自动滚动到一个坐标
            initialScrollY: false,
            initialScrollX: false,
            // 是否禁止x或y方向上的滚动
            scrollingX: false,
            scrollingY: true,
            // 滚动的速度。在你点击滚动轨道或者调用scrollTo或者scrollBy的时候
            // 起作用。
            speed: 300,
            // 滚动动画
            easing: undefined,
            // 有时候原声滚动条可能在左侧,
            // 请查看 https://github.com/YvesCoding/vuescroll/issues/64
            verticalNativeBarPos: 'right'
          },
            scrollButton: {
              enable: false,
             
            }
          },
          priceType:'',
          pName:'',
          searchList:{
             minPrice:'',
             maxPrice:'',
             minPv:'',
             maxPv:''
          }
      };
    },
    mounted(){
      let _this=this;
      _this.catEvent('')
      bus.$on('useBusEvent',function(id){
          _this.catEvent(id)
         })
        console.log(this.$store.getters.currentOrderType)
    },
    methods:{
      async getCategory(id){
        let _this=this;
        let {minPrice,maxPrice,minPv,maxPv}= _this.searchList;
        _this.serviceList=[];
        _this.hasData=false;
        _this.productsale_list_response
        let querydata=  {
          strAction:'productsale_list',
          productName:_this.pName,
          category:id,
          _currPageNo:_this.currentPage,
          _pageSize:_this.pagecon.page_size,
          orderType:_this.currentOrderType,
          minPrice:minPrice,
          maxPrice:maxPrice,
          minPv:minPv,
          maxPv:maxPv
          };
          tools.deleteKey(_this.searchList, querydata)
        return await this.$api.apiConfig.productSale(
               querydata
            ) 
      },
     async categoryHandle(id){
         let _this=this;
       
         let v1= await  _this.getCategory(id);
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
        _this.pagecon={
          total:v1.total,
          page_size:10
        }
      },
      async catEvent(id){
        let _this=this;
        _this.pagecon={
          total:0,
          page_size:10
        }
        _this.currentPage=1;
        _this.categoryHandle(id)
      },
      //分页
        chagePage(val){
          this.currentPage=val;
          let _this=this;
          let id=_this.current_id;
          _this.categoryHandle(id);
      },
      //切换订单类型
      tabClick(index){
        let _this=this;
        _this.currentOrderType=_this.orderType[index].type;
        _this.pagecon={
          total:0,
          page_size:10
        }
        let id=_this.current_id;
        _this.currentPage=1;
        _this.categoryHandle(id)
        _this.$store.commit('changeTab',{type:_this.currentOrderType,index,index});
      },
      //筛选
      pickType(){
          this.show=true;
      },
      onChange(picker, value, index){
        this.Toast(`当前值：${value}, 当前索引：${index}`);
        this.title=value;
        this.show=false;
      },
      onSearch(){
        this.$router.push({path: '/service/list-search', query: {orderType:this.orderType}});
      },
      inputFun(type){
        this.showboard=true;
        this.priceType=type;
      },
      
      onInput(value) {
        this.searchList[this.priceType]+=''+value
      },
      confirmSearch(){
        let _this=this;
        let id=_this.current_id;
        
        _this.categoryHandle(id);
        _this.show=false;
      },
      reset(){
        _this.pName= '';
         _this.searchList= {
             minPrice:'',
             maxPrice:'',
             minPv:'',
             maxPv:''
          }
      },
      onDelete() {
        this.searchList[this.priceType]=this.searchList[this.priceType].substr(0, this.searchList[this.priceType].length-1);
      }
    }
  };
  </script>

  