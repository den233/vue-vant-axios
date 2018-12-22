<template>
  <div id="mineEntry">
    <div class="avatar-wrapper">
       <div><img src="http://placehold.it/184x184"></div> 
      <div class="user-info">
          <span>陈不二</span>
          <div class="email"><span>1@11.com</span></div>
      </div>
    
      <router-link :to="{name:'mineSetting'}">
        <van-icon class="setting" name="setting" />
      </router-link>
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
    <van-cell @click.native="goToMyOrder" title="我的订单" is-link value="查看全部订单" />
    <div class="sub-nav">
      <subNavItem @click.native="goToMyOrder">
        <img src="./img/pay.png" slot="icon"> 待支付
      </subNavItem>
      <subNavItem @click.native="goToMyOrder" :info='5'>
        <img src="./img/wait.png" slot="icon"> 待发货
      </subNavItem>
      <subNavItem @click.native="goToMyOrder" :info='50'>
        <img src="./img/shouhuo.png" slot="icon"> 待收货
      </subNavItem>
    </div>
    <div class="list">
      <router-link :to="{name:'mineWallet'}">
        <van-cell title="账户明细" is-link value="" />
      </router-link>
      <ul class="account-item">
        <li>
            <router-link :to="{name:'account'}">
            <i class="iconfont1 icon-zhuanzhang1" style="color:#cc6633"></i>
            <span>转账</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{name:'tixian'}">
            <i class="iconfont1 icon-tixian1" style="color:#ff6666"></i>
            <span>奖金提现</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{name:'wxrecharge'}">
            <i class="iconfont1 icon-weixin" style="color:#0099cc"></i>
            <span>微信充值</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{name:'team'}">
            <i class="iconfont1 icon-tuandui" style="color:#339999"></i>
            <span>我的团队</span>
          </router-link>
        </li>
        <li>
            <router-link :to="{name:'wxbangding'}">
            <i class="iconfont1 icon-weixin" style="color:#00cc00"></i>
            <span>微信绑定</span>
          </router-link>
        </li>
        <li>
            <router-link :to="{name:'basicinfo'}">
            <i class="iconfont1 icon-xinxi1" style="color:#663366"></i>
            <span>基本信息</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{name:'bankcard'}">
            <i class="iconfont1 icon-yinhangqia" style="color:#ffcc33"></i>
            <span>银行卡绑定</span>
          </router-link>
        </li>
        <li>
            <router-link :to="{name:'password'}">
            <i class="iconfont1 icon-xiugai" style="color:#9999cc"></i>
            <span>修改密码</span>
          </router-link>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script>
export default {
  components: {
    subNavItem: {
      props: ['info'],
      render () {
        return (
          <div class="sub-nav-item">
            <div class="icon-wrapper">
              {this.info && <i class="info">{this.info}</i>}
              {this.$slots.icon}
            </div>
            <span class="text">{this.$slots.default}</span>
          </div>
        );
      }
    }
  },
  created () {},
  methods: {
    goToMyOrder () {
      this.$router.push({ name: 'OrderList' });
    }
  }
};
</script>

<style lang="scss" src='./index.scss'></style>
