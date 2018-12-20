<template>
  <div id="listItem">
    <div class="top">
      订单编号：
      <span class="userName">{{detail.orderNumber}}</span>
      <span class="status">{{detail.statusName}}</span>
    </div>
    <div class="desc">
      <img :src='detail.imgUrl' />
      <div class="right">
        <h6 class="title van-ellipsis">{{detail.servericeName}}</h6>
        <span class="titleName"> {{detail.productName}}</span>
        <span>下单时间：{{detail.createdTime}}</span>
        <span class="money">
          <van-tag v-if='detail.orderType==22' color="#f2826a" plain >激活单</van-tag>
          <van-tag v-if='detail.orderType==21' color="#7232dd"  >重消单</van-tag>
          <van-tag v-if='detail.orderType==20' mark type="primary" >升级单</van-tag>
        </span>
      </div>
    </div>
    <div class="statistics van-hairline--bottom">
      PV: <span class="pv">{{detail.totalPv}}</span> 合计：
      <span class="total">
        <i>￥</i>
        <span>{{detail.totalPrice}}</span>
      </span>
      <span class="end-text"> 元(含保险)</span>
    </div>
    
    <div class="tool-bar">
      <van-button @click='getMenuID(detail)' type="primary">支付</van-button>
    </div>
  
  </div>
</template>
<script> 
    export default {
      props: {
        detail: { type: Object, default: () => ({}) },
        descClick: {
          type: Function, default: (res) => {
            return {
              res: '111'
            }
          }
        },
        needToolBar: { type: Boolean }
      },
      computed: {
        // a computed getter
        item: function () {
          // `this` points to the vm instance
          return 111
        }
      },
      methods: {
        getMenuID(id) {
          this.$emit('descList', id)
        }
      },
    }
</script>
<!-- <script>
   export default{
    render: function (createElement) {
      return createElement('div',
        Array.apply(null, { length: 20 }).map(function () {
          return createElement('p', 'hi')
        })
      )
    }
    render (h) {
    var self = this
       return h('div', {
          domProps: {
            value: self.value
          },
          on: {
            click: function (event) {
              console.log(4)
              self.$emit('descList', '55')
            }
          }
          
        }
        
        ,'888')
    }
   }
</script> -->
<!-- <script>
  export default {
    functional: true,
    props: {
      detail: { type: Object, default: () => ({}) },
       descClick: {
         type: Function, default: (res) => {
          return {
             res: '111'
           }
         }
       },
      needToolBar: { type: Boolean }
    },
    methods: {
      getMenuID(id) {
        // 7. 使用$emit 将子组件获取的id值传给父组件
        this.$emit('getID', id)
      }
    },
  
    render(h, { props }) {
      var _self=this;
      const { detail, descClick, needToolBar } = props;
      var item = '';
      if (detail.orderType == 22) {
        var item = <van-tag color="#f2826a" plain >激活单</van-tag>
      }
      if (detail.orderType == 21) {
        var item = <van-tag color="#7232dd"  >重消单</van-tag>
      }
      if (detail.orderType == 20) {
        var item = <van-tag mark type="primary" >升级单</van-tag>
      }
      var btn = <van-button onClick={descClick} type="primary">支付</van-button>;
        
      return h('a', {
        domProps: {

        },
        on: {
          click:()=>{
            alert(4);
            this.getMenuID(11);
          }
            
        },
        style: {
          marginRight: '5px'
        }
      }, '文件' + 111)

      return (
        <div id="listItem">
          <div class="top">
             订单编号：
            <span class="userName">{detail.orderNumber}</span>
            <span class="status">{detail.statusName}</span>
          </div>
          <div class="desc"  >
            <img src={detail.imgUrl} />
            <div class="right">
              <h6 class="title van-ellipsis">{detail.servericeName}</h6>
              <span class="titleName"> {detail.productName}</span>
              <span>下单时间：{detail.createdTime}</span>
              <span class="money"  >
                {item}
              </span>
            </div>
          </div>
          <div class="statistics van-hairline--bottom">
            PV: <span class="pv">{detail.totalPv}</span> 合计：
            <span class="total">
              <i>￥</i>
              <span>{(detail.totalPrice)}</span>
            </span>
            <span class="end-text"> 元(含保险)</span>
          </div>
          {needToolBar && (
            <div class="tool-bar">
               {btn}

            </div>
          )}
        </div>
      );
    }
  };
</script> -->
<style lang="scss">
  @import '~@/assets/css/function.scss';
  @import '~@/assets/css/variable.scss';

  $paddingLeftAndRight: half(27px);

  #listItem {
    margin-bottom: half(10px);

    .top {
      display: flex;
      align-items: center;
      font-size: half(24px);
      height: half(82px);
      padding-left: $paddingLeftAndRight;
      padding-right: $paddingLeftAndRight;
      background-color: #fff;

      img {
        width: half(70px);
        height: half(70px);
        border-radius: 50%;
        margin-right: half(8px);
      }

      .userName {
        color: #626b77;
      }

      .status {
        color: #fc8a04;
        margin-left: auto;
      }
    }

    .desc {
      display: flex;
      padding: half(23px) $paddingLeftAndRight 0;

      .titleName {
        color: #333;
        font-size: half(36px);
      }

      img {
        width: half(170px);
        height: half(170px);
        margin-right: half(16px);
      }

      .right {
        display: flex;
        font-size: half(22px);
        color: #bbc0cb;
        flex: 1;
        flex-direction: column;

        .title {
          max-width: half(474px);
          font-size: half(28px);
          color: $font-color-black;
        }

        .money {
          align-self: flex-end;
          font-size: half(28px);
          color: $font-color-black;
        }
      }
    }

    .statistics {
      display: flex;
      height: half(75px);
      background-color: #fff;
      font-size: half(26px);
      align-items: center;
      justify-content: flex-end;
      padding-right: $paddingLeftAndRight;

      .pv {
        color: #fc8a04;
        font-size: half(36px);
        margin-right: 15px;
      }

      .total {
        font-size: half(36px);
        color: #fc8a04;

        i {
          font-style: normal;
          font-size: half(26px);
        }
      }

      .end-text {
        font-size: half(24px);
      }
    }

    .tool-bar {
      display: flex;
      height: half(80px);
      justify-content: flex-end;
      align-items: center;
      padding-right: $paddingLeftAndRight;
      background-color: #fff;

      .van-button {
        height: half(52px);
        line-height: half(52px);
        width: auto;
      }
    }
  }
</style>