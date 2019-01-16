<template>
    <div class="account">
        <van-nav-bar title="微信充值">
            <label class="navebar_left" slot="left" @click="onClickLeft">
                <van-icon name="arrow-left" />返回</label>
            <div class='view_d' slot='right'>查看明细</div>
        </van-nav-bar>
        <van-cell-group>
            <van-field
             :value="money"
              required
              label="充值金额"
              placeholder="请输入充值金额"
            />
         
          </van-cell-group>
          <div style="text-align: center;width: 100%;margin-top:20px;">
                <van-button size="large"  type="primary">确定</van-button>
          </div>
         
    </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script>
    export default {
        data() {
            return {
                money:'',
            }
        },
        mounted() {

        },
        
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            }
        }
       
    };
</script>