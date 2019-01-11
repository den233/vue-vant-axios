<template>
  <div class="category">
      <ul >
           <li v-for="(item,index) in catArr" :key="index" :class='{active:item.active}' @click='indexHandle(index)'>
             <a href="javascript:;" >
                {{item.categoryName}}
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
    props: {
      catArr: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data () {
      return {
         // catArr:[]
      };
    },
    created() {
      let _this=this;
    console.log('555')
      _this.getCategory()
   

    },
    methods:{
       getCategory(){
   
         let _this=this;
         let questParam={};
          this.$api.apiConfig.categoryList(
            questParam
            ).then(res=>{
            
               _this.catArr=res.productsale_category_query_response;
               _this.catArr.unshift({
                categoryId: "",
                categoryName: "全部商品"
               })
               _this.catArr[0].active= true;
               _this.$set(this.catArr,0,_this.catArr[0]);
             
            }).catch(error=>{

            })
      },
      indexHandle(index){
        for(let i=0,len=this.catArr.length;i<len;i++){
          this.catArr[i].active=false;
          this.$set(this.catArr,i,this.catArr[i])
        }
        this.catArr[index].active=true;  
        this.$set(this.catArr,index,this.catArr[index])
        bus.$emit('useBusEvent', this.catArr[index].categoryId)
      }
    }
  };
  </script>
  <style lang="scss" scoped src="./style.scss"></style>
  