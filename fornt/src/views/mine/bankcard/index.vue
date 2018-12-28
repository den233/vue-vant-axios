<template>
        <div class="account">
            <van-nav-bar title="银行卡绑定" left-text="返回" right-text="新增" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
           
             <div class="card" :class='item.color'  v-for="(item,index) in cardComputed" :key="index">
                 <div class="inner">
                     <div class="imgs">
                         <i :class="item.fontClass" class="iconfont1 "></i>
                     </div>
                     <div class="content">
                         <div class="title">{{item.name}}</div>
                         <div class="subtitle">
                             {{item.typeName}}
                         </div>
                     </div>
                     <div class="clear"></div>
                     <div class="code">
                         {{item.cardNum}}
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
                   cardList:[]
                }
            },
            mounted() {
                var data = "3265986532146598";
console.log(data.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2"))
             this. initdata()
            },
            computed: {
                    // 计算属性的 getter
                    cardComputed: function () {
                        
                      for(var i=0,len=this.cardList.length;i<len;i++){
                          console.log(i%3)
                          var baseText=i%3;
                          switch (baseText){
                             case 0:
                             this.cardList[i].color='card-blue';
                             break;
                             case 1:
                             this.cardList[i].color='card-green';
                             break;
                             case 2:
                             //this.cardList[i].color='card-blue';
                             break;
                          }
                          
                          this.cardList[i].cardNum=this.cardList[i].cardNum.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "$1 **** **** $2")
                          
                      }  
                    // `this` 指向 vm 实例
                    return this.cardList;
                    }
                },     
            methods: {
                initdata(){
                    this.cardList=[
                       {name:'中国银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:0,fontClass:'icon-zhongguoyinhang'},
                        {name:'中国工商银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:0,fontClass:'icon-zhongguogongshangyinxing'},
                        {name:'江苏银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-jiangsuyinhang'},
                        {name:'中信银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-zhongxinyinhang'},
                        {name:'光大银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-icon-guangdayinhang'},
                        {name:'农业银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-nongyeyinhang'},
                        {name:'招商银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-zhaoshangyinhang'},
                        {name:'广发银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-guangfayinhang'},
                        {name:'浦发银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-pufayinhang'},
                        {name:'邮政储蓄银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-youzhengchuxuyinxing'},
                        {name:'建设银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-jiansheyinxing'},
                        {name:'华夏银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-huaxiayinxing'},
                        {name:'交通银行',typeName:'储蓄卡',cardNum:'3265986532146598',type:1,fontClass:'icon-jiaotongyinxing'}
                        ]
                },
               
                onClickLeft() {
                    this.$router.go(-1);
                },
                onClickRight(){
                   this.$router.push({name:'addcard'})
                }
            }
    
        };
    </script>