<template>
  <div id="mineEntry">
    <h1>
        隆力奇营养师培训之矿物质
    </h1>
    <div class="title">
        小奇  隆力奇微讯  5天前
    </div>
    <wxParse :content="article" @preview="preview" @navigate="navigate" />
  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  export default {
    components: {
      wxParse
    },
    data() {
      return {
        article: `<div> 随着我国社会经济的快速发展，人们生活水平逐步提高，但怎样吃？如何吃才能吃出健康，吃出美丽？不见得很多人真的知道。七大类营养素中膳食纤维到底是一类什么样的营养素呢？为什么称之为人体的物理扫帚您知道吗？它真有神奇的减肥作用吗？
          <img src="https://img.alicdn.com/imgextra/i1/897941969/O1CN01MX1WDa1QPqLPVmOQ5_!!897941969.jpg"></img>
          </div>`
      }
    },
    methods: {
      preview(src, e) {
        // do something
      },
      navigate(href, e) {
        // do something
      }
    }
  }
</script>
<style>
   @import url("~mpvue-wxparse/src/wxParse.css");
</style>
<style lang="scss" src="./style.scss">

</style>