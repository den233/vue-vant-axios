<template>
  <div class="category">
      <ul >
           <li v-for="(item,index) in catArr" :key="index" :class='{active:item.active}' @click='indexHandle(index)'>
             <a href="javascript:;" >
                {{item.name}}
             </a>
            </li>
      </ul>
  </div>
   
</template>
  <script>
  import bus from '@/components/bus'
  export default {
    components: {
      
    },
    data () {
      return {
          catArr:[]
      };
    },
   async mounted(){
      let _this=this;
      let v1=_this.catArr= await _this.getCategory()
      _this.catArr[0].active= true;

    },
    methods:{
      async getCategory(){
        return await this.$http.get(
            '/api/category'
            )
      },
      indexHandle(index){
        for(let i=0,len=this.catArr.length;i<len;i++){
          this.catArr[i].active=false;
          this.$set(this.catArr,i,this.catArr[i])
        }
        this.catArr[index].active=true;  
        this.$set(this.catArr,index,this.catArr[index])
        bus.$emit('useBusEvent', this.catArr[index].category_id)
        this.$emit('useBusEvent',this.catArr[index].category_id)
      }
    }
  };
  </script>
  <style lang="scss" scoped src="./style.scss"></style>
  