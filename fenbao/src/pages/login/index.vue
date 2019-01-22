<template>
  <div id='loginTemplate'>
     
      <div class="form">
          <div class="logo">
              <img src="../../assets/images/login/logo2.png" alt="">
              
           </div>
              <van-cell-group>
              <van-field
                :value="username"
                clearable
                label="用户名"
                placeholder="请输入用户名"
               
              />
            
              <van-field
                :value="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                
              />
            </van-cell-group>
            <van-cell-group>
                  <van-field
                    :value="sms"
                    center
                    clearable
                    label="输入验证码"
                    placeholder="输入验证码"
                    use-button-slot
                  >
                    <van-button class="codebtn" @click='codeChange' slot="button" size="small" type="primary"><img :src="imgUrl" alt=""></van-button>
                  </van-field>
                </van-cell-group>
            <div class="btn-footer"> <van-button @click='onLogin' round  size='small' type="primary">登录</van-button></div>
           
      </div>
     
  </div>
</template>
<style lang='scss' src='./style.scss'></style>
<script>
 export default{
  mpType: 'page',
     data(){
       return{
          username:'',
          password:'',
          sms:'',
          imgUrl:'http://www.longliqicn.cn/generateverifycode?rnd=629434.1582903175'
       }
     },
     methods:{
      codeChange(){
          this.imgUrl=`http://www.longliqicn.cn/generateverifycode?rnd=629434${Math.random()}`
      },
      onLogin(){
         let url='api/auth/login';
         let questParam={
           name:this.username,
           password:this.password
         }
        //  this.$api.login(questParam).then((res) => {
        //    console.log(res);
        //   //this.$router.push({path: '/home/entry'})
        // }).catch(e=>{
        //   console.log(e)
        // });
        wx.switchTab({
          url: '/pages/home/main',
        });
       
      }
     }
 }

</script>