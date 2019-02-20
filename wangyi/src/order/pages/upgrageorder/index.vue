<template>
  <div id="orderDetail">
    <van-nav-bar title="待支付升级单">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
      <!-- <div class='view_d' slot='right' @click="onClickRight">新增</div> -->
    </van-nav-bar>
    <div class="form">
      <van-steps :steps="steps" :active="active">

      </van-steps>
      <div class="step1" v-if='active==0'>
        <van-cell-group>
          <van-field readonly :value="oldMember.userCode" center clearable label="会员ID" placeholder="会员ID">
          </van-field>
          <van-field readonly :value="oldMember.storeCode" center clearable label="服务机构编号" placeholder="服务机构编号">
          </van-field>
          <van-field readonly :value="oldMember.userName" center clearable label="姓名" placeholder="姓名">
          </van-field>
        </van-cell-group>
        <div class="btn-group">
          <van-button @click='paySubmit(1)' type="warning">确认支付</van-button>
        </div>
      </div>


      <div class="step4" v-if='active==1'>
        <van-icon name="passed" />
        <p>恭喜支付完成</p>
        订单编号：{{finishOrderNum}}
      </div>
    </div>
    <div class="goods">
      <div class="header">
        商品信息
        <div style="display:inline-block" class="price">(合计：<span>¥{{discountPrice}}</span></div>
        <div style="display:inline-block" class="price">PV：<span>{{discountPv}}</span>)</div>
      </div>
      <van-card v-for='(item,index) in itemDetail' :key='index' desc="描述信息" :title="item.productName" :thumb="$img+item.imgUrl"
        :num='item.quantity'>
        <div slot='desc'>
          <div class="price">单价：<span>¥ {{item.price}}</span></div>
          <div class="price">PV：<span> {{item.pv}}</span></div>
        </div>
      </van-card>
    </div>
    <div class="location">
      <van-icon name="location" />
      <div class="address">
        <div class="name">收货人：{{orderParams.receiverName}}</div>
        <div class="mobile">联系电话：{{orderParams.receiverMobile}}</div>
        <div>收货地址：{{orderParams.receiverState}},{{orderParams.receiverCity}},{{orderParams.receiverDistrict}},{{orderParams.receiverAddress}}
        </div>
      </div>
    </div>

    <div class="footer">
      <span>订单编号：{{orderParams.orderNumber}}</span>
      <span>创建时间：{{orderParams.createdTime}}</span>
      <span>用户编号：{{orderParams.userCode}}</span>
      <span>订单类型：{{orderType}}</span>
      <span>运费：¥{{orderParams.total_fee}}</span>
      <span>现金账户：{{memberAccount.cash}}</span>
      <span>电子币：{{memberAccount.coin}}</span>
      <span>奖金：{{memberAccount.bonus}}</span>
      <van-button class="copy" style="width:auto" @click="onCopy">复制单号 </van-button>
    </div>
    <!-- <van-submit-bar
          :price="3050"
          button-text="支付"
          @submit="onSubmit"
        /> -->
    <van-toast id="van-toast" />
  </div>
