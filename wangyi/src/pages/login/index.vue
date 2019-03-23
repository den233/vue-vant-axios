<template>
  <div class="app" id='loginTemplate'>

    <div class="form">
      <!-- <div class="logo">
        <img src="../../assets/images/login/logo2.png" alt="">

      </div> -->
      <van-cell-group>
        <van-field  left-icons="icon-yonghuming1"   :value="username" clearable label="用户名" placeholder="请输入用户名" @change='changeName' />

        <van-field left-icons="icon-mima" :value="password" type="password" label="密码" clearable placeholder="请输入密码" @change='changePw' />
  
        <van-field left-icons="icon-yanzhengma" :value="sms" @change="changesms" center clearable label="验证码" placeholder="输入验证码" use-button-slot>
          <van-button class="codebtn" @click='changeCode' slot="button" size="small" type="primary">
             <canvas canvas-id="canvas"  ></canvas>
          </van-button>
        </van-field>
      </van-cell-group>
      <div class="btn-footer">
        <van-button open-type="getUserInfo" @click='onLaunch'   type="primary">登录</van-button>
      </div>

    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  var ctx;
  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  /**生成一个随机色**/
  function randomColor(min, max) {
    var r = randomNum(min, max);
    var g = randomNum(min, max);
    var b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  /**绘制验证码图片**/
  import Toast from 'staticA/vant/toast/toast';
  export default {

    data() {
      return {
        username: '',
        password: '',
        sms: '',
        code:'',
       // imgUrl: 'http://192.168.120.211:8081/generateverifycode?rnd=629434.1582903175'
      }
    },
    onShow() {
      this.generateImage()
      Megalo.removeStorageSync('token');
    },
    methods: {
      changeCode() {
        var that = this;
        this.drawPic(that);
        this.sms="";
        //this.imgUrl = `http://192.168.120.211:8081/generateverifycode?rnd=629434${Math.random()}`
      },
      changeName({ detail }) {
        this.username = detail
      },
      changesms({ detail }){
        this.sms=detail;
      },
      changePw({ detail }) {
        this.password = detail
      },
      generateImage() {
        var that = this;
        this.drawPic(that);
      },
      drawPic(that) {
        ctx = wx.createCanvasContext('canvas');
        /**绘制背景色**/
        ctx.fillStyle = randomColor(180, 255); //颜色若太深可能导致看不清
        ctx.fillRect(0, 0, 100, 40)
        /**绘制文字**/
        var arr;
        var text = '';
        var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
        for (var i = 0; i < 4; i++) {
          var txt = str[randomNum(0, str.length)];
          ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
          ctx.font = randomNum(20, 26) + 'px SimHei'; //随机生成字体大小
          var x = 5 + i * 20;
          var y = randomNum(20, 25);
          var deg = randomNum(-20, 20);
          //修改坐标原点和旋转角度
          ctx.translate(x, y);
          ctx.rotate(deg * Math.PI / 180);
          ctx.fillText(txt, 5, 0);
          text = text + txt;
          //恢复坐标原点和旋转角度
          ctx.rotate(-deg * Math.PI / 180);
          ctx.translate(-x, -y);
        }
        /**绘制干扰线**/
        // for (var i = 0; i < 4; i++) {
        //   ctx.strokeStyle = randomColor(40, 180);
        //   ctx.beginPath();
        //   ctx.moveTo(randomNum(0, 90), randomNum(0, 28));
        //   ctx.lineTo(randomNum(0, 90), randomNum(0, 28));
        //   ctx.stroke();
        // }
        /**绘制干扰点**/
        for (var i = 0; i < 3; i++) {
          ctx.fillStyle = randomColor(0, 255);
          ctx.beginPath();
          ctx.arc(randomNum(0, 90), randomNum(0, 28), 1, 0, 2 * Math.PI);
          ctx.fill();
        }
        ctx.draw(false, function () {
           that.code=text
        });
      },

      onLaunch() {
        // Megalo.switchTab({
        //           url: '/pages/home/index',
        //         });
        let _this = this;
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
              //console.log('res', res)
              var d = app.globalData;//这里存储了appid、secret、token串  
              // console.log('dddd', d)
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
              Toast.fail('获取用户登录态失败!');
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
         if( _this.username==""){
           Toast.fail('用户名不能为空');
           return false;
         } 
         if(  _this.password==""){
           Toast.fail('密码不能为空');
           return false;
         } 
         const checkcode=_this.sms.toUpperCase();
        //  console.log(checkcode,this.code)
         if(checkcode!=_this.code){
          Toast.fail('验证码不正确');
          return false;
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
              title: data.message,
              icon: 'none',
              duration: 2000
            })
          }

        }).catch(e => {
          Megalo.showToast({
            title: e,
            icon: 'none',
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