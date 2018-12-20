<template>
  <div id="OrderList">
    <van-tabs v-model="currentStatus" sticky>
      <van-tab v-for="(item,index) in statusList" :title="item.name" :key="item.value">
        <listItem v-if="index === currentStatus" v-for="order in orderList" needToolBar :key="order.id" :detail='order' @descList='goToOrderDetail' />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import listItem from '../components/list-item';
export default {
  components: {
    listItem
  },
  data () {
    return {
      statusList: [
        {
          name: '全部订单',
          value: 0
        },
        {
          name: '待支付',
          value: 1
        },
        {
          name: '待发货',
          value: 2
        },
        {
          name: '待收货',
          value: 3
        }
        
      ],
      currentStatus: 0,
      orderList: [
        {
          id: '11112',
          status: 1,
          statusName: '待支付',
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545131441716&di=a412458cd1103481683290ef3817cf01&imgtype=0&src=http%3A%2F%2Fs13.sinaimg.cn%2Fmw690%2F006SPSaCzy7pbLrzI9Cfc%26690',
          createdTime: '2018-07-24 09:00',
          totalPrice: 120,
          totalPv:10000,
          orderNumber:'DDSSAW222SDS345',
          orderType:'20',
          orderName:'激活单',
          productName:'健康排毒营奢华套餐'
        },
        {
          id: '111121',
          status: 1,
          statusName: '待支付',
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545131441716&di=a412458cd1103481683290ef3817cf01&imgtype=0&src=http%3A%2F%2Fs13.sinaimg.cn%2Fmw690%2F006SPSaCzy7pbLrzI9Cfc%26690',
          createdTime: '2018-07-24 09:00',
          totalPrice: 120,
          totalPv:10000,
          orderNumber:'DDSSAW222SDS345',
          orderType:'22',
          orderName:'激活单',
          productName:'健康排毒营奢华套餐'
        },
        {
          id: '111122',
          status: 1,
          statusName: '待支付',
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545131441716&di=a412458cd1103481683290ef3817cf01&imgtype=0&src=http%3A%2F%2Fs13.sinaimg.cn%2Fmw690%2F006SPSaCzy7pbLrzI9Cfc%26690',
          createdTime: '2018-07-24 09:00',
          totalPrice: 120,
          totalPv:10000,
          orderNumber:'DDSSAW222SDS345',
          orderType:'21',
          orderName:'激活单',
          productName:'健康排毒营奢华套餐'
        }
      ]
    };
  },
  methods: {
    goToOrderDetail (val) {
       
      console.log(val)
      this.$router.push({ name: 'neworder',params:val });
    },
  }
};
</script>

<style lang="scss"  src='./index.scss'>
</style>
