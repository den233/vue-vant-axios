<template>
  <div id="mineSetting">
    <van-nav-bar title="基本信息">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
    </van-nav-bar>
    <van-cell-group class="top-cell-group">
      <van-cell title='头像' is-link>
        <img src="http://placehold.it/65x65">
      </van-cell>
      <van-cell title='名字' is-link>
         {{basicInfo.userName}}
      </van-cell>
      <van-cell title='用户ID' is-link>
        {{basicInfo.userCode}}
      </van-cell>
      <van-cell title='服务机构' is-link>
        {{basicInfo.storeCode}}
      </van-cell>
      <!-- <van-cell class="sex-cell" title='性别' is-link>
        <div class="gender-wrapper">
          男 &nbsp;
          <van-switch v-model="gender" />&nbsp; 女
        </div>
      </van-cell> -->
    </van-cell-group>
    <!-- <van-cell-group class="help-cell-group">
      <van-cell icon="question" title="我的客服" is-link>
        {{}}
      </van-cell>
      <van-cell icon="question" title="问答中心" is-link></van-cell>
      <van-cell icon="question" title="关于我们" is-link></van-cell>
    </van-cell-group> -->
    <div class="sign-out-btn-wrapper">
      <van-button size="large" @click='loginOut'>退出登录</van-button>
    </div>
    <van-toast id="van-toast" />
    <!-- <script src='./index.js'></script> -->
  </div>
</template>

<script>
  import Toast from 'staticA/vant/toast/toast';
  export default {
    data() {
      return {
        gender: true,
        basicInfo:{
          userName:'',
          userCode:'',
          storeCode:''
        }
      }
    },
    onShow() {
      this.getInfo()
    },

    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      getInfo(){
        let params={}
        this.$api.apiConfig.member_me_get(params).then(res=>{
              let data=res.member_me_get_response
              const{storeCode,userCode,userName}=data;
              this.basicInfo={
                userName:userName,
                userCode:userCode,
                storeCode:storeCode
              }
        })
      },
      loginOut(){
        this.$api.apiConfig.logOut().then(res=>{
          if(res.status=='1011'){
            Toast.success('退出成功');
            this.$router.push({path:'/pages/login/index'})
          }
            

        })
      }
    }

  };
</script>
<style lang='scss' src='./style.scss'></style>