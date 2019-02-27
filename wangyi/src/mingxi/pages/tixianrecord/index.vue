<template>
    <div class="profit">
      <van-nav-bar title="提现明细">
        <label class="navebar_left" slot="left" @click="onClickLeft">
          <van-icon name="arrow-left" />返回</label>
      </van-nav-bar>
      <pickDate @pickdateHandle='pickdateHandle'></pickDate>
      <div v-if='hasData' style='text-align:center'>
          <img style='width:50%' :src="imgUrl" alt="">
          <div>暂无内容</div>
      </div>
     
          <ul id="mineBill">
                <li class="van-hairline--bottom" v-for="item in list" :key="item.id">
                  <div class="left">
                    <span class="type">{{item.bank}}</span>
                    <span class="time">{{item.createTime}}</span>
                  </div>
                  <div class="right">
                    {{item.money}}
                  </div>
  
                  <!-- <div class="right">
                        余额：{{item.lastMoney}}
                      </div> -->
                </li>
              </ul>
    </div>
      </template>
      <script>
        import pickDate from 'com/pickdate'
      export default {
        components:{pickDate},
        data () {
          return {
            hasData:false,
            list: [ ],
            type:'3',
            imgUrl:require('@/assets/images/timg1.png')
          };
        },
        onShow(){
          let new_date=new Date().getTime();
          var time = new Date(new_date);
          var year = time.getFullYear();
          var month = time.getMonth()+1;
          let params={
            year:year,
            month:month,
            day:'0',
            type:this.type
          }
          this.getList(params)
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            pickdateHandle(val){
              console.log(val)
              let params={
                ...val,
                type:this.type
              }
              this.getList(params)
            },
            getList(params){
              let _this=this;
              this.hasData=false;
              _this.$api.apiConfig.tixianMingxi(params).then(res=>{
                  let v1=res.fiMoneytocs;
                  if(v1.length==0){
                    this.hasData=true
                  }else{
                    this.hasData=false
                  }
                  this.list=v1.map(v=>{
                     const{bank,bankCard,createTime,
                      id,money,status,
                      userCode,userName,lastMoney
                    }=v;
                     return {
                      "bank":bank,
                      "bankCard": bankCard,
                      "createTime": createTime,
                      "id": id,
                      "money": money,
                      "status":status, // 1：待审状态 2：审核状态3：取消状态
                      "userCode": userCode,
                      "userName": userName,
                      "lastMoney":lastMoney
                     }
                  })
              })
            }
        }
      };
      </script>
      
      <style lang='scss' src='./style.scss'></style>
      