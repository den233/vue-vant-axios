<template>
    <div class="account">
        <van-nav-bar title="奖金提现" left-text="返回" right-text="" left-arrow @click-left="onClickLeft" />
        <van-cell-group>

            <van-field v-model="balance" readonly label="奖金余额" placeholder="请输入奖金余额" />

            <van-field v-model="money" required label="提现金额" placeholder="请输入提现金额" />
            <van-cell @click='bankChoose' title="银行卡" is-link value="555555" size="large" label="银行卡账户" />
            <van-field v-model="message" label="留言" type="textarea" placeholder="请输入留言" rows="2" autosize />

        </van-cell-group>
        <div style="text-align: center;width: 100%;margin-top:20px;">
            <van-button size="large" type="primary">确定</van-button>
        </div>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker show-toolbar title="选择账户" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
        </van-popup>
    </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script>
    export default {
        data() {
            return {
                balance: '',
                money: '',
                message: '',
                show: false,
                columns: ['中国银行', '江苏银行', '温州', '嘉兴', '湖州']
            }
        },
        mounted() {

        },

        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            bankChoose() {
                this.show = true;
            },
            onConfirm(value, index) {
               this.show=false;
            },
            onCancel() {
                this.show=false;
            }
        }

    };
</script>