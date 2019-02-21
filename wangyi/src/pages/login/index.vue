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
        <van-button open-type="getUserInfo" @click='onLaunch' round size='small' type="primary">登录</van-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        username: '999999',
        password: '111111',
        sms: '',
        imgUrl: 'http://192.168.120.211:8081/generateverifycode?rnd=629434.1582903175'
      }
    },
    onShow() {
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
      onLaunch() {
        let _this=this;
        var app = getApp();
        var that = this
        var user = wx.getStorageSync('user') || {};
        var userInfo = wx.getStorageSync('userInfo') || {};
        // if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.getUserInfo({
                success: function (res) {

                  var objz = {};
                  objz.avatarUrl = res.userInfo.avatarUrl;
                  objz.nickName = res.userInfo.nickName;
                  //console.log(objz);
                  wx.setStorageSync('userInfo', objz);//存储userInfo
                }
              });
              console.log('res', res)
              var d = app.globalData;//这里存储了appid、secret、token串  
              console.log('dddd', d)
              var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
              wx.request({
                url: l,
                data: {},
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
                // header: {}, // 设置请求的 header  
                success: function (res) {
                  var obj = {};
                  obj.openid = res.data.openid;
                  obj.expires_in = Date.now() + res.data.expires_in;
                  //console.log(obj);
                  Megalo.setStorage({ key: 'openid', data: res.data.openid })
                  _this.onLogin()
                }
              });
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
      },
      onLogin() {
        let _this = this;
        let params = {
          userCode: _this.username,
          password: _this.password
        }

        //  this.$router.push({ path: '/minepage/pages/changepassword/index'})
        _this.$api.login(params).then(data => {

          const { message, token, userCode, status } = data;
          if (status === "1011") {
            Megalo.setStorage({ key: 'token', data: token })
              .then(res => {
                Megalo.switchTab({
                  url: '/pages/home/index',
                });
              })

            //_this.$router.push({ path: '/minepage/pages/bankcardbinding/index', query: { type: 'add' } })
            Megalo.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
          } else {
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