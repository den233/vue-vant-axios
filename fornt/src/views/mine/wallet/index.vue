<template>
  <div id="mineWallet">
    <van-nav-bar title="我的账户" left-text="返回"  left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="header">
      <div class="list">
        <div class="a1">
            <div class="title">
                奖金
              </div>
          <div class="icons">
           <img src="./img/jiang.png" alt="">
          </div>
          
          <div class="num">1223</div>
        </div>
        <div class="a1" >
            <div class="title">
                电子币
              </div>
          <div class="icons">
            <img src="./img/coin.png" alt="">
          </div>
         
          <div class="num">1223</div>
        </div>
        <div class="a1">
            <div class="title">
                现金账户
              </div>
          <div class="icons">
            <img src="./img/xianjin.png" alt="">
          </div>
         
          <div class="num">1223</div>
        </div>
        <div class="a1">
            <div class="title">
                积分账户
              </div>
          <div class="icons">
            <img src="./img/pv.png" alt="">
          </div>
         
          <div class="num">1223</div>
        </div>
      </div>
    </div>
    <div class="cell-group">
      <van-cell title="奖金明细" @click='gotoDetail("profit")' is-link value="更多" />
      <van-cell title="电子币明细" @click='gotoDetail("coin")' is-link value="更多" />
      <van-cell title="现金明细" @click='gotoDetail("xianjin")' is-link value="更多" />
      <van-cell id="coin" title="积分明细" @click='gotoDetail("pv")' is-link value="更多" />
      <van-cell title="提现记录" @click='gotoDetail("cashreport")' is-link value="更多" />
      <van-cell title="转账记录" @click='gotoDetail("transport")' is-link value="更多" />
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    created() { },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      onClickRight() {

      },
      gotoDetail(id){
        console.log(id)
          this.$router.push({name:id})
      }
    }
  };
</script>

<style lang="scss" src='./index.scss'></style>