<template>
  <div class="wuliu">
      <van-nav-bar
      title="物流查询"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="searchtop">
        <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch">
            <div slot="action" @click="onSearch">查询</div>
        </van-search>
    </div>
    <van-cell title="订单编号"   value="56698855" />
    <div class="card">
       <div class="imgs">
          <img src="./img/logist.png" alt="">
       </div>
       <div class="content">
          <div class="title">物流公司：<span>{{name}}</span></div>
          <div class="title">物流单号：<span>{{orderNum}}</span> <van-button type="default"  v-clipboard:copy="orderNum"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"  size="mini">复制</van-button></div>
          <div class="title">物流电话：<span style="color:#45adff">{{tel}}</span></div>
       </div>
    </div>
    <van-cell title="物流状态"   value="运输中" />
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
        data () {
          return {
            value:'',
            orderNum:'444447888',
            name:'百世快递',
            tel:'95320'
          };
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            onSearch(){
              alert(1)
            },
            onCopy(){

            },
            onError(){
              
            }
        }
      };
</script>
<style lang="scss" src='./index.scss'></style>