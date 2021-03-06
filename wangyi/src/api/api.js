import fetch from '@/utils/http';
let configPath = 'https://www.longliqicn.cn';// 真实环境
//let configPath = 'http://192.168.120.34:8081';// 真实环境
// var isProduction = process.env.NODE_ENV === 'production'
// if (isProduction) {} else {
//   configPath = '../../static/myConfig.js' // 开发环境
// }
 
console.log(configPath)
 
// 1登录
// var wh = 'http://oms.52haigo.cn/api'
// 登录失效判断
 const handleToken = function(result) {
      if(result.status=="1015"){
        wx.redirectTo({
          url: '/pages/login/index'
        })
        //this.$router.push({path:'/pages/login/index'})
      }
      return result;
  
}
const login = params => {
  let url=configPath+'/v2/memberLogin.html?strAction=trolley_mimember_login';
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};

let apiConfig = {};
apiConfig.getOpenid=params=>{
  let url=configPath+'/v2/wxLittleProgram.html?strAction=code_to_session';
  return fetch.request(url, params, {method:"get"})
}
// 2 商品分类
//  {baseurl}/v2/productSale.html?strAction=productsale_category_query
apiConfig.categoryList = params => {
  let url=configPath + '/v2/productSale.html?strAction=productsale_category_query'
  return fetch.get(url,params ).then(response => handleToken(response));
   
};
//  3在售商品
// strAction=productsale_list
// orderType=21(激活单)，22(重消单)
// productName=
// category=(商品分类)
// _currPageNo=1(当前页)
// _pageSize=20(页数)
apiConfig.productSale = params => {
  let url=configPath + '/v2/productSale.html?strAction=productsale_list'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};
//  4添加商品至购物车
//  {baseurl}/v2/trolley.html?strAction= trolley_detail_add
// 请求内容{
//  "ppsId" : 1007561,
//  "orderType": "21",
//  "quantity": 3
// }
apiConfig.trolley = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_detail_add'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};
 
//  5修改商品至购物车
//  {baseurl}/v2/trolley.html?strAction= trolley_detail_modify
// 请求内容{
//  "ppsId" : 1007561,
//  "orderType": "21",
//  "quantity": 3
// }
apiConfig.editTrolley = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_detail_modify'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};
 
//  6用户购物车
//  {baseurl}/v2/trolley.html?strAction=trolley_get&orderType=21
apiConfig.trolleyList = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_get'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};

//  7移除购物车条目
//  {baseurl}/v2/trolley.html?strAction=trolley_detail_remove
//  {"ppsId": 1005393, "orderType": "21"}
apiConfig.deleteTrolley = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_detail_remove'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};
//  7批量移除购物车条目
//  {baseurl}/v2/trolley.html?strAction=trolley_detail_remove
//  {"ppsId": 1005393, "orderType": "21"}
apiConfig.deleteAll = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_detail_removes'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};
//  8查询购物车条目
//  baseurl} /v2/trolley.html?strAction=trolley_detail_get&trolleyDetailId=12
apiConfig.detailTrolley = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_detail_get'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};

//  9新增待支付订单
// {baseurl}/v2/tmpOrder.html?strAction=tmporder_add
apiConfig.addTmpOrder = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_add'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};


 
//  11查询单个待支付订单
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_get&orderNo=CZxxx
apiConfig.oneTmpOrder = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_get'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};

//  12移除待支付订单
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_remove
apiConfig.deleteTmpOrder = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_remove'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};
//  13查询激活单卡别
//  {baseurl}/v2/tmpOrder.html?strAction= tmporder_cardtype_query&pv=2000
apiConfig.cardtype_query = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_cardtype_query'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};

//  14查询运费
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_postfee_query &price=499
apiConfig.postfee_query = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_postfee_query'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};

//  15查询待支付金额分配
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_payment_query&price=499&orderType=22&pv=100
apiConfig.payment_query = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_payment_query'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};
//  17.待支付激活单详情页
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_payment_query&price=499&orderType=22&pv=100
apiConfig.tmporder_czk_checkout = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_czk_checkout'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};
//  18.当前会员信息
//  {baseurl}/v2/member.html?strAction=member_me_get
apiConfig.member_me_get = params => {
  let url= configPath + '/v2/member.html?strAction=member_me_get'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};
 
//  19.会员信息
//  {baseurl}/v2/member.html?strAction=member_get&memberCode=999999
apiConfig.member_get = params => {
  let url= configPath + '/v2/member.html?strAction=member_get'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};

//  20.查询服务人
//  {baseurl}/v2/member.html?strAction=member_linkno_get&linkNo=CN01363759
apiConfig.member_linkno_get = params => {
  let url= configPath + '/v2/member.html?strAction=member_linkno_get'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};

