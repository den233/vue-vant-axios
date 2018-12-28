<template>
  <div id="orderDetail">

    <van-nav-bar title="待支付重消单" left-text="返回" right-text="" left-arrow @click-left="onClickLeft" />
    <div class="form">
      <van-steps :active="active">
        <van-step>基本信息</van-step>
        <van-step>支付完成</van-step>
      </van-steps>
      <div class="step1" v-if='active==0'>
        <van-cell-group>
          <div class="layui-form-item funditem">
            <label class='label' for="">购买期数</label>
            <van-radio-group v-model="venture">
              <van-radio name="1">购买本期</van-radio>
              <van-radio name="2">多期购买 </van-radio>
            </van-radio-group>
          </div>
          <van-cell title="开始时间" @click='pickMonth' is-link arrow-direction="down" :value="startTime.name" />
          <van-cell title="期数" @click='pickQshu' is-link arrow-direction="down" :value="qishuValue.name" />
        </van-cell-group>
        <div class="btn-group">
            <van-button @click='paySubmit(1)' type="warning">确认支付</van-button>
        </div>
        <van-actionsheet v-model="show" :actions="actions" @select="onSelect"    />
        <van-actionsheet v-model="showQishu" :actions="qiShu" @select="onSelectQishu"    />
      </div>

      
      <div class="step4" v-if='active==1'>
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
      <van-button class="copy" style="width:auto" v-clipboard:copy="footerInfo.orderNum" v-clipboard:success="onCopy"
        v-clipboard:error="onError">复制单号 </van-button>
    </div>
    <!-- <van-submit-bar
    :price="3050"
    button-text="支付"
    @submit="onSubmit"
  /> -->
  </div>
</template>
<script>

  export default {

    data() {
      return {
        active: 0,
        tabactive: 0,
        show: false,
        showQishu: false,
        qishuValue:{id:0,name:'请选择'},
        startTime:{id:0,name:'请选择'},
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
        },
        actions: [
        ],
        qiShu:[]

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
      pickMonth() {
        this.show = true;
        console.log(this.getMonth(2))
         var mothValue=this.getMonth(1);
         var mothText=this.getMonth(2);
         for(var i=0,len=mothText.length;i<len;i++){
            this.actions.push(
              {
                id:mothValue[i],
                name:mothText[i]
              }
            )
         }
        
      },
      pickQshu(){
        this.showQishu=true;
         this.renderQi();
      },
      renderQi(){
			  	for(var i=0;i<12;i++){
			  		var index=i+1
            var total=(i+1)*30;
            let name=`购买${index}个月：累计总$PV必须>=${total}PV`;
			  	 this.qiShu.push({
             name:name,
             id:index
           })
          }
      },
      onSelectQishu(item){
            console.log(item)
            this.showQishu=false;
            this.qishuValue=item;
      },
      onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        console.log(item)
        this.startTime=item;
      },
      getMonth(type) {
        var date = new Date();
        var cyear = date.getFullYear(); //获取完整的年份(4位)

        var cmonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)

        // 月份数组
        var nearThree = [];
        var monthTree = [];
        var monthIndex = 0;
        var dataIndex = 0;
        for (var i = 0; i < 13; i++) {
          dataIndex = cmonth;
          monthIndex = cmonth;
          if (cmonth > 12) {
            if (cyear - date.getFullYear() == 0) {
              cyear = cyear + 1;
            }
            cmonth = cmonth - 12;
            dataIndex = cmonth;
            monthIndex = cmonth;
          }
          if (dataIndex < 10) {
            dataIndex = 0 + '' + cmonth
          }
          dataIndex = cyear + '' + dataIndex
          monthIndex = "" + cyear + "年" + monthIndex + "月"
          nearThree.push(dataIndex);
          monthTree.push(monthIndex);
          cmonth = cmonth + 1;
        }
        if (type == 1) {
          return nearThree;
        }
        if (type == 2) {
          return monthTree
        }
      }

    }
  };
</script>

<style lang="scss" src='./index.scss'>
</style>