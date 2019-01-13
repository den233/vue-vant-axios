<template>
  <div class="lists">
    <div class="lists-item" v-for="(item,index) in data" :key="index">
      <div class='inner'>
        <div class="imgs">
          <img class="imagesLazy" :src="item.imgSrc||imgLazyLoad" alt="">
        </div>
        <div class="info">
          <h6 class="label">{{item.name}}</h6>
          <p class="desc">pv：{{item.pv}}</p>
          <p class="price">￥
            <span class="total">{{item.price}}</span>
          </p>
        </div>

        <van-stepper integer :min="1" :step="1" :value='item.number' @change='changeNum()' />
        <van-icon class="cart_icon" name="shopping-cart-o" @click='addCart(item)' />
        <!-- <van-button class="add_cart" size="small" type="danger"  @click='addCart(item.id,item.number)'>加入购物车</van-button> -->
      </div>
    </div>
    
  </div>
</template>
<script>

 
  import bus from '../bus';
  export default {
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        goods:{
          id: 1018706,
          imgUrl: "/upload/files/20161215031806.jpg",
          price: "330",
          productName: "保和堂120片荃爱食用菌制品",
          productNo: "daab040a",
          pv: "40"
        },
        orderType:this.$PLATFORM_CONFIG,
        category_id: 1,
        imgLazyLoad:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545648228300&di=bb84061edfb4e3b3d1379fc2eddde08a&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Forj360%2F727b474aly1fuypmvz7rzj20qo0qogms.jpg'
      }
    },
    mounted() {
      this.getBus()
    },
    methods: {
      getBus() {
        let self = this;
        bus.$on('useBusEvent', function (msg) {
          self.category_id = msg;
        })
      },
      addCart(item) {
     
        console.log(item)
        let _this = this;
        this.$http.post(
          '/api/addcart', { id: '1', number: item.number, category_id:'' }
        ).then(data => {
          

        }).catch(err => {
        
        });

      },
      radioType(type){
        console.log(type)
      },
      beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      confirm(){
       // return false;
      },
      cancel(){

      },
      changeNum(val) {

      }
    }
  };
</script>
<style lang="scss" scoped src="./style.scss"></style>