//  20.查询销售网节点信息
//  {baseurl}/v2/member.html?strAction=member_recommendno_get&recommendNo=CN01363759
apiConfig.member_recommendno_get = params => {
  let url= configPath + '/v2/member.html?strAction=member_recommendno_get'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};

//  21.确认支付超值卡重销订单
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_czkre_checkout
apiConfig.tmporder_czkre_checkout = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_czkre_checkout'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};
//  21.确认支付超值卡激活订单
// {baseurl}/v2/tmpOrder.html?strAction=tmporder_czk_checkout
apiConfig.tmporder_czk_checkout = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_czk_checkout'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};
//  21.确认支付超值卡升级订单
// {baseurl}/v2/tmpOrder.html?strAction=tmporder_czk_checkout
apiConfig.tmporder_czdp_checkout = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_czdp_checkout'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
};
//  22.查询所有待支付订单
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_list&_currPageNo=1&_pageSize=10&orderNo=CZxxx
apiConfig.allTmpOrder = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_list'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};
//  23.查询所有订单
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_list&_currPageNo=1&_pageSize=10&orderNo=CZxxx
apiConfig.allTmpOrders = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_lists'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};
//  24查询订单是否发货
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_list&_currPageNo=1&_pageSize=10&orderNo=CZxxx
apiConfig.tmporder_list_delively = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_list_delively'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};
//  25查询订单是否收货
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_list_takeDelively&_currPageNo=1&_pageSize=10&orderNo=CZxxx
apiConfig.tmporder_list_takeDelively = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_list_takeDelively'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
}; 
//26最新动态
apiConfig.getAmAnnounces=params=>{
  let url= configPath + '/v2/getAmAnnounces.html?strAction=amAnnounce_get'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
}
//27
apiConfig.getAmDetails=params=>{
  let url= configPath + '/v2/getAmAnnounces.html?strAction=amAnnounce_get_detail'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
}
//28轮播图
apiConfig.getBanner=params=>{
  let url= configPath + '/v2/productSale.html?strAction=rotation_chart_get'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//29现金转超值卡
apiConfig.fiBankbookCash=params=>{
  let url= configPath + '/v2/fiBankbookCashcz.html?strAction=fiBankbookCash_to_cz'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//30超值卡账户转账
apiConfig.fiBankbookP2P=params=>{
  let url= configPath + '/v2/fiBankbookCashcz.html?strAction=fiBankbookP2P_to_cz'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//30提现
apiConfig.tixian=params=>{
  let url= configPath + '/v2/editFiMoneyEtoc.html?strAction=bonus_withdrawals'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//31新增修改银行卡信息
apiConfig.bankcardAdd=params=>{
  let url= configPath + '/v2/miBanks.html?strAction=miBank_edit'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//32获取绑定银行卡信息
apiConfig.bankcardbinding=params=>{
  let url= configPath + '/v2/miBanks.html?strAction=miBank_get'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
}
//33修改密码
apiConfig.personPassword=params=>{
  let url= configPath + '/v2/sys_modify_pwd.html?strAction=personPassword_change'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//34账户明细
//"type":"1",  //现金 1  奖金2  超值卡3
apiConfig.accountMingxi=params=>{
  let url= configPath + '/v2/transActionRecord.html?strAction=accountRecords_get'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//35提现明细
apiConfig.tixianMingxi=params=>{
  let url= configPath + '/v2/transActionRecord.html?strAction=withdrawalsRecord_get'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//36在售热门商品
apiConfig.hotProductsale=params=>{
  let url= configPath + '/v2/productSale.html?strAction=productsale_list_hot'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
}
//37退出登录
apiConfig.logOut=params=>{
  let url= configPath + '/v2/memberLogin.html?strAction=trolley_mimember_quit'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
}
//38热词搜索
apiConfig.searchProduct=params=>{
  let url= configPath + '/v2/productSale.html?strAction=productsale_list_hotKey'
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
}
//39我的团队
apiConfig.myTeam=params=>{
  let url= configPath + '/v2/memberTeam.html?strAction=myTeam_get'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//40微信绑定查询
apiConfig.wxBind=params=>{
  let url= configPath + '/v2/bindWeChat.html?strAction=bindWeChat_get'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//41微信绑定
apiConfig.weChatbind=params=>{
  let url= configPath + '/v2/bindWeChat.html?strAction=weChat_bind'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//41微信绑定
apiConfig.weChatCharge=params=>{
  let url= configPath + '/v2/fiPayClinet.html?strAction=online_recharge'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
//42确认收货
apiConfig.confirmOrder=params=>{
  let url= configPath + '/v2/tmpOrder.html?strAction=Receive_confirmation'
  return fetch.request(url, params, {method:"post"}).then(response => handleToken(response));
}
const apiList = {
  login,
  apiConfig
};

export default apiList;
