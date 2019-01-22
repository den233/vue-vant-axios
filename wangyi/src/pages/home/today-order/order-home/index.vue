<template>
  <div class="lists">
    <div class="lists-item" v-for="(item,index) in data" :key="index">
      <div class='inner'>
        <div class="imgs">
          <img class="imagesLazy" :src="item.imgUrl||imgLazyLoad" alt="">
        </div>
        <div class="info">
          <h6 class="label">{{item.productName}}</h6>
          <p class="desc">pv：{{item.pv}}</p>
          <p class="price">￥
            <span class="total">{{item.price}}</span>
          </p>
        </div>

        <van-stepper :integer=true :disable-input=false @change='changeNum($event,item.ppsId,item.number,index)'   :value="item.number" integer :min="1"
        :max="99" :step="1" />
        <van-icon class="cart_icon" name="shopping-cart-o" @click='addCart($event,item.id,item.number)' />
        <!-- <van-button class="add_cart" size="small" type="danger"  @click='addCart(item.id,item.number)'>加入购物车</van-button> -->
      </div>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
  import bus from '@/components/bus'
  import Toast from 'staticA/vant/toast/toast';
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
          return this.$PLATFORM_CONFIG[0].type;
        }
      }
    },
    data() {
      return {
        goods: {
          id: 1018706,
          imgUrl: "/upload/files/20161215031806.jpg",
          price: "330",
          productName: "保和堂120片荃爱食用菌制品",
          productNo: "daab040a",
          pv: "40"
        },
        orderType: this.$PLATFORM_CONFIG,
        category_id: 1,
        imgLazyLoad: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545648228300&di=bb84061edfb4e3b3d1379fc2eddde08a&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Forj360%2F727b474aly1fuypmvz7rzj20qo0qogms.jpg'
      }
    },
    mounted() {
      this.getBus();
    },
    methods: {
      getBus() {

        let self = this;
        bus.$on('useBusEvent', function (msg) {
          self.category_id = msg;
        })
      },
      addCart({ mp }, id, number) {
    
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
      },
      radioType(type) {
        console.log(type)
      },
      plus(id, number, index) {
        console.log(this.data[index])
        this.data[index].number++;
      },
      minus(id, number, index) {
        let _this = this;
        if(number>1){
          _this.data[index].number--;
        }
       
      },
      beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      confirm() {
        // return false;
      },
      cancel() {

      },
      changeNum({mp},id,number,index) {
        this.data[index].number=mp.detail;
      }
    }
  };
</script>
<style lang="scss" scoped src="./style.scss"></style>