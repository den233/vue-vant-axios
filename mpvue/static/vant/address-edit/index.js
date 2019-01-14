import { VantComponent } from '../common/component';
 import getArea from './area'
VantComponent({
  classes: ['title-class'],
  props:{
    test:String,
    areaList: Object
  },
  watch: {
    // areaList: {
    //   handler(newVal,oldVal) {
    //     this.cData=newVal;
    //   },
    //   immediate: true, 
    //    deep: true
    // }
},
data() {
  return {  
    value:'',
    showArea:false,
    cData:{} 
  }
 },
 
  methods: {
    onChange: function onChange (){
     // console.log(getArea())
    },
    showAreaPopup:function showAreaPopup(){
      this.setData({
        showArea:true,
          cData:getArea().arreaList
      })

      console.log(this.test)
    }
  }
});