</template>
<script>
  import Toast from 'staticA/vant/toast/toast';
  export default {
    data() {
      return {
        active: 0,
        payOrderInfo: {},
        itemDetail: [],
        oldMember: {
          userCode: '',
          userName: '',
          storeCode: ''
        },
        discountPrice: '',
        discountPv: "",
        orderParams: {
          id: 350,
          orderNumber: "12",
          orderType: "",
          paid: false,
          receiverAddress: "",
          receiverCity: "",
          receiverDistrict: "",
          receiverMobile: "",
          receiverName: "",
          receiverState: "",
          totalPrice: "",
          totalPv: "",
          userCode: "",
          createdTime: '',
          createdUserCode: '',
          total_fee: '0.00',
          orderTypeName: ''
        },
        memberAccount: {},
        steps: [
          {
            text: '支付',

          },
          {
            text: '支付成功',

          },

        ],
        finishOrderNum: ''
      };
    },
    onShow() {
      this.onLoad();
      if (this.payOrderInfo == '') {
        //this.$router.push({path:'/home/entry'})
      }
      this.initData();
      this.memberInfo();
    },
    computed: {
      orderType() {

        if (this.orderParams.orderType == '21') {
          return '重消单'
        }
        else if (this.orderParams.orderType == '22') {
          return '激活单'
        }
        else {
          return '升级单'
        }
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1);
      },
      onCopy(e) {
        var self = this;
        // console.log(self.orderParams.orderNumber)
        wx.setClipboardData({
          data: self.orderParams.orderNumber,
          success: function (res) {
            // self.setData({copyTip:true}),
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })

          }
        })
      },


      onLoad() {
        this.active = 0;
        this.payOrderInfo = {};
        this.itemDetail = [];
        this.oldMember = {
          userCode: '',
          userName: '',
          storeCode: ''
        },
          this.discountPrice = '';
        this.discountPv = "";
        this.orderParams = {
          id: 350,
          orderNumber: "12",
          orderType: "",
          paid: false,
          receiverAddress: "",
          receiverCity: "",
          receiverDistrict: "",
          receiverMobile: "",
          receiverName: "",
          receiverState: "",
          totalPrice: "",
          totalPv: "",
          userCode: "",
          createdTime: '',
          createdUserCode: '',
          total_fee: '0.00',
          orderTypeName: ''
        };
        this.memberAccount = {};
        this.finishOrderNum = '';
      },
      initData() {
        let _this = this;
        _this.payOrderInfo = _this.$store.state.home.payOrderInfo;
        //console.log(_this.$store.state.home)
        let params = _this.payOrderInfo;
        let orderNo = params['orderNumber'];
        _this.itemDetail = params['details'].map(v => {
          if (v.imgUrl.substr(0, 7).toLowerCase() == "http://" || v.imgUrl.substr(0, 8).toLowerCase() == "https://") {
            var itemImage = v.imgUrl;
          } else {
            var itemImage = "http://www.longliqicn.cn" + v.imgUrl;
            itemImage = itemImage.replace(/\s+/g, "");
          }
          return {
            discountPv: v.discountPv,
            imgUrl: itemImage,
            price: v.price,
            productName: v.productName,
            productNo: v.productNo,
            pv: v.pv,
            quantity: v.quantity
          }
        })

        _this.orderParams = {
          id: params['id'],
          orderNumber: params['orderNumber'],
          orderType: params['orderType'],
          paid: params['paid'],
          receiverAddress: params['receiverAddress'],
          receiverCity: params['receiverCity'],
          receiverDistrict: params['receiverDistrict'],
          receiverMobile: params['receiverMobile'],
          receiverName: params['receiverName'],
          receiverState: params['receiverState'],
          totalPrice: params['totalPrice'],
          totalPv: params['totalPv'],
          userCode: params['userCode'],
          createdTime: params['createdTime'],
          createdUserCode: params['createdUserCode'],
        }
        //console.log(_this.orderParams)
        let queryData = {
          price: _this.orderParams['totalPrice'],
          orderType: _this.orderParams['orderType'],
          pv: _this.orderParams['totalPv'],
        }
        _this.$api.apiConfig.payment_query(queryData)
          .then(data => {
            let bank = data.tmporder_payment_query_response;
            let len = bank.length;
            for (var i = 0; i < len; i++) {
              if (bank[i].bankType == "pv") {
                _this.discountPv = Number(bank[i].payment).toFixed(2);
              }
              if (bank[i].bankType == "amount") {
                _this.discountPrice = Number(bank[i].payment).toFixed(2);
              }
              if (bank[i].bankType == "postfee") {
                _this.orderParams.total_fee = Number(bank[i].payment).toFixed(2);
              }
            }
          }).catch(e => {

          })
      },
      memberInfo() {
        let _this = this;
        let queryData = {};
        _this.$api.apiConfig.member_me_get(queryData).then(data => {
          let memberInfo = data.member_me_get_response;
          let { cash, coin, bonus, userCode, userName, storeCode } = memberInfo;
          _this.memberAccount = {
            cash: cash,
            coin: coin,
            bonus: bonus
          };
          _this.oldMember = {
            userCode: userCode,
            userName: userName,
            storeCode: storeCode
          }
        }).catch(e => {

        })
      },
      preveHandle(id) {
        this.active = id;
      },
      nexHandle(id) {
        this.active = id;
        this.paylist.userName = '555'
      },

      paySubmit(id) {
        let _this = this;
        let params = {};
        params = {
          "tmporderId": _this.orderParams["id"],
        }
        // console.log(_this.startTime)
        _this.$api.apiConfig.tmporder_czdp_checkout(params).then(data => {
          let v1 = data.tmporder_czkre_checkout_response;
          var arr = Object.getOwnPropertyNames(v1);
          if (arr.length == 0) {
            Toast.fail(data.msg);
            return false;
          }
          _this.finishOrderNum = v1.orderNumber;
          _this.orderParams.orderNumber = res['orderNumber'];
          _this.active = id;
        }).catch(e => {

        })
        // this.active = id;
      },

    }
  };
</script>

<style lang="scss" src='./style.scss'>
</style>