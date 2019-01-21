<template>
  <div>
      <ul class="lists">
          <li class="lists-item" v-for="(item,index) in data" :key="index">
            <div style="display:flex">
              <div class="imgs">
                <img class="img" :src="item.imgUrl" alt="">
              </div>
              <div class="info">
                <h6 class="label">{{item.productName}}</h6>
                <p class="desc">pv：{{item.pv}}</p>
                <p class="price">￥
                  <span class="total">{{item.price}}</span>
                </p>
              </div>
            </div>
            <van-stepper :integer=true :disable-input=false @change='changeNum($event,item.ppsId,item.number,index)'   :value="item.number" integer :min="1"
            :max="99" :step="1" />
            <van-button class="add_cart" size="small" type="warning" @click='addCart(item.id,item.number)'>加入购物车</van-button>
          </li>
        </ul>
      <van-toast id="van-toast" />
  </div>
  
</template>
<script>

  import Toast from 'staticA/vant/toast/toast';
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
          Toast.fail("添加失败");
        })
        // this.$http.post(
        //     '/api/addcart',{id:id,number:number,category_id:_this.category_id}
        //   ).then(data=>{
        //     Toast.success('成功');

        //   }).catch(err=>{
        //     Toast.fail('失败');
        //   });

      },
      changeNum({mp},id,number,index) {
        this.data[index].number=mp.detail;
      }
    }
  };
</script>
<style lang="scss"   src="./style.scss"></style>