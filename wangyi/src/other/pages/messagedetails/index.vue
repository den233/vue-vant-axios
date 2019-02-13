<template>
  <div id="mineEntry">
    <!-- <h1>
     {{subject}}
    </h1> -->
    <!-- <div class="title">
     {{createTime}}
    </div> -->
    <div v-html="html"></div>
  </div>
</template>

<script>
import {formatTime1,parseTime} from 'ut'
  export default {

    data() {
      return {
        html: '',
        subject :'',
        createTime:''
      }
    },
    onShow(){
   
      this.getInfo();
    },
    methods: {
      getInfo() {
        console.log(this.$route.query.id)
        let _this= this;
        let params = {
          aaNo:this.$route.query.id
        }
        this.$api.apiConfig.getAmDetails(params).then(data => {
           let v1=data.amAnnounce;
           let {subject,content,createTime}=v1;
          
           var reg = new RegExp("<o:p>","g");//g,表示全部替换。
           var reg2 = new RegExp("</o:p>","g");//g,表示全部替换。
           let result=content.replace(reg, " ");
           result=result.replace(reg2, " ");
           _this.html=`${result}`;
           _this.subject=subject;
           _this.createTime=parseTime(createTime);
        })
      }
    }
  }
</script>
<style>
  @import url("~mpvue-wxparse/src/wxParse.css");
</style>
<style lang="scss" src="./style.scss">

</style>