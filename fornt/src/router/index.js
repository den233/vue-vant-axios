import Vue from 'vue';
import Router from 'vue-router';
import routers from './routers';

Vue.use(Router);

const router = new Router({
  routes: routers,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
