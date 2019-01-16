<template>
    <div class="account">
        <van-nav-bar title="转账">
            <label class="navebar_left" slot="left" @click="onClickLeft">
              <van-icon name="arrow-left" />返回</label>
              <div class='view_d' slot='right'>查看明细</div>
          </van-nav-bar>
        <van-cell-group>
            <div class="form-item">
                <label class='form-label' for="usertype">转出账户</label>
                <van-radio-group @change="onChange($event,'1')" :value="radio" class="van-radio-group">
                        <van-radio name="1" class="van-radio">超值卡账户</van-radio>
                        <van-radio name="2">奖金账户</van-radio>
                </van-radio-group>
            </div>
            
                <van-field
                  v-model="account"
                  center
                  label="账户余额"
                  placeholder=""
                  readonly 
                  disabled
                  left-icon="contact"
                >
                  <van-button slot="button" size="small" type="primary">全部转出</van-button>
                </van-field>
            <van-field
              v-model="accountName"
              required
              clearable
              label="转入账户"
              placeholder="请输入转入账户"
            />
          
            <van-field
              v-model="money"
              required
              label="转出金额"
              placeholder="请输入转出金额"
            />
            <van-field
                v-model="message"
                label="留言"
                type="textarea"
                placeholder="请输入留言"
                rows="2"
                autosize
            />
         
          </van-cell-group>
          <div style="text-align: center;width: 100%;margin-top:20px;">
                <van-button size="large"  type="primary">确定</van-button>
          </div>
         
    </div>
</template>
<style lang="scss" src='./style.scss'></style>
<script>
    export default {
        data() {
            return {
                accountName:'' ,
                money:'',
                message:'',
                radio: '1',
                account:'999'
            }
        },
        mounted() {

        },
        
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onChange({mp},index){
              const {detail}=mp
              this.radio=detail
            }
        }
       
    };
</script>