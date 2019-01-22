<template>
  <div class="account">
    <van-nav-bar title="添加银行卡">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
    </van-nav-bar>
    <van-cell-group>

      <van-field v-model="cardNum" required label="银行卡号" placeholder="请输入银行卡号" />
      <van-cell :value="cardName" is-link @click='pickHandle'>
        <template slot="title">
          <span class="custom-text">选择银行</span>
        </template>
        <i slot='icon' :class='iconClass' class='van-icon van-cell__left-icon iconfont1'></i>
      </van-cell>
    </van-cell-group>
    <div style="text-align: center;width: 100%;margin-top:20px;">
      <van-button size="large" type="primary">确定</van-button>
    </div>
    <van-popup :show="show" position="bottom" :overlay="false">
      <van-picker show-toolbar title="银行卡列表" :columns="columns" @cancel="onCancel" @confirm="onConfirm($event,index)" />
    </van-popup>
  </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script>
  export default {
    data() {
      return {
        cardNum: '',
        iconClass: 'icon-zhongguoyinhang',
        cardList: [],
        columns: [],
        show: false,
        cardName: '中国银行'
      }
    },
    mounted() {
      this.initdata();
    },

    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      initdata() {
        this.cardList = [
          { name: '中国银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 0, fontClass: 'icon-zhongguoyinhang' },
          { name: '中国工商银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 0, fontClass: 'icon-zhongguogongshangyinxing' },
          { name: '江苏银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-jiangsuyinhang' },
          { name: '中信银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-zhongxinyinhang' },
          { name: '光大银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-icon-guangdayinhang' },
          { name: '农业银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-nongyeyinhang' },
          { name: '招商银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-zhaoshangyinhang' },
          { name: '广发银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-guangfayinhang' },
          { name: '浦发银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-pufayinhang' },
          { name: '邮政储蓄银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-youzhengchuxuyinxing' },
          { name: '建设银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-jiansheyinxing' },
          { name: '华夏银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-huaxiayinxing' },
          { name: '交通银行', typeName: '储蓄卡', cardNum: '3265986532146598', type: 1, fontClass: 'icon-jiaotongyinxing' }
        ]
        for (var i = 0, len = this.cardList.length; i < len; i++) {
          this.columns.push(this.cardList[i].name);
        }
      },
      pickHandle() {
        this.show = true;
      },
      onCancel() {
        this.show = false;
      },
      onConfirm({ mp }) {
        this.cardName = mp.detail.value;
        var index = mp.detail.index;
        this.iconClass = this.cardList[index].fontClass;
        this.show = false;

      }
    }

  };
</script>