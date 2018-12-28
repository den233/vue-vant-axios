<template>
  <div id="orderDetail">

    <van-nav-bar title="待支付激活单" left-text="返回" right-text="" left-arrow @click-left="onClickLeft" />
    <div class="form">
      <van-steps :active="active">
        <van-step>第一步</van-step>
        <van-step>基本信息</van-step>
        <van-step>支付</van-step>
        <van-step>支付完成</van-step>
      </van-steps>
      <div class="step1" v-if='active==0'>
        <van-cell-group>
          <van-field v-model="formItem.saleMan" center clearable label="销售人编号" placeholder="销售人编号">
            <van-button slot='button' @click='searchXiaoshou' size="small" type="primary">查询</van-button>
          </van-field>
          <van-field v-model="formItem.serviceMan" center clearable label="服务人编号" placeholder="服务人编号">
            <van-button slot='button' @click='searchFuwu' size="small" type="primary">查询</van-button>
          </van-field>
          <div class="btn-group">
            <van-button id='nextStep1' @click='nexHandle(1)' type="primary">下一步</van-button>
          </div>
        </van-cell-group>

      </div>
      <div class="step2" v-if='active==1'>
        <label for="">会员类型</label>
        <van-radio-group @change='changeMember' v-model="tabactive">
          <van-radio name="0">新会员</van-radio>
          <van-radio name="1">老会员</van-radio>
        </van-radio-group>
        <van-cell-group v-if='tabactive=="0"'>
          <van-field v-model="formItem.userName" center clearable label="会员姓名" placeholder="会员姓名">

          </van-field>
          <van-field v-model="formItem.paperNum" center clearable label="身份证" placeholder="身份证">
          </van-field>
        </van-cell-group>
        <van-cell-group v-if='tabactive=="1"'>
          <van-field v-model="formItem.old.serviceNum" center clearable label="服务机构编号" placeholder="服务机构编号">
            <van-button slot="button" size="small" type="primary">查询</van-button>
          </van-field>
          <van-field v-model="formItem.old.userName" center clearable label="姓名" placeholder="姓名">
          </van-field>
        </van-cell-group>
        <div class="btn-group">
          <van-button @click='preveHandle(0)' type="primary">上一步</van-button>
          <van-button @click='nexHandle(2)' type="warning">下一步</van-button>
        </div>
      </div>
      <div class="step3" v-if='active==2'>
        <van-cell-group>
          <van-field :value="paylist.userName" label="用户名" left-icon="contact" disabled />

          <van-field :value="paylist.salesMan" label="销售人编号" left-icon="friends-o" disabled />
          <van-field :value="paylist.serviceMan" label="服务人编号" left-icon="manager-o" disabled />
        </van-cell-group>
        <div class="btn-group">
          <van-button @click='preveHandle(1)' type="primary">上一步</van-button>
          <van-button @click='paySubmit(3)' type="warning">确认支付</van-button>
        </div>
      </div>
      <div class="step4" v-if='active==3'>
        <van-icon name="passed" />
        <p>恭喜支付完成</p>
        订单编号：xxxxxx
      </div>
    </div>
    <div class="goods">
      <div class="header">
        商品信息
        <div style="display:inline-block" class="price">(合计：<span>¥667</span></div>
        <div style="display:inline-block" class="price">PV：<span>¥667</span>)</div>
      </div>
      <van-card tag="标签" desc="描述信息" title="董事长套餐" :thumb="imageURL" num='3'>
        <div slot='desc'>+++
          <div class="price">单价：<span>¥667</span></div>
          <div class="price">PV：<span>¥667</span></div>
        </div>
      </van-card>
    </div>
    <div class="location">
      <van-icon name="location" />
      <div class="address">
        <div class="name">收货人：ccc</div>
        <div class="mobile">联系电话：15556688899</div>
        <div>常熟市，xxxxxxx </div>
      </div>
    </div>

    <div class="footer">
      <span>订单编号：{{footerInfo.orderNum}}</span>
      <span>创建时间：{{footerInfo.createTime}}</span>
      <span>创建人编号：{{footerInfo.createdUserCode}}</span>
      <span>订单类型：{{footerInfo.orderName}}</span>
      <span>运费：{{footerInfo.total_fee}}</span>
      <span>现金账户：{{footerInfo.orderNum}}</span>
      <span>积分：{{footerInfo.orderNum}}</span>
      <span>电子币：{{footerInfo.orderNum}}</span>
      <span>奖金：{{footerInfo.orderNum}}</span>
      <van-button class="copy" style="width:auto" v-clipboard:copy="footerInfo.orderNum" v-clipboard:success="onCopy"
        v-clipboard:error="onError">复制单号 </van-button>
    </div>

  </div>
</template>
<script>

  export default {

    data() {
      return {
        active: 0,
        tabactive: '0',
        imageURL: 'http://placehold.it/85x85',
        itemDetail: {
          id: '11112',
          userName: '七星广场物业管理处',
          status: 1,
          statusName: '待接单',
          servericeImgUrl: 'http://placehold.it/85x85',
          imgUrl: 'http://placehold.it/35x35',
          servericeName:
            '保安巡逻服务，定岗服务，安全保障保安巡逻服务，定岗服务，安全保障',
          servericeTime: '2018-07-25 14:00',
          duration: '2个小时',
          createOrderTime: '2018-07-24 09:00',
          count: 2,
          money: 120
        },
        footerInfo: {
          orderNum: '5555777777777',
          createTime: '2018-07-24 09:00',
          createdUserCode: 'ssd447',
          orderName: '激活单',
          orderType: '22',
          total_fee: '556'
        },
        venture: '1',//创业基金
        paylist: { userName: '', salesMan: '', serviceMan: '' },
        formItem: {
          saleMan: '',
          serviceMan: '',
          userName: '',
          paperNum: '',
          old: {
            userName: '',
            paperNum: '',
            serviceNum: ''
          }
        }

      };
    },
    mounted() {
      console.log(this.$route.params)
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      onCopy: function (e) {
        console.log('复制成功！')
      },
      onError: function (e) {
        console.log('复制失败！')
      },
      onSubmit() {

      },
      preveHandle(id) {
        this.active = id;
      },
      nexHandle(id) {
        this.active = id;
        this.paylist.userName = '555'
      },
      paySubmit(id) {
        this.active = id;
      },
      changeMember() {
        console.log(this.tabactive)
      },
      searchXiaoshou() {

      },
      searchFuwu() {

      }

    }
  };
</script>

<style lang="scss" src='./index.scss'>
</style>