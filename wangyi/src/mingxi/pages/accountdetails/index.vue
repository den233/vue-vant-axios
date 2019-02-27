<template>
  <div id="mineWallet">
    <van-nav-bar title="我的账户">
      <label class="navebar_left" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left" />返回</label>
      <!-- <div class='view_d' slot='right' @click="onClickRight">新增</div> -->
    </van-nav-bar>
    <div style="height: 200px">
      <!-- opts 前面加冒号 -->
      <ff-canvas id="column" canvas-id="column" :opts="opts" />
    </div>
    <div class="header">
      <div class="list">
        <div class="a1">
          <div class="title">
            奖金
          </div>
          <div class="icons">
            <img src="../../../assets/images/accountdetails/jiang.png" alt="">
          </div>

          <div class="num">{{memberAccount.bonus}}</div>
        </div>
        <div class="a1">
          <div class="title">
            电子币
          </div>
          <div class="icons">
            <img src="../../../assets/images/accountdetails/coin.png" alt="">
          </div>

          <div class="num">{{memberAccount.coin}}</div>
        </div>
        <div class="a1">
          <div class="title">
            现金账户
          </div>
          <div class="icons">
            <img src="../../../assets/images/accountdetails/xianjin.png" alt="">
          </div>

          <div class="num">{{memberAccount.cash}}</div>
        </div>
      </div>
    </div>
    <div class="cell-group">
      <van-cell title="奖金明细" @click='gotoDetail($event,"/mingxi/pages/bonusdetails/index")' is-link value="更多" />
      <van-cell title="电子币明细" @click='gotoDetail($event,"/mingxi/pages/coindetails/index")' is-link value="更多" />
      <van-cell title="现金明细" @click='gotoDetail($event,"/mingxi/pages/cashdetails/index")' is-link value="更多" />
      <!-- <van-cell id="coin" title="积分明细" @click='gotoDetail($event,"/mingxi/pages/pvdetails/index")' is-link value="更多" /> -->
      <van-cell title="提现记录" @click='gotoDetail($event,"/mingxi/pages/tixianrecord/index")' is-link value="更多" />
    </div>
  </div>
</template>

<script>
  import F2 from "staticA/f2-canvas/lib/f2";
  let chart = null;
  var data = [];
  F2.Util.addEventListener = function (source, type, listener) {
    source.addListener(type, listener);
  };

  F2.Util.removeEventListener = function (source, type, listener) {
    source.removeListener(type, listener);
  };

  F2.Util.createEvent = function (event, chart) {
    const type = event.type;
    let x = 0;
    let y = 0;
    const touches = event.touches;
    if (touches && touches.length > 0) {
      x = touches[0].x;
      y = touches[0].y;
    }

    return {
      type,
      chart,
      x,
      y
    };
  };
  var fontSize = 24; // 字体适配不同屏幕

  // 根据角度和圆心求坐标
  function _getEndPoint(center, angle, r) {
    return {
      x: center.x + r * Math.cos(angle),
      y: center.y + r * Math.sin(angle)
    };
  }
  var _F = F2,
    Shape = _F.Shape,
    Util = _F.Util,
    G = _F.G;
  var Vector2 = G.Vector2;

  Shape.registerShape('interval', 'pie-with-icon', {
    draw: function draw(cfg, container) {
      var points = this.parsePoints(cfg.points);
      var style = Util.mix({
        fill: cfg.color
      }, cfg.style);
      var coord = this._coord;
      if (cfg.isInCircle && coord.transposed) {
        // 只处理极坐标y
        var newPoints = [points[0], points[3], points[2], points[1]];

        var _cfg$center = cfg.center,
          x = _cfg$center.x,
          y = _cfg$center.y;

        var v = [1, 0];
        var v0 = [newPoints[0].x - x, newPoints[0].y - y];
        var v1 = [newPoints[1].x - x, newPoints[1].y - y];
        var v2 = [newPoints[2].x - x, newPoints[2].y - y];

        var startAngle = Vector2.angleTo(v, v1);
        var endAngle = Vector2.angleTo(v, v2);
        var r0 = Vector2.length(v0);
        var r = Vector2.length(v1);

        if (startAngle >= 1.5 * Math.PI) {
          startAngle = startAngle - 2 * Math.PI;
        }

        if (endAngle >= 1.5 * Math.PI) {
          endAngle = endAngle - 2 * Math.PI;
        }

        var middleAngle = (startAngle + endAngle) / 2;
        var numbricCenter = _getEndPoint(cfg.center, middleAngle, (r + r0) / 2);

        var sector = container.addShape('Sector', {
          className: 'interval',
          attrs: Util.mix({
            x: x,
            y: y,
            r: r,
            r0: r0,
            startAngle: startAngle,
            endAngle: endAngle
          }, style)
        });

        var sectorBBox = sector.getBBox();
        if (sectorBBox.width >= fontSize && sectorBBox.height >= fontSize) {
          // 确定扇形部分可以放下 iconfont
          var text = container.addShape('text', {
            attrs: {
              x: numbricCenter.x,
              y: numbricCenter.y,
              fontFamily: 'charts-icon',
              textAlign: 'center',
              textBaseline: 'middle',
              fontSize: fontSize,
              text: String.fromCharCode(parseInt(cfg.origin._origin.iconfont, 16)),
              fill: '#fff',
              fontWeight: '400'
            }
          });

          return [sector, text];
        }
        return sector;
      }
    }
  });
  function initChart(canvas, width, height) {
    // 使用 F2 绘制图表
    var map = {};
    data.map(function (obj) {
      map[obj.name] = (Number(obj.percent)*100).toFixed(5) + '%';
    });
    chart = new F2.Chart({
      el: canvas,
      width,
      height,

    });

    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          return (Number(val)*100).toFixed(5) + '%';
        }
      }
    });

    chart.legend({
      position: 'right',
      marker: 'square',
      itemFormatter: function itemFormatter(val) {
        return val + '  ' + map[val];
      }
    });
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.4,
      radius: 0.85
    });
    chart.axis(false);
    chart.tooltip({
      showItemMarker: false,
      onShow(ev) {
        const {
          items
        } = ev;
        items[0].name = null;
        items[0].name = items[0].title;
        items[0].value = "¥ " + items[0].value;
      }
    });
    chart.interval().position('a*percent').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273']).adjust('stack').shape('pie-with-icon');
    chart.render();
    return chart;
  }


  export default {
    async onShow() {
      data =[{
          name: '奖金',
          percent: 30,
          a: '1',
          iconfont: 'e60c'
        }, {
          name: '电子币',
          percent: 25,
          a: '1',
          iconfont: 'e619;'
        }, {
          name: '现金账户',
          percent: 15,
          a: '1',
          iconfont: 'e60a;'
        }];
     await this.memberInfo();
     //this.$mp.page.selectComponent('#column').init(initChart);
    },
    data() {
      return {
        motto: "Hello World",
        opts: {
          // 使用延时初始化 -- 重要
          lazyLoad: true
        },
        
        memberAccount: {
          cash: '0.00',
          coin: '0.00',
          bonus: '0.00'
        }
      };
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      onClickRight() {

      },
      gotoDetail(e, id) {
        console.log(id)
        this.$router.push({ path: id })
      },
      memberInfo() {
        let _this = this;
        let queryData = {};
        _this.$api.apiConfig.member_me_get(queryData).then(res => {
          let memberInfo = res.member_me_get_response;
          let { cash, coin, bonus, pv } = memberInfo;
          let total = Number(cash) + Number(coin) + Number(bonus);
          data[0].percent =  (Number(bonus) / total) ;
           data[1].percent = (Number(coin) / total);
           data[2].percent = (Number(cash) / total);
          _this.memberAccount = {
            cash: cash,
            coin: coin,
            bonus: bonus
          }
          _this.$mp.page.selectComponent('#column').init(initChart);
        }).catch(e => {

        })
      }
    }
  };
</script>
<style>
  @font-face {
    font-family: 'charts-icon';
    src: url('//at.alicdn.com/t/font_926396_b5dfoondztm.eot');
    src: url('//at.alicdn.com/t/font_926396_b5dfoondztm.eot?#iefix') format('embedded-opentype'),
      url('//at.alicdn.com/t/font_926396_b5dfoondztm.woff') format('woff'),
      url('//at.alicdn.com/t/font_926396_b5dfoondztm.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_926396_b5dfoondztm.svg#iconfont1') format('svg');
  }
</style>
<style lang="scss" src='./style.scss'></style>