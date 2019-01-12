<template>
  <div class="security">
    <van-nav-bar :title="title">
      <van-icon name="search" slot="right" @click='onSearch' />
      <div class="search" @click='pickType' slot="left">
        <i class="fa fa-filter">筛选</i>
      </div>
    </van-nav-bar>
    <div class="van-tabs van-tabs--line">
      <van-tabs :active="active" @click='tabClick'>
        <van-tab v-for='(item,index) in orderType' :key='index' :title="item.name"></van-tab>
      </van-tabs>
      <div class="van-tabs__content">

        <div class="content">

          <div class="catlog">
              <scroll-view
              class="scroll-view"
              scroll-y
            > 
            <CategoryItem @useBusEvent="catEvent"></CategoryItem>
            </scroll-view>
            <!-- <vue-scroll ref="vs" :ops="ops">
               <CategoryItem @useBusEvent="catEvent"></CategoryItem>
            </vue-scroll> -->
          </div>

          <div class="list">
              <scroll-view
              class="scroll-view"
              scroll-y
            > 
              <OrderListItem :currentOrderType="currentOrderType" :data="serviceList"></OrderListItem>
              <img class="nodata" :src="imgUrl" alt="" v-if='hasData'>
            </scroll-view>

          </div>


        </div>
      
        <i-page :current="currentPage" :total="pagecon.total" @change="chagePage">
            <div slot="prev">上一页</div>
            <div slot="next">下一页</div>
        </i-page>
     
      </div>
    </div>
    <van-popup :show="show" position="bottom" :overlay="true">
      <div class="buttons">
        <button @click='reset' class="btn btn-reset"  >重置</button>
        <button @click='confirmSearch' class="btn btn-confirm"  >确定</button>
        <div class="clear"></div>
      </div>
      <div class="search">
        <div class="item">
             
          <van-cell-group>
              <van-field  @change='changeName' label="产品名" :value="pName" placeholder="请输入产品名" />
              <van-field
                type="number"
                 :value="searchList.minPrice"
                 @change='changePriceMin'
                label="价格区间"
                placeholder="最小价格"
               
              />
              <van-field
               type="number"
                :value="searchList.maxPrice"
                label=" -"
                placeholder="最大价格"
                @change='changePriceMax'
              />
            </van-cell-group>
            <van-cell-group>
                
                <van-field
                  type="number"
                  :value="searchList.minPv"
                  label="积分区间"
                  placeholder="最小pv"
                  @change='changePvMin'
                />
                <van-field
                 type="number"
                  :value="searchList.maxPv"
                  label=" -"
                  placeholder="最大pv"
                  @change='changePvMax'
                />
              </van-cell-group>
        </div>
        
      </div>
 
    </van-popup>

  </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script>
    import OrderListItem from './order-list-item';
   import CategoryItem from './category';

  import bus from '@/components/bus';
  import {deleteKey} from '@/utils/tools.js'
 
export default {
    components: {
      OrderListItem,
      CategoryItem
    },
    data () {
      return {
        catArr:[],//分类
        //分页
        pagecon:{
          total:0,
          page_size:10
        },
        currentPage:1,
        show:false,
        showboard:false,
        hasData:false,
        active:'0',
        orderType:this.$PLATFORM_CONFIG,
        currentOrderType:this.$PLATFORM_CONFIG[0].type,
        title:'商城',
        serviceList: [],
        current_id:'',
        imgUrl:require('@/assets/images/timg.jpg'),
        
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
       _this.catEvent("")
    //  // _this.getCategory()
      bus.$on('useBusEvent',function(id){
           _this.catEvent(id)
         })
         
    },
    methods:{
      getCategory(){
         let _this=this;
         let questParam={};
          this.$api.apiConfig.categoryList(
            questParam
            ).then(res=>{
               _this.catArr=res.productsale_category_query_response;
               _this.catArr.unshift({
                categoryId: "",
                categoryName: "全部商品"
               })
            }).catch(error=>{

            })
      },
      async getGoodsList(id){
        let _this=this;
        let {minPrice,maxPrice,minPv,maxPv}= _this.searchList;
        console.log(_this.searchList)
        _this.serviceList=[];
        _this.hasData=false;
        let querydata={};
          querydata=  {
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
          
          querydata=deleteKey(_this.searchList, JSON.stringify(querydata));
       
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
         _this.pagecon.total=v1.total;
      },
       catEvent(id){
        let _this=this;
        _this.pagecon.total=0;
         _this.currentPage=1;
         _this.categoryHandle(id)
      },
      //分页
        chagePage({ detail }){
          const type = detail.type;
     
          if (type === 'next') {
             this.currentPage=this.currentPage + 1;
          } else if (type === 'prev') {
            this.currentPage=this.currentPage - 1;
          }
      
          let _this=this;
          let id=_this.current_id;
          _this.categoryHandle(id);
      },
      //切换订单类型
      tabClick(index){
        let _this=this;
        console.log(index)
        _this.currentOrderType=_this.orderType[_this.active].type;
        _this.pagecon={
          total:0,
          page_size:10
        }
        let id=_this.current_id;
        _this.currentPage=1;
        _this.categoryHandle(id)
       // _this.$store.commit('changeTab',{type:_this.currentOrderType,index,index});
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
        let _this=this;
        _this.pName= '';
         _this.searchList= {
             minPrice:'',
             maxPrice:'',
             minPv:'',
             maxPv:''
          }
      },
      changeName({detail}){
        this.pName=detail
      },
      changePriceMin({detail}){
        this.searchList.minPrice=detail
      },
      changePriceMaxn({detail}){
        this.searchList.maxPrice=detail
      },
      changePvMin({detail}){
        this.searchList.minPv=detail
      },
      changePvMax({detail}){
        this.searchList.maxPv=detail
      },
      onDelete() {
        this.searchList[this.priceType]=this.searchList[this.priceType].substr(0, this.searchList[this.priceType].length-1);
      }
    }
  };
  </script>