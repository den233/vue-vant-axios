<template>
        <div class="account">
                <van-nav-bar
                title="微信充值"
                left-text="返回"
                right-text=""
                left-arrow
                @click-left="onClickLeft"
              />
            <van-cell-group>
                    
                <van-field
                  v-model="money"
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