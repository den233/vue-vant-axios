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
                         <OrderListItem  :data="serviceList"></OrderListItem>
                        </vue-scroll>
                      
                    </div>
                  
                </div>
                <van-pagination 
                v-model="currentPage" 
                :total-items=pagecon.total
                :show-page-size=pagecon.page_size
                force-ellipses
                @change='chagePage'
              />
          </div>
      </div>
      <van-popup v-model="show" position="bottom" :overlay="true">
        <div class="buttons">
            <button class="btn btn-reset"  v-fb="{cls:'buttonActive'}">重置</button>
            <button class="btn btn-confirm"  v-fb="{cls:'buttonActive'}">确定</button>
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
  import bus from '@/components/bus'
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
        active:this.$store.getters.active,
        orderType:PLATFORM_CONFIG.orderType,
        currentOrderType:this.$store.getters.currentOrderType,
        title:'商城',
        serviceList: [],
        current_id:'',
        ops: {
            bar: {
               background:'#eee'
            },
            rail: {
             
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
        console.log(this.$store.getters.currentOrderType)
    },
    methods:{
      async getCategory(id){
        let _this=this;
        return await this.$http.post(
            '/api/goods',{category_id:id,currentpage_num:_this.currentPage,perpage:_this.pagecon.page_size}
            ) 
      },
      
      async catEvent(id){
        let _this=this;
		    _this.currentPage=1;
        let v1= await  _this.getCategory(id);
        _this.serviceList=v1.data;
        _this.current_id=id;
        _this.pagecon={
          total:v1.total,
          page_size:10
        }
      },
      //分页
      async  chagePage(val){
          this.currentPage=val;
          let _this=this;
          let v1= await  _this.getCategory(_this.current_id);
          _this.serviceList=v1.data;
          _this.pagecon={
            total:v1.total,
            page_size:10
          }
      },
      tabClick(index){
        this.currentOrderType=this.orderType[index].type;
        this.$store.commit('changeTab',{type:this.currentOrderType,index,index});
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
      onDelete() {
        this.searchList[this.priceType]=this.searchList[this.priceType].substr(0, this.searchList[this.priceType].length-1);
      }
    }
  };
  </script>

  