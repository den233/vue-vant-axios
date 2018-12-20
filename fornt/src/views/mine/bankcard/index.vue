<template>
        <div class="account">
            <van-nav-bar title="银行卡绑定" left-text="返回" right-text="新增" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
           
             <div class="card">
                 <div class="inner">
                     <div class="imgs">
                         <i class="iconfont1 icon-zhongguogongshangyinxing"></i>
                     </div>
                     <div class="content">
                         <div class="title">中国工商银行</div>
                         <div class="subtitle">
                             储蓄卡
                         </div>
                     </div>
                     <div class="clear"></div>
                     <div class="code">
                         2255666633333333355
                     </div>
                 </div>
             </div>
             <div class="card card-blue">
                    <div class="inner">
                        <div class="imgs">
                            <i class="iconfont1 icon-jiangsuyinhang"></i>
                        </div>
                        <div class="content">
                            <div class="title">江苏银行</div>
                            <div class="subtitle">
                                储蓄卡
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="code">
                            2255666633333333355
                        </div>
                    </div>
                </div>
          
        </div>
    </template>
    <style lang="scss" scoped src="./style.scss"></style>
    <script>
        export default {
            data() {
                return {
                   
                }
            },
            mounted() {
    
            },
    
            methods: {
                onClickLeft() {
                    this.$router.go(-1);
                },
                onClickRight(){
                   
                }
            }
    
        };
    </script>