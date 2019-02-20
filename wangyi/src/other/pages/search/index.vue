<template>
  <div class="listSearch">
    <div class="searchBox">
      <van-search :value="searchValue" placeholder="请输入搜索关键词" @change="searchChange" use-action-slot @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>

    <van-tabs style="margin-top:20px;" :active="active" @change='tabClick'>
      <van-tab v-for='(item,index) in orderType' :key='index' :title="item.name"></van-tab>
    </van-tabs>

    <scroll-view :style="{ height: second_height + 'px' }" class="scroll-view" scroll-y>
      <div style="text-align: center" v-if='hasData'>
        <img class="nodata" :src="imgUrl" alt="">
      </div>

      <div class="tabs">
        <div v-for="(item,index) in dataActive" :key="index" class="list">
          <div class="imgs">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="content">
            <div class="title">{{item.productName}}</div>
            <div class="price">价格:¥{{item.price}}</div>
            <div class="pv">pv:{{item.pv}}</div>
          </div>
          <van-stepper :integer=true :disable-input=false @change='changeNum($event,item.ppsId,item.number,index)'
            :value="item.number" integer :min="1" :max="99" :step="1" />
          <van-icon class="cart_icon" name="shopping-cart-o" @click='addCart($event,item.id,item.number)' />
          <!-- <van-button class="addcart" @click='addCart(index,active)' size="small" round type="danger">加入购物车</van-button> -->
        </div>
      </div>
    </scroll-view>
    <i-page :current="currentPage" :total="pagecon.total" @change="chagePage">
      <div slot="prev">上一页</div>
      <div slot="next">下一页</div>
    </i-page>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
  import Toast from 'staticA/vant/toast/toast';
  export default {
    data() {
      return {
        searchValue: '',
        active: '0',
        second_height: 0,
        orderType: this.$PLATFORM_CONFIG,
        currentOrderType: this.$PLATFORM_CONFIG[0].type,
        pagecon: {
          total: 0,
          page_size: 20
        },
        currentPage: 1,
        dataActive: [],//激活单
        hasData: false,
        imgUrl: require('@/assets/images/timg.jpg')
      };
    },
    mounted() {
      console.log(this.orderType)
      this.catEvent("")
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
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      //搜索
      searchChange({ detail }) {
        this.searchValue = detail;
      },
      onSearch() {
        this.pagecon.total = 0;
        this.currentPage = 1;
        this.catEvent("")
      },
      addCart({ detail }, id, number) {
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
      async getGoodsList(id) {
        let _this = this;
        _this.dataActive = [];
        _this.hasData = false;
        let querydata = {};
        querydata = {
          Key: _this.searchValue,
          _currPageNo: _this.currentPage,
          _pageSize: _this.pagecon.page_size,
          orderType: _this.currentOrderType,
        };

        return await _this.$api.apiConfig.searchProduct(
          querydata
        )
      },
      async categoryHandle(id) {
        let _this = this;
        let v1 = await _this.getGoodsList(id);
        v1 = v1.productsale_list_hot_response;
        var arr = Object.getOwnPropertyNames(v1);

        _this.current_id = id;
        _this.pagecon.total = v1.totalPages;
        if (arr.length == 0) {
          this.hasData = true
          return false;
        }
        if (v1.content.length == 0) {
          this.hasData = true
          return false;
        }
        v1.content.map(v => {
          if (v.imgUrl.substr(0, 7).toLowerCase() == "http://" || v.imgUrl.substr(0, 8).toLowerCase() == "https://") {
            var itemImage = v.imgUrl;
          } else {
            var itemImage = "http://www.longliqicn.cn" + v.imgUrl;
            itemImage = itemImage.replace(/\s+/g, "");
          }
          _this.dataActive.push({
            id: v.id,
            imgUrl: itemImage,
            price: v.price,
            productName: v.productName,
            productNo: v.productNo,
            pv: v.pv,
            number: 1
          })
        });
        console.log(_this.dataActive)
      },
      catEvent(id) {
        let _this = this;
        _this.pagecon.total = 0;
        _this.currentPage = 1;
        _this.categoryHandle(id)
      },
      //分页
      chagePage({ detail }) {
        const type = detail.type;

        if (type === 'next') {
          if (this.dataActive.length == 0) {
            return false
          }
          this.currentPage = this.currentPage + 1;
        } else if (type === 'prev') {
          this.currentPage = this.currentPage - 1;
        }

        let _this = this;
        let id = _this.current_id;
        _this.categoryHandle(id);
      },
      //切换订单类型
      tabClick({ detail }) {
        let _this = this;
        let index = detail.index;
        _this.currentOrderType = _this.orderType[index].type;
        _this.pagecon.total = 0;
        let id = _this.current_id;
        _this.currentPage = 1;
        _this.catEvent(id)
        // _this.$store.commit('changeTab',{type:_this.currentOrderType,index,index});
      },
      changeNum({ detail }, id, number, index) {
        this.dataActive[index].number = detail;
      }
    }
  };
</script>
<style lang="scss" scoped src="./style.scss"></style>