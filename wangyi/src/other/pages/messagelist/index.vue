<template>
  <div class="newslist">
    <van-nav-bar title="消息中心">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
    </van-nav-bar>
    <scroll-view @scrolltoupper="refresh" @scrolltolower="loadMore" :style="{ height: second_height + 'px' }"
      class="scroll-view" scroll-y>
      <i-load-more tip="刷新" v-if='showRefresh' loading="true" />
      <div class="list">
        <div class="item" v-for="(item,index) in newsList " :key='index'>
          <div class="cont-left">
            <div @click='goDetail($event,item.id)' class="title">
              {{item.name}}
            </div>
            <div class="user">
              {{item.create_time}}
            </div>
          </div>
          <div class="right">
            <img :src="imgUrl" alt="">
          </div>
        </div>
      </div>
      <i-load-more v-if='hasData' tip="加载更多" loading="true" />
      <i-load-more v-if='!hasData' tip="没有了"  />
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
        loading:false,
        hideHeader: true,
        hideBottom: true,
        refreshTime: '', // 刷新的时间 
        contentlist: [], // 列表显示的数据源
        allPages: '',    // 总页数
        pageSize:10,
        currPageNo:1,  // 当前页数  默认是1
        loadMoreData: '加载更多……',
        showRefresh:false,
        hasData:true,
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
      this.get_list()
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
      get_list(){
                let _this=this;
                this.loading=true;
                let params={
                    _pageSize:this.pageSize,
                    _currPageNo:this.currPageNo
                }
                this.$api.apiConfig.getAmAnnounces(params).then(data=>{
                    let v1=data.amAnnounces;
                    _this.loading=false;
                    _this.showRefresh=false
                    _this.newsList=v1.map(v=>{
                        return {
                            name:v.subject,
                            id:v.aano,
                            create_time:v.create_time
                        }
                    })
                 
                    if(v1.length<10){
                      _this.hasData=false;
                    }
                }).catch(e=>{
                  this.loading=false;
                  this.showRefresh=false
                })
            },
      goDetail(event,id){
        this.$router.push({path:'/other/pages/messagedetails/index',query: {
            id: id
          }})
      },
      async refresh(){
           this.currPageNo=1;
           this.newsList=[];
           this.showRefresh=true
           await this.get_list();
           //this.showRefresh=false
      },
      loadMore:function loadMore() {
        let _this=this;
        if(!_this.hasData){
          return false;
        }
        this.currPageNo+=1;
        let params={
                    _pageSize:this.pageSize,
                    _currPageNo:this.currPageNo
                }
                this.$api.apiConfig.getAmAnnounces(params).then(data=>{
                    let v1=data.amAnnounces;
                    v1.map(v=>{
                      _this.newsList.push({
                        name:v.subject,
                        id:v.aano,
                        create_time:v.create_time
                       })
                    })
                    if(v1.length<10){
                      _this.hasData=false;
                    }
                })
      },
      onClickLeft() {
        this.$router.go(-1);
      },

    }

  };
</script>