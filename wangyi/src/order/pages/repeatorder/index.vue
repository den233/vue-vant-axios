<template>
    <div id="orderDetail">
 
        <div class="form">
            <van-steps :steps="steps" :active="active">

            </van-steps>
            <div class="step1" v-if='active==0'>
                <van-cell-group>
                    <div class="layui-form-item funditem">
                        <label class='label' for="">购买期数</label>
                        <van-radio-group :value="venture" @change="onChange">
                            <van-radio name="1">购买本期</van-radio>
                            <van-radio name="2">多期购买 </van-radio>
                        </van-radio-group>
                        <div class="clear"></div>
                    </div>
                    <div v-if="venture==2">
                        <van-cell title="开始时间" @click='pickMonth' is-link arrow-direction="down" :value="startTime.name" />
                        <van-cell title="期数" @click='pickQshu' is-link arrow-direction="down" :value="qishuValue.name" />
                    </div>
                </van-cell-group>
                <div class="btn-group">
                    <van-button @click='paySubmit(1)' type="warning">确认支付</van-button>
                </div>
                <van-action-sheet :show="show" :actions="actions" @select="onSelect" />
                <van-action-sheet :show="showQishu" :actions="qiShu" @select="onSelectQishu" />
            </div>


            <div class="step4" v-if='active==1'>
                <van-icon name="passed" />
                <p>恭喜支付完成</p>
                订单编号：{{finishOrderNum}}
            </div>
        </div>
        <div class="goods">
            <div class="header">
                商品信息
                <div style="display:inline-block" class="price">(合计：<span>¥{{discountPrice}}</span></div>
                <div style="display:inline-block" class="price">PV：<span>{{discountPv}}</span>)</div>
            </div>
            <van-card v-for='(item,index) in itemDetail' :key='index'  :title="item.productName" :thumb="item.imgUrl"
                :num='item.quantity'>
                <div slot='desc'>
                    <div class="price">单价：<span>¥ {{item.price}}</span></div>
                    <div class="price">PV：<span> {{item.pv}}</span></div>
                </div>
            </van-card>
        </div>
        <div class="location">
            <van-icon name="location" />
            <div class="address">
                <div class="name">收货人：{{orderParams.receiverName}}</div>
                <div class="mobile">联系电话：{{orderParams.receiverMobile}}</div>
                <div>收货地址：{{orderParams.receiverState}},{{orderParams.receiverCity}},{{orderParams.receiverDistrict}},{{orderParams.receiverAddress}}
                </div>
            </div>
        </div>

        <div class="footer">
            <span>订单编号：{{orderParams.orderNumber}}</span>
            <span>创建时间：{{orderParams.createdTime}}</span>
            <span>用户编号：{{orderParams.userCode}}</span>
            <span>订单类型：{{orderType}}</span>
            <span>运费：¥{{orderParams.total_fee}}</span>
            <span>现金账户：{{memberAccount.cash}}</span>
            <span>电子币：{{memberAccount.coin}}</span>
            <span>奖金：{{memberAccount.bonus}}</span>
            <van-button class="copy" style="width:auto" @click="onCopy">复制单号 </van-button>
        </div>
        <!-- <van-submit-bar
          :price="3050"
          button-text="支付"
          @submit="onSubmit"
        /> -->
        <van-toast id="van-toast" />
    </div>
