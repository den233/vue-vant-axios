<template>
    <div class="cart">
        <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="goBack">
            <div slot="right" v-if='!deleteType' @click='changeHandle(0)'>{{manage}}</div>
            <div style='color:#f70101' slot="right" v-if='deleteType' @click='changeHandle(1)'>完成</div>
        </van-nav-bar>
        <van-tabs v-model="active"  >
            <van-tab v-for="(item,index) in orderType" :title="item.name" :key="index">
            </van-tab>
        </van-tabs>
        <vue-scroll ref="vs" :ops="ops">
            <div class='cartList'>
                <div class="cart-item" v-for='(item,index) in dataActive' :key="index">
                    <div @click='pickState(item.checked)'>
                        <van-checkbox v-model="item.checked" ref="checkbox"></van-checkbox>
                    </div>
                    <div class="imgs">
                        <img v-lazy="item.imgUrl" alt="">
                    </div>
                    <div class="content">
                        <div class="title">
                            {{item.productName}}
                        </div>
                        <div class="price">
                            价格：<i class="van-card__origin-price">¥{{item.discountPrice}}</i>{{item.price}}
                            <br>
                            pv: {{item.discountPv}}
                        </div>
                    </div>
                    <div class="footer">
                        <van-stepper :integer=true :disable-input=false @blur='blur(item.ppsId,item.quantity,index)' :async-change=true @overlimit='overlimit' @plus='plus(item.ppsId,item.quantity,index)' @minus='minus(item.ppsId,item.quantity,index)' v-model="item.quantity" integer :min="1"
                            :max="99" :step="0" />
                    </div>
                </div>
                <div class="orderInfo">
                    <h2>订单信息：<span>( 总价：<i>¥ {{totalPrice}}</i> ,折后PV：<i>{{totalPv}}</i> )</span></h2>
                    <div class="item">
                        <div class="leabel"><label for="cost">运费:</label></div>
                        <div class="number" id="total_fee">￥{{orderDetail.fee}}</div>
                    </div>

                    <div class="item">
                        <div class="leabel"><label for="buyqty">订购数量:</label></div>
                        <div class="number" id="total_qty">{{orderDetail.number}}</div>
                    </div>
                    <div class="item fund">
                        <div class="leabel"><label for="cash">用户编号:</label></div>
                        <div class="number">{{memberInfo.userCode}}</div>
                    </div>
                    <div class="item fund">
                        <div class="leabel"><label for="cash">用户名:</label></div>
                        <div class="number">{{memberInfo.userName}}</div>
                    </div>
                    <div class="item fund">
                        <div class="leabel"><label for="cash">现金账户余额:</label></div>
                        <div class="number" id="cash">¥{{orderDetail.cash}}</div>
                    </div>
                    <div class="item fund">
                        <div class="leabel"><label for="buyqty">奖金账户余额:</label></div>
                        <div class="number" id="bonus">¥ {{orderDetail.bonus}}</div>
                    </div>
                    <div class="item fund">
                        <div class="leabel"><label for="buyqty">电子币账户余额:</label></div>
                        <div class="number" id="coin">¥{{orderDetail.coin}}</div>
                    </div>
                </div>
            </div>
        </vue-scroll>
        <van-submit-bar :button-text="buttonText" @submit="onSubmit" :disabled='disabled'>
            <div class="checkbox" @click="toggle()">
                <van-checkbox ref="checkboxes" v-model="checked">全选</van-checkbox>
            </div>

            <span class="all-label">
                <p class="price_submit"> pv :<br> <b>{{totalPv}}</b></p>
                <p slot='price' class="price_submit">总价 ：<br> ¥ <b>{{totalPrice}}</b></p>
            </span>
        </van-submit-bar>
        <van-popup v-model="show" position="right" :overlay="false">
            <van-nav-bar title="填写收货信息" left-text="返回" left-arrow @click-left='onQuxiao'>
            </van-nav-bar>
            <van-address-edit :area-list="areaList" :show-postal='false' :show-delete='false' :show-set-default='false'
                :show-search-result='false' :is-deleting='false' :search-result="searchResult" @save="onSave"
                save-button-text="提交订单" />
            <div class="orderInfo">
                <h2>订单信息：<span>( 总价：<i>¥ {{totalPrice}}</i> ,折后PV：<i>{{totalPv}}</i> )</span></h2>
                <div class="item">
                    <div class="leabel"><label for="cost">运费:</label></div>
                    <div class="number" id="total_fee">￥{{orderDetail.fee}}</div>
                </div>

                <div class="item">
                    <div class="leabel"><label for="buyqty">订购数量:</label></div>
                    <div class="number" id="total_qty">{{orderDetail.number}}</div>
                </div>
                <div class="item fund">
                    <div class="leabel"><label for="cash">用户编号:</label></div>
                    <div class="number">{{memberInfo.userCode}}</div>
                </div>
                <div class="item fund">
                    <div class="leabel"><label for="cash">用户名:</label></div>
                    <div class="number">{{memberInfo.userName}}</div>
                </div>
                <div class="item fund">
                    <div class="leabel"><label for="cash">现金账户余额:</label></div>
                    <div class="number" id="cash">¥{{orderDetail.cash}}</div>
                </div>
                <div class="item fund">
                    <div class="leabel"><label for="buyqty">奖金账户余额:</label></div>
                    <div class="number" id="bonus">¥ {{orderDetail.bonus}}</div>
                </div>
                <div class="item fund">
                    <div class="leabel"><label for="buyqty">电子币账户余额:</label></div>
                    <div class="number" id="coin">¥{{orderDetail.coin}}</div>
                </div>
            </div>
        </van-popup>

    </div>
</template>
<style lang="scss"  src="./style.scss"></style>
<script>
    import areas from '@/utils/area.js'
    import { Dialog } from 'vant';
    Vue.use(Dialog);
    export default {
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                dataActive: [],
                active: this.$store.getters.active,
                orderType: PLATFORM_CONFIG.orderType,
                currentOrderType: this.$store.getters.currentOrderType,
                pickAll: [],
                checked: false,
                show: false,
                areaList: {},
                searchResult: [],
                buttonText: '下一步',
                manage: '管理',
                deleteMsg: '删除',
                disabled:true,
                deleteType: false,
                totalPrice: 0,
                totalPv: 0,
                discountPv: 0,
                discountPrice: 0,
                orderDetail: {
                    fee: '0.00',
                    number: '0',
                    cash: '0.00',
                    bonus: '0.00',
                    coin: '0.00'
                },
                memberInfo: {
                    userCode: '',
                    userName: ''
                },
                ops: {
                    bar: {
                        background: '#eee'
                    },
                    rail: {

                    },
                    scrollButton: {
                        enable: false,

                    }
                }
            }
        },
        mounted() {
            this.getList();
            this.memberData();
            var getArea = areas();
            this.areaList = getArea.arreaList;

        },
        watch:{
            dataActive :{
        　　　　handler(newValue, oldValue) {
                  let arr=[];
        　　　　　　for (let i = 0; i < newValue.length; i++) {
        　　　　　　　　 if(newValue[i].checked){
                            arr.push(i)
                        }
        　　　　　　}
                   if(arr.length == 0){
                    this.disabled = true;
                   }else{
                    this.disabled = false;
                   }
        　　　　},
        　　　　deep: true
        　　},
           active(newValue, oldValue){
                if(newValue== oldValue){
                    return false;
                }
                this.currentOrderType = this.orderType[newValue].type;
                this.$store.commit('changeTab', { type: this.currentOrderType, index:newValue });
                this.memberData();
                this.getList();
           }
        },
        methods: {
            memberData() {
                let _this = this;
                this.$api.apiConfig.member_me_get({}).then(data => {
                    let v1 = data.member_me_get_response;
                    _this.memberInfo.userCode = v1.userCode;
                    _this.memberInfo.userName = v1.userName;
                    _this.orderDetail.cash = Number(v1.cash).toFixed(2);
                    _this.orderDetail.bonus = Number(v1.bonus).toFixed(2);
                    _this.orderDetail.coin = Number(v1.coin).toFixed(2);
                }).catch(e => {

                })
            },
            clearALL(){
                this.totalPrice= 0;
                this.totalPv= 0;
                this.discountPv= 0;
                this.discountPrice= 0;
                this.orderDetail.fee= '0.00';
                this.orderDetail.number= '0';
            },
            getList() {
                let _this = this;
                _this.dataActive = [];
                _this.clearALL();
               _this.checked=false;
               _this.pickAll=[];
                let queryParam = {
                    //"strAction": "trolley_detail_add",
                    "orderType": _this.currentOrderType
                }
              
                _this.$api.apiConfig.trolleyList(queryParam).then(data => {
                    let v1 = data.trolley_get_response;
                    var arr = Object.getOwnPropertyNames(v1);
                    if (arr.length == 0) {
                        Toast.fail(data.msg);
                        return false;
                    }
                    if (v1.details.length == 0) {
                        return false;
                    }

                    _this.dataActive = v1.details.map(v => {
                        return {
                            createdTime: v.createdTime,
                            discountPrice: v.discountPrice,
                            discountPv: v.discountPv,
                            imgUrl: v.imgUrl,
                            lastModifiedTime: v.lastModifiedTime,
                            orderType: v.orderType,
                            ppsId: v.ppsId,
                            price: v.price,
                            productName: v.productName,
                            productNo: v.productNo,
                            pv: v.pv,
                            quantity: v.quantity,
                            selling: v.selling,
                            trolleyDetailId: v.trolleyDetailId,
                            trolleyId: v.trolleyId,
                            checked: false
                        }
                    })
                    _this.calc();
                }).catch(e => {

                })

            },
            goBack() {
                this.$router.go(-1);
            },
            // tabClick(index) {
            //     this.currentOrderType = this.orderType[index].type;
            //     this.$store.commit('changeTab', { type: this.currentOrderType, index, index });
            //     this.clearALL();
            //     this.getList();
            // },

            onSubmit() {
                //this.deleteType==true  删除
                if (this.deleteType == true) {
                    this.deleteAll();
                } else {
                    this.show = true;
                }
            },
            //购物车值变化
            blur(id, number, index){
                let _this=this;
                let queryData={
                    "ppsId": id,
                    "orderType": _this.currentOrderType,
                    "quantity": number
                }
                _this.$api.apiConfig.editTrolley(queryData)
                .then(data=>{
                    let v1=data.trolley_detail_modify_response;
                    var arr = Object.getOwnPropertyNames(v1);
                    if (arr.length == 0) {
                        _this.dataActive[index].quantity=number;
                        return false;
                    }
                    this.calc();
                     
                }).catch(e=>{
                    
                })
            },
            //编辑购物车加
            plus(id, number, index) {
                number++;
                let _this=this;
                let queryData={
                    "ppsId": id,
                    "orderType": _this.currentOrderType,
                    "quantity": number
                }
                _this.$api.apiConfig.editTrolley(queryData)
                .then(data=>{
                    let v1=data.trolley_detail_modify_response;
                    var arr = Object.getOwnPropertyNames(v1);
                    if (arr.length == 0) {
                        return false;
                    }
                    _this.dataActive[index].quantity++;
                    this.calc();
                     
                }).catch(e=>{
                    
                })
            },
            minus(id, number, index) {
                number--
               let _this=this;
               let queryData={
                   "ppsId": id,
                   "orderType": _this.currentOrderType,
                   "quantity": number
               }
               _this.$api.apiConfig.editTrolley(queryData)
               .then(data=>{
                   let v1=data.trolley_detail_modify_response;
                   var arr = Object.getOwnPropertyNames(v1);
                   if (arr.length == 0) {
                       return false;
                   }
                   _this.dataActive[index].quantity--;
                   this.calc();
                    
               }).catch(e=>{
                   
               })
            },
            overlimit(){
                return false;
            },
            //删除
            deleteAll() {
                let len = this.dataActive.length;
                let newArr = [];
                let delArray = [];

                  console.log(this.dataActive)
                for (let i = 0; i < len; i++) {
                    if (!this.dataActive[i].checked) {
                        newArr.push(this.dataActive[i]);
                    }
                    else {
                        delArray.push(this.dataActive[i].ppsId);
                    }
                }
                if(delArray.length == 0){
                    return false;
                }
                let _this=this;
                let queryData={
                    ppsId:delArray
                }
                _this.$api.apiConfig.deleteTrolley(queryData)
                .then(data=>{
                    this.dataActive = newArr;
                     this.pickAll = [];
                     this.calc()  
                })
                .catch(e=>{

                })
            },
            beforeClose() {

            },
            changeHandle(val) {
                this.deleteType = !this.deleteType;
                if (val == 0) {
                    this.buttonText = '删除'
                }
                if (val == 1) {
                    this.buttonText = '下一步'
                }
            },
            pickState(v) {
                this.pickAll = [];
                let len = this.dataActive.length;
                for (let i = 0; i < len; i++) {
                    if (this.dataActive[i].checked) {
                        this.pickAll.push(this.dataActive[i]);
                    }
                }
                if (this.pickAll.length != len) {
                    this.checked = false;
                } else {
                    this.checked = true;
                }
                this.calc()
            },
            toggle() {
                this.$refs.checkboxes.toggle();
                this.checkAll(this.checked)
                this.calc()
            },
            //全选
            checkAll(v) {
                let len = this.dataActive.length;
                this.pickAll = [];
                if (v) {
                    for (let i = 0; i < len; i++) {
                        this.dataActive[i].checked = true;
                        this.pickAll.push(this.dataActive[i]);
                    }
                } else {
                    for (let i = 0; i < len; i++) {
                        this.dataActive[i].checked = false;
                    }
                }

            },
            //计算
            calc() {
                let len = this.pickAll.length;
              
                this.clearALL()
                
                for (let i = 0; i < len; i++) {
                    this.orderDetail.number = Number(this.orderDetail.number) + this.pickAll[i].quantity;
                    this.discountPrice = this.discountPrice + this.pickAll[i].quantity * Number(this.pickAll[i].price);
                    this.discountPv = this.discountPv + this.pickAll[i].quantity * Number(this.pickAll[i].discountPv);
                }
                console.log(this.discountPrice)
                this.paymentQuery();
            },
            //提交
            paymentQuery() {
                let _this = this;
                let queryParam = {
                    orderType: _this.currentOrderType,
                    pv: _this.discountPv,
                    price: _this.discountPrice
                }
                _this.$api.apiConfig.payment_query(queryParam).then(data => {
                    let bank = data.tmporder_payment_query_response;
                    let len = bank.length;
                    for (var i = 0; i < len; i++) {
                        if (bank[i].bankType == "pv") {
                            _this.totalPv = Number(bank[i].payment).toFixed(2);
                        }
                        if (bank[i].bankType == "amount") {
                            _this.totalPrice = Number(bank[i].payment).toFixed(2);
                        }
                        if (bank[i].bankType == "postfee") {
                            _this.orderDetail.fee = Number(bank[i].payment).toFixed(2);
                        }
                    }

                }).catch(e => {

                })
            },
            onSave(address) {
                let new_array = [];
                //console.log(cartArray.selling)
                for (let i = 0, len = this.pickAll.length; i < len; i++) {
                    new_array.push(this.pickAll[i].trolleyDetailId);
                }
                let queryParam = {
                    "trolleyDetailIds": new_array,
                    "orderType": this.currentOrderType,
                    "receiverName": address.name,
                    "receiverMobile": address.tel,
                    "receiverState": address.province,
                    "receiverCity": address.city,
                    "receiverDistrict":address.county,
                    "receiverAddress":address.addressDetail
                }
                let _this = this;
                let locationURL ;
                if(_this.currentOrderType=='21'){
                      locationURL='repeatorder'
                }
                if(_this.currentOrderType=='22'){
                     locationURL='neworder'
                }
                _this.$api.apiConfig.addTmpOrder(queryParam).then(data => {
                   let payArray=data.tmporder_add_response;
                   var arr = Object.getOwnPropertyNames(payArray);
                    if(data.success=='false'){
                        Toast.fail(data.msg);
                        return false;
                    }
                    if (arr.length == 0) {
                        Toast.fail(data.msg);
                        return false;
                    }
                    Dialog.alert({
                        title: '提交成功',
                        message: '请前往支付'
                        }).then(() => {
                            this.$store.commit('payOrderInfo', payArray)
                            this.$router.push({ name: locationURL})
                    });
                }).catch(e => {
                    Toast.fail('提交失败');
                })
                // this.$store.commit('payOrderInfo', data)
                //this.$router.push({ name: 'neworder' })
            },
            onQuxiao() {
                this.show = false;
            }
        }
    };
</script>
