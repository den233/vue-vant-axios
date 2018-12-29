<template>
    <div class="cart">
        <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="goBack">
            <div slot="right" v-if='!deleteType' @click='changeHandle(0)'>{{manage}}</div>
            <div style='color:#f70101' slot="right" v-if='deleteType' @click='changeHandle(1)'>完成</div>
        </van-nav-bar>
        <van-tabs v-model="active" @click='tabClick'>
            <van-tab v-for="(item,index) in orderType" :title="item.name" :key="index">
            </van-tab>
        </van-tabs>
        <vue-scroll ref="vs" :ops="ops">
            <div class='cartList'>
                <div class="cart-item"  v-for='(item,index) in dataActive' :key="index">
                        <div  @click='pickState(item.checked)' >
                                <van-checkbox v-model="item.checked" ref="checkbox"  ></van-checkbox>
                        </div>
                        <div class="imgs" >
                             <img  v-lazy="imageURL" alt="">
                        </div>
                        <div class="content">
                             <div class="title">
                                 {{item.name}}
                             </div>
                             <div class="price">
                                 价格：<i class="van-card__origin-price">¥667</i>{{item.price}}
                                 <br>
                                pv: {{item.pv}}
                             </div>
                        </div>
                        <div class="footer">
                                <van-stepper @change='changeNum(item.id,item.number)' v-model="item.number" integer :min="1" :max="99" :step="1" />
                        </div>
                </div>
                <div class="orderInfo">
                        <h2>订单信息：</h2>
                      <div class="item" >
                          <div class="leabel"><label for="cost">运费:</label></div>
                          <div class="number" id="total_fee">￥0.00</div>
                      </div>
          
                      <div class="item">
                          <div class="leabel"><label for="buyqty">订购数量:</label></div>
                          <div class="number" id="total_qty">0</div>
                      </div>
                      
                      <div class="item fund">
                          <div class="leabel"><label for="cash">现金账户余额:</label></div>
                          <div class="number" id="cash">¥0.00</div>
                      </div>
                      <div class="item fund">
                          <div class="leabel"><label for="buyqty">奖金账户余额:</label></div>
                          <div class="number" id="bonus">¥0.00</div>
                      </div>
                      <div class="item fund">
                          <div class="leabel"><label for="buyqty">电子币账户余额:</label></div>
                          <div class="number" id="coin">¥0.00</div>
                      </div>
                 </div>
            </div>
            
        </vue-scroll>
        <van-submit-bar :price='totalPrice'  :button-text="buttonText" @submit="onSubmit">
             <div class="checkbox" @click="toggle()">
                    <van-checkbox ref="checkboxes"   v-model="checked">全选</van-checkbox>
             </div>
          
            <span class="all-label">
                 pv: <b>{{totalPv}}</b>
                  </span>
        </van-submit-bar>
        <van-popup v-model="show" position="right" :overlay="false">
                <van-nav-bar title="填写收货信息" left-text="返回" left-arrow @click-left='onDelete'>
                </van-nav-bar>
                <van-address-edit
                :area-list="areaList"
                :show-postal='false'
                :show-delete='false'
                :show-set-default='false'
                :show-search-result='false'
                :is-deleting='false'
                :search-result="searchResult"
                @save="onSave"
                save-button-text="提交订单"
              />
              <div class="orderInfo">
                  <h2>订单信息：<span>( 总价：<i>¥ {{totalPrice}}</i> ,折后PV：<i>{{totalPv}}</i> )</span></h2>
                <div class="item" >
                    <div class="leabel"><label for="cost">运费:</label></div>
                    <div class="number" id="total_fee">￥0.00</div>
                </div>
    
                <div class="item">
                    <div class="leabel"><label for="buyqty">订购数量:</label></div>
                    <div class="number" id="total_qty">0</div>
                </div>
                
                <div class="item fund">
                    <div class="leabel"><label for="cash">现金账户余额:</label></div>
                    <div class="number" id="cash">¥0.00</div>
                </div>
                <div class="item fund">
                    <div class="leabel"><label for="buyqty">奖金账户余额:</label></div>
                    <div class="number" id="bonus">¥0.00</div>
                </div>
                <div class="item fund">
                    <div class="leabel"><label for="buyqty">电子币账户余额:</label></div>
                    <div class="number" id="coin">¥0.00</div>
                </div>
           </div>
       </van-popup>
      
    </div>
