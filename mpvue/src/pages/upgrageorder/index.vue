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
        <van-cell-group  >
          <van-field @change='memderId' :value="oldMember.userCode" center clearable label="会员ID" placeholder="会员ID"
            use-button-slot>
            <van-button @click='oldQuery' slot="button" size="small" type="primary">查询</van-button>
          </van-field>
          <van-field readonly :value="oldMember.storeCode" center clearable label="服务机构编号" placeholder="服务机构编号">
          </van-field>
          <van-field readonly :value="oldMember.userName" center clearable label="姓名" placeholder="姓名">
          </van-field>
        </van-cell-group>
        <div class="btn-group">
          <van-button @click='paySubmit(1)' type="warning">确认支付</van-button>
        </div>
        <van-action-sheet :show="show" :actions="actions" @select="onSelect" />
        <van-action-sheet :show="showQishu" :actions="qiShu" @select="onSelectQishu" />
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
        tabactive: 0,
        show: false,
        $img: this.$img,
        showQishu: false,
        qishuValue: { id: 0, name: '请选择' },
        startTime: { id: 0, name: '请选择' },
        payOrderInfo: {},
        itemDetail: [],
        venture: '1',//创业基金
        oldMember: {
          userCode: '',
          userName: '',
          storeCode: ''
        },
        actions: [
        ],
        qiShu: [],
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
            text: '选择期数',

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
      this.initMonth();
      this.renderQi();
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

      onChange({ mp }) {
        const { detail } = mp;
        this.venture = detail;
        console.log(mp)
      },
      memderId({mp}){
       
        this.oldMember.userCode=mp.detail;
      },
      onLoad() {
        this.active = 0;
        this.tabactive = 0;
        this.show = false;
        this.$img = this.$img;
        this.showQishu = false;
        this.qishuValue = { id: 0, name: '请选择' };
        this.startTime = { id: 0, name: '请选择' };
        this.payOrderInfo = {};
        this.itemDetail = [];

        this.venture = '1';//创业基金
        this.oldMember = {
          userCode: '',
          userName: '',
          storeCode: ''
        },
          this.actions = [
          ]
        this.qiShu = [];
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
      },
      initData() {
        let _this = this;
        _this.payOrderInfo = _this.$store.state.home.payOrderInfo;
        //console.log(_this.$store.state.home)
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
          let { cash, coin, bonus } = memberInfo;
          _this.memberAccount = {
            cash: cash,
            coin: coin,
            bonus: bonus
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
      currentDate() {
        var date = new Date();
        var cyear = date.getFullYear(); //获取完整的年份(4位)
        var cmonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)

        if (cmonth < 10) {
          var new_month = cyear + '' + 0 + ''
            + cmonth
        } else {
          var new_month = cyear + '' + cmonth
        }
        return new_month;
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
        console.log(1)
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
      onSelectQishu({ mp }) {
        this.showQishu = false;
        this.qishuValue = mp.detail;
      },
      onSelect({ mp }) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        this.startTime = mp.detail;
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
      },
      oldQuery() {
        let _this = this;
        let { userName, storeCode, userCode } = _this.oldMember;
        if (userCode == '') {
          Toast('会员id不能为空')
          return false;
        }
        let params = {
          memberCode: userCode
        }
        _this.$api.apiConfig.member_get(params).then(data => {
          var res = data.member_get_response;
          var arr = Object.getOwnPropertyNames(res);
          if (arr.length == 0) {
            Toast.fail(data.msg);
            return false
          }
          _this.$set(this.oldMember, 'storeCode', res.storeCode);
          _this.$set(this.oldMember, 'userName', res.userName);
          Toast.success('查询成功');
        }).catch(e => {
          Toast.fail(e)
        })
      },
      paySubmit(id) {
        let _this = this;
        console.log(_this.venture)
        let params = {};
        if (_this.venture == 1) {
          params = {
            "tmporderId": _this.orderParams["id"],
            "period": 1,
            "repeatStartTime": _this.currentDate()
          }

        }
        if (_this.venture == 2) {
          params = {
            "tmporderId": _this.orderParams["id"],
            "period": _this.qishuValue.id,
            "repeatStartTime": _this.startTime.id
          }
        }
        // console.log(_this.startTime)
        _this.$api.apiConfig.tmporder_czkre_checkout(params).then(data => {
          let v1 = data.tmporder_czkre_checkout_response;
          var arr = Object.getOwnPropertyNames(v1);
          if (arr.length == 0) {
            Toast.fail(data.msg);
            return false;
          }
        }).catch(e => {

        })
        // this.active = id;
      },

    }
  };
</script>

<style lang="scss" src='./style.scss'>
</style>