<template>
  <div class="subnav">
    <ul class="nav">
      <li class="nav-item" v-for="(item,index) in orderType" :key="index">
         <div @click='goShop(item,index)'>
            <i :class='item.icon'></i>
            <p class="label">{{item.name}}</p>
         </div>
         
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active:this.$store.getters.active,
      orderType:PLATFORM_CONFIG.orderType,
      currentOrderType:this.$store.getters.currentOrderType
    }
  },
  methods:{
      goShop(item,index){
        console.log(item)
         this.$store.commit('changeTab',{type:item.type,index,index});
        // this.$router.push({path: item.path, query:{type : item.type,index:index}})
      }
  }
};
</script>
<style lang="scss" scoped src="./style.scss"></style>
