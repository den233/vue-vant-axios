<template>
  <div class="lists">
    <div class="lists-item" v-for="(item,index) in data" :key="index">
      <div class='inner'>
        <div class="imgs">
          <img :src="item.imgSrc || 'https://via.placeholder.com/170x170'" alt="">
        </div>
        <div class="info">
          <h6 class="label">{{item.name}}</h6>
          <p class="desc">pv：{{item.pv}}</p>
          <p class="price">￥
            <span class="total">{{item.price}}</span>
          </p>
        </div>

        <van-stepper integer :min="1" :step="1" v-model='item.number' @change='changeNum()' />
        <van-icon class="cart_icon" name="shopping-cart-o" @click='addCart(item.id,item.number)' />
        <!-- <van-button class="add_cart" size="small" type="danger"  @click='addCart(item.id,item.number)'>加入购物车</van-button> -->
      </div>
    </div>
  </div>
</template>
<script>

  import { Toast } from 'vant';
  Vue.use(Toast);
  import bus from '@/components/bus';
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
        category_id: 1
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
      addCart(id, number) {
        let _this = this;
        this.$http.post(
          '/api/addcart', { id: id, number: number, category_id: _this.category_id }
        ).then(data => {
          Toast.success('成功');

        }).catch(err => {
          Toast.fail('失败');
        });

      },
      changeNum(val) {

      }
    }
  };
</script>
<style lang="scss" scoped src="./style.scss"></style>