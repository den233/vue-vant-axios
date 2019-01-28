<template>
  <div class="wuliu">
    <van-nav-bar title="物流查询">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
    </van-nav-bar>
    <div class="searchtop">
      <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch">
        <div slot="action" @click="onSearch">查询</div>
      </van-search>
    </div>
    <van-cell title="订单编号" value="56698855" />
    <div class="card">
      <div class="imgs">
        <img src="../../../assets/images/my/logist.png" alt="">
      </div>
      <div class="content">
        <div class="title">物流公司：<span>{{name}}</span></div>
        <div class="title">物流单号：<span>{{orderNum}}</span>
          <van-button type="default" @click="onCopy" size="mini">复制</van-button>
        </div>
        <div class="title">物流电话：<span style="color:#45adff">{{tel}}</span></div>
      </div>
    </div>
    <van-cell title="物流状态" value="运输中" />
    <van-steps  direction="vertical" :steps="steps" :active="active" active-color="#f44" />
    <van-steps direction="vertical" :active="0" active-color="#f44">
      <van-step>
        <h3>【城市】物流状态1</h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step>
        <h3>【城市】物流状态2</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>快件已发货</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
    </van-steps>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        orderNum: '444447888',
        name: '百世快递',
        tel: '95320',
        steps: [
          {
            text: '【城市】物流状态1',
            desc: '2016-07-10 09:30'
          },
          {
            text: '步骤二',
            desc: '描述信息'
          },
          {
            text: '步骤三',
            desc: '描述信息'
          },
          {
            text: '步骤四',
            desc: '描述信息'
          }
        ]
      };
    },
    onShow(){
       console.log(this.$route.query.id)  
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      onCopy(e) {
        var self = this;
        console.log(self.orderNum)
        wx.setClipboardData({
          data: self.orderNum,
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
      onSearch() {
        alert(1)
      },
      onError() {

      }
    }
  };
</script>
<style lang="scss" src='./style.scss'></style>