<template>
  <div class="newslist">
    <van-nav-bar title="消息中心">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
    </van-nav-bar>
    <scroll-view @scrolltoupper="refresh" @scrolltolower="loadMore" :style="{ height: second_height + 'px' }"
      class="scroll-view" scroll-y>
      <i-load-more tip="刷新" loading="true" />
      <div class="list">
        <div class="item" v-for="(item,index) in newsList " :key='index'>
          <div class="cont-left">
            <div class="title">
              {{item.title}}
            </div>
            <div class="user">
              {{item.user}}
            </div>
          </div>
          <div class="right">
            <img :src="imgUrl" alt="">
          </div>
        </div>
      </div>
      <i-load-more tip="加载更多" loading="true" />
      <i-load-more tip="没有了" loading="true" />
    </scroll-view>

  </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script>
  export default {
    data() {
      return {
        second_height: 0,
        newsList: [],
        hideHeader: true,
        hideBottom: true,
        refreshTime: '', // 刷新的时间 
        contentlist: [], // 列表显示的数据源
        allPages: '',    // 总页数
        currentPage: 1,  // 当前页数  默认是1
        loadMoreData: '加载更多……',
        imgUrl: require('@/assets/images/err.png')
      }
    },
    onLoad: function () {
      console.log('onLoad')
      var that = this
      // 获取系统信息
      wx.getSystemInfo({
        success: function (res) {
          console.log(res);
          // 可使用窗口宽度、高度
          console.log('height=' + res.windowHeight);
          console.log('width=' + res.windowWidth);
          // 计算主体部分高度,单位为px

          // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
          that.second_height = res.windowHeight - 50

        }
      })
    },
    mounted() {
      //console.log(data.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2"))
      this.initdata()
    },
    async onPullDownRefresh() {
      // to doing..
      // 停止下拉刷新
      console.log(1)
      wx.stopPullDownRefresh();
    },
    // 上拉加载，拉到底部触发
    onReachBottom() {
      // 到这底部在这里需要做什么事情
      let _this = this;
      console.log(111)
      // _this.getMore();
    },
    methods: {
      initdata() {
        this.newsList = [
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
          { title: 'iiiiiissssssssssq试试', user: '隆力奇' },
        ]
      },
      refresh:function refresh(){

      },
      loadMore:function loadMore() {
        for (let i = 0; i < 10; i++) {
          this.newsList.push({
            title: 'iiiiiissssssssssq试试', user: '隆力奇'
          })
        }
      },
      onClickLeft() {
        this.$router.go(-1);
      },

    }

  };
</script>