<template>
    <div class="cart">
        <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="goBack">
            <van-icon name="search" slot="right" />
        </van-nav-bar>
        <van-tabs>
            <van-tab v-for="(item,index) in typeArr" :title="item.name" :key="index" v-model="active">
            </van-tab>
        </van-tabs>
        <vue-scroll ref="vs" :ops="ops">
            <div class='cartList'>
                <van-card v-for='(item,index) in dataActive' :key="index" tag="热销商品" :price="item.price" :title="item.name"
                    :thumb="imageURL" origin-price="10.00">
                    <div slot='desc'>pv:{{item.pv}}</div>
                    <div slot="footer">
                        <van-stepper v-model="item.number" integer :min="1" :max="99" :step="1" />
                    </div>
                </van-card>
            </div>
        </vue-scroll>
        <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checked">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>
<script>
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
                dataRepeat: [],
                dataUpgrage: [],
                active: '0',
                typeArr: [{ name: '激活单', 'id': 0 }, { name: '重消单', 'id': 1 }, { name: '升级单', 'id': 2 }],
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
        },
        methods: {
            getList() {
                this.$http.get(
                    '/api/cartlist',
                ).then(data => {
                    this.dataActive = data;
                })
            },
            goBack() {
                this.$router.go(-1);
            },
            onSubmit() {
                 
            },
            checked() {

            },
            beforeClose(){

            }
        }
    };
</script>
<style lang="scss" scoped src="./style.scss"></style>