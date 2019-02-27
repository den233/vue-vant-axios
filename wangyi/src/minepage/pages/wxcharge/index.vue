<template>
    <div class="account">
        <van-nav-bar title="微信充值">
            <label class="navebar_left" slot="left" @click="onClickLeft">
                <van-icon name="arrow-left" />返回</label>
            <!-- <div class='view_d' slot='right'>查看明细</div> -->
        </van-nav-bar>
        <van-cell-group>
            <van-field :value="money" required label="充值金额" placeholder="请输入充值金额" @change="changeMount" />

        </van-cell-group>
        <div style="text-align: center;width: 100%;margin-top:20px;">
            <van-button size="large" @click="chargeHandle" type="primary">确定</van-button>
        </div>
        <van-toast id="van-toast" />
    </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script>
    import Toast from 'staticA/vant/toast/toast';

    export default {
        data() {
            return {
                money: '',
            }
        },
        mounted() {

        },

        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            changeMount({ detail }) {
                this.money = detail;
            },
            chargeHandle() {
                let that=this;
                let params = {
                    openid: Megalo.getStorageSync('openid'),
                    amount: this.money,
                    note: '充值'
                }
                // var r = /^\+?[1-9][0-9]*$/;　　//正整数
                // var str = this.money;
                // var flag=r.test(str);
                // if(str==""){
                //     Toast.fail('金额不能为空');
                //     return false
                // }
                // if(!flag){
                //     Toast.fail('金额必须是整数');
                //     return false
                // }
                this.$api.apiConfig.weChatCharge(params).then(res => {
                    const { appId, nonceStr,  paySign, signType, timeStamp } = res.map;
                    wx.requestPayment({
                        'timeStamp': timeStamp.toString(),  // 时间戳必须是字符串，否则会报错
                        'nonceStr': nonceStr,
                        'package': res.map.package,  // 这里的值必须是 prepay_id=XXXXXXXXX 的格式，否则也会报错
                        'signType': signType,
                        'paySign': paySign,
                        'success': function (res) {
                            console.log(res)
                            // 这里应该是 res.errMsg , 跟公众号的支付返回的参数不一样，公众号是 err_msg, 就因为没注意到这个，折腾了很长时间
                            if (res.errMsg == "requestPayment:ok") {  // 调用支付成功
                              // that.$router.push({path:'/minepage/pages/wxcharge/index'})
                            } else if (res.errMsg == 'requestPayment:cancel') {
                                //that.$router.push({path:'/minepage/pages/wxcharge/index'})
                            }
                        },
                        'fail': function (res) {
                            console.log(res)
                            Toast.fail(res.errMsg);
                        },
                        'complete': function (res) { }
                    })
                })
            }
        }

    };
</script>