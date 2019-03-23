<template>
    <div class="account">
        <van-nav-bar title="奖金提现">
            <label class="navebar_left" slot="left" @click="onClickLeft">
                <van-icon name="arrow-left" />返回</label>
            <div class='view_d' slot='right' @click='goDetail'>查看明细</div>
        </van-nav-bar>
        <van-cell-group>
            <van-field class="balance" :value="balance" readonly label="奖金余额" placeholder="奖金余额" />
            <van-field    :value="money" required label="提现金额" placeholder="请输入提现金额"  @change='changeMoney'>
                   
            </van-field>    
            <label class="info"   size="small" type="primary">(提现金额需500起提，按100的倍数)</label>
            <van-field type="password" v:value="password" required label="二级密码" placeholder="请输入二级密码" @change='changePassword' />
            <!-- <van-cell @click='bankChoose' title="银行卡" is-link value="555555" size="large" label=" " />
            <van-field v-model="message" label="留言" type="textarea" placeholder="请输入留言" rows="2" autosize /> -->

        </van-cell-group>
        <div style="text-align: center;width: 100%;margin-top:20px;">
            <van-button size="large" type="primary" @click="handleSubmit">确定</van-button>
        </div>
        <van-popup :show="show" position="bottom" :overlay="true">
            <van-picker show-toolbar title="选择账户" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
        </van-popup>
        <van-toast id="van-toast" />
    </div>
</template>
<style lang="scss"  src="./style.scss"></style>
<script>
      import Toast from 'staticA/vant/toast/toast';
    export default {
        data() {
            return {
                balance: '',
                money: '',
                message: '',
                show: false,
                password:'',
                columns: ['中国银行', '江苏银行', '温州', '嘉兴', '湖州']
            }
        },
        onShow() {
            this.onLoad();
            this.memberInfo();  
        },

        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onLoad(){
                this.balance= '';
                this.money= '';
                this.message= '';
                this.password="";
            },
            bankChoose() {
                this.show = true;
            },
            onConfirm(value, index) {
                this.show = false;
            },
            onCancel() {
                this.show = false;
            },
            changeMoney({detail}){
                this.money=detail;
            },
            changePassword({detail}){
                this.password=detail;
            },
            memberInfo() {
                let _this = this;
                let queryData = {};
                _this.$api.apiConfig.member_me_get(queryData).then(data => {
                    let memberInfo = data.member_me_get_response;
                    let { cash, coin, bonus, pv } = memberInfo;
                    _this.balance = '¥'+Number(bonus).toFixed(2);
                }).catch(e => {

                })
            },
            handleSubmit() {
                let _this = this;
                let params = {
                    "secpwd":this.password,
                    "amount": this.money
                }
                if(this.password==''||this.password==null){
                    Toast.fail('二级密码不能为空');
                    return false;
                }
                if(this.money==''||this.money==null){
                    Toast.fail('金额不能为空');
                    return false;
                }
                let accountMoney=this.money%100
                if(accountMoney!=0){
                    Toast.fail('金额不是100的倍数');
                    return false;
                }
                if(this.money<500){
                    Toast.fail('必须500起提');
                    return false;
                }
                this.$api.apiConfig.tixian(params).then(data => {
                    if(data.status==1011){
                        Toast.success('提现成功');
                    }else{
                        Toast.fail(data.message);
                    }
                }).catch(e=>{
                    Toast.fail(e);
                })
            },
            goDetail(){
                this.$router.push({path:"/mingxi/pages/bonusdetails/index"})
            }
        }

    };
</script>