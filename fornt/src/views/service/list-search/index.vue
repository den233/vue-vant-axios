<template>
  <div class="listSearch">
    <div class="searchBox">
      <van-icon @click="goBack" name="arrow-left" />
      <van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <van-tabs v-model="active"  @click='tabClick'>
      <van-tab v-for="(item,index) in orderType" :title="item.name" :key="index">
      </van-tab>
    </van-tabs>
    <vue-scroll ref="vs" :ops="ops"  @handle-scroll="handleScroll">
      <div class="tabs">
        <div v-for="(item,index) in dataActive" :key="index" class="list">
          <div class="imgs">
            <img  v-lazy="item.img" alt="">
          </div>
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="price">¥{{item.price}}</div>
            <div class="pv">{{item.pv}}</div>
          </div>
          <van-stepper v-model="item.number" integer :min="1" :max="40" :step="1" />
          <i @click='addCart(index,active)' class="cart_icon van-icon van-icon-shopping-cart-o"></i>
          <!-- <van-button class="addcart" @click='addCart(index,active)' size="small" round type="danger">加入购物车</van-button> -->
        </div>
      </div>
     
    </vue-scroll>
    <van-pagination 
    v-model="currentPage" 
    :total-items=pagecon.total
    :show-page-size=pagecon.page_size
    force-ellipses
    @change='chagePage'
  />
  </div>
</template>
<script>

  export default {
    data() {
      return {
        searchValue: '',
        active:this.$store.getters.active,
        orderType:PLATFORM_CONFIG.orderType,
        currentOrderType:this.$store.getters.currentOrderType,
        pagecon:{
          total:0,
          page_size:10
        },
        currentPage:1,
        ops: {
          bar: {
            background: '#eee'
          },
          rail: {

          },
          scrollButton: {
            enable: false,

          }
        },
        dataActive: [],//激活单
        dataRepeat: [],//重消单
        dataActive: [],//升级单
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      onSearch(){
        this.pagecon={
            total:0,
            page_size:10
          }
          this.currentPage=1;
          this.initData()
      },
      initData() {
        let _this = this;
        this.$http.post(
          '/api/goods', { category_id: '',currentpage_num:_this.currentPage,perpage:_this.pagecon.page_size, name: _this.searchValue }
        ).then(data => {
          _this.pagecon={
            total:data.total,
            page_size:10
          }
          _this.dataActive = data.data.map(v => {
            return {
              category_id: v.category_id,
              created_at: v.created_at,
              id: v.id,
              name: v.name,
              number: v.number,
              price: v.price,
              pv: v.pv,
              updated_at: v.updated_at,
              img:require('@/assets/images/1.png')+'?t='+Math.random()
            }
          })
         
        }).catch(res => {

        })
      },
      tabClick(index){
            this.currentOrderType=this.orderType[index].type;
            this.$store.commit('changeTab',{type:this.currentOrderType,index,index});
        },
      //分页
       chagePage(val){
          this.currentPage=val;
          this.initData();
      },
      addCart(index, activeTab) {
        let _this = this;
        let number = _this.dataActive[index].number;
        let id = _this.dataActive[index].id;
        this.$http.post(
          '/api/addcart', { id: id, number: number, category_id: '' }
        ).then(data => {
          _this.Toast.success('成功');

        }).catch(err => {
          _this.Toast.fail('失败');
        });

      },
      handleScroll(){
        //console.log(1125)
      }
    }
  };
</script>
<style lang="scss" scoped src="./style.scss"></style>