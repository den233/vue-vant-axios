/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import Vue from 'vue';
import axios from 'axios'
import { Toast } from 'vant';
Vue.use(Toast)
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
}
axios.interceptors.request.use(config => {
 // element ui Loading方法
 Toast.loading({
    duration: 0,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    message: '加载中'
  });
  config.headers=defaultHeaders;
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