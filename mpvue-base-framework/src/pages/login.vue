<template>
  <div id='loginTemplate'>
     
      <div class="form">
          <div class="logo">
              <img src="../assets/images/login/logo2.png" alt="">
              
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
<style lang='scss' >
   #loginTemplate{
    background-image: url(../assets/images/login/back.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%; 
    width: 100%;
    height: 100vh;
    .logo{
        text-align:center;
        img{
            width:285rpx;
            height:285rpx;
        }
        .title{
            color:#fff;
        }
    }
    .form{
        position: absolute;
        top: 15%;
        width: 100%;
        .van-cell-group{
            background: transparent;
            .van-cell{
                background: transparent;
                  .van-icon {
                    color: #fff;
                  } 
                  .van-field__input{
                      color:#fff;
                  }
                  .van-cell__title{
                       color: #fff;
                    }
                    .van-field__control{
                        color: #fff
                    }
                    &:after{
                        content: ' ';
                        position: absolute;
                        pointer-events: none;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        left: 0.4rem;
                        right: 0.4rem;
                        bottom: 0;
                        -webkit-transform: scaleY(.5);
                        transform: scaleY(.5);
                        border-bottom: 0.02667rem solid #ebedf0;
                      }
                  .codebtn{
                    background: transparent;
                    border: none;
                      img{
                         width:60px;
                         height:30px
                      }
                  }    
                 .van-field__button{
                     .van-button{
                         background: transparent;
                         border: none;
                     }
                 }     
            }
        }
        [class*=van-hairline]::after{
            border-top:none;
            border-bottom:none; 
        }
        .btn-footer{
            text-align: center;
            padding: 0 15px;
            .van-button{
                background: rgba(39, 159, 245, 0.3);;
                margin-top: 20px;
                width: 100%;
                border: none;
                .van-button__text{
                    color: #e0d8d8;
                    font-weight: 700;
                }
            }
        }
        
    }
    
}
</style>
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