</template>
<script>
    import areas from '@/utils/area.js'
    import { Toast } from 'vant';
    export default {
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                imageURL: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545041802973&di=b84700a7120e266d233244f8bcce3487&imgtype=0&src=http%3A%2F%2Fpic164.nipic.com%2Ffile%2F20180514%2F24821412_143226344000_2.jpg',
                dataActive: [],
                active:this.$store.getters.active,
                orderType:PLATFORM_CONFIG.orderType,
                currentOrderType:this.$store.getters.currentOrderType,
                pickAll:[],
                checked:false,
                show:false,
                areaList:{},
                searchResult: [],
                typeArr: [{ name: '激活单', 'id': 0 }, { name: '重消单', 'id': 1 }, { name: '升级单', 'id': 2 }],
                buttonText:'提交订单',
                manage:'管理',
                deleteMsg:'删除',
                deleteType:false,
                totalPrice:0,
                totalPv:0,
                ops: {
                    bar: {
                        background: '#eee'
                    },
                    rail: {

                    },
                    scrollButton: {
                        enable: false,

                    }
                }
            }
        },
        mounted() {
            this.getList();
           var getArea=areas();
          this.areaList=getArea.arreaList;

        },
        methods: {
            getList() {
                this.$http.get(
                    '/api/cartlist',
                ).then(data => {
                    this.dataActive = data.map(v=>{
                        return {
                            category_id: v.category_id,
                            created_at: v.created_at,
                            id: v.id,
                            name: v.name,
                            number:v.number,
                            price:v.price,
                            pv: v.pv,
                            updated_at:v.updated_at,
                            checked:false
                        }
                    })
                })
            },
            goBack() {
                this.$router.go(-1);
            },
            tabClick(index){
                this.currentOrderType=this.orderType[index].type;
                this.$store.commit('changeTab',{type:this.currentOrderType,index,index});
            },
            onSubmit() {
                //this.deleteType==true  删除
                 if(this.deleteType==true){
                    this.deleteAll();
                 }else{
                    this.show=true;
                 }
            },
            changeNum(id,number){
                this.calc()
                this.$http.post(
                    '/api/cartupdate',
                    {
                        id:id,
                        number:number
                    }
                ).then(data => {
                   
                })
            },
            deleteAll(){
                 let len=this.dataActive.length;
                 let newArr=[];
                 let delArray=[];
                
               
                for(let i=0;i<len;i++){
                    if(!this.dataActive[i].checked){
                        newArr.push(this.dataActive[i]);
                    }
                    else{
                        delArray.push(this.dataActive[i].id);
                    }
                }
                this.$http.post(
                    '/api/cartdelete',
                    {
                        ids:delArray
                    }
                ).then(data => {
                    this.dataActive=newArr;
                    this.pickAll=[];
                    this.calc()
                })
            },
            beforeClose(){

            },
            changeHandle(val){
                this.deleteType=!this.deleteType;
                if(val==0){
                    this.buttonText='删除'
                }
                if(val==1){
                    this.buttonText='提交订单'
                }
            },
            pickState(v){
                 this.pickAll=[];
                 let len=this.dataActive.length;
                for(let i=0;i<len;i++){
                    if(this.dataActive[i].checked){
                        this.pickAll.push(this.dataActive[i]);
                    }
                }
                if(this.pickAll.length!=len){
                    this.checked=false;
                }else{
                    this.checked=true;
                }
                this.calc()
            },
            toggle() {
               this.$refs.checkboxes.toggle();
               this.checkAll(this.checked)
               this.calc()
            },
            checkAll(v){
                let len=this.dataActive.length;
                this.pickAll=[];
                if(v){
                    for(let i=0;i<len;i++){
                        this.dataActive[i].checked=true;
                        this.pickAll.push(this.dataActive[i]);
                   }
                }else{
                    for(let i=0;i<len;i++){
                        this.dataActive[i].checked=false;
                   }
                }

            },
            calc(){
                let len=this.pickAll.length;
                this.totalPrice=0;
                this.totalPv=0;
                for(let i=0;i<len;i++){
                   
                    this.totalPrice= this.totalPrice+this.pickAll[i].number*Number(this.pickAll[i].price)*100;
                    this.totalPv= this.totalPv+this.pickAll[i].number*Number(this.pickAll[i].pv);
                }
            },
            onSave() {
                Toast.success('提交成功');
                let data={
                    "orderType": "21",
                    "paid": false,
                    "receiverAddress": "常南村隆力奇金牛大楼",
                    "receiverCity": "苏州市",
                    "receiverDistrict": "常熟市",
                    "receiverMobile": "18012345678",
                    "receiverName": "陆六",
                    "receiverState": "江苏省",
                    "totalPrice": "6900",
                    "totalPv": "885",
                    "userCode": "999999",
                    "createdTime": "2018-11-23 14:10:03",
                    "createdUserCode": "999999",
                    "details": [
                        {
                            "imgUrl":'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545041802973&di=b84700a7120e266d233244f8bcce3487&imgtype=0&src=http%3A%2F%2Fpic164.nipic.com%2Ffile%2F20180514%2F24821412_143226344000_2.jpg',
                            "price": "2300",
                            "productName": "精致生活纯钛玉石环",
                            "productNo": "hazz126a",
                            "pv": "295",
                            "quantity": 3
                        }
                    ],
                    "id": 1,
                    "orderNumber": "CZ20181123000001",
                }
                this.$store.commit('payOrderInfo', data)
                this.$router.push({name:'neworder'})
            },
            onDelete() {
                this.show=false;
            }
        }
    };
</script>
<style lang="scss" scoped src="./style.scss"></style>