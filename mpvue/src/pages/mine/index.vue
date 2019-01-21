<template>
  <div id="mineEntry">
    <div class="avatar-wrapper">
      <div><img src="http://placehold.it/184x184"></div>
      <div class="user-info">
        <span>陈不二</span>
        <div class="email"><span>1@11.com</span></div>
      </div>

      <div class="account">
        <div class="a1">
          <p>12.5</p>
          <p>奖金</p>
        </div>
        <div class="a1">
          <p>12.5</p>
          <p>电子币</p>
        </div>
        <div class="a1">
          <p>200000</p>
          <p>现金账户</p>
        </div>
        <div class="a1">
          <p>200000</p>
          <p>积分</p>
        </div>
      </div>
    </div>
    <van-cell @click="goToMyOrder($event,0)" title="我的订单" is-link value="查看全部订单" />
    <div class="sub-nav">
      <div class="sub-nav-item" @click="goToMyOrder($event,1)">
        <div class="icon-wrapper" >
          <img src="../../assets/images/my/pay.png" slot="icon">
        </div>
        <span class="text">待支付</span>
      </div>
      <div class="sub-nav-item" @click="goToMyOrder($event,2)">
        <div class="icon-wrapper" >
          <img src="../../assets/images/my/wait.png" slot="icon">
        </div>
        <span class="text">待发货</span>
      </div>
      <div class="sub-nav-item" @click="goToMyOrder($event,3)">
        <div class="icon-wrapper">
          <img src=../../assets/images/my/shouhuo.png" slot="icon">
        </div>
        <span class="text">待收货</span>
      </div>
      <div class="sub-nav-item" @click="goWuliu($event,4)">
          <div class="icon-wrapper">
            <img src="../../assets/images/my/logist.png" slot="icon">
          </div>
          <span class="text">查看物流</span>
        </div>
    </div>
    <div class="list">
      <a href='/pages/accountdetails/main'>
        <van-cell title="账户明细" is-link />
      </a>

      <ul class="account-item">
        <li>
          <a href="/pages/transfer/main">
            <i class="iconfont1 icon-zhuanzhang1" style="color:#cc6633"></i>
            <span>转账</span>
          </a>
        </li>
        <li>
          <a href="/pages/tixian/main">
            <i class="iconfont1 icon-tixian1" style="color:#ff6666"></i>
            <span>奖金提现</span>
          </a>
        </li>
        <li>
          <a href="/pages/wxcharge/main">
            <i class="iconfont1 icon-weixin" style="color:#0099cc"></i>
            <span>微信充值</span>
          </a>
        </li>
        <li>
          <a href="/pages/myteam/main">
            <i class="iconfont1 icon-tuandui" style="color:#339999"></i>
            <span>我的团队</span>
          </a>
        </li>
        <li>
          <a href="/pages/wxbinding/main">
            <i class="iconfont1 icon-weixin" style="color:#00cc00"></i>
            <span>微信绑定</span>
          </a>
        </li>
        <li>
          <a href="/pages/basicinfo/main">
            <i class="iconfont1 icon-xinxi1" style="color:#663366"></i>
            <span>基本信息</span>
          </a>
        </li>
        <li>
          <a href="/pages/bankcardbinding/main">
            <i class="iconfont1 icon-yinhangqia" style="color:#ffcc33"></i>
            <span>银行卡绑定</span>
          </a>
        </li>
        <li>
          <a href="/pages/changepassword/main">
            <i class="iconfont1 icon-xiugai" style="color:#9999cc"></i>
            <span>修改密码</span>
          </a>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  export default {
    created() { },
    methods: {
      goToMyOrder(e,index) {
        this.$store.commit('orderStatus',index)
        this.$router.push({ path: '/pages/myorder/main' });
      },
      goWuliu(){
        this.$router.push({ path: '/pages/logistics/main' });
      },
     
    }
  };
</script>

<style lang="scss" src="./style.scss">

</style>