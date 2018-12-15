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
                  <li class="sortList-item filtrate">
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
                :total-items="125" 
                :show-page-size="3" 
                force-ellipses
              />
          </div>
      </div>
    </div>
  </template>
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
        currentPage:1,
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
            '/api/goods',{category_id:id}
            )
      },
      test(){
          let _this = this;
          $http.get('/api/category').then((res)=>{
          _this.leftDatas = res.data;
        },(err)=>{
          console.log(err);
        })
      },
      async catEvent(id){
        let _this=this;
        let v1=_this.catArr= await _this.getCategory(id);
      }
    }
  };
  </script>
  <style lang="scss" scoped src="./style.scss"></style>
  