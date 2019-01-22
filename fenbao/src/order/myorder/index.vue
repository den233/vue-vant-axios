<template>
  <div id="OrderList">
    <van-nav-bar title="我的订单">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
    </van-nav-bar>
    <van-tabs :active="currentStatus" @change='tabClick' sticky>
      <van-tab v-for="(item,index) in statusList" :title="item.name" :key="index">
      </van-tab>
    </van-tabs>
    <img class="nodata" :src="imgUrl" alt="" v-if='hasData'>
        <i-load-more tip="暂无数据" v-if='hasData' />
        <scroll-view :style="{ height: second_height + 'px' }" class="scroll-view" scroll-y>
          <div >
            <listItem v-for="(order,index1) in orderList.content" needToolBar :key="index1" :detail='order'
              :currentStatus='currentStatus' @searchWuliu='searchWuliu' @descList='goToOrderDetail($event,order)' />
          </div>
        </scroll-view>
    <i-page :current="currentPage" :total="pagecon.total" @change="handleChange">
      <div slot="prev">
        <i-icon type="return"></i-icon>
        上一页
      </div>
      <div slot="next">
        下一页
        <i-icon type="enter"></i-icon>
      </div>
    </i-page>



  </div>
</template>

<script>
  import listItem from './listitem';
  import store from '@/store'
  export default {
    mpType: 'page',
    components: {
      listItem
    },
    data() {
      return {
        pagecon: {
          total: 0,
          page_size: 10
        },
        second_height: 0,
        loading: false,
        currentPage: 1,
        hasData: false,
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
        currentStatus:0,
        orderList: [
        ]
      }
    },
    onLoad: function () {
      console.log('onLoad')
      var that = this
      // 获取系统信息
      wx.getSystemInfo({
        success: function (res) {
          console.log(res);
          // 可使用窗口宽度、高度
          console.log('height=' + res.windowHeight);
          console.log('width=' + res.windowWidth);
          // 计算主体部分高度,单位为px

          // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
          that.second_height = res.windowHeight - 150

        }
      })
    },
    mounted() {
     this.currentStatus=store.state.home.orderStatus;
     //console.log(this.currentStatus)
      this.initData()
    },
    async onPullDownRefresh() {
      // to doing..
      // 停止下拉刷新
      console.log(1)
      wx.stopPullDownRefresh();
    },
    // 上拉加载，拉到底部触发
    onReachBottom() {
      // 到这底部在这里需要做什么事情
      let _this = this;
      // this.getMoreData();
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      handleChange() {

      },
      tabClick(event){
        let _this=this;
        let index= event.mp.detail.index;
        _this.currentOrderType=_this.statusList[index].value;
        _this.pagecon={
          total:0,
          page_size:10
        }
        _this.orderList=[];
        _this.initData()
      },
      initData() {
        let _this = this;
        _this.currentPage=1;
        let queryData = {
          orderNo: '',
          _currPageNo: _this.currentPage,
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
            _this.pagecon = {
              total: v1.total,
              page_size: 10
            }
            _this.orderList = v1;
          }).catch(e => {
            _this.hasData = true;
          })
      },
      getMoreData() {
        let _this = this;
        console.log(_this.orderList)
        if (_this.orderList['content'].length > 0) {
          let queryData = {
            orderNo: '',
            _currPageNo: this.currentPage + 1,
            pageSize: 10
          }

          _this.$api.apiConfig.allTmpOrder(queryData).then(data => {
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
            _this.pagecon = {
              total: v1.total,
              page_size: 10
            }
            _this.orderList = v1;

          }).catch(e => {
            _this.hasData = true;
          })
        }
      },
      handleChange(ev) {
        console.log(ev)
        const { detail } = ev.mp;
        const type = detail.type;

        if (type === 'next') {
          this.currentPage = this.currentPage + 1;
        } else if (type === 'prev') {
          this.currentPage = this.currentPage - 1;
        }
        let _this = this;
        _this.getMoreData();
      },
      searchWuliu(val) {

        this.$router.push({
          name: 'wlindex', query: {
            id: val
          }
        });
      },
      goToOrderDetail(e,val) {

       // console.log(val)
        //重消单
        this.$store.commit('payOrderInfo', val)
        if (val.orderType == 21) {
          this.$router.push({ path: '/pages/repeatorder/main' });
        }
        //激活单
        if (val.orderType == 22) {
          this.$router.push({ path: '/pages/activeorder/main' });
        }
        if (val.orderType == 20) {

        }

      },
    }
  };
</script>

<style lang="scss" src="./style.scss">

</style>