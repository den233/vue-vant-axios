<template>
  <ul class="lists">
    <li class="lists-item" v-for="(item,index) in data" :key="index">
      <router-link :to="{path:'/service/details'}" tag="div" style="display:flex">
        <div class="imgs">
          <img v-lazy="item.imgUrl" alt="">
        </div>
        <div class="info">
          <h6 class="label">{{item.productName}}</h6>
          <p class="desc">pv：{{item.pv}}</p>
          <p class="price">￥
            <span class="total">{{item.price}}</span>
          </p>
        </div>
      </router-link>
      <van-stepper integer :min="1" :step="1" v-model='item.number' @change='changeNum()' />
      <van-button class="add_cart" size="small" type="danger" @click='addCart(item.id,item.number)'>加入购物车</van-button>
    </li>
  </ul>
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
      },
      currentOrderType: {
        type: String,
        default() {
          return '';
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
        let queryParam = {
          //"strAction": "trolley_detail_add",
          "ppsId": id,
          "orderType": _this.currentOrderType,
          "quantity": Number(number)
        }
        // return false;
        _this.$api.apiConfig.trolley(queryParam).then(data => {
          let v1 = data.trolley_detail_add_response;
          var arr = Object.getOwnPropertyNames(v1);
          if (arr.length == 0) {
            Toast.fail(data.msg);
            return false;
          }

          Toast.success('成功');
        }).catch(e => {
          Toast.fail('失败了');
        })
        // this.$http.post(
        //     '/api/addcart',{id:id,number:number,category_id:_this.category_id}
        //   ).then(data=>{
        //     Toast.success('成功');

        //   }).catch(err=>{
        //     Toast.fail('失败');
        //   });

      },
      changeNum(val) {

      }
    }
  };
</script>
<style lang="scss" scoped src="./style.scss"></style>