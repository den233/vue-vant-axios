<template>
  <div id="orderDetail">
    <van-nav-bar title="待支付激活单">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
      <!-- <div class='view_d' slot='right' @click="onClickRight">新增</div> -->
    </van-nav-bar>
    <div class="form">
      <van-steps :steps="steps" :active="active">
      </van-steps>
      <div class="step1" v-if='active==0'>
        <van-cell-group class="van-radio-group">
          <van-field @change="onChangeSale" :value="formItem.saleMan" center clearable label="销售人编号" placeholder="销售人编号"
            use-button-slot>
            <van-button slot='button' @click='searchXiaoshou' size="small" type="primary">查询</van-button>
          </van-field>
          <van-field @change="onChangeService" :value="formItem.serviceMan" center clearable label="服务人编号" placeholder="服务人编号"
            use-button-slot>
            <van-button slot='button' @click='searchFuwu' size="small" type="primary">查询</van-button>
          </van-field>
          <div class="btn-group">
            <van-button id='nextStep1' @click='nexHandle(1)' type="primary">下一步</van-button>
          </div>
        </van-cell-group>

      </div>
      <div class="step2" v-if='active==1'>
        <label for="">会员类型</label>
        <van-radio-group @change='changeMember' :value="tabactive">
          <van-radio name="0">新会员</van-radio>
          <van-radio name="1">老会员</van-radio>
        </van-radio-group>
        <van-cell-group v-if='tabactive==0'>
          <van-field :value="formItem.userName" center clearable label="会员姓名" placeholder="会员姓名">

          </van-field>
          <van-field :value="formItem.paperNum" center clearable label="身份证" placeholder="身份证">
          </van-field>
        </van-cell-group>
        <van-cell-group v-if='tabactive==1'>
          <van-field @change='memderId' :value="oldMember.userCode" center clearable label="会员ID" placeholder="会员ID" use-button-slot>
            <van-button @click='oldQuery' slot="button" size="small" type="primary">查询</van-button>
          </van-field>
          <van-field readonly :value="oldMember.serviceNum" center clearable label="服务机构编号" placeholder="服务机构编号">
          </van-field>
          <van-field readonly :value="oldMember.userName" center clearable label="姓名" placeholder="姓名">
          </van-field>
        </van-cell-group>
        <van-cell v-if='venturefund' class="sex-cell" title='使用创业基金' is-link>
          <div class="gender-wrapper">
            否 &nbsp;
            <van-switch @change="changeFunder" :checked="usefunder" />&nbsp; 是
          </div>
        </van-cell>
        <div class="btn-group">
          <van-button @click='preveHandle(0)' type="primary">上一步</van-button>
          <van-button @click='paySubmit(2)' type="warning">确认支付</van-button>
        </div>
      </div>

      <div class="step4" v-if='active==2'>
        <van-icon name="passed" />
        <p>恭喜支付完成</p>
        订单编号：xxxxxx
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
      <van-button @click="onCopy" class="copy" style="width:auto">复制单号 </van-button>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Toast from 'staticA/vant/toast/toast';
  export default {
    data() {
      return {
        active: 0,
        tabactive: '0',
        $img: this.$img,
        usefunder: false,
        venturefund:false,
        recommendNo: {
          isCz: '',
          totalSubnodes: '',
          userCode: '',
          userName: '',
          submitOn: false
        },
        linkNo: {
          isCz: '',
          totalSubnodes: '',
          userCode: '',
          userName: '',
          submitOn: false
        },
        steps: [
          { text: '填写推荐人' },
          { text: '填写基本信息' },
          { text: '支付完成' }
        ],
        itemDetail: {},
        orderParams: {
          id: '',
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
        },
        venture: '1',//创业基金
        memberAccount: {},
        formItem: {
          userName: '',
          paperNum: ''
        },
        oldMember: {
          userCode: '',
          userName: '',
          serviceNum: ''
        }

      };
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
      },
      ...mapState((['home']))
    },
    onShow() {
      this.onLoad()
      this.initData();
      this.memberInfo();
      //console.log(this.$route.params)
    },
    //     watch:{
    //       recommendNo:{
    //         handler(newValue, oldValue) {
    // 　　　　　　this.formItem.old.serviceNum= newValue.userName
    // 　　　　},
    // 　　　　deep: true
    //       }
    //     },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      onChangeSale({ mp }) {
        if (this.formItem.saleMan == mp.detail) {
          return false
        }
        this.recommendNo = {
          isCz: '',
          totalSubnodes: '',
          userCode: '',
          userName: '',
          submitOn: false
        }
        this.formItem.saleMan = mp.detail;
      },
      onChangeService({ mp }) {
        if (this.formItem.serviceMan == mp.detail) {
          return false
        }
        this.linkNo = {
          isCz: '',
          totalSubnodes: '',
          userCode: '',
          userName: '',
          submitOn: false
        },
          this.formItem.serviceMan = mp.detail;
      },
      onLoad() {
        this.active = 0;
        this.tabactive = '0';
        this.usefunder = false;
        this.venturefund=false;
        this.recommendNo = {
          isCz: '',
          totalSubnodes: '',
          userCode: '',
          userName: '',
          submitOn: false
        },
          this.linkNo = {
            isCz: '',
            totalSubnodes: '',
            userCode: '',
            userName: '',
            submitOn: false
          };
        this.itemDetail = {};
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
        this.venture = '1'
        this.memberAccount = {};
        this.formItem = {
          userName: '',
          paperNum: '',
        }
        this.oldMember = {
          userName: '',
          serviceNum: '',
          userCode: '',
        }
      },
      memderId({mp}){
        this.oldMember.userCode=mp.detail;
      },
      initData() {
        let _this = this;
        _this.payOrderInfo = this.home.payOrderInfo;

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
      memberInfo() {
        let _this = this;
        let queryData = {};
        _this.$api.apiConfig.member_me_get(queryData).then(data => {
          console.log(data)
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
      onCopy(e) {
        var self = this;
        console.log(self.orderParams.orderNumber)
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
      changeFunder({ detail }) {
        this.usefunder = detail;
      },
      onSubmit() {

      },
      preveHandle(id) {
        this.active = id;
      },
      nexHandle(id) {
        // if(!this.recommendNo.submitOn){
        //   Toast('请先查询销售人编号是否存在')
        //   return false;
        // }
        // if(!this.linkNo.submitOn){
        //   Toast('请先查询服务人编号是否存在')
        //   return false;
        // }
        console.log(this.recommendNo)

        // this.oldMember.serviceNum=this.recommendNo.userCode;
        this.$set(this.oldMember, 'serviceNum', this.recommendNo.userCode)
        this.active = id;
      },
      paySubmit(id) {
        let _this = this;
        let params = {
          "tmporderId": _this.orderParams.id,
          "venturefund": _this.usefunder,
          "recommendCode": _this.recommendNo.userCode,
          "linkCode": _this.linkNo.userCode,
          "register": {
            "paperNumber": _this.formItem.paperNum,
            "memberName": _this.formItem.userName
          }
        };
        console.log(_this.tabactive)
        if (_this.tabactive == 1) {
          params.register = {
            memberCode: _this.oldMember.serviceNum
          }
        }
        _this.$api.apiConfig.tmporder_czk_checkout(params).then(data => {
          let res = data['tmporder_czk_checkout_response'];
          let arr = Object.getOwnPropertyNames(res);
          if (arr.length == 0) {
            Toast.fail(data.msg);
            return false;
          }
          Toast.success("支付成功");
          this.finishOrderNum = res['orderNumber']
        }).catch(e => {
          Toast.fail(e);
        })
        this.active = id;
      },
      changeMember({ detail }) {
        this.tabactive = detail;
      },
      searchXiaoshou() {
        let _this = this;
        let { saleMan, serviceMan, userName, paperNum, old } = _this.formItem;
        _this.recommendNo = {
          isCz: '',
          totalSubnodes: '',
          userCode: '',
          userName: '',
          submitOn: false
        }
        if (saleMan == '') {
          Toast('销售人不存在')
          return false;
        }
        let params = {
          recommendNo: saleMan
        }
        _this.$api.apiConfig.member_recommendno_get(params).then(data => {
          var member_linkno = data.member_recommendno_get_response;
          var arr = Object.getOwnPropertyNames(member_linkno);
          if (arr.length == 0) {
            Toast('销售人不存在');
            return false;
          }
          if (member_linkno.totalSubnodes && member_linkno.totalSubnodes > 1) {
            Toast('销售人节点已满')
            return false;
          }
          _this.recommendNo = {
            isCz: member_linkno.isCz,
            totalSubnodes: member_linkno.totalSubnodes,
            userCode: member_linkno.userCode,
            userName: member_linkno.userName,
            submitOn: true
          }
          Toast.success('销售人：' + member_linkno.userName);

        }).catch(e => {
          Toast.fail(e)
        })
      },
      searchFuwu() {
        let _this = this;
        let { saleMan, serviceMan, userName, paperNum, old } = _this.formItem;
        _this.linkNo = {
          isCz: '',
          totalSubnodes: '',
          userCode: '',
          userName: '',
          submitOn: false
        },
          console.log('saleMan', saleMan)
        if (serviceMan == '') {
          Toast('服务人不存在')
          return false;
        }
        let params = {
          linkNo: serviceMan
        }
        _this.$api.apiConfig.member_linkno_get(params).then(data => {
          var member_linkno = data.member_linkno_get_response;
          var arr = Object.getOwnPropertyNames(member_linkno);
          if (arr.length == 0) {
            Toast('服务人不存在')
            return false;
          }
          if (member_linkno.totalSubnodes && member_linkno.totalSubnodes > 1) {
            Toast('服务人节点已满')
            return false;
          }
          _this.linkNo = {
            isCz: member_linkno.isCz,
            totalSubnodes: member_linkno.totalSubnodes,
            userCode: member_linkno.userCode,
            userName: member_linkno.userName,
            submitOn: true
          }
          Toast.success(member_linkno.userName);
        }).catch(e => {
          Toast(e)
        })
      },
      oldQuery() {
        let _this = this;
        let { userName, serviceNum, userCode } = _this.oldMember;
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
           _this.$set(this.oldMember, 'userName', res.userName);
            Toast.success('查询成功');
          }).catch(e => {
            Toast.fail(e)
          })
      }

    }
  };
</script>

<style lang="scss" src='./style.scss'>
</style>