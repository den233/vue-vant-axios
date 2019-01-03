<template>
        <div id='loginTemplate'>
            <div class="form">
                    <van-cell-group>
                    <van-field
                      v-model="username"
                      clearable
                      label="用户名"
                      placeholder="请输入用户名"
                      @click-icon="$toast('question')"
                    />
                  
                    <van-field
                      v-model="password"
                      type="password"
                      label="密码"
                      placeholder="请输入密码"
                    />
                  </van-cell-group>
                  <van-cell-group>
                        <van-field
                          v-model="sms"
                          center
                          clearable
                          label="输入验证码"
                          placeholder=""
                        >
                          <van-button @click='codeChange' slot="button" size="small" type="primary"><img :src="imgUrl" alt=""></van-button>
                        </van-field>
                      </van-cell-group>
                  <div class="btn-footer"> <van-button @click='onLogin' round  size='small' type="primary">登录</van-button></div>
                 
            </div>
           
        </div>
    </template>
    <style lang='scss' src='./index.scss'></style>
    <script>
      import axios from 'axios'
       export default{
           data(){
             return{
                username:'',
                password:'',
                sms:'',
                imgUrl:`api/captcha/${Math.random()}`
             }
           },
           methods:{
            codeChange(){
                this.imgUrl=`api/captcha/${Math.random()}`
            },
            onLogin(){
              let _this=this;
               let url='api/auth/register';
               let questParam={
                 name:this.username,
                 password:this.password
               }
               axios.post(url,questParam)
                .then(function (response) {
                  _this.Toast.success('注册成功');
                  _this.$router.push({path: '/login/index'})
                })
                .catch(function (error) {
                console.log();
                  _this.Toast.fail( JSON.parse(error.response.data.message).name[0]);
                });
              //  this.$http.postLogin(url,questParam).then(data=>{
              //     console.log(data)
              //  }).catch((res)=>{
              //    console.log(res)
              //  // this.Toast.fail(JSON.parse(res).message.name);
              //  })
               // this.$router.push({path: '/home/entry'})
            }
           }
       }
    
    </script>