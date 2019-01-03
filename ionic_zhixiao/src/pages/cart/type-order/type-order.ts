import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,AlertController} from 'ionic-angular';
import { CommonService } from '../../../providers/common.service';
import { DEV } from '../../../providers/config';

@IonicPage({
    name: "typeOrder1",
    segment: "typeOrder1",
    defaultHistory: []
})
@Component({
  selector: 'page-type-order',
  templateUrl: 'type-order.html',
})
export class TypeOrderPage {

    public imgUrl = DEV.url;
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
        this.checkIds = [];
        this.totalPrice = this.totalPv = 0;
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
            console.log(this.isAllCheck)
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
                this.goodsList[i]['isCheck'] = false;
            }
        }else {
            this.isAllCheck = true;
            for(let i in this.goodsList){
                this.goodsList[i]['isCheck'] = true;
                this.checkIds.push(this.goodsList[i].UNI_NO);
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
        for(let i in this.goodsList){
            if(this.goodsList[i]['isCheck']){
                this.totalPrice += this.goodsList[i]['MP_PRICE']*this.goodsList[i]['QTY'];
                this.totalPv += this.goodsList[i]['MP_PV']*this.goodsList[i]['QTY'];
                this.settleItem.push(this.goodsList[i]);
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
