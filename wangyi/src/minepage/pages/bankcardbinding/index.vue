<template>
  <div class="account">
      <van-nav-bar title="银行卡绑定">
          <label class="navebar_left" slot="left" @click="onClickLeft">
              <van-icon name="arrow-left" />返回</label>
          <div class='view_d' slot='right' @click="onClickRight">新增</div>
      </van-nav-bar>
 
     
       <div   class='card card-blue'  >
           <div class="inner">
               <div class="imgs">
                   <i :class="cardComputed.fontClass" ></i>
               </div>
               <div class="content">
                   <div class="title">{{cardComputed.name}}</div>
                   <div class="subtitle">
                       {{cardComputed.typeName}}
                   </div>
               </div>
               
               <div class="code">
                   {{cardComputed.cardNum}}
               </div>
               <div class="edit" @click='handleEdit'>
                   编辑
               </div>
           </div>
       </div>
       
    
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script>
  export default {
      data() {
          return {
             cardList:{
                name:'中国银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:0,fontClass:'iconfont1 icon-zhongguoyinhang'
             }
          }
      },
      onShow() {
        this.getCard();
          var data = "3265986532146598";
//console.log(data.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2"))
       //this. initdata()
      },
      computed: {
              // 计算属性的 getter
              cardComputed: function () {
                  
                // for(var i=0,len=this.cardList.length;i<len;i++){
                //    // console.log(i%3)
                //     var baseText=i%3;
                //     switch (baseText){
                //        case 0:
                //        this.cardList[i].color='card-blue';
                //        break;
                //        case 1:
                //        this.cardList[i].color='card-green';
                //        break;
                //        case 2:
                //        //this.cardList[i].color='card-blue';
                //        break;
                //     }
                    
                 
                    
                // }  
                this.cardList.cardNum=this.cardList.cardNum.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "$1 **** **** $2")
              // `this` 指向 vm 实例
              return this.cardList;
              }
          },     
      methods: {
          initdata(){
              this.cardList=[
                 {name:'中国银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:0,fontClass:'icon-zhongguoyinhang'},
                  {name:'中国工商银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:0,fontClass:'icon-zhongguogongshangyinxing'},
                //   {name:'江苏银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-jiangsuyinhang'},
                  {name:'中国民生银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-minsheng'},
                  {name:'中信银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-zhongxinyinhang'},
                  {name:'中国光大银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-icon-guangdayinhang'},
                  {name:'中国农业银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-nongyeyinhang'},
                  {name:'招商银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-zhaoshangyinhang'},
                  {name:'广东发展银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-guangfayinhang'},
                  {name:'上海浦东发展银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-pufayinhang'},
                //   {name:'邮政储蓄银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-youzhengchuxuyinxing'},
                  {name:'中国建设银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-jiansheyinxing'},
                  {name:'华夏银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-huaxiayinxing'},
                  {name:'交通银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-jiaotongyinxing'},
                  {name:'平安银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-pinganyinhang'},
                  {name:'兴业银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-xingyeyinxing'}
                  ]
          },
          getCard(){
              this.$api.apiConfig.bankcardbinding({}).then(data=>{
                 console.log(data)
              }).catch(e=>{

              })
          },

          onClickLeft() {
              this.$router.go(-1);
          },
          onClickRight(){
             this.$router.push({path:'/minepage/pages/bankcardadd/index',query:{type:'add'}})
          },
          handleEdit(){
            this.$router.push({path:'/minepage/pages/bankcardadd/index',query:{type:'edit'}})
          }
      }

  };
</script>