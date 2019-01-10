// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vant/lib/index.css';
import './assets/css/index.scss';
import './assets/js/screen-adaptation';

import * as directives from './directives';
import * as filters from './filters';
import * as mixins from './mixins';

import App from './App';
import Vant, { Toast } from 'vant';
import Vue from 'vue';
import components from './components';
import store from './store';
import VueLazyload from 'vue-lazyload'
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import http from '@/utils/fetch';
import VueClipboards from 'vue-clipboard2';
import vueFeedback from 'vue-feedback';
import api from './api/index.js';
Vue.use(api);
Vue.use(vueFeedback);
window.Vue = Vue;
Vue.prototype.$http = http;
Vue.prototype.Toast = Toast;
Vue.use(Vant);
Vue.use(VueClipboards);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/err.png'),
  loading: require('./assets/images/ld1.gif'),
  attempt: 5,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
});
Vue.use(vuescroll);
// 全局组件
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});
// 引入全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
// 引入全局指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});
// 引入全局mixins
Object.keys(mixins).forEach(key => {
  Vue.mixin(mixins[key]);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
