<template>
  <div class="app" id='loginTemplate'>

    <div class="form">
      <div class="logo">
        <img src="../../assets/images/login/logo2.png" alt="">

      </div>
      <van-cell-group>
        <van-field :value="username" clearable label="用户名" placeholder="请输入用户名" @change='changeName' />

        <van-field :value="password" type="password" label="密码" placeholder="请输入密码" @change='changePw' />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="sms" center clearable label="输入验证码" placeholder="输入验证码" use-button-slot>
          <van-button class="codebtn" @click='codeChange' slot="button" size="small" type="primary"><img :src="imgUrl"
              alt=""></van-button>
        </van-field>
      </van-cell-group>
      <div class="btn-footer">
        <van-button open-type="getUserInfo" @click='onLogin' round size='small' type="primary">登录</van-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        sms: '',
        imgUrl: 'http://192.168.120.211:8081/generateverifycode?rnd=629434.1582903175'
      }
    },
    onShow(){
      Megalo.removeStorageSync('token');
    },
    methods: {
      codeChange() {
        console.log(1)
        this.imgUrl = `http://192.168.120.211:8081/generateverifycode?rnd=629434${Math.random()}`
      },
      changeName({ detail }) {
        this.username = detail
      },
      changePw({ detail }) {
        this.password = detail
      },
      onLogin() {
        let _this = this;
        let params = {
          userCode: _this.username,
          password: _this.password
        }
        _this.$api.login(params).then(data => {
         
          const { message, token, userCode,status } = data;
          if(status==="1011"){
                Megalo.setStorage({ key: 'token', data: token })
                .then(res => console.log(res))
                wx.switchTab({
              url: '/pages/home/index',
            });
              Megalo.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            Megalo.showToast({
              title: '登录失败',
              icon: 'fail',
              duration: 2000
            })
          }
        
        }).catch(e => {
          Megalo.showToast({
              title: e,
              icon: 'fail',
              duration: 2000
            })
        })
        // wx.login({
        //   success: (res) => {
        //     console.log(res)
        //     wx.getUserInfo({
        //       success: function (info) {

        //       },
        //       fail: function (res) {
        //         console.log(8);
        //         console.log(res);

        //       }
        //     })
        //   }
        // })
        // this.$router.push({
        //   path:'/order/pages/repeatorder/index'
        // })
        

      }
    }
  }

</script>
<style lang='scss' src='./style.scss'></style>