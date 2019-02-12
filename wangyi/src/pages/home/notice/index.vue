<template>
    <div class="vueBox">
        <div class="marquee">
            <div class="marquee_title">
                <span> <i class="iconfont1 icon-gonggao">最新动态</i></span>
            </div>
            <div class="marquee_box" >
             
                <ul    class="marquee_list" :class="{anim:animate==true}">
                    <!-- 当显示最后一条的时候（num=0转换布尔类型为false）去掉过渡效果-->
                    <li  class="marquee_list_li" v-for="(item, index) in marqueeList" :key='index'>
                        <span class="span">{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <a href="/other/pages/messagelist/index">更多</a>
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                animate: false,
                setInval: "",
                marginTop:'0px',
                marqueeList: [ 
                ],
                results: [],
                value: '1'
            };
        },
        created() {
            this.get_list();
              this.setInval=setInterval(this.scroll, 3000)
        },
        destroyed() {
           clearInterval(this.setInval)
        },
        methods: {
            get_list(){
                let _this=this;
                this.$api.apiConfig.getAmAnnounces({}).then(data=>{
                    let v1=data.amAnnounces;
                    _this.marqueeList=v1.map(v=>{
                        return {
                            name:v.subject,
                            id:v.aano
                        }
                    })
                })
            },
            scroll() {
                //console.log(1)
                this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
                setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                        this.marqueeList.push(this.marqueeList[0]);  // 将数组的第一个元素添加到数组的
                        this.marqueeList.shift();               //删除数组的第一个元素
                        this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                },500)
            }
        }
    };
</script>
 <style lang="scss"  src="./style.scss" >
 
 </style>