<template>
  <div id="listItem">
    <div class="top">
      订单编号：
      <span class="userName">{{detail.orderNumber}}</span>
      <span class="status">{{currentText}}</span>
    </div>
    <div class="desc">
      <img :src="detail.imgUrl || imgUrl"  />
      <div class="right">
        <div class='userCode'><span>用户编号：</span>{{detail.userCode}}</div>
        <div><span>收货人:</span>{{detail.receiverName}}</div>
        <div><span>收货电话</span>{{detail.receiverMobile}}</div>
        <div class="address"><span>收货地址：</span>{{detail.receiverState}} {{detail.receiverCity}} {{detail.receiverDistrict}} {{detail.receiverAddress}}</div>
        <div><span>下单时间：</span>{{detail.createdTime}}</div>
        <div class="money">
          <van-tag v-if='detail.orderType==22' color="#f2826a" plain >激活单</van-tag>
          <van-tag v-if='detail.orderType==21' color="#7232dd"  >重消单</van-tag>
          <van-tag v-if='detail.orderType==20' mark type="primary" >升级单</van-tag>
        </div>
      </div>
    </div>
    <div class="statistics van-hairline--bottom">
      PV: &nbsp<span class="pv">{{detail.totalPv}}</span> 合计：
      <span class="total">
         ￥ 
        {{detail.totalPrice}} 
      </span>
      
    </div>
    
    <div class="tool-bar">
      <van-button @click='getMenuID(detail)' type="primary">支付</van-button>
      <van-button @click='searchWuliu(detail)' type="default">查看物流</van-button>
    </div>
  
  </div>
</template>
<script> 
    export default {
      props: {
        currentStatus:'',
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
         currentText(){
           let newVal=this.currentStatus
          switch (newVal){
              case 0:
              return '';
              break;
              case 1:
              return '待支付';
              break;
              case 2:
              return '待发货';
              break;
              case 3:
              return '待收货';
              break;
              default :
              return '';
            }
         },
        item: function () {
          // `this` points to the vm instance
          return 111
        }
      },
      data() {
         return {
          imgUrl:require('@/assets/images/err.png')
          //currentText:'',
          
         }
      },
       
      methods: {
        searchWuliu(id){
          this.$emit('searchWuliu', id)
        },
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
<style lang="scss" src='./style.scss'>
</style>
