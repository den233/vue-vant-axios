import { Component } from "@angular/core";
import {
  App,
  IonicPage,
  NavController,
  ToastController,
  LoadingController,
  NavParams
} from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { CommonService } from "../../../providers/common.service";
import { DEV } from '../../../providers/config';
import {getColorSize,unique,deepClone} from '../../../providers/base';
@IonicPage({
  name: "goodsSearch",
  segment: "goodsSearch",
  defaultHistory: []
})
@Component({
  selector: "page-goods-search",
  templateUrl: "goods-search.html"
})
export class GoodsSearchPage {
  imgUrl = DEV.imgUrl;
  items = [];
  showNull: boolean;
  orderType = '';
  keyWord = "";
  orderTypes = [];
  model= 0;
  colorCheck=false;
  sizeCheck=false;
  typeGroup={
    color:'',
    size:'',
    colorId:'',
    sizeId:''
  }
  UNI_NO='';
  colorGroup='';
  sizeGroup='';
  colorGroup1=[];
  sizeGroup1=[];
  cartImg='';
  select_type="";
  FP_PRICE='';
  PRODUCT_NAME='';
  item = {
    UNI_NO: "",
    PRODUCT_NO: "",
    PRODUCT_NAME: "",
    QTY: "1",
    FP_PRICE: "",
    FP_PV: "",
    MP_PRICE: "",
    MP_PV: "",
    IMAGE_LINK: "",
    PRODUCT_CATEGORY: "",
    REMARK: ""
  };
  colorArray=[];
  sizeArray=[];
  result=[];
  private form: FormGroup;
  constructor(
    public appCtrl: App,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public commonService: CommonService,
    public toastCtrl: ToastController
  ) {
    this.form = this.formBuilder.group({
      orderType: [""],
      keyWord: [""]
    });
  }

