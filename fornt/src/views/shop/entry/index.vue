<template>
    <div class="security">
      <div class="van-tabs van-tabs--line" >
          <div class="van-tabs__content">
              <ul class="sortList">
                  <li class="sortList-item synthesize is-active">
                    <div class="name">综合</div>
                    <div class="search">
                      <i class="fa fa-caret-down"></i>
                    </div>
                  </li>
                  <li class="sortList-item price">
                    <div class="name">价格</div>
                    <div class="search">
                      <i class="fa fa-caret-up"></i>
                      <i class="fa fa-caret-down"></i>
                    </div>
                  </li>
                  <li class="sortList-item address">
                    <div class="name">全国</div>
                    <div class="search">
                      <i class="fa fa-caret-down"></i>
                    </div>
                  </li>
                  <li @click='pickType' class="sortList-item filtrate">
                    <div class="name">筛选</div>
                    <div class="search">
                      <i class="fa fa-filter"></i>
                    </div>
                  </li>
                </ul>
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
        <van-picker :columns="columns" @change="onChange" />  
      </van-popup>
    </div>
  </template>
  <script>
  import Vue from 'vue';
  import { Toast } from 'vant';
  Vue.use(Toast);
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
        columns:['会员激活','重消单','升级单'],
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
        Toast(`当前值：${value}, 当前索引：${index}`);
      }
    }
  };
  </script>
  <style lang="scss" scoped src="./style.scss"></style>
  