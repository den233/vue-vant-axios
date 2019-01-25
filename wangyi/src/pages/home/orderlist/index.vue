<template>
    <div id="homeorder">
        <h6 class="title"> <i class="iconfont1 icon-hot"></i>
            <div class='hot'> 热门推荐</div>
            <div class="a_link" @click='filter'>
                <van-icon class="fa fa-filter" name="arrow-down" /> {{orderName}}</div>
        </h6>
        <div class="lists">
            <div class="lists-item" v-for="(item,index) in serviceList" :key="index">
                <div class='inner'>
                    <div class="imgs">
                        <img class="imagesLazy" :src="item.imgUrl||imgLazyLoad" alt="">
                    </div>
                    <div class="info">
                        <h6 class="label">{{item.productName}}</h6>
                        <p class="desc">pv：{{item.pv}}</p>
                        <p class="price">￥
                            <span class="total">{{item.price}}</span>
                        </p>
                    </div>

                    <van-stepper :integer=true :disable-input=false @change='changeNum($event,item.ppsId,item.number,index)'
                        :value="item.number" integer :min="1" :max="99" :step="1" />
                    <van-icon class="cart_icon" name="shopping-cart-o" @click='addCart($event,item.id,item.number)' />
                    <!-- <van-button class="add_cart" size="small" type="danger"  @click='addCart(item.id,item.number)'>加入购物车</van-button> -->
                </div>
            </div>
            <van-toast id="van-toast" />
        </div>
        <van-dialog use-slot :show="show" show-cancel-button show-confirm-button @confirm='confirm' @cancel='onCnacel' @close="onClose">
            <van-radio-group :value='radio'>
                <van-cell-group>
                    <van-cell v-for='(item,index) in orderType' :key='index' :title="item.name" clickable @click="radioType($event,index,item.type)">
                        <van-radio :name="index" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-dialog>
        <van-toast id="van-toast" />
    </div>
</template>
<script>
     import Toast from 'staticA/vant/toast/toast';
    import Dialog from 'staticA/vant/dialog/dialog';
    export default {
        components: {

        },
        data() {
            return {
                serviceList: [],
                show: false,
                radio: 0,
                orderName: this.$PLATFORM_CONFIG[0].name,
                orderType: this.$PLATFORM_CONFIG,
                currentOrderType: this.$PLATFORM_CONFIG[0].type,
                radioIndex: 0
            };
        },
        mounted() {
            //console.log(this.orderType)
            this.catEvent("");
        },
        methods: {
            filter(index) {

                this.show = true
            },
            async getGoodsList(id) {
                let _this = this;
                _this.serviceList = [];
                _this.hasData = false;
                let querydata = {};
                querydata = {
                    productName: '',
                    category: id,
                    _currPageNo: 1,
                    _pageSize: 20,
                    orderType: _this.currentOrderType,
                };

                return await _this.$api.apiConfig.productSale(
                    querydata
                )
            },
            async categoryHandle(id) {
                let _this = this;
                let v1 = await _this.getGoodsList(id);
                v1 = v1.productsale_list_response;
                var arr = Object.getOwnPropertyNames(v1);
                if (arr.length == 0) {
                    this.hasData = true
                    return false;
                }
                if (v1.content.length == 0) {
                    this.hasData = true
                    return false;
                }
                _this.serviceList = v1.content.map(v => {
                    return {
                        id: v.id,
                        imgUrl: v.imgUrl,
                        price: v.price,
                        productName: v.productName,
                        productNo: v.productNo,
                        pv: v.pv,
                        number: 1
                    }
                });
                _this.current_id = id;
                console.log(_this.serviceList)
            },
            catEvent(id) {
                let _this = this;
                _this.categoryHandle(id)
            }
            // 弹出框事件
            , radioType(e, index, type) {
                console.log(e)
                this.radio = index;
            },
            confirm({ mp }) {
                this.orderName = this.orderType[this.radio].name;
                this.currentOrderType = this.orderType[this.radio].type;
                console.log(this.radio)
                this.radioIndex=this.radio;
                this.catEvent("");
             
                this.show = false
              
            },
            onCnacel(){
                this.radio=this.radioIndex;
            },
            onClose() {
                //this.radio=this.radioIndex;
                this.show = false
            },
            //加入购物车
            addCart({ detail }, id, number) {

                let _this = this;
                let queryParam = {
                    //"strAction": "trolley_detail_add",
                    "ppsId": id,
                    "orderType": _this.currentOrderType,
                    "quantity": Number(number)
                }
                // return false;
                _this.$api.apiConfig.trolley(queryParam).then(data => {
                    let v1 = data.trolley_detail_add_response;
                    var arr = Object.getOwnPropertyNames(v1);
                    if (arr.length == 0) {
                        Toast.fail(data.msg);
                        return false;
                    }
                    Toast.success('成功');

                }).catch(e => {
                    Toast.fail("添加失败");
                })
            },
          
            plus(id, number, index) {
                console.log(this.serviceList[index])
                this.serviceList[index].number++;
            },
            minus(id, number, index) {
                let _this = this;
                if (number > 1) {
                    _this.serviceList[index].number--;
                }
            },
            // beforeClose(action, done) {
            //     if (action === 'confirm') {
            //         setTimeout(done, 1000);
            //     } else {
            //         done();
            //     }
            // },

            changeNum({detail}, id, number, index) {
                this.serviceList[index].number = detail;
            }
        }
    }
</script>
<style lang="scss" src="./style.scss"></style>