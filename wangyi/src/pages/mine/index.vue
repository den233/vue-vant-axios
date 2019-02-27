<template>
  <div id="mineEntry">
    <div class="avatar-wrapper">
      <div><img :src="imgAvatrt||imgLazyload"></div>
      <div class="user-info">
        <span>{{userName}}</span>
        <!-- <div class="email"><span>1@11.com</span></div> -->
      </div>

      <div class="account">
        <div class="a1">
          <p>{{memberAccount.bonus}}</p>
          <p>奖金</p>
        </div>
        <div class="a1">
          <p>{{memberAccount.coin}}</p>
          <p>电子币</p>
        </div>
        <div class="a1">
          <p>{{memberAccount.cash}}</p>
          <p>现金账户</p>
        </div>
        <!-- <div class="a1">
          <p>{{memberAccount.pv}}</p>
          <p>积分</p>
        </div> -->
      </div>
    </div>
    <van-cell @click="goToMyOrder($event,0)" title="我的订单" is-link value="查看全部订单" />
    <div class="sub-nav">
      <div class="sub-nav-item" @click="goToMyOrder($event,1)">
        <div class="icon-wrapper">
          <i class="iconfont1 icon-dengdaizhifu"></i>
          <!-- <img src="../../assets/images/my/pay.png" slot="icon"> -->
        </div>
        <span class="text">待支付</span>
      </div>
      <div class="sub-nav-item" @click="goToMyOrder($event,2)">
        <div class="icon-wrapper">
          <i class="iconfont1 icon-my-pay"></i>
          <!-- <img src="../../assets/images/my/wait.png" slot="icon"> -->
        </div>
        <span class="text">待发货</span>
      </div>
      <div class="sub-nav-item" @click="goToMyOrder($event,3)">
        <div class="icon-wrapper">
          <i class="iconfont1 icon-daishouhuo"></i>
          <!-- <img src="../../assets/images/my/shouhuo.png" slot="icon"> -->
        </div>
        <span class="text">待收货</span>
      </div>
      <!-- <div class="sub-nav-item" @click="goWuliu($event,4)">
        <div class="icon-wrapper">
          <i class="iconfont1 icon-business-management"></i>
           <img src="../../assets/images/my/logist.png" slot="icon">
        </div>
        <span class="text">查看物流</span>
      </div> -->
    </div>
    <div class="list">
      <a href='/mingxi/pages/accountdetails/index'>
        <van-cell title="账户明细" is-link />
      </a>

      <ul class="account-item">
        <li class="li">
          <a href="/minepage/pages/transfer/index">
            <i class="iconfont1 icon-zhuanzhang1" style="color:#cc6633"></i>
            <span>转账</span>
          </a>
        </li>
        <li class="li">
          <a href="/minepage/pages/tixian/index">
            <i class="iconfont1 icon-tixian1" style="color:#ff6666"></i>
            <span>奖金提现</span>
          </a>
        </li class="li">

        <li class="li">
          <a href="/minepage/pages/wxcharge/index">
            <i class="iconfont1 icon-weixin" style="color:#339999"></i>
            <span>微信充值</span>
          </a>
        </li>
        <li class="li">
          <a href="/minepage/pages/myteam/index">
            <i class="iconfont1 icon-tuandui" style="color:#339999"></i>
            <span>我的团队</span>
          </a>
        </li>
        <li class="li">
          <a href="/minepage/pages/wxbinding/index">
            <i class="iconfont1 icon-weixin" style="color:#00cc00"></i>
            <span>微信绑定</span>
          </a>
        </li>
        <li class="li">
          <a href="/minepage/pages/basicinfo/index">
            <i class="iconfont1 icon-xinxi1" style="color:#663366"></i>
            <span>基本信息</span>
          </a>
        </li>
        <li class="li">
          <a href="/minepage/pages/bankcardbinding/index">
            <i class="iconfont1 icon-yinhangqia" style="color:#ffcc33"></i>
            <span>银行卡绑定</span>
          </a>
        </li>
        <li class="li">
          <a href="/minepage/pages/changepassword/index">
            <i class="iconfont1 icon-xiugai" style="color:#9999cc"></i>
            <span>修改密码</span>
          </a>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import store from '@/store'
  export default {
    data() {
      return {
        memberAccount: {
          cash: '0.00',
          coin: '0.00',
          bonus: '0.00'
        },
        imgAvatrt: "",
        imgLazyload: require('@/assets/images/404.jpg')
      }
    },
    onShow() {
      this.memberInfo();
    },
    methods: {
      goToMyOrder(e, index) {
        //console.log(index)
        store.commit('orderStatus', index)
        this.$router.push({ path: '/order/pages/myorder/index' });
      },
      goWuliu() {
        this.$router.push({ path: '/order/pages/logistics/index' });
      },
      memberInfo() {
        let _this = this;
        let userInfo = Megalo.getStorageSync('userInfo');
        try {
          const { avatarUrl } = userInfo;
          _this.imgAvatrt = avatarUrl;
          console.log(_this.imgAvatrt)
        } catch (e) {

        }

        let queryData = {};
        _this.$api.apiConfig.member_me_get(queryData).then(data => {
          let memberInfo = data.member_me_get_response;
          let { cash, coin, bonus, pv,userName } = memberInfo;
          _this.memberAccount = {
            cash: cash,
            coin: coin,
            bonus: bonus
          }
          _this.userName=userName;
        }).catch(e => {

        })
      }
    }
  };
</script>

<style lang="scss" src="./style.scss">

</style>