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
   
        <scroll-view :style="{ height: second_height + 'px' }" class="scroll-view" scroll-y>
          <div style="text-align: center"><img class="nodata" :src="imgUrl" alt="" v-if='hasData'></div>
          <div >
            <listItem v-for="(order,index1) in orderList.content" needToolBar :key="index1" :detail='order'
              :currentStatus='currentStatus' @deleteOrder="deleteOrder" @searchWuliu='searchWuliu' @descList='goToOrderDetail($event,order)' />
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
          },
          {
            name: '已完成',
            value: 4
          }

        ],
        currentStatus:0,
        orderList: [],
        imgUrl:require('@/assets/images/timg.jpg')
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
    onShow() {
      this.onLoad();
      let _this=this;
     this.currentStatus=store.state.home.orderStatus;
     switch (_this.currentStatus){
          case 0:
            let params = {
            _currPageNo: 1,
            _pageSize: 10
            }
            this.initData(params)
          break;
          case 1:
         this.initData2({
            _currPageNo: 1,
            _pageSize: 10,
            orderNo:'',
          })
          break;
          case 2:
            this.tmporder_list_delively( {
            _currPageNo: 1,
            _pageSize: 10,
            delively:0
            })
          break;
          case 3:
            this.tmporder_list_takeDelively({
            _currPageNo: 1,
            _pageSize: 10,
            takeDelively:0
            })
          break;
          case 4:
            this.tmporder_list_takeDelively({
            _currPageNo: 1,
            _pageSize: 10,
            takeDelively:1
            })
           break;
          } 
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
      onLoad(){
        this.pagecon= {
          total: 0,
          page_size: 10
        }
        this.loading= false;
        this.currentPage= 1;
        this.hasData= false;
        this.orderList= [];
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      handleChange() {

      },
      tabClick({detail}){
        let _this=this;
        let index= detail.index;
        _this.currentStatus=_this.statusList[index].value;
        _this.pagecon={
          total:0,
          page_size:10
        }
        _this.orderList=[];
        _this.currentPage=1;
        switch (_this.currentStatus){
          case 0:
            let params = {
            _currPageNo: 1,
            _pageSize: 10
            }
            this.initData(params)
          break;
          case 1:
         this.initData2({
            _currPageNo: 1,
            _pageSize: 10,
            orderNo:'',
          })
          break;
          case 2:
            this.tmporder_list_delively( {
            _currPageNo: 1,
            _pageSize: 10,
            delively:0
            })
          break;
          case 3:
            this.tmporder_list_takeDelively({
            _currPageNo: 1,
            _pageSize: 10,
            takeDelively:0
            })
          break;
          case 4:
            this.tmporder_list_takeDelively({
            _currPageNo: 1,
            _pageSize: 10,
            takeDelively:1
            })
           break;
        }
      },
      //全部
      initData(params) {
        let _this = this;
        let queryData=params
        _this.hasData = false;
        _this.$api.apiConfig.allTmpOrders(queryData)
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
              total: v1.totalPages,
              page_size: 10
            }
            _this.orderList = v1;
           
            for (let i=0,len=_this.orderList.content.length;i<len;i++){
              const{paid,isDelively,isTakeDelively}=_this.orderList.content[i]
               if(!paid){
                _this.orderList.content[i].state='待支付'
               }
               else if(isDelively==0) {
                 _this.orderList.content[i].state='待发货'
               }
               else if(isTakeDelively==0){
                _this.orderList.content[i].state='待收货'
               }
               else if(isTakeDelively==1){
                _this.orderList.content[i].state='已完成'
               }
            }
            console.log(_this.orderList)
            // _this.orderList.forEach(element => {
            //    console.log(element)
            // });
          }).catch(e => {
            _this.hasData = true;
          })
      },
      //待支付
      initData2(params) {
        let _this = this;
        let queryData=params
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
              total: v1.totalPages,
              page_size: 10
            }
            _this.orderList = v1;
          }).catch(e => {
            _this.hasData = true;
          })
      },
      //代发货
      tmporder_list_delively(params){
        let _this = this;
        let queryData=params
        _this.hasData = false;
        _this.$api.apiConfig.tmporder_list_delively(queryData)
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
              total: v1.totalPages,
              page_size: 10
            }
            _this.orderList = v1;
          }).catch(e => {
            _this.hasData = true;
          })
      },
       //待收货
       tmporder_list_takeDelively(params){
        let _this = this;
        let queryData=params
        _this.hasData = false;
        _this.$api.apiConfig.tmporder_list_takeDelively(queryData)
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
              total: v1.totalPages,
              page_size: 10
            }
            _this.orderList = v1;
          }).catch(e => {
            _this.hasData = true;
          })
      },
      
      handleChange({detail}) {
        const type = detail.type;
        if (type === 'next') {
          this.currentPage = this.currentPage + 1;
        } else if (type === 'prev') {
          this.currentPage = this.currentPage - 1;
        }
        let _this = this;
        console.log(_this.currentStatus)
        if (_this.orderList['content'].length == 0) {
           return false
        }
        switch (_this.currentStatus){
          case 0:
            let params = {
            _currPageNo:_this.currentPage,
            _pageSize: 10
            }
            _this.initData(params)
          break;
          case 1:
         this.initData2({
            _currPageNo: _this.currentPage,
            _pageSize: 10,
            orderNo:'',
          })
          break;
          case 2:
          _this.tmporder_list_delively( {
            _currPageNo: _this.currentPage,
            _pageSize: 10,
            delively:0
            })
          break;
          case 3:
          _this.tmporder_list_takeDelively({
            _currPageNo: _this.currentPage,
            _pageSize: 10,
            takeDelively:0
            })
          break;
          case 4:
          _this.tmporder_list_takeDelively({
            _currPageNo: _this.currentPage,
            _pageSize: 10,
            takeDelively:1
            })
           break;
        }
      
      },
      searchWuliu(val) {
        this.$router.push({
          path: '/order/pages/logistics/index', query: {
            id: val
          }
        });
      },
      deleteOrder(){
        let _this = this;
        switch (_this.currentStatus){
          case 0:
            let params = {
            _currPageNo:_this.currentPage,
            _pageSize: 10
            }
            _this.initData(params)
          break;
          case 1:
         this.initData2({
            _currPageNo: _this.currentPage,
            _pageSize: 10,
            orderNo:'',
          })
          break;
          case 2:
          _this.tmporder_list_delively( {
            _currPageNo: _this.currentPage,
            _pageSize: 10,
            delively:0
            })
          break;
          case 3:
          _this.tmporder_list_takeDelively({
            _currPageNo: _this.currentPage,
            _pageSize: 10,
            takeDelively:0
            })
          break;
          case 4:
          _this.tmporder_list_takeDelively({
            _currPageNo: _this.currentPage,
            _pageSize: 10,
            takeDelively:1
            })
           break;
          } 
      },
      goToOrderDetail(e,val) {

       // console.log(val)
        //重消单
        this.$store.commit('payOrderInfo', val)
        if (val.orderType == 21) {
          this.$router.push({ path: '/order/pages/repeatorder/index' });
        }
        //激活单
        if (val.orderType == 22) {
          this.$router.push({ path: '/order/pages/activeorder/index' });
        }
        if (val.orderType == 23) {
          this.$router.push({ path: '/order/pages/upgrageorder/index' });
        }

      },
    }
  };
</script>

<style lang="scss" src="./style.scss">

</style>