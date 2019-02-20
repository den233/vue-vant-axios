<template>
  <div></div>
</template>
<style lang="scss">
  @font-face {
    font-family: 'iconfont1';
    /* project id 926396 */
    src: url('//at.alicdn.com/t/font_926396_2ggfkjjbiwf.eot');
    src: url('//at.alicdn.com/t/font_926396_2ggfkjjbiwf.eot?#iefix') format('embedded-opentype'),
      url('//at.alicdn.com/t/font_926396_2ggfkjjbiwf.woff2') format('woff2'),
      url('//at.alicdn.com/t/font_926396_2ggfkjjbiwf.woff') format('woff'),
      url('//at.alicdn.com/t/font_926396_2ggfkjjbiwf.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_926396_2ggfkjjbiwf.svg#iconfont1') format('svg');
  }

  .iconfont1 {
    font-family: "iconfont1" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-gonggao:before {
    content: "\e600";
  }

  .icon-my:before {
    content: "\e78b";
  }

  .icon-jiaotongyinxing:before {
    content: "\e692";
  }

  .icon-xingyeyinxing:before {
    content: "\e642";
  }

  .icon-huiyuanguanli:before {
    content: "\e64c";
  }

  .icon-pinganyinxing:before {
    content: "\e60f";
  }

  .icon-xinxi:before {
    content: "\e6e5";
  }

  .icon-tuandui:before {
    content: "\e67b";
  }

  .icon-huaxiayinxing:before {
    content: "\e603";
  }

  .icon-bianhao:before {
    content: "\e637";
  }

  .icon-zhongguogongshangyinxing:before {
    content: "\e61d";
  }

  .icon-jiansheyinxing:before {
    content: "\e656";
  }

  .icon-youzhengchuxuyinxing:before {
    content: "\e69e";
  }

  .icon-cart:before {
    content: "\e604";
  }

  .icon-dingdan1:before {
    content: "\e64a";
  }

  .icon-pufayinhang:before {
    content: "\e609";
  }

  .icon-huiyuan:before {
    content: "\e715";
  }

  .icon-hot:before {
    content: "\e655";
  }

  .icon-shop:before {
    content: "\e63a";
  }

  .icon-xiangqing:before {
    content: "\e639";
  }

  .icon-yonghubianhao:before {
    content: "\e8c8";
  }

  .icon-dengdaizhifu:before {
    content: "\e626";
  }

  .icon-guangfayinhang:before {
    content: "\e61a";
  }

  .icon-zhaoshangyinhang:before {
    content: "\e68b";
  }

  .icon-yue:before {
    content: "\e612";
  }

  .icon-xinxi1:before {
    content: "\e645";
  }

  .icon-tubiaozhizuomoban1:before {
    content: "\e646";
  }

  .icon-nongyeyinhang:before {
    content: "\e615";
  }

  .icon-tubiaozhizuomoban:before {
    content: "\e608";
  }

  .icon-zhuanzhang:before {
    content: "\e607";
  }

  .icon-my-pay:before {
    content: "\e611";
  }

  .icon-jiangsuyinhang:before {
    content: "\e60e";
  }

  .icon-yewumokuai:before {
    content: "\e636";
  }

  .icon-tixian:before {
    content: "\e66a";
  }

  .icon-weixin:before {
    content: "\e703";
  }

  .icon-gaiicon-:before {
    content: "\e6d0";
  }

  .icon-jiangjinbi:before {
    content: "\e65d";
  }

  .icon-yinhangqia:before {
    content: "\e66b";
  }

  .icon-minsheng:before {
    content: "\e610";
  }

  .icon-coin:before {
    content: "\e619";
  }

  .icon-daishouhuo:before {
    content: "\e60d";
  }

  .icon-xiaolian:before {
    content: "\e60b";
  }

  .icon-shaixuan-shanxuan:before {
    content: "\e707";
  }

  .icon-wushuju:before {
    content: "\e627";
  }

  .icon-shangcheng:before {
    content: "\e65a";
  }

  .icon-xinxi2:before {
    content: "\e61c";
  }

  .icon-zhongguoyinhang:before {
    content: "\e650";
  }

  .icon-pinganyinhang:before {
    content: "\e68d";
  }

  .icon-btb-message:before {
    content: "\e861";
  }

  .icon-business-management:before {
    content: "\e6c3";
  }

  .icon-daishou:before {
    content: "\e617";
  }

  .icon-hongbao003:before {
    content: "\e60a";
  }

  .icon-huiyuan1:before {
    content: "\e966";
  }

  .icon-jiating:before {
    content: "\e6a2";
  }

  .icon-icon-guangdayinhang:before {
    content: "\e605";
  }

  .icon-ffanhui-:before {
    content: "\e6b1";
  }

  .icon-jiangjin:before {
    content: "\e60c";
  }

  .icon-zhongxinyinhang:before {
    content: "\e64d";
  }

  .icon-tian:before {
    content: "\e613";
  }

  .icon-gouwuche:before {
    content: "\e602";
  }

  .icon-shouye:before {
    content: "\e606";
  }

  .icon-zhuanzhang1:before {
    content: "\e62f";
  }

  .icon-dingdan:before {
    content: "\e641";
  }

  .icon-yonghuming:before {
    content: "\e67d";
  }

  .icon-tixian1:before {
    content: "\e64b";
  }

  .icon-xiugai:before {
    content: "\e601";
  }
</style>
<script>
  export default {
    onLaunch() {
      console.log('app onLaunch', this)
      console.log('打印环境变量:', process.env.VUE_APP_TEST)
     // this.$router.push({ path: '/minepage/pages/changepassword/index'})
    },
    globalData: {
      appid: 'wxbdd37c6ae2baf12b',//appid需自己提供，此处的appid我随机编写
      secret: 'e0dassdadef2424234209bwqqweqw123ccqwa',//secret需自己提供，此处的secret我随机编写

    },
  }
</script>