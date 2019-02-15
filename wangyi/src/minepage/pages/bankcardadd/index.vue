<template>
  <div class="account">
    <van-nav-bar title="添加银行卡">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
    </van-nav-bar>
    <van-cell-group>

     
      <van-cell :value="bankName" is-link @click='pickHandle'>
        <template slot="title">
          <span class="custom-text">选择银行</span>
        </template>
        <i slot='icon' :class='iconClass' class='van-icon van-cell__left-icon iconfont1'></i>
      </van-cell>
      <van-field :error='errorInfo.cardNum' @focus="onFocus('cardNum')" :value="cardNum" clearable required label="银行卡号" @change='changecardNum' placeholder="请输入银行卡号" />
      <van-field :error='errorInfo.cardName' @focus="onFocus('cardName')" :value="cardName" clearable required label="银行户名" @change='changecardName' placeholder="请输入银行户名" />
      <van-field :error='errorInfo.addressDetail' @focus="onFocus('addressDetail')" :value="addressDetail" label="选择地区" placeholder="选择省/市/区" readonly @click="showAreaPopup" required />
    </van-cell-group>
    <div style="text-align: center;width: 100%;margin-top:20px;">
      <van-button size="large" type="primary" @click='submitHandle'>确定</van-button>
    </div>
    <van-popup :show="show" position="bottom" :overlay="false">
      <van-picker show-toolbar title="银行卡列表" :columns="columns" @cancel="onCancel" @confirm="onConfirm($event,index)" />
    </van-popup>
    <van-popup :show="showArea" position="bottom">
      <van-area @confirm="onAreaConfirm" @cancel="onAreaCancel" :area-list="areaList" />
    </van-popup>
    <van-toast id="van-toast" />
  </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script>
  import areas from '@/utils/area.js'
  import Toast from 'staticA/vant/toast/toast';
  export default {
    data() {
      return {
        cardNum: '',
        bankName:'',
        iconClass: '',
        cardList: [],
        columns: [],
        show: false,
        cardName: '中国银行',
        areaList: [],
        addressDetail:'',
        cData: {
              province: '',
              area: '',
              distinct: ''
        },
        showArea: false,
        errorInfo:{
          cardName:false,
          cardNum:false,
          addressDetail:false
        }
      }
    },
    onShow() {
      this.onLoad();
      this.initdata();
    },

    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      onLoad(){
        this.cardNum= '';
        this.iconClass= '';
        this.cardList= [];
        this.columns= [];
        this.show= false;
        this.cardName= '';
        this.bankName='';
        this.areaList= [];
        this.addressDetail='';
        this.cData= {
              province: '',
              area: '',
              distinct: ''
        };
        this.showArea= false;
        this.errorInfo={
          cardName:false,
          cardNum:false,
          addressDetail:false
        }
      },
      initdata() {
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
        for (var i = 0, len = this.cardList.length; i < len; i++) {
          this.columns.push(this.cardList[i].name);
        }
        var getArea = areas();
        this.areaList = getArea.arreaList;
      },
      onFocus(key){
        this.errorInfo[key]=false;
      },
      pickHandle() {
        this.show = true;
      },
      onCancel() {
        this.show = false;
      },
      onConfirm({ detail }) {
        this.bankName = detail.value;
        var index = detail.index;
        this.iconClass = this.cardList[index].fontClass;
        this.show = false;

      },
      showAreaPopup() {
         this.showArea=true;
      },
      onAreaConfirm({detail}){
        console.log(detail)
        let v1=detail.detail;
        let {province,city,county}=v1;
        this.cData.province=province;
        this.cData.area=city;
        this.cData.distinct=county;
        let newarray=[province,city,county]
        this.addressDetail=newarray.filter(text => text).join('/');
        this.showArea=false
      },
      onAreaCancel(){
        this.showArea=false
      },
      changecardNum({detail}){
          this.cardNum=detail;  
      },
      changecardName({detail}){
         this.cardName=detail
      },
      submitHandle(){
           if(this.bankName==''){
             Toast.fail('请选择银行');
             return false;
           }
           if(this.cardNum==''){
             Toast.fail('银行卡号不能为空');
             this.errorInfo.cardNum=true;
             return false;
           }
           if(this.cardName==''){
             Toast.fail('银行户名不能为空');
             this.errorInfo.cardName=true;
             return false;
           }
           if(this.addressDetail==''){
             Toast.fail('请选择省市区');
             this.errorInfo.addressDetail=true;
             return false;
           }
           let _this=this;
          const {province,area,distinct}=this.cData
           let params={
            "bankProvince":province,
            "bankCity":area,
            "bankDistrict":distinct,
            "bankaddress":"渭塘支行",
            "bankcard":this.cardNum,
            "bankbook":this.cardName,
            "bank":this.bankname,
           }
           _this.$api.apiConfig.bankcardAdd(params).then(data=>{
              if(data.status=='1011'){
                Toast.success('添加成功')
              }
           }).catch(e=>{
            Toast.fail('添加失败')
           })
      }
    }

  };
</script>