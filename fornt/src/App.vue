<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted(){
    window.onload=function(){
       var div = document.getElementById("initBody"); 
       div.removeAttribute('id');
     }
  }
};
</script>
<style>
     @import url('http://at.alicdn.com/t/font_926396_qpae43p433h.css');
</style>
<style lang="scss" scoped>
#app{
  height: 100%;
  margin: auto;
}
</style>