</template>
<script>
    import Toast from 'staticA/vant/toast/toast';
    export default {
        data() {
            return {
                active: 0,
                tabactive: 0,
                show: false,
                $img: this.$img,
                showQishu: false,
                qishuValue: { id: 0, name: '请选择' },
                startTime: { id: 0, name: '请选择' },
                payOrderInfo: {},
                itemDetail: [],
                venture: '1',//创业基金
                actions: [
                ],
                qiShu: [],
                discountPrice: '',
                discountPv: "",
                orderParams: {
                    id: 350,
                    orderNumber: "12",
                    orderType: "",
                    paid: false,
                    receiverAddress: "",
                    receiverCity: "",
                    receiverDistrict: "",
                    receiverMobile: "",
                    receiverName: "",
                    receiverState: "",
                    totalPrice: "",
                    totalPv: "",
                    userCode: "",
                    createdTime: '',
                    createdUserCode: '',
                    total_fee: '0.00',
                    orderTypeName: ''
                },
                memberAccount: {},
                steps: [
                    {
                        text: '选择期数',

                    },
                    {
                        text: '支付成功',

                    },

                ],
                finishOrderNum: ''
            };
        },
        onShow() {
            this.onLoad();
            if (this.payOrderInfo == '') {
                //this.$router.push({path:'/home/entry'})
            }
            this.initData();
            this.memberInfo();
            this.initMonth();
            this.renderQi();
        },
        computed: {
            orderType() {

                if (this.orderParams.orderType == '21') {
                    return '重消单'
                }
                else if (this.orderParams.orderType == '22') {
                    return '激活单'
                }
                else {
                    return '升级单'
                }
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            onCopy(e) {
                var self = this;
                // console.log(self.orderParams.orderNumber)
                wx.setClipboardData({
                    data: self.orderParams.orderNumber,
                    success: function (res) {
                        // self.setData({copyTip:true}),
                        wx.showToast({
                            title: '复制成功',
                            icon: 'success',
                            duration: 2000
                        })

                    }
                })
            },

            onChange({ detail }) {
                this.venture = detail;
            },
            onLoad() {
                this.active = 0;
                this.tabactive = 0;
                this.show = false;
                this.$img = this.$img;
                this.showQishu = false;
                this.qishuValue = { id: 0, name: '请选择' };
                this.startTime = { id: 0, name: '请选择' };
                this.payOrderInfo = {};
                this.itemDetail = [];

                this.venture = '1';//创业基金

                this.actions = [
                ]
                this.qiShu = [];
                this.discountPrice = '';
                this.discountPv = "";
                this.orderParams = {
                    id: 350,
                    orderNumber: "12",
                    orderType: "",
                    paid: false,
                    receiverAddress: "",
                    receiverCity: "",
                    receiverDistrict: "",
                    receiverMobile: "",
                    receiverName: "",
                    receiverState: "",
                    totalPrice: "",
                    totalPv: "",
                    userCode: "",
                    createdTime: '',
                    createdUserCode: '',
                    total_fee: '0.00',
                    orderTypeName: ''
                };
                this.memberAccount = {};
            },
            initData() {
                let _this = this;
                _this.payOrderInfo = _this.$store.state.home.payOrderInfo;
                //console.log(_this.$store.state.home)
                let params = _this.payOrderInfo;
                let orderNo = params['orderNumber'];
                _this.itemDetail = params['details'].map(v => {
                    if(v.imgUrl.substr(0, 7).toLowerCase() == "http://"||v.imgUrl.substr(0, 8).toLowerCase() == "https://"){
                        var itemImage = v.imgUrl;
                    }else{
                        var itemImage = "http://www.longliqicn.cn" +v.imgUrl;
                        itemImage=itemImage.replace(/\s+/g,"");
                    }
                    return {
                        discountPv: v.discountPv,
                        imgUrl:itemImage,
                        price: v.price,
                        productName: v.productName,
                        productNo: v.productNo,
                        pv: v.pv,
                        quantity: v.quantity
                    }
                })


                _this.orderParams = {
                    id: params['id'],
                    orderNumber: params['orderNumber'],
                    orderType: params['orderType'],
                    paid: params['paid'],
                    receiverAddress: params['receiverAddress'],
                    receiverCity: params['receiverCity'],
                    receiverDistrict: params['receiverDistrict'],
                    receiverMobile: params['receiverMobile'],
                    receiverName: params['receiverName'],
                    receiverState: params['receiverState'],
                    totalPrice: params['totalPrice'],
                    totalPv: params['totalPv'],
                    userCode: params['userCode'],
                    createdTime: params['createdTime'],
                    createdUserCode: params['createdUserCode'],
                }
                //console.log(_this.orderParams)
                let queryData = {
                    price: _this.orderParams['totalPrice'],
                    orderType: _this.orderParams['orderType'],
                    pv: _this.orderParams['totalPv'],
                }
                _this.$api.apiConfig.payment_query(queryData)
                    .then(data => {
                        let bank = data.tmporder_payment_query_response;
                        let len = bank.length;
                        for (var i = 0; i < len; i++) {
                            if (bank[i].bankType == "pv") {
                                _this.discountPv = Number(bank[i].payment).toFixed(2);
                            }
                            if (bank[i].bankType == "amount") {
                                _this.discountPrice = Number(bank[i].payment).toFixed(2);
                            }
                            if (bank[i].bankType == "postfee") {
                                _this.orderParams.total_fee = Number(bank[i].payment).toFixed(2);
                            }
                        }
                    }).catch(e => {

                    })
            },
            memberInfo() {
                let _this = this;
                let queryData = {};
                _this.$api.apiConfig.member_me_get(queryData).then(data => {
                    let memberInfo = data.member_me_get_response;
                    let { cash, coin, bonus } = memberInfo;
                    _this.memberAccount = {
                        cash: cash,
                        coin: coin,
                        bonus: bonus
                    }
                }).catch(e => {

                })
            },
            onSubmit() {

            },
            preveHandle(id) {
                this.active = id;
            },
            nexHandle(id) {
                this.active = id;
                this.paylist.userName = '555'
            },
            currentDate() {
                var date = new Date();
                var cyear = date.getFullYear(); //获取完整的年份(4位)
                var cmonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)

                if (cmonth < 10) {
                    var new_month = cyear + '' + 0 + ''
                        + cmonth
                } else {
                    var new_month = cyear + '' + cmonth
                }
                return new_month;
            },
            paySubmit(id) {
                let _this = this;
                console.log(_this.venture)
                let params = {};
                if (_this.venture == 1) {
                    params = {
                        "tmporderId": _this.orderParams["id"],
                        "period": 1,
                        "repeatStartTime": _this.currentDate()
                    }

                }
                if (_this.venture == 2) {
                    params = {
                        "tmporderId": _this.orderParams["id"],
                        "period": _this.qishuValue.id,
                        "repeatStartTime": _this.startTime.id
                    }
                }
                // console.log(_this.startTime)
                _this.$api.apiConfig.tmporder_czkre_checkout(params).then(data => {
                    let v1 = data.tmporder_czkre_checkout_response;
                    var arr = Object.getOwnPropertyNames(v1);
                    if (arr.length == 0) {
                        Toast.fail(data.msg);
                        return false;
                    }
                    _this.finishOrderNum = v1.orderNumber;
                    _this.active = id;
                }).catch(e => {

                })
                // this.active = id;
            },
            initMonth() {
                let mothValue = this.getMonth(1);
                let mothText = this.getMonth(2);
                for (let i = 0, len = mothText.length; i < len; i++) {
                    this.actions.push(
                        {
                            id: mothValue[i],
                            name: mothText[i]
                        }
                    )
                }

            },
            pickMonth() {
                console.log(1)
                this.show = true;
                //console.log(this.getMonth(2))


            },
            pickQshu() {
                this.showQishu = true;

            },
            renderQi() {
                for (var i = 0; i < 12; i++) {
                    var index = i + 1
                    var total = (i + 1) * 30;
                    let name = `购买${index}个月：累计总$PV必须>=${total}PV`;
                    this.qiShu.push({
                        name: name,
                        id: index
                    })
                }
            },
            onSelectQishu({ detail }) {
                this.showQishu = false;
                this.qishuValue = detail;
            },
            onSelect({ detail }) {
                // 点击选项时默认不会关闭菜单，可以手动关闭
                this.show = false;
                this.startTime = detail;
            },
            getMonth(type) {
                var date = new Date();
                var cyear = date.getFullYear(); //获取完整的年份(4位)

                var cmonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)

                // 月份数组
                var nearThree = [];
                var monthTree = [];
                var monthIndex = 0;
                var dataIndex = 0;
                for (var i = 0; i < 13; i++) {
                    dataIndex = cmonth;
                    monthIndex = cmonth;
                    if (cmonth > 12) {
                        if (cyear - date.getFullYear() == 0) {
                            cyear = cyear + 1;
                        }
                        cmonth = cmonth - 12;
                        dataIndex = cmonth;
                        monthIndex = cmonth;
                    }
                    if (dataIndex < 10) {
                        dataIndex = 0 + '' + cmonth
                    }
                    dataIndex = cyear + '' + dataIndex
                    monthIndex = "" + cyear + "年" + monthIndex + "月"
                    nearThree.push(dataIndex);
                    monthTree.push(monthIndex);
                    cmonth = cmonth + 1;
                }
                if (type == 1) {
                    return nearThree;
                }
                if (type == 2) {
                    return monthTree
                }
            }

        }
    };
</script>

<style lang="scss" src='./style.scss'>
</style>