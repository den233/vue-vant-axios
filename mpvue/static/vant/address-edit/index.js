import { VantComponent } from '../common/component';
 import getArea from './area'
VantComponent({
  classes: ['title-class'],
  props:{
    //areaList: Object
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
  data: {
    value:'11',
    showArea:false,
    cData:{}
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
      console.log(this.data.cData)
    }
  }
});