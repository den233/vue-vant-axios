import { VantComponent } from '../common/component';
import Toast from '../toast/toast';
import validateMobile from '../utils/index'
VantComponent({
  classes: ['title-class'],
  props:{
    areaList: Object,
    cData:{
      type: Object,
      default:{}
    },
    errorInfo: Object,
    telValidator: {
      type: Function,
      default: validateMobile
    }
  },
  watch: {
    //  cData: {
    //    handler(newVal,oldVal) {
    //      console.log(newVal)
    //    },
    //    immediate: true, 
    //      deep: true
    //   }
},
 
data(){
  return {  
    showArea:false,
    isSaving:false,
    addressDetail:''
  }
},
onShow(){
  this.setData({
    showArea:false,
    addressDetail:''
  })
},
  methods: {
    onChange:function onChange({detail}){
      this.data.cData.name=detail
    },
    onChangeTel:function onChangeTel({detail}){
      this.data.cData.tel=detail
    },
    onChangeAddress:function onChangeAddress({detail}){
      this.data.cData.addressDetail=detail
    },
    onAreaConfirm:function onAreaConfirm({detail}){
      let v1=detail.detail;
      let {province,city,county}=v1;
     // console.log(province)
      this.$emit('showArea',v1)
      this.data.cData.province=province;
      this.data.cData.area=city;
      this.data.cData.distinct=county;
      this.data.cData.areaDetail=province+'/'+city+'/'+county;
      this.setData({
        showArea:false,
        addressDetail:province+'/'+city+'/'+county
      })
    },
    onAreaCancel:function onAreaCancel(){
      this.setData({
      showArea:false})
    },
    onSave(e){
     console.log(e)
      const name =  this.data['cData']['name'];
      const tel = this.data['cData']['tel'];
      const addressDetail = this.data['cData']['addressDetail'];
      const areaDetail = this.data['cData']['areaDetail'];
      console.log(tel)
      if(name==''){
        Toast('收货人不为空');
        return false
      }
      if(tel==''){
        Toast('手机号码不为空');
        return false
      }
      
      if(addressDetail==''){
        Toast('详细地址不为空');
        return false
      }
      if(areaDetail==''){
        Toast('请选择省市区');
        return false
      }
      this.$emit('onSave',this.data.cData)
    },
    getErrorMessage(key,e) {
     // console.log(this.data)
      const value = String(this.data['cData'][key] || '').trim();
      

      switch (key) {
        case 'name':
          return value ? '':'收货人不为空'
        case 'tel':
        return validateMobile(value) ? '' : '电话不正确';
        case 'areaDetail':
        return value?'':'省市区不为空';
        case 'addressDetail':
        return value?'':'详细地址不为空';
       }
    },
    showAreaPopup:function showAreaPopup(){
      this.setData({
        showArea:true,
      })
    }
  }
});