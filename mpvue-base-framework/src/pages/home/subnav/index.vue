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
<style lang="scss"   src="./style.scss"></style>
<script>
export default {
  data () {
    return {
      active:this.$store.getters.active,
      orderType:this.$PLATFORM_CONFIG,
      currentOrderType:this.$store.getters.currentOrderType
    }
  },
  mounted(){
    // console.log('nav')
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

