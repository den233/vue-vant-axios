<template>
  <div class="listSearch">
    <div class="searchBox">
        <van-icon @click="goBack" name="arrow-left" />
        <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <van-tabs v-model="active">
        <van-tab title="激活单">
           <div v-for="(item,index) in dataActive" :key="index" class="list">
              <div class="imgs">
                 <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3557408242,3181023389&fm=26&gp=0.jpg" alt="">
              </div>
              <div class="content">
                  <div class="title">{{item.name}}</div>
                  <div class="price">¥{{item.price}}</div>
                  <div class="pv">{{item.pv}}</div>
              </div>
              <van-stepper
                v-model="item.number"
                integer
                :min="1"
                :max="40"
                :step="1"
              />
              <van-button class="addcart" @click='addCart(index,active)' size="small" round type="danger">加入购物车</van-button>
           </div>
           
        </van-tab>
        <van-tab title="重消单">内容 2</van-tab>
        <van-tab title="升级单">内容 3</van-tab>
      </van-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchValue: '',
      active:'0',
      dataActive:[],//激活单
      dataRepeat:[],//重消单
      dataActive:[],//升级单
    };
  },
  methods: {
    goBack () {
      this.$router.go(-1);
    },
    onSearch(){
      let _this=this;
      this.$http.post(
            '/api/goods',{category_id:'',currentpage_num:1,perpage:20,name:_this.searchValue}
            ).then(data=>{
              _this.dataActive=data.data.map(v=>{
                return {
                  category_id: v.category_id,
                  created_at:v.created_at,
                  id: v.id,
                  name: v.name,
                  number: v.number,
                  price: v.price,
                  pv: v.pv,
                  updated_at: v.updated_at
                }
              })
            }).catch(res=>{

            })
    },
    addCart(index,activeTab){
      let _this=this;
      let number=_this.dataActive[index].number;
      let id=_this.dataActive[index].id;
        this.$http.post(
            '/api/addcart',{id:id,number:number,category_id:''}
          ).then(data=>{
            Toast.success('成功');

          }).catch(err=>{
            Toast.fail('失败');
          });
          
    }
  }
};
</script>
<style lang="scss" scoped src="./style.scss"></style>
