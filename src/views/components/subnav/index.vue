<template>
  <div class="subnav">
    <ul class="nav">
      <li class="nav-item" v-for="(item,index) in navList" :key="index">
        <router-link :to="{path: item.path, query:{id : item.id}}" tag="div">
          <i :class='item.icon'></i>
          <p class="label">{{item.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      navList: [
        {
          image: '//m.360buyimg.com/mobilecms/jfs/t16912/18/2046755333/11079/5d93a046/5ae41d1aN7c1bb190.png',
          name: '超值卡',
          path: '/service/security',
          id: '1',
          icon:'iconfont1 icon-jiating'
        },
        {
          image: '//m.360buyimg.com/mobilecms/jfs/t21658/347/221358098/7461/f86e6f74/5b03b170Nc9e0ec7c.png',
          name: '激活单',
          path: '/service/security',
          id: '2',
          icon:'iconfont1 icon-dingdan'
        },
        {
          image: '//m.360buyimg.com/mobilecms/jfs/t1/1547/5/3745/20977/5b9a39fdEb23086ac/1b69fa3c859b04a5.png',
          name: '重消单',
          path: '/service/security',
          id: '3',
          icon:'iconfont1 icon-dingdan1'
        },
        {
          image: '//m.360buyimg.com/mobilecms/jfs/t17725/156/1767366877/17404/f45d418b/5ad87bf0N66c5db7c.png',
          name: '升级单',
          path: '/service/security',
          id: '4',
          icon:'iconfont1 icon-huiyuan1'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped src="./style.scss"></style>
