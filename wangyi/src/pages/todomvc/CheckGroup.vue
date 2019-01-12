<template>
  <div class="m-checkgroup">
    <div v-for="(item, index) in source" :key="index"
      :class="{ 'm-checkgroup__item': true, 'z-checked': item.checked }"
      @click="onCheck(item, index)"
    ><slot :item="item"></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: Array,
      default: []
    }
  },
  methods: {
    onCheck(item, itemIndex) {
      this.source.forEach(i => {
        i.checked = item === i;
      });
  
      this.$emit('checked', {
        sender: this,
        item,
        itemIndex
      });
    }
  }
}
</script>

<style lang="less">
  .m-checkgroup {
    &__item {
      display: inline-block;
      height: 20rpx;
      padding: 0 6rpx;
      margin: 0 6rpx 0 0;
      color: inherit;
      margin: 3rpx;
      padding: 3rpx 7rpx;
      text-decoration: none;
      border: 1rpx solid transparent;
      border-radius: 3rpx;
    }
    &__item.z-checked {
      border-color: rgba(175, 47, 47, 0.2);
    }
  }
</style>
