<template>
    <div class="account">
        <!-- <van-nav-bar title="转账">
            <label class="navebar_left" slot="left" @click="onClickLeft">
                <van-icon name="arrow-left" />返回</label>
           
        </van-nav-bar> -->
        <van-tabs :active="current" @change='handleChange'>
            <van-tab v-for='(item,index) in orderType' :key='index' :title="item.name">

            </van-tab>
        </van-tabs>
        <van-cell-group v-if='current==0'>
            <van-field :value="account1" center label="现金账户余额" placeholder="" readonly disabled left-icon="contact">
            </van-field>
            <van-field :value="money1" required label="转出金额" placeholder="请输入转出金额" @change='changeMoney1' />
            <van-field :value="message1" label="留言" type="textarea" placeholder="请输入留言" rows="2" autosize @change='changeMessage1' />
            <div style="text-align: center;width: 100%;margin-top:20px;">
                <van-button size="large" type="primary" @click='handleSubmitcz'>确定</van-button>
            </div>
        </van-cell-group>
        <van-cell-group v-if='current==1'>
            <div class="form-item">
                <label class='form-label' for="usertype">转出账户</label>
                <van-radio-group @change="onChange($event,'1')" :value="radio" class="van-radio-group">
                    <van-radio name="1" class="van-radio">超值卡账户</van-radio>
                    <van-radio name="2" class="van-radio">奖金账户</van-radio>
                </van-radio-group>
            </div>

            <van-field :value="account" center label="账户余额" placeholder="" readonly disabled left-icon="contact">
                <van-button slot="button" size="small" type="primary">全部转出</van-button>
            </van-field>
            <van-field :value="accountName" required clearable label="转入账户" placeholder="请输入转入账户" @change='changeAccount' />

            <van-field :value="money" required label="转出金额" placeholder="请输入转出金额" @change='changeMoney' />
            <van-field :value="message" label="留言" type="textarea" placeholder="请输入留言" rows="2" autosize @change='changeMessage' />
            <div style="text-align: center;width: 100%;margin-top:20px;">
                <van-button size="large" type="primary" @click='handleSubmit'>确定</van-button>
            </div>
        </van-cell-group>
        <van-toast id="van-toast" />
    </div>
</template>
<style lang="scss" src='./style.scss'></style>
<script>
     import Toast from 'staticA/vant/toast/toast';
    export default {
        data() {
            return {
                accountName: '',
                money: '',
                message: '',
                radio: '1',
                account: ' ',
                memberAccount: {},
                current: '1',
                orderType: [
                    { name: '现金转超值卡' },
                    { name: '转账' }
                ],
                account1:'',
                money1:'',
                message1:''
            }
        },
        mounted() {
            this.memberInfo()
        },

        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onChange({ detail }) {
                this.radio = detail;
                if (detail == 1) {
                    this.account = Number(this.memberAccount.coin).toFixed(2)
                } else if (detail == 2) {
                    this.account =  Number(this.memberAccount.bonus).toFixed(2)
                }
            },
            changeAccount({ detail }) {
                this.accountName = detail;
            },
            changeMoney({ detail }) {
                this.money = detail;
            },
            changeMessage({ detail }) {
                this.message = detail;
            },
            changeMoney1({ detail }){
                this.money1 = detail;
            },
            changeMessage1({ detail }){
                this.message1 = detail;
            },
            handleChange({ detail }) {
                console.log(detail)
                this.current = detail.index;
            },
            memberInfo() {
                let _this = this;
                let queryData = {};
                _this.$api.apiConfig.member_me_get(queryData).then(data => {
                    let memberInfo = data.member_me_get_response;
                    let { cash, coin, bonus, pv } = memberInfo;
                    _this.memberAccount = {
                        cash: cash,
                        coin: coin,
                        bonus: bonus
                    }
                    _this.account = Number(coin).toFixed(2);
                    _this.account1 = Number(cash).toFixed(2);
                }).catch(e => {

                })
            },
            handleSubmit() {
                let _this = this;
                let params = {
                    "userInCode": this.accountName,
                    "amount": this.money,
                    "type": this.radio,
                    "note": this.message
                }
                this.$api.apiConfig.fiBankbookP2P(params).then(data => {
                    const{status}=data;
                    if(status=='1011'){
                        Toast.success('转账成功');
                    }else{
                        Toast.fail(data.message);
                    }
                   
                    
                }).catch(e=>{
                    Toast.fail(e);
                })
            },
            handleSubmitcz() {
                let _this = this;
                let params = {
                    "amount": this.money1,
                    "note": this.message1
                }
                this.$api.apiConfig.fiBankbookCash(params).then(data => {
                    if(status=='1011'){
                        Toast.success('转账成功');
                    }else{
                        Toast.fail(data.message);
                    }
                }).catch(e=>{
                    Toast.fail(e);
                })
            }
        }

    };
</script>