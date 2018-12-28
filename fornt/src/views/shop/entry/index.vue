<template>
    <div class="security">
        <van-nav-bar :title="title" >
            <van-icon name="search" slot="right" @click='onSearch' />
            <div class="search" @click='pickType' slot="left">
                <i class="fa fa-filter">筛选</i>
              </div>
          </van-nav-bar>
      <div class="van-tabs van-tabs--line" >
          <van-tabs v-model="active">
              <van-tab title="激活单"></van-tab>
              <van-tab title="重消单"></van-tab>
              <van-tab title="升级单"></van-tab>
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
           <div class="item">
              <div class="title">价格区间(元)</div>
              <input @click="inputFun" class='price'  type="text"> - <input @click="inputFun" class='price' type="text">
           </div>
           <div class="item">
              <div class="title">pv区间(元)</div>
              <input  @click="inputFun" class='price'  type="text"> - <input @click="inputFun" class='price' type="text">
           </div>
        </div>   
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
        active:'0',
        pagecon:{
          total:0,
          page_size:10
        },
        currentPage:1,
        show:false,
        orderType:{
          name:'激活单',
          id:0
        },
        columns:['会员激活','重消单','升级单'],
        title:'会员激活',
        subnavList: [
          {
            label: '定点巡逻',
            id: 1
          },
          {
            label: '定岗保安',
            id: 2
          },
          {
            label: '门卫服务',
            id: 3
          },
          {
            label: '形象站岗',
            id: 4
          },
          {
            label: '高端保安',
            id: 5
          },
          {
            label: '私人保镖',
            id: 5
          }
        ],
       
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
          }
      };
    },
    mounted(){
      
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
      inputFun(){
        console.log(1)
      }
    }
  };
  </script>

  