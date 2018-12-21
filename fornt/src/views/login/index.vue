<template>
    <div class='login'>
        <router-view></router-view>
    </div>
</template>
 
<script>
   export default{
       data(){
         return{            username:'',
            password:''
         }
       }
   }

</script>