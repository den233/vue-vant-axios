<template>
    <div class="account">
        <van-nav-bar title="修改密码">
            <label class="navebar_left" slot="left" @click="onClickLeft">
              <van-icon name="arrow-left" />返回</label>
          </van-nav-bar>
        <van-cell-group>
            <label class='typel'  for="">密码类型</label>
            <van-radio-group :value="checked" @change="onChange">
                <van-radio name="1">登录密码</van-radio>
                <van-radio name="2">支付密码</van-radio>
            </van-radio-group>   
            <van-field
              :vale="password"
              required
              label="老密码"
              type="password"
              placeholder="老密码"
              @change='changePassword'
            />
            <van-field
            :value="newPassword"
            required
            label="新密码"
            type="password"
            placeholder="新密码"
            @change='changeNewPassword'
          />
          <van-field
          :value="new1password"
          required
          label="确认新密码"
          type="password"
          placeholder="确认新密码"
          @change='changerepeatPassword'
        />
          </van-cell-group>
          <div style="text-align: center;width: 100%;margin-top:20px;">
                <van-button size="large" @click='handleSubmit'  type="primary">确定</van-button>
          </div>
          <van-toast id="van-toast" />
    </div>
</template>
<style lang="scss"  src="./style.scss"></style>
<script>
    import Toast from 'staticA/vant/toast/toast';
    export default {
        data() {
            return {
                password:'',
                newPassword:'',
                new1password:'',
                checked:'1'
            }
        },
        mounted() {

        },
        
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onChange({detail}){
               this.checked=detail;
            },
            changePassword({detail}){
                this.password=detail;
            },
            changeNewPassword({detail}){
                this.newPassword=detail;
            },
            changerepeatPassword({detail}){
               this.new1password=detail;
           },
           handleSubmit(){
               let _this=this;
               const password=this.password;
               const newPassword=this.newPassword;
               const newPassword1=this.new1password;
               if(password==''){
                Toast.fail('老密码不能为空');
                return false;
               }
               if(newPassword==''){
                Toast.fail('新密码不能为空');
                return false;
               }
               if(newPassword!=newPassword1){
                Toast.fail('密码不一致');
                return false;
               }
               let params={
                   type:this.checked,
                   password:this.password,
                   newPassword:this.newPassword
               }
               _this.$api.apiConfig.personPassword(params).then(res=>{
                   if(res.status=='1011'){
                     Toast.success('修改成功');
                   }else{
                    Toast.fail(res.message);
                   }
               }).catch(e=>{
                Toast.fail(e);
               })
           }
        }
       
    };
</script>