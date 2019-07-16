<template>
    <div class="pickdate">
        <div class="col-left"  @click="pickMonth">
            <label class="iconfont1 icon-yue"></label> 按月筛选
        </div>
        <div class="col-left right" @click="pickDate">
            <label  class="iconfont1 icon-tian"></label> 按天筛选
        </div>
        <van-popup :show="showMonth" position="bottom" overlay="true" @close="onClose">
                <van-datetime-picker :max-date="maxDate" type="year-month" :value="currentDate" :min-date="minDate" @cancel='onCancel' @confirm="onConfirm($event,'month')" />
        </van-popup>
        <van-popup :show="show" position="bottom" overlay="true" @close="onClose">
            <van-datetime-picker :max-date="maxDate" type="date" :value="currentDate" :min-date="minDate" @cancel='onCancel' @confirm="onConfirm($event,'day')" />
        </van-popup>
    </div>
</template>
<script>
    import {dateFormat} from 'ut'
    export default {
        data() {
            return {
                show: false,
                showMonth:false,
                currentDate: new Date().getTime(),
                minDate: new Date().getTime()-365*2*24*3600*1000,
                maxDate:new Date().getTime(),
                dateType:'date',
                list: [
                    {
                        type: '奖金收入',
                        time: '2017-02-15 00:27:29',
                        money: '1000',
                        value: 1,
                        id: 11231
                    },
                    {
                        type: '余额提现',
                        time: '2017-02-15 00:27:29',
                        money: '1000',
                        value: 2,
                        id: 112312
                    }
                ]
            };
        },
        onShow(){
            // console.log(new Date().getTime())
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onClose() {
                this.show = false;
            },
            onConfirm({detail},type) {
                var time = new Date(detail);
                var year = time.getFullYear();
                var month = time.getMonth()+1;
                var day = time.getDate();
                if(type=='month'){
                    day='0'
                }
                this.$emit('pickdateHandle',{year:year,month:month,day:day})
                this.show=false;
                this.showMonth=false;
            },
            onCancel(event){
               this.show=false;
               this.showMonth=false;
            },
            pickMonth(){
                this.showMonth = true;
            },
            pickDate(){
                this.show=true;
            }
        }
    };
</script>

<style lang='scss' src='./style.scss'></style>