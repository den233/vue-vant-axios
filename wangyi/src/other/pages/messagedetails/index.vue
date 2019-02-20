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
  import { formatTime1, parseTime } from 'ut'
  export default {

    data() {
      return {
        html: '',
        subject: '',
        createTime: ''
      }
    },
    onShow() {
      this.test();
      this.getInfo();
    },
    methods: {
      test() {
        var str = "this is test string <img src=\"http://baidu.com/test.jpg\" width='50' > 1 and the end  33! <img src=\"/uploads/attached/image/20120426/20120426225658_92565.png\" alt=\"\" />"

      },
      getInfo() {
        console.log(this.$route.query.id)
        let _this = this;
        let params = {
          aaNo: this.$route.query.id
        }
        this.$api.apiConfig.getAmDetails(params).then(data => {
          let v1 = data.amAnnounce;
          let { subject, content, createTime } = v1;

          var reg = new RegExp("<o:p>", "g");//g,表示全部替换。
          var reg2 = new RegExp("</o:p>", "g");//g,表示全部替换。
          let str = content.replace(reg, " ");
          str = str.replace(reg2, " ");
          var imgReg = /<img.*?(?:>|\/>)/gi;
          var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          var arr = str.match(imgReg);  // arr 为包含所有img标签的数组
          var newArray = [];
          var srcARRAY = [];
          console.log(arr)
          if (arr != null) {
            let result = str
            for (var i = 0; i < arr.length; i++) {
              var src = arr[i].match(srcReg);
              console.log(src[1])
              var url = (src[1].substr(0, 7).toLowerCase() == "http://"||src[1].substr(0, 7).toLowerCase() == "https://") ? src[1] : "http://www.longliqicn.cn" +src[1];
              url=url.replace(/\s+/g,"");
              var reg2 = new RegExp(src[1], "g");//g,表示全部替换。
              result = result.replace(reg2, url);
            }
            _this.html = `${result}`;
          } else {
            _this.html = `${str}`;
          }


          _this.subject = subject;
          _this.createTime = parseTime(createTime);
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