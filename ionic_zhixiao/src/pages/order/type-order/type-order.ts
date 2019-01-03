import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,AlertController} from 'ionic-angular';
import { CommonService } from '../../../providers/common.service';
import { DEV } from '../../../providers/config';
import {getColorSize,unique,deepClone} from '../../../providers/base';
import { deepCopy } from 'ionic-angular/util/util';
@IonicPage({
    name: "typeOrder",
    segment: "typeOrder",
    defaultHistory: []
})
@Component({
  selector: 'page-type-order',
  templateUrl: 'type-order.html',
})
export class TypeOrderPage {

    public imgUrl = DEV.imgUrl;
    public ordertype:string = '';
    public isCheck:boolean = true;
    public isEdit:boolean = false;
    public goodsList = [];
    public checkIds = [];
    public isAllCheck:boolean = false;
    public showNull = false;
    public atitle:string = '';

    public totalPrice:number = 0;
    public totalPv:number = 0;
    public settleItem = [];

    public from;
    public checkALL=false;
    public model= 0;
    public lists:boolean=false;
    public shopArray=[];
    public colorCheck=false;
    public sizeCheck=false;
    public typeGroup={
      color:'',
      size:'',
      colorId:'',
      sizeId:''
    }
    public UNI_NO='';
    public colorGroup='';
    public sizeGroup='';
    public colorGroup1=[];
    public sizeGroup1=[];
    public cartImg='';
    public select_type="";
    public FP_PRICE='';
    public PRODUCT_NAME='';
    public colorArray=[];
    public sizeArray=[];
    public result=[];
    public listIndex=0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public commonService: CommonService,
        public alertCtrl: AlertController) {

        this.ordertype = this.navParams.get('ordertype');
        this.atitle = this.navParams.get('title');
        this.from = this.navParams.get('from');
    }

    showToast(msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 1500,
            position: "bottom",
            cssClass: "text-center"
        });
        toast.present(toast);
    }

    createLoading() {
        let loading = this.loadingCtrl.create({
            spinner: "ios"
        });
        loading.present();
        return loading;
    }

    ionViewDidEnter() {
        this.getCartList();
       // this.checkIds = [];
       // this.totalPrice = this.totalPv = 0;
    }

    /**
     * 下拉刷新
     * @param refresher
     */
    doRefresh(refresher) {
        this.getCartList(refresher);
    }

    /**
     * 获取购物车列表
     */
    getCartList(refresher=null){

        let data = {
            'strAction':'getAppProducts',
            'size':10000,
            'ordertype':this.ordertype
        };

        let load = this.createLoading();

        this.commonService.order(data).subscribe(
            res => {

                refresher && refresher.complete();//下拉加载关闭

                load && load.dismiss(); //关闭加载框

                if(res.statusCode == 0){

                    this.goodsList = res.body.data;
                    for(let i in this.goodsList){
                        this.goodsList[i]['isCheck'] = false;
                        this.goodsList[i]['QTY'] = 1;
                        this.goodsList[i]["SHOES_COLOUR"] ="";
                        this.goodsList[i]["SHOES_SIZE"] ="";
                        this.goodsList[i]["disabled"] = true;
                    }
                }else {
                    this.showToast(res.message);
                    this.goodsList = [];
                }

                if(!this.goodsList.length){
                    this.showNull = true;
                }

            },
            err => {
                load && load.dismiss(); //关闭加载框
                console.error("ERROR", err);
            }
        );
    }


    /**
     * 更新checkbox
     * @param item
     */
    updateCheck(item){

        if(item['isCheck']){
            this.checkIds.push(item.UNI_NO);
        }else{
            for (let i = 0; i < this.checkIds.length; i++) {
                if (this.checkIds[i] == item.UNI_NO) this.checkIds.splice(i,1);
            }
        }
        if(!this.checkIds.length){
            this.isAllCheck = false;
        }

        this.caculate();
    }


    add(item){
        item['QTY'] = Math.min(++item['QTY'],999);
        this.caculate();
    }

    /**
     * 购物车减1
     * @param item
     */
    reduce(item,i){

        if(item['QTY'] == 1){
            this.showToast('商品数量最低为1');
        }
        else {
            item['QTY']--;
        }

        this.caculate();

    }

   
    /**
     * 多选
     */
    checkAll(){
        this.checkIds = [];
        console.log(this.isAllCheck)
        if(this.isAllCheck){
            this.isAllCheck = false;
            for(let i in this.goodsList){
                if(this.goodsList[i]['disabled']==false){
                    this.goodsList[i]['isCheck'] = false;
                }
            }
        }else {
            this.isAllCheck = true;
            for(let i in this.goodsList){
                if(this.goodsList[i]['disabled']==false){
                    this.goodsList[i]['isCheck'] = true;
                    this.checkIds.push(this.goodsList[i].UNI_NO);
                }
               
            }
        }

        this.caculate();

    }


    /**
     * 计算总价格，总pv
     */
    caculate(){

        this.totalPrice=0;
        this.totalPv=0;

        this.settleItem = [];
        for(var i=0;i<this.shopArray.length;i++){
            if(this.shopArray[i]['isCheck']){
                this.totalPrice += this.shopArray[i]['MP_PRICE']*this.shopArray[i]['QTY'];
                this.totalPv += this.shopArray[i]['MP_PV']*this.shopArray[i]['QTY'];
                this.settleItem.push(this.shopArray[i]);
            }
        }

        this.totalPrice = Number(this.totalPrice.toFixed(2));
        this.totalPv = Number(this.totalPv.toFixed(2));

        console.log(this.checkIds);
    }

    /**
     * 监听input输入
     */
    inputCheck(item){
        setTimeout(()=>{
            item['QTY'] = Math.min(item['QTY'],999);
            item['QTY'] = Math.max(item['QTY'],1);
        });
        this.caculate();
    }

    edit(){
        this.isEdit = !(this.isEdit);
    }

    /**
     * 结算
     */
    settle(){

        if(this.ordertype == '10' && this.totalPv<800){
            let alert = this.alertCtrl.create({
                subTitle: '升级单结算pv需满800',
                buttons: ['我知道了']
            });
            alert.present();
            return false;
        }

        if(!this.checkIds.length){
            let alert = this.alertCtrl.create({
                subTitle: '请选择要结算的商品',
                buttons: ['我知道了']
            });
            alert.present();
        }else{
            this.navCtrl.push('confirmOrder',{
                goods:this.settleItem,
                total:{
                    number:this.checkIds.length,
                    pv:this.totalPv,
                    money:this.totalPrice
                },
                orderType:{
                    name:this.atitle,
                    value:this.ordertype,
                    cart:true
                }
            });
        }

    }
     /*
      选择颜色
      @param checked  是否选中状态
             index 索引
    */
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
     /*
      选择尺寸
      @param checked  是否选中状态
             index 索引
    */
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
        console.log('this.sizeGroup1[index].children',this.sizeGroup1[index].children)
          for(var k=0;k<this.sizeGroup1[index].children.length;k++){
            var item=this.sizeGroup1[index].children[k];
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
    /*
      将商品加入购物清单
      @param item  选择的商品的信息
             index 索引
    */
    addCart(item,index) {
        console.log('item',item)
       let loading = this.createLoading();
       this.cartImg=item.IMAGE_LINK!=null?this.imgUrl+item.IMAGE_LINK:''
       this.select_type='请选择 颜色 尺码'
       this.model=1;
       this.PRODUCT_NAME=item.PRODUCT_NAME;
       this.FP_PRICE=item.FP_PRICE;
       this.listIndex=index;
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
          console.log('colorGroup1',this.colorGroup1);
          console.log('sizeGroup1',this.sizeGroup1);
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
         this.checkIds=[];
         let check=false;
        if(this.colorCheck==false||this.sizeCheck==false){
          this.showToast("请选择商品属性");
        }else{
       
          console.log('UNI_NO',this.UNI_NO)
        //    let str = localStorage.getItem('principal');
            this.goodsList[this.listIndex]['SHOES_COLOUR']=this.typeGroup.color;
            this.goodsList[this.listIndex]['SHOES_SIZE']=this.typeGroup.size;
            this.goodsList[this.listIndex]['disabled']=false;
            this.goodsList[this.listIndex]['isCheck']=true;
            this.goodsList[this.listIndex]['UNI_NO']=this.UNI_NO;
            this.goodsList[this.listIndex]['QTY']=1;
            // this.checkFalse();
            console.log('this.goodsList',this.goodsList[this.listIndex].UNI_NO);
           // console.log('this.shopArray',this.shopArray)
            if(this.shopArray.length==0){
                this.shopArray.push(
                    this.goodsList[this.listIndex]
                )
            }  
            else{
                for(var i=0;i<this.shopArray.length;i++){
                            let item=this.shopArray[i];
                           
                            if(item['UNI_NO']===this.UNI_NO){
                                item.QTY++;
                                check=true;
                                console.log(item['UNI_NO'])
                               break;
                            } 
                     }
                     if(check==false){
                        this.shopArray.push(this.goodsList[this.listIndex])
                     } 
                   
                   
                 }
                 for(var i=0;i<this.shopArray.length;i++){
                    if(this.shopArray[i]['isCheck']==true){
                       this.checkIds.push(this.shopArray[i]['UNI_NO']);
                    }
                }
                 this.caculate();
                 this.closeModal();
        }
      }
      shopList(){
        this.lists=true;
      }
      closeModal(){
        this.model=0;
        this.lists=false;
        this.colorCheck=false;
        this.sizeCheck=false; 
        this.colorGroup1=[];
        this.sizeGroup1=[];
      }
      delHandle(item,index){
        // this.shopArray[index].isCheck=false;
        //  this.shopArray[index].QTY=1;
          this.shopArray.splice(index,1) ;
         if(this.checkIds.length>0){
             for(var i=0;i<this.checkIds.length;i++){
                 let chekid=this.checkIds[i];
                  if(chekid=item.UNI_NO){
                      this.checkIds.splice(i,1);
                  }
             }
         }
          this.caculate(); 
      }
    goGoodsDetail(item) {

        if (item.PRODUCT_CATEGORY == 18) {
            this.navCtrl.push("goodsPackageDetail", {
                category: item.PRODUCT_CATEGORY,
                product: item,
                orderType: this.ordertype
            });
        } else {
            this.navCtrl.push("goodsDetail", {
                category: item.PRODUCT_CATEGORY,
                productno: item.PRODUCT_NO,
                orderType: this.ordertype
            });
        }
    }

    goBack(){
        this.navCtrl.pop()
    }

}
