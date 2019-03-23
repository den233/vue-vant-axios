<template>
  <div class="wxbangding">
    <!-- <van-nav-bar title="微信绑定">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
    </van-nav-bar> -->
    <div class="imgs">
      <img :src="imgUrl" alt="">
    </div>
    <div class="button_group">
      <van-button @click='bindHandle' round type="primary" size="small" :disabled='bindStatus' >绑定</van-button>
      <van-button @click='bindRemove' round type="danger" size="small" :disabled='!bindStatus' >解除绑定</van-button>
    </div>
  </div>
</template>
<style lang="scss"  src="./style.scss"></style>
<script>
  export default {
    data() {
      return {
        bindStatus:true,
        openId:'',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545363588299&di=4b5f7c33e63ca746342c273fb579053f&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141109%2F0035035909760939_b.jpg'
      }
    },
    onShow() {
       this.initData()    
    },

    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      initData(){
        let _this=this;
       Megalo.getStorage({ key: 'openid' }).then(function(v){
         this.openId=v.data;
            let params={
              openid:v.data
            }
          _this.$api.apiConfig.wxBind(params).then(res=>{
                if(res.isBind==1){
                  _this.bindStatus=true
                }else{
                  _this.bindStatus=false
                }
             })
        })
        
      },
      bindHandle(){
         let _this=this;
         let params={
           openid:_this.openId,
           flag:1
         }
         if(_this.bindStatus){
           return false
         }
         _this.$api.apiConfig.weChatbind().then(res=>{
             if(res.status=='1011'){
              Megalo.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              _this.bindStatus=true
             }
         }).catch(e=>{

         })
      },
      bindRemove(){
        let _this=this;
         let params={
           openid:_this.openId,
           flag:0
         }
         if(!_this.bindStatus){
           return false
         }
         _this.$api.apiConfig.weChatbind().then(res=>{
             if(res.status=='1011'){
              Megalo.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              _this.bindStatus=false
             }
         }).catch(e=>{

         })
      }
    }

  };
</script>