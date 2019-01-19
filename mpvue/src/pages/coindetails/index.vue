<template>
  <div class="profit">
    <van-nav-bar title="电子币">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
    </van-nav-bar>
        <ul id="mineBill">
              <li class="van-hairline--bottom" v-for="item in list" :key="item.id">
                <div class="left">
                  <span class="type">{{item.type}}</span>
                  <span class="time">{{item.time}}</span>
                </div>
                <div class="right" :class="{active: item.value === 1}">
                  {{item.value === 1 ? '+' : '-'}} {{item.money}}
                </div>

                <div class="right">
                      余额：{{item.money}}
                    </div>
              </li>
            </ul>
  </div>
    </template>
    <script>
    export default {
      data () {
        return {
          list: [
            {
              type: '转账',
              time: '2017-02-15 00:27:29',
              money: '1000',
              value: 0,
              id: 11231
            },
            {
              type: '充值',
              time: '2017-02-15 00:27:29',
              money: '1000',
              value: 1,
              id: 112312
            },
            {
              type: '奖金转电子币',
              time: '2017-02-15 00:27:29',
              money: '1000',
              value: 1,
              id: 112312
            }
          ]
        };
      },
      methods:{
          onClickLeft(){
              this.$router.go(-1);
          }
      }
    };
    </script>
    
    <style lang='scss' src='./style.scss'></style>
    