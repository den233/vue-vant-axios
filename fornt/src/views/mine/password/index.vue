<template>
        <div class="account">
                <van-nav-bar
                title="修改密码"
                left-text="返回"
                right-text=""
                left-arrow
                @click-left="onClickLeft"
              />
            <van-cell-group>
                    
                <van-field
                  v-model="password"
                  required
                  label="老密码"
                  type="password"
                  placeholder="老密码"
                />
                <van-field
                v-model="newpassword"
                required
                label="新密码"
                type="password"
                placeholder="新密码"
              />
              <van-field
              v-model="new1password"
              required
              label="确认新密码"
              type="password"
              placeholder="确认新密码"
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
                    password:'',
                    newpassword:'',
                    new1password:''
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