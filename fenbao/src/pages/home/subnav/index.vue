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
import store from '@/store'
export default {
  data () {
    return {
      active:'0',
      orderType:this.$PLATFORM_CONFIG,
      currentOrderType:this.$PLATFORM_CONFIG[0].type
    }
  },
  mounted(){
    // console.log('nav')
  },
  methods:{
      goShop(item,index){
        console.log(item)
         store.commit('changeTab',{type:item.type,index,index});
        // this.$router.push({path: item.path, query:{type : item.type,index:index}})
      }
  }
};
</script>

