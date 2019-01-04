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
       export default{
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
               this.$api.login(questParam).then((res) => {
                 console.log(res);
                //this.$router.push({path: '/home/entry'})
              }).catch(e=>{
                console.log(e)
              });
              this.$router.push({path: '/home/entry'})
              //  this.$http.post(url,questParam).then(data=>{
              //    // console.log(data)
              //  }).catch((res,v)=>{
              //    console.log(res,v)
              //  // this.Toast.fail(JSON.parse(res).message.name);
              //  })
              //   this.$router.push({path: '/home/entry'})
            }
           }
       }
    
    </script>