<template>
    <div class="account">
        <van-nav-bar title="我的团队" left-text="返回" right-text="" left-arrow @click-left="onClickLeft" />
        <div class="searchtop">
            <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch">
                <div slot="action" @click="onSearch">查询</div>
            </van-search>
        </div>

        <div   class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit">
            <i class="van-icon van-icon-contact van-cell__left-icon"></i>
            <div class="van-cell__value van-cell__value--alone">
                <div>会员编号：13000000000</div>
                <div>姓名：张三</div>
            </div>
            <!---->
        </div>
        <div   class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit">
                <i class="van-icon van-icon-contact van-cell__left-icon"></i>
                <div class="van-cell__value van-cell__value--alone">
                    <div>会员编号：13000000000</div>
                    <div>姓名：张三</div>
                </div>
                <!---->
            </div>

    </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script>
    export default {
        data() {
            return {
                value: '',
                money: '',
            }
        },
        mounted() {

        },

        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onSearch() { },
            onCancel() { }
        }

    };
</script>