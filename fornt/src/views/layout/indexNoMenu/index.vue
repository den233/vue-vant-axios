<template>
  <div class="index">
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
.index{
  height: 100%;
  .body{
    margin-bottom: 1.626667rem /* 61/37.5 */;
  }
}
</style>