  ionViewDidLoad() {
    this.getOrderType();
  }
  // 初始化loading
  createLoading() {
    let loading = this.loadingCtrl.create({
      spinner: "ios"
    });
    loading.present();
    return loading;
  }
  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: "bottom",
      cssClass: "text-center"
    });
    toast.present(toast);
  }
  goBack() {
    this.navCtrl.pop();
  }

  // search goods item
  search() {
    let keyWord = this.keyWord.replace(/\s+/g, "");
    if (!keyWord) {
      this.showToast("请输入关键字");
      return;
    }
    this.loadData();
  }

  // select event
  change(){
    let keyWord = this.keyWord.replace(/\s+/g, "");
    if (keyWord){
      this.loadData();
    }
  }

  loadData() {
    let loading = this.createLoading();
    let inputs = {
      strAction: "getAppProducts",
      ordertype: this.orderType,
      keyword: this.keyWord.replace(/\s+/g, "")
    };
    this.commonService.order(inputs).subscribe(
      data => {
        loading && loading.dismiss(); //关闭加载框
        if (data.statusCode == 0) {
          let body = data.body;
          let result = body["data"] || [];
          this.items = result;
          // 非空判断
          if (this.items.length > 0) {
            this.showNull = false;
          } else {
            this.showNull = true;
          }
        } else {
          this.showToast(data.message);
        }
      },
      err => {
        loading && loading.dismiss(); //关闭加载框
        console.error("ERROR", err);
      }
    );
  }

  getOrderType(){
    this.commonService
    .order({
      strAction: "getAppOrdertype"
    })
    .subscribe(
      res => {
        if (res.statusCode == 0) {
          let result = res.body['data'] || [];
          
          for(let item of result){
            if(item['VALUE_CODE'] != '10'){
              this.orderTypes.push(item);
            }
          }
          this.orderType = this.orderTypes[0]['VALUE_CODE'];
        } else {
          this.showToast(res.message);
        }
      },
      err => {
        console.error("ERROR", err);
      }
    );
  }

  goCart() {
    this.appCtrl.getRootNav().push("tabs", { index: 1 });
  }

  goGoodsDetail(item) {
    // package
    if (item.PRODUCT_CATEGORY == 18) {
      this.navCtrl.push("goodsPackageDetail", {
        category: item.PRODUCT_CATEGORY,
        product: item,
        orderType: this.orderType
      });
    } else {
      this.navCtrl.push("goodsDetail", {
        category: item.PRODUCT_CATEGORY,
        productno: item.PRODUCT_NO,
        orderType: this.orderType
      });
    }
  }
  updateCucumber(checked,index){
    
    this.colorCheck=checked;
    if(checked==true){
      this.typeGroup.color=this.colorGroup1[index].name;
      this.UNI_NO=this.colorGroup1[index].UNI_NO;
      if(this.sizeCheck==false){
        this.select_type='请选择 尺码'
      }else{
       
        this.select_type='已选：'+this.typeGroup.color+this.typeGroup.size
      }
    }else{
      if(this.sizeCheck==false){
        this.select_type='请选择 颜色 尺码'
      }else{
        this.select_type='请选择 颜色'
      }
    }
   
  for(var i=0;i<this.colorGroup1.length;i++){
    if(i!=index){
      this.colorGroup1[i].checked=false
    }
  }
  for(var i=0;i<this.sizeGroup1.length;i++){
    let item1=this.sizeGroup1[i];
    item1.disabled=true;
      for(var k=0;k<this.colorGroup1[index].children.length;k++){
        var item=this.colorGroup1[index].children[k];
        if(item.name==item1.name){
          item1.disabled=false;
          item1.UNI_NO=item.UNI_NO;
        }
        
      }
  }
  for(var i=0;i<this.sizeGroup1.length;i++){
    let item1=this.sizeGroup1[i];
    if(item1.disabled==true){
      item1.checked=false;
    }
    if(checked==false){
      item1.disabled=false
    }
  }

}
sizeCucumber(checked,index){
  this.sizeCheck=checked;
    if(checked==true){
      this.typeGroup.size=this.sizeGroup1[index].name;
      this.UNI_NO=this.sizeGroup1[index].UNI_NO;
      if(this.colorCheck==false){
        this.select_type='请选择 颜色'
      }else{
       
        this.select_type='已选：'+this.typeGroup.color+this.typeGroup.size
      }
    }else{
      if(this.colorCheck==false){
        this.typeGroup.size=''
        this.select_type='请选择 颜色 尺码'
      }else{
        this.select_type='请选择 尺码'
      }
    }
  for(var i=0;i<this.sizeGroup1.length;i++){
    if(i!=index){
      this.sizeGroup1[i].checked=false
    }
  }
  for(var i=0;i<this.colorGroup1.length;i++){
    let item1=this.colorGroup1[i];
    item1.disabled=true;
   // console.log(this.sizeGroup1[index].children)
      for(var k=0;k<this.sizeGroup1[index].children.length;k++){
        var item=this.sizeGroup1[index].children[k];
        console.log(item.name)
        if(item.name==item1.name){
          item1.disabled=false;
          item1.UNI_NO=item.UNI_NO;
        }
        
      }
  }
  for(var i=0;i<this.colorGroup1.length;i++){
    let item1=this.colorGroup1[i];
    if(item1.disabled==true){
      item1.checked=false;
    }
    if(checked==false){
      item1.disabled=false
    }
  }
}
closeModal(){
  this.model=0;
  this.item.QTY='1';
  this.colorCheck=false;
  this.sizeCheck=false; 
  this.colorGroup1=[];
  this.sizeGroup1=[];
   
}
  //add cart
  addCart(item,img) {
    console.log(item)
   let loading = this.createLoading();
   let inputs = {
     strAction: "postAppProductCar",
     productid: item.UNI_NO,
     orderType: this.orderType
     // qty: 1
   };
   console.log(item)
   this.cartImg=item.IMAGE_LINK!=null?this.imgUrl+item.IMAGE_LINK:''
   this.select_type='请选择 款式 尺码'
   this.model=1;
   this.PRODUCT_NAME=item.PRODUCT_NAME;
   this.FP_PRICE=item.FP_PRICE;
   //尺码
   let data1={
     strAction:'getAppProductShoesInfo',
     shoesGroup:item.SHOES_GROUP
   }
    
   this.commonService.getSize(data1).subscribe(
     data=>{
       if (data.statusCode == 0) {
         let body = data.body;
         let result =this.result= body["data"] || [];
         
   //第一步 去重获取颜色和尺寸两个数组
       var colorarray=unique(result,'SHOES_COLOUR');
       var sizearray=unique(result,'SHOES_SIZE');
       //第二部 将每种颜色对应的尺寸加到children数组
       var colorArray=this.colorArray=getColorSize(result,colorarray,'SHOES_COLOUR','SHOES_SIZE')
       var sizeArray=this.sizeArray=getColorSize(result,sizearray,'SHOES_SIZE','SHOES_COLOUR')
      console.log(sizeArray)
       this.colorGroup1=colorArray.map(v=>{
          return {
             name:v.SHOES_COLOUR,
             UNI_NO:v.UNI_NO,
             disabled:false,
             checked:false,
             children:v.children
          }
       })
       this.sizeGroup1=sizeArray.map(v=>{
         return {
            name:v.SHOES_SIZE,
            UNI_NO:v.UNI_NO,
            disabled:false,
            checked:false,
            children:v.children
         }
      })
     }  
     },
     err => {
      
     }
   )
   loading && loading.dismiss(); //关闭加载框
   // this.commonService.order(inputs).subscribe(
   //   data => {
   //     loading && loading.dismiss(); //关闭加载框
   //     this.showToast(data.message);
   //   },
   //   err => {
   //     loading && loading.dismiss(); //关闭加载框
   //     console.error("ERROR", err);
   //   }
   // );
 }
 confirm(){
   if(this.colorCheck==false||this.sizeCheck==false){
     this.showToast("请选择商品属性");
   }else{
      for(var i=0;i<this.result.length;i++){
        var item=this.result[i];
             if(item.SHOES_SIZE==this.typeGroup.size&&item.SHOES_COLOUR==this.typeGroup.color){
              this.UNI_NO=item.UNI_NO;
             }
      }
      let str = localStorage.getItem('principal');
      let inputs = {
       strAction: "postAppProductCar",
       productid: this.UNI_NO,
       usercode:str,
       qty: '1'
     };
     let loading = this.createLoading();
     this.commonService.order(inputs).subscribe(
         data => {
           loading && loading.dismiss(); //关闭加载框
           this.showToast(data.message);
           this.closeModal()
         },
         err => {
           loading && loading.dismiss(); //关闭加载框
           console.error("ERROR", err);
         }
       );
   }
 }

}
