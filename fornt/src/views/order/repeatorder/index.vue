<template>
  <div id="orderDetail">

    <van-nav-bar title="待支付重消单" left-text="返回" right-text="" left-arrow @click-left="onClickLeft" />
    <div class="form">
      <van-steps :active="active">
        <van-step>基本信息</van-step>
        <van-step>支付完成</van-step>
      </van-steps>
      <div class="step1" v-if='active==0'>
        <van-cell-group>
          <div class="layui-form-item funditem">
            <label class='label' for="">购买期数</label>
            <van-radio-group v-model="venture">
              <van-radio name="1">购买本期</van-radio>
              <van-radio name="2">多期购买 </van-radio>
            </van-radio-group>
          </div>
          <van-cell title="开始时间" @click='pickMonth' is-link arrow-direction="down" :value="startTime.name" />
          <van-cell title="期数" @click='pickQshu' is-link arrow-direction="down" :value="qishuValue.name" />
        </van-cell-group>
        <div class="btn-group">
          <van-button @click='paySubmit(1)' type="warning">确认支付</van-button>
        </div>
        <van-actionsheet v-model="show" :actions="actions" @select="onSelect" />
        <van-actionsheet v-model="showQishu" :actions="qiShu" @select="onSelectQishu" />
      </div>


      <div class="step4" v-if='active==1'>
        <van-icon name="passed" />
        <p>恭喜支付完成</p>
        订单编号：xxxxxx
      </div>
    </div>
    <div class="goods">
      <div class="header">
        商品信息
        <div style="display:inline-block" class="price">(合计：<span>¥{{discountPrice}}</span></div>
        <div style="display:inline-block" class="price">PV：<span>¥{{discountPv}}</span>)</div>
      </div>
      <van-card v-for='(item,index) in itemDetail' :key='index' desc="描述信息" :title="item.productName" :thumb="item.imgUrl"
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
      <van-button class="copy" style="width:auto" v-clipboard:copy="orderParams.orderNumber" v-clipboard:success="onCopy"
        v-clipboard:error="onError">复制单号 </van-button>
    </div>
    <!-- <van-submit-bar
    :price="3050"
    button-text="支付"
    @submit="onSubmit"
  /> -->
  </div>
</template>
<script>

  export default {

    data() {
      return {
        active: 0,
        tabactive: 0,
        show: false,
        showQishu: false,
        qishuValue: { id: 0, name: '请选择' },
        startTime: { id: 0, name: '请选择' },
        payOrderInfo: this.$store.getters.payOrderInfo,
        imageURL: 'http://placehold.it/85x85',
        itemDetail: [],

        venture: '1',//创业基金
        paylist: { userName: '', salesMan: '', serviceMan: '' },
        formItem: {
          saleMan: '',
          serviceMan: '',
          userName: '',
          paperNum: '',
          old: {
            userName: '',
            paperNum: '',
            serviceNum: ''
          }
        },
        actions: [
        ],
        qiShu: [],
        discountPrice: '',
        discountPv: "",
        orderParams: {
          id: 350,
          orderNumber: "",
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
        }
      };
    },
    mounted() {
      if (this.payOrderInfo == '') {
        //this.$router.push({path:'/home/entry'})
      }
      this.initData();
      this.initMonth();
      this.renderQi();
    },
    computed: {
      orderType() {
        if (this.orderParams.orderType == '21') {
          return '重消单'
        }
        if (this.orderParams.orderType == '22') {
          return '激活单'
        }
        if (this.orderParams.orderType == '23') {
          return ''
        }
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1);
      },
      onCopy: function (e) {
        console.log('复制成功！')
      },
      onError: function (e) {
        console.log('复制失败！')
      },
      initData() {
        let _this = this;
        let params = _this.payOrderInfo;
        let orderNo = params['orderNumber'];
        _this.itemDetail = params['details'];
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
        console.log(_this.orderParams)
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

      onSubmit() {

      },
      preveHandle(id) {
        this.active = id;
      },
      nexHandle(id) {
        this.active = id;
        this.paylist.userName = '555'
      },
      paySubmit(id) {
        let _this=this;
        let params={
          "tmporderId": _this.orderParams["id"],
          "period": _this.qishuValue.id,
          "repeatStartTime": _this.startTime.id
        }
       // console.log(_this.startTime)
        _this.$api.apiConfig.tmporder_czkre_checkout (params).then(data=>{
          let v1 = data.tmporder_czkre_checkout_response;
              var arr = Object.getOwnPropertyNames(v1);
              if (arr.length == 0) {
                  _this.Toast.fail(data.msg);
                  return false;
              }
        }).catch(e=>{

        })
       // this.active = id;
      },
      initMonth() {
        let mothValue = this.getMonth(1);
        let mothText = this.getMonth(2);
        for (let i = 0, len = mothText.length; i < len; i++) {
          this.actions.push(
            {
              id: mothValue[i],
              name: mothText[i]
            }
          )
        }

      },
      pickMonth() {
        this.show = true;
        //console.log(this.getMonth(2))


      },
      pickQshu() {
        this.showQishu = true;

      },
      renderQi() {
        for (var i = 0; i < 12; i++) {
          var index = i + 1
          var total = (i + 1) * 30;
          let name = `购买${index}个月：累计总$PV必须>=${total}PV`;
          this.qiShu.push({
            name: name,
            id: index
          })
        }
      },
      onSelectQishu(item) {
        console.log(item)
        this.showQishu = false;
        this.qishuValue = item;
      },
      onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        console.log(item)
        this.startTime = item;
      },
      getMonth(type) {
        var date = new Date();
        var cyear = date.getFullYear(); //获取完整的年份(4位)

        var cmonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)

        // 月份数组
        var nearThree = [];
        var monthTree = [];
        var monthIndex = 0;
        var dataIndex = 0;
        for (var i = 0; i < 13; i++) {
          dataIndex = cmonth;
          monthIndex = cmonth;
          if (cmonth > 12) {
            if (cyear - date.getFullYear() == 0) {
              cyear = cyear + 1;
            }
            cmonth = cmonth - 12;
            dataIndex = cmonth;
            monthIndex = cmonth;
          }
          if (dataIndex < 10) {
            dataIndex = 0 + '' + cmonth
          }
          dataIndex = cyear + '' + dataIndex
          monthIndex = "" + cyear + "年" + monthIndex + "月"
          nearThree.push(dataIndex);
          monthTree.push(monthIndex);
          cmonth = cmonth + 1;
        }
        if (type == 1) {
          return nearThree;
        }
        if (type == 2) {
          return monthTree
        }
      }

    }
  };
</script>

<style lang="scss" src='./index.scss'>
</style>