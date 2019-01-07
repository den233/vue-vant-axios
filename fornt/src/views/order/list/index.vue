<template>
  <div id="OrderList">
    <van-nav-bar title="我的订单" left-text="返回" right-text="" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="currentStatus" sticky>
        <vue-scroll   
        ref="vs" :ops="ops"
        >
      <van-tab v-for="(item,index) in statusList" :title="item.name" :key="item.value">
        <img class="nodata" :src="imgUrl" alt="" v-if='hasData'>
        <listItem v-if="index === currentStatus" v-for="order in orderList.content" needToolBar :key="order.id" :detail='order'
        :currentStatus='currentStatus'  @searchWuliu='searchWuliu' @descList='goToOrderDetail' />
      </van-tab>
      </vue-scroll>
    </van-tabs>
    <van-pagination 
    v-model="currentPage" 
    :total-items=pagecon.total
    :show-page-size='5'
    force-ellipses
    @change='chagePage'
  />
  </div>
</template>

<script>
  import listItem from '../components/list-item';
  export default {
    components: {
      listItem
    },
    data() {
      return {
        pagecon: {
          total: 0,
          page_size: 10
        },
        currentPage:1,
        hasData: false,
        imgUrl: require('@/assets/images/timg.jpg'),
        statusList: [
          {
            name: '全部订单',
            value: 0
          },
          {
            name: '待支付',
            value: 1
          },
          {
            name: '待发货',
            value: 2
          },
          {
            name: '待收货',
            value: 3
          }

        ],
        currentStatus: 0,
        orderList: [
        ],
        ops: {
            bar: {
               background:'transparent'
            },
            rail: {
             
            },
            scrollPanel: {
            // 当组件mounted了以后，自动滚动到一个坐标
            initialScrollY: false,
            initialScrollX: false,
            // 是否禁止x或y方向上的滚动
            scrollingX: false,
            scrollingY: true,
            // 滚动的速度。在你点击滚动轨道或者调用scrollTo或者scrollBy的时候
            // 起作用。
            speed: 300,
            // 滚动动画
            easing: undefined,
            // 有时候原声滚动条可能在左侧,
            // 请查看 https://github.com/YvesCoding/vuescroll/issues/64
            verticalNativeBarPos: 'right'
          },
            scrollButton: {
              enable: false,
             
            }
          },
      };
    },
    mounted() {
      this.initData()
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      initData() {
        let _this = this;
        let queryData = {
          orderNo: '',
          _currPageNo: 1,
          pageSize: 10
        }
        _this.hasData = false;
        _this.$api.apiConfig.allTmpOrder(queryData)
          .then(data => {
            
            let v1 = data.tmporder_list_response;
           
            var arr = Object.getOwnPropertyNames(v1);
            if (arr.length == 0) {
              _this.hasData = true
              return false;
            }
            if (v1.content.length == 0) {
              _this.hasData = true;
              return false;
            }  
            _this.orderList = v1 
          }).catch(e => {
            _this.hasData = true;
          })
      },
      chagePage(){

      },
      searchWuliu(val) {

        this.$router.push({
          name: 'wlindex', query: {
            id: val
          }
        });
      },
      goToOrderDetail(val) {

        console.log(val)
        //重消单
        if (val.orderType == 21) {
          this.$router.push({ name: 'repeatorder', params: val });
        }
        //激活单
        if (val.orderType == 22) {
          this.$router.push({ name: 'neworder', params: val });
        }
        if (val.orderType == 20) {

        }

      },
    }
  };
</script>

<style lang="scss" src='./index.scss'>
</style>