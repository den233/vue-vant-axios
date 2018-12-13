/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Toast } from 'vant';
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器

axios.interceptors.request.use(config => {
 // element ui Loading方法
 const toast = Toast.loading({
    duration: 0,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    message: '加载中'
  });
 return config
}, error => {
   Toast.clear();
  
 return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
 Toast.clear();
 return data
}, error => {
  Toast.clear();
 return Promise.reject(error)
})
 
export default axios