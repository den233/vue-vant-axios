<template>
    <div class="cart">
        <van-nav-bar title="购物车"    >
            <div slot="right" v-if='!deleteType' @click='changeHandle(0)'>{{manage}}</div>
            <div style='color:#f70101' slot="right" v-if='deleteType' @click='changeHandle(1)'>完成</div>
        </van-nav-bar>
         
        <van-tabs :active="active" @change='tabClick'>
            <van-tab   v-for="(item,index) in orderType" :title="item.name" :key="index">
            </van-tab>
        </van-tabs>
        <scroll-view
              class="scroll-view"
              scroll-y
              :style="{ height: second_height + 'px' }"
            > 
            
            <div class='cartList'>
                <div class="cart-item" v-for='(item,index) in dataActive' :key="index">
                    <div>
                        <van-checkbox @change='pickState(index,item.checked)' :value="item.checked"  ></van-checkbox>
                    </div>
                    <div class="imgs">
                        <img :src="item.imgUrl" alt="">
                    </div>
                    <div class="content">
                        <div class="title">
                            <h2>{{item.productName}}</h2>
                             <b class="p_t">
                               价格： {{item.price}}
                             </b>
                        </div>
                        
                        <div class="price">
                            原价：<text class="van-card__origin-price">¥{{item.discountPrice}}</text>
                            <br>
                            pv: {{item.discountPv}}
                        </div>
                    </div>
                    <div class="footer">
                        <van-stepper :integer=true :disable-input=false @blur='blur(item.ppsId,item.quantity,index)' :async-change=true @overlimit='overlimit' @plus='plus(item.ppsId,item.quantity,index)' @minus='minus(item.ppsId,item.quantity,index)' :value="item.quantity" integer :min="1"
                            :max="99" :step="0" />
                    </div>
                </div>
                <div class="orderInfo">
                    <h2>订单信息：<text>( 总价：<text>¥ {{totalPrice}}</text> ,折后PV：<text>{{totalPv}}</text> )</text></h2>
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
             
        </scroll-view>
      
        <van-submit-bar :button-text="buttonText" @submit="onSubmit" :disabled='disabled'>
            <div class="checkbox">
                <van-checkbox   @change="toggle()" :value="checked">全选</van-checkbox>
            </div>

            <span class="all-label">
                <text class="price_submit"> pv :{{totalPv}}</text>
                <text slot='price' class="price_submit">总价 ： ¥ {{totalPrice}}</text>
            </span>
        </van-submit-bar>
        <van-popup :show="show" position="right" :overlay="false">
            <van-nav-bar
                title="填写收货信息"   
            >
            <label class="navebar_left" slot="left" @click="onClickLeft"><van-icon name="arrow-left" />取消</label>
           </van-nav-bar>
            <van-address-edit @onSave="onSave" :cData="cData"  :areaList="areaList" > </van-address-edit>
           
            <div class="orderInfo">
                <h2>订单信息：<span>( 总价：<text>¥ {{totalPrice}}</text> ,折后PV：<text>{{totalPv}}</text> )</span></h2>
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
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
    </div>
</template>
<style lang="scss"  src="./style.scss"></style>
<script>
    import areas from '@/utils/area.js'
    import Toast from 'staticA/vant/toast/toast';
    import Dialog from 'staticA/vant/dialog/dialog';
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
                active: "0",
                second_height:0,
                orderType: this.$PLATFORM_CONFIG,
                currentOrderType: this.$PLATFORM_CONFIG[0].type,
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
                cData:{
                    name:'cc',
                    tel:'15190215925',
                    province:'ss',
                    area:'99',
                    distinct:'ss',
                    areaDetail:'as',
                    addressDetail:'ss'
                } 
            }
        },
        onShow() {
               this.getList();
                this.memberData();
                var getArea = areas();
                this.areaList = getArea.arreaList;
               // console.log(this.areaList)

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
                that.second_height= res.windowHeight - 150
                
            }
            })
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
        　　}
        //    active(newValue, oldValue){
        //         if(newValue== oldValue){
        //             return false;
        //         }
        //         this.currentOrderType = this.orderType[newValue].type;
        //         //this.$store.commit('changeTab', { type: this.currentOrderType, index:newValue });
        //         this.memberData();
        //         this.getList();
        //    }
        },
        methods: {
            onClickLeft: function onClickLeft() {
                console.log(this)
                this.show = false;
            },
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
            tabClick(event) {
                let index= event.mp.detail.index;
                console.log(index)
                this.currentOrderType = this.orderType[index].type;
                this.clearALL();
                this.getList();
            },

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
            pickState(index,event) {
                this.pickAll = [];
                this.dataActive[index].checked=!event
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
                this.checked=!this.checked 
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
                //console.log(this.discountPrice)
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
            onSave({mp}) {
                console.log(mp.detail)
                let new_array = [];
                let {addressDetail,area,areaDetail,distinct,name,province,tel}=mp.detail
                //console.log(cartArray.selling)
                for (let i = 0, len = this.pickAll.length; i < len; i++) {
                    new_array.push(this.pickAll[i].trolleyDetailId);
                }
                let queryParam = {
                    "trolleyDetailIds": new_array,
                    "orderType": this.currentOrderType,
                    "receiverName": name,
                    "receiverMobile": tel,
                    "receiverState": province,
                    "receiverCity": area,
                    "receiverDistrict":distinct,
                    "receiverAddress":addressDetail
                }
                let _this = this;
                let locationURL ;
                if(_this.currentOrderType=='21'){
                      locationURL='/pages/home/main'
                }
                if(_this.currentOrderType=='22'){
                     locationURL='/pages/home/main'
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
                            _this.$store.commit('payOrderInfo', payArray)
                            _this.$router.push({ path:locationURL })
                    });
                }).catch(e => {

                    Toast.fail('321');
                })
                // this.$store.commit('payOrderInfo', data)
                //this.$router.push({ name: 'neworder' })
            },
            showArea({mp}){
                console.log('area',mp.detail)
            }
           
        }
    };
</script>
