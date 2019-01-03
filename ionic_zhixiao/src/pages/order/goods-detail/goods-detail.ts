import { Component, ViewChild, ChangeDetectorRef, NgZone } from "@angular/core";
import {
  App,
  Content,
  IonicPage,
  Slides,
  ModalController,
  NavController,
  ToastController,
  LoadingController,
  AlertController,
  NavParams,
  ActionSheetController
} from "ionic-angular";
import { DEV } from '../../../providers/config';
import { CommonService } from "../../../providers/common.service";
import {getColorSize,unique,deepClone} from '../../../providers/base';
@IonicPage({
  name: "goodsDetail",
  segment: "goodsDetail",
  defaultHistory: []
})
@Component({
  selector: "page-goods-detail",
  templateUrl: "goods-detail.html"
})
 
export class GoodsDetailPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;
  imgUrl = DEV.imgUrl;
  isHidCart: boolean;
  parentTab = "goods";
  orderType: string = "";
  SHOES_GROUP:string='';
  currentIndex = 0;
  images = [];
  category = "";
  productno = "";
  model:boolean = false;
   UNI_NO='';
  item = {
    UNI_NO: "",
    PRODUCT_NO: "",
    PRODUCT_NAME: "",
    QTY: "",
    FP_PRICE: "",
    FP_PV: "",
    MP_PRICE: "",
    MP_PV: "",
    IMAGE_LINK: "",
    PRODUCT_CATEGORY: "",
    REMARK: "",
    SHOES_GROUP:''
  };
  price: any;
  pv: any;
  isFirst:false;
  colorGroup='';
  sizeGroup='';
  colorGroup1=[];
  sizeGroup1=[];
  colorCheck=false;
  sizeCheck=false;
  select_type='请选择 颜色 尺寸';
  cartImg='';
  typeGroup={
    color:'',
    size:'',
    colorId:'',
    sizeId:''
  };
  result=[];
  
  colorArray=[];
  sizeArray=[];
  constructor(
    public appCtrl: App,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public commonService: CommonService,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public actionSheetCtrl:ActionSheetController,
    public alertCtrl: AlertController,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.productno = navParams.get("productno") || "";
    this.category = navParams.get("category") || "";
    this.orderType = navParams.get("orderType") || "";
    this.isHidCart = navParams.get("isHidCart") || false;
    this.isFirst = navParams.get("first") || false;
    this.SHOES_GROUP=navParams.get("SHOES_GROUP") || '';
  }

  ionViewDidLoad() {
    this.loadData();
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
  showMenu(){
    let actionSheet = this.actionSheetCtrl.create(
        { title: '菜单标题', 
          buttons: [ 
              { text: '销毁', 
               //销毁对话框
                role: 'destructive', 
                handler: () => {
                   console.log('Destructive clicked'); 
                   this. showInfo("点击了销毁");
                }
              }, 
              { text: '删除', 
                handler: () => { 
                    console.log('Archive clicked'); 
                    this. showInfo("点击了删除");
                } 
              },
               { text: '取消', 
                 //删除数据
                 role: 'cancel', 
                 handler: () => { 
                     console.log('Cancel clicked'); 
                    } 
               }] 
        }); 

        //显示下拉菜单
        actionSheet.present();
}

//显示toast消息
showInfo(msg){
    let toast = this.toastCtrl.create({
        message: msg, //提示消息
        duration: 3000,//3秒后自动消失
        position: 'bottom',//位置top,bottom
        showCloseButton:true, //是否显示关闭按钮
        closeButtonText:"关闭" //关闭按钮字段
    });

    //关闭后执行的操作
    toast.onDidDismiss(() => { console.log('toast被关闭之后执行'); });

    //显示toast
    toast.present();//符合触发条件后立即执行显示。
}
  closeModal(){
    this.model=!this.model;
  }
  showModal(){
    this.cartImg=this.imgUrl+this.images[0]
    this.model=true;
    let loading = this.createLoading();
     //颜色
     let data={
      strAction:'getAppProductSales',
    }
    //尺码
    let data1={
      strAction:'getAppProductShoesInfo',
      shoesGroup:this.item.SHOES_GROUP
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
  }

  goBack() {
    this.navCtrl.pop();
  }

  segmentChanged(type) {
    this.parentTab = type;
    console.log(this.parentTab );
    this.content.scrollTo(0, this.scrollTo(this.parentTab), 500);
  }

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex() || 0;
  }

  scrollTo(element: string) {
    let elem = document.getElementById(element);
    console.log(elem)
    let box = elem.getBoundingClientRect();

    let body = document.body;
    let docEl = document.documentElement;

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let clientTop = docEl.clientTop || body.clientTop || 0;
    let top = box.top + scrollTop - clientTop;
    let cDim = this.content.getContentDimensions();

    let scrollOffset = Math.round(top) + cDim.scrollTop - cDim.contentTop;
    return scrollOffset;
  }

  onScroll(ev) {
    let scroll = this.content.getContentDimensions().scrollTop;
    let golal = this.scrollTo("detail");

    if (scroll < golal) {
      setTimeout(() => {
        this.parentTab = "goods";
      }, 500);
    } else {
      setTimeout(() => {
        this.parentTab = "detail";
      }, 500);
    }
  }

  goHome() {
    this.appCtrl.getRootNav().push("tabs", { index: 0 });
  }
  goCart() {
    this.appCtrl.getRootNav().push("tabs", { index: 2 });
  }

  loadData() {
    let loading = this.createLoading();
    //modal 数据
    let inputs = {
      strAction: "getAppProductDeatil",
      category: this.category,
      productno: this.productno
    };
    this.commonService.order(inputs).subscribe(
      data => {
        loading && loading.dismiss(); //关闭加载框
        if (data.statusCode == 0) {
          let body = data.body;
          let result = body["data"][0] || {};
          if (result["IMAGE_LINK"] && !Array.isArray(result["IMAGE_LINK"])) {
            this.images.push(result["IMAGE_LINK"]);
          }
          if (result["IMAGE_LINK"] && Array.isArray(result["IMAGE_LINK"])) {
            this.images = result["IMAGE_LINK"];
          }
          this.item = result;
          this.item["QTY"] = "1";


          this.price = this.item["FP_PRICE"];
          this.pv = this.item["FP_PV"];



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
  //add cart
  addCart() {
    let loading = this.createLoading();
    let inputs = {
      strAction: "postAppProductCar",
      productid: this.item.UNI_NO,
      ordertype: this.orderType,
      qty: this.item["QTY"]
    };
    this.commonService.order(inputs).subscribe(
      data => {
        loading && loading.dismiss(); //关闭加载框
        this.showToast(data.message);
      },
      err => {
        loading && loading.dismiss(); //关闭加载框
        console.error("ERROR", err);
      }
    );
  }

  // input
  inputCheck(item) {
    let num = Number(item["QTY"]) || 0;
    if (num > 999) {
      num = 999;
      this.showToast("商品最多购买999件");
    }
    if (num < 1) {
      num = 1;
      this.showToast("商品最少购买1件");
    }
    item["QTY"] = num;
  }

  // add 1
  add(item) {
    let num = Number(item["QTY"]) || 0;
    num++;
    if (num > 999) {
      num = 999;
      this.showToast("商品最多购买999件");
    }

    item["QTY"] = num;
  }

  // remove 1
  reduce(item, i) {
    let num = Number(item["QTY"]) || 0;
    num--;
    if (num < 1) {
      num = 1;
      this.showToast("商品最少购买1件");
      return;
    }
    item["QTY"] = num;
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
 submitHandle(){
   this.UNI_NO='';
    if(this.colorCheck==false||this.sizeCheck==false){
      this.showToast("请选择商品属性");
    }else{
       for(var i=0;i<this.result.length;i++){
         var item=this.result[i];
              if(item.SHOES_SIZE==this.typeGroup.size&&item.SHOES_COLOUR==this.typeGroup.color){
                this.UNI_NO=item.UNI_NO;
              }
       }
       let loading = this.createLoading();
       let inputs = {
         strAction: "postAppProductCar",
         productid:  this.UNI_NO,
         ordertype: this.orderType,
         qty: this.item["QTY"]
       };
       this.commonService.order(inputs).subscribe(
         data => {
           loading && loading.dismiss(); //关闭加载框
           this.showToast(data.message);
           this.closeModal();
         },
         err => {
           loading && loading.dismiss(); //关闭加载框
           console.error("ERROR", err);
         }
       );
    }
  }
}
