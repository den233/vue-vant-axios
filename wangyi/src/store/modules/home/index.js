 
export default {
  state: {
    // 每日推荐列表-列表类型
    goodsProducttype: 1,
    payOrderInfo: '',
    currentOrderType:0,//订单类型
    active: 0,
    orderStatus:0//我的订单
  },
  mutations: {
    // 列表类型
    GOODS_PRODUCTTYPE (state, active) {
      state.goodsProducttype = active;
    },
    payOrderInfo (state, data) {
      //console.log(state)
      state.payOrderInfo = data;
    },
    changeTab (state, data) {
      state.currentOrderType = data.type;
      state.active = data.index;
    },
    orderStatus(state,data){
      state.orderStatus=Number(data)
    }
  }
};
