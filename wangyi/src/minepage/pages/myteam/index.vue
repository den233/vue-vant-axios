<template>
    <div id='team'>
        <!-- <van-nav-bar title="我的团队">
            <label class="navebar_left" slot="left" @click="onClickLeft">
                <van-icon name="arrow-left" />返回</label>
            
        </van-nav-bar> -->
        <div class="searchtop">
            <van-search :value="value"  use-action-slot @change='changeHandle' placeholder="请输入搜索关键词" show-action>
                <div slot="action" @click="onSearch"  @search="onSearch">查询</div>
            </van-search>
        </div>
        <div  v-for="(item,index) in memberList" :key='index' class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit">
            <i class="van-icon van-icon-contact van-cell__left-icon"></i>
            <div class="van-cell__value van-cell__value--alone">
                <div>会员编号：{{item.userCode}}</div>
                <div class="content">
                    <div class='name'>姓名：{{item.userName}}</div>
                    <div class="tel">电话：{{item.phone}}</div>
                </div>
                <div class='createTime'>创建时间：{{item.createTime}}</div>
            </div>
            <!---->
        </div>
         
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
                money: '',
                memberList:[]
            }
        },
        mounted() {

        },

        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
    
            onCancel() { },
            changeHandle({detail}){
               this.value=detail;
            },
            onSearch(){
               let _this=this;
               let params={
                 userCode:this.value
               }
               _this.memberList=[];
               this.$api.apiConfig.myTeam(params).then(res=>{
                   if(res.status=='1011'){
                    let v1=res.lists;
                    _this.memberList=v1;
                   } 
               
               }).catch(e=>{

               })
            }
        }

    };
</script>
<style lang="scss" src='./style.scss'></style>