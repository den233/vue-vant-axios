<template>
      <div class="vueBox" >
        <div class="marquee">
            <div class="marquee_title">
                <span>	<i class="iconfont1 icon-gonggao"></i>最新动态</span>
            </div>
            <div class="marquee_box">
                <ul ref="con1" class="marquee_list" :class="{anim:animate==true}">
                <!-- 当显示最后一条的时候（num=0转换布尔类型为false）去掉过渡效果-->
                    <li v-for="(item, index) in marqueeList" >
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>    

  </template>
  <script>

  export default {
    components: {
    },
    data () {
      return {
        animate: false,
              setInval:"",
              marqueeList: [{
                      name: '隆力奇护手霜1折',
                  },
                  {
                      name: '2军',
                      city: '上海',
                      amount: '20'
                  },
                  {
                      name: '3军',
                      city: '广州',
                      amount: '30'
                  },
                  {
                      name: '4军',
                      city: '重庆',
                      amount: '40'
                  }
              ],
                results: [],
                value:''
      };
    },
    created: function() {
          this.setInval=setInterval(this.scroll, 3000)
      },
       destroyed(){
           clearInterval(this.setInval)
       },
    methods: {
      focus () {
        this.$router.push({path: '/service/list-search'});
      },
      scroll() {
              //console.log(1)
              let con1 = this.$refs.con1;
              con1.style.marginTop = '-80px';
              this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
              this.animate = !this.animate;
              var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
              setTimeout(function() {
                  that.marqueeList.push(that.marqueeList[0]);
                  that.marqueeList.shift();
                  con1.style.marginTop = '0px';
                  that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
              }, 0)
          }
    }
  };
  </script>
  <style lang="scss" src="./index.scss"></style